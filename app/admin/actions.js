"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAdminSupabaseClient,
  addComment,
  updateCommentStatus,
  deleteComment,
  addContactMessage,
  setContactMessageRead,
  setContactMessageStatus,
  dispatchAdminReplyToMessage,
  deleteContactMessage,
} from "@/lib/supabase/admin";
import { clearAdminSession, requireAdmin } from "@/lib/adminAuth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { estimateReadingTime, slugify } from "@/lib/blog";
import {
  getClientIp,
  checkAdminLoginRateLimit,
  recordFailedLoginAttempt,
  resetAdminLoginRateLimit,
} from "@/lib/redis/rateLimiter";

// ==============================================================================
// 1. Authentication Actions
// ==============================================================================

export async function loginAdmin(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const captchaToken = formData.get("captcha_token")?.toString();
  // 1. Rate limit check by client IP via Redis
  const ip = await getClientIp();
  const rateStatus = await checkAdminLoginRateLimit(ip);

  if (rateStatus.blocked) {
    redirect(
      `/admin/login?error=blocked&retryAfter=${rateStatus.retryAfterMinutes}`,
    );
  }

  if (!email || !password || !captchaToken) {
    redirect("/admin/login?error=invalid");
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });

  if (error || !data?.user) {
    console.warn(
      "[Admin Auth] Supabase signInWithPassword rejected credentials:",
      error?.message,
    );
    const failRecord = await recordFailedLoginAttempt(ip);
    if (failRecord.attempts >= 5) {
      redirect("/admin/login?error=blocked&retryAfter=15");
    }
    redirect(`/admin/login?error=invalid&remaining=${failRecord.remaining}`);
  }

  // 3. Verify user is authorized as an administrator
  const adminEmail = process.env.ADMIN_EMAIL || "admin@cvpair.com";
  const isAuthorizedAdmin =
    data.user.email?.toLowerCase() === adminEmail.toLowerCase() ||
    data.user.app_metadata?.role === "admin" ||
    data.user.user_metadata?.role === "admin";

  if (!isAuthorizedAdmin) {
    // Non-admin account: terminate session immediately
    await supabase.auth.signOut();
    const failRecord = await recordFailedLoginAttempt(ip);
    redirect("/admin/login?error=unauthorized");
  }

  // 4. Successful admin login resets the Redis rate limiter
  await resetAdminLoginRateLimit(ip);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

// ==============================================================================
// 2. Blog Posts CRUD
// ==============================================================================

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://cvpair.com"
).replace(/\/$/, "");

const ALLOWED_BLOCK_TYPES = [
  "heading",
  "paragraph",
  "list",
  "image",
  "callout",
  "faq",
  "cta",
];

const PLACEHOLDERS = [
  "Main SEO section heading",
  "Write a short, helpful paragraph",
  "Common reader question?",
  "Clear answer that can appear in FAQ schema",
  "Add a practical tip",
  "Add a second practical tip",
  "New heading",
  "New paragraph",
  "Helpful callout text",
];

// Collapse whitespace (removes stray \r\n) and trim
const clean = (v = "") => v.toString().replace(/\s+/g, " ").trim();

const isSafeHref = (v) => v.startsWith("/") || v.startsWith("https://");
const isBadHost = (v) => /localhost|127\.0\.0\.1/i.test(v);

function parseTags(value = "") {
  return [
    ...new Set(
      value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    ),
  ];
}

function parseBlocks(value = "[]") {
  let parsed;
  try {
    parsed = JSON.parse(value || "[]");
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  return (
    parsed
      .filter(
        (b) =>
          b && typeof b === "object" && ALLOWED_BLOCK_TYPES.includes(b.type),
      )
      .map((b) => {
        const out = { ...b };
        if (typeof out.text === "string") out.text = out.text.trim();
        if (typeof out.question === "string")
          out.question = out.question.trim();
        if (typeof out.answer === "string") out.answer = out.answer.trim();
        if (out.type === "list") {
          out.items = (out.items || [])
            .map((i) => String(i).trim())
            .filter(Boolean);
        }
        if (out.type === "heading") {
          out.level = out.level === 3 ? 3 : 2; // only H2 / H3
        }
        return out;
      })
      // drop empty blocks
      .filter((b) => {
        if (b.type === "list") return b.items.length > 0;
        if (b.type === "faq") return b.question && b.answer;
        if (b.type === "image") return b.url;
        return b.text;
      })
  );
}

function blockHasPlaceholder(b) {
  const text = [b.text, b.question, b.answer, ...(b.items || [])]
    .filter(Boolean)
    .join(" ");
  return PLACEHOLDERS.some((p) => text.includes(p));
}

function postPayload(formData) {
  const title = clean(formData.get("title"));
  const slug = slugify(formData.get("slug")?.toString() || title);
  const contentBlocks = parseBlocks(formData.get("content_blocks")?.toString());
  const status =
    formData.get("status")?.toString() === "published" ? "published" : "draft";

  const coverImage = clean(formData.get("cover_image"));
  const coverAlt = clean(formData.get("cover_alt"));
  const authorAvatar = clean(formData.get("author_avatar"));
  const excerpt = clean(formData.get("excerpt"));
  const canonicalInput = clean(formData.get("canonical_url"));
  const canonicalUrl = canonicalInput || `${SITE_URL}/blog/${slug}`;

  // ---- Validation ----
  const errors = [];
  if (!title) errors.push("Title is required.");
  if (!slug) errors.push("Slug is required.");
  if (coverImage && !coverAlt)
    errors.push("Cover alt text is required when a cover image is set.");
  if (!canonicalUrl.startsWith("https://") || isBadHost(canonicalUrl)) {
    errors.push(
      "Canonical URL must start with https:// and cannot be localhost.",
    );
  }
  if (authorAvatar && (!isSafeHref(authorAvatar) || isBadHost(authorAvatar))) {
    errors.push("Author avatar must be a real image URL (https:// or /path).");
  }
  if (coverImage && !isSafeHref(coverImage)) {
    errors.push("Cover image must start with https:// or /.");
  }
  for (const b of contentBlocks) {
    if (b.type === "cta" && !isSafeHref(b.href || "")) {
      errors.push(`CTA link "${b.href}" must start with / or https://.`);
    }
  }
  if (status === "published") {
    if (contentBlocks.some(blockHasPlaceholder)) {
      errors.push("Remove placeholder text before publishing.");
    }
    if (!contentBlocks.length) errors.push("Add content before publishing.");
  }
  if (errors.length) throw new Error(errors.join(" "));

  const seoDescription = clean(formData.get("seo_description")) || excerpt;

  return {
    title,
    slug,
    excerpt,
    content_blocks: contentBlocks,
    cover_image: coverImage,
    cover_alt: coverAlt,
    category: clean(formData.get("category")),
    tags: parseTags(formData.get("tags")?.toString() || ""),
    author_name: clean(formData.get("author_name")) || "CVPair Editorial Team",
    author_avatar: authorAvatar,
    seo_title: clean(formData.get("seo_title")) || title,
    seo_description: seoDescription,
    canonical_url: canonicalUrl,
    focus_keyword: clean(formData.get("focus_keyword")),
    reading_time: estimateReadingTime(contentBlocks),
    status,
    // published_at is set by the create/update actions, not here
  };
}

export async function createBlogPost(formData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const payload = postPayload(formData);
  payload.published_at =
    payload.status === "published" ? new Date().toISOString() : null;

  const { error } = await supabase.from("blog_posts").insert(payload);
  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
  redirect("/admin/blog");
}

export async function updateBlogPost(id, formData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const payload = postPayload(formData);

  // Keep the original publish date; only set it on first publish
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug, published_at")
    .eq("id", id)
    .single();

  payload.published_at =
    payload.status === "published"
      ? (existing?.published_at ?? new Date().toISOString())
      : null;

  const { error } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath(`/blog/${payload.slug}`);
  if (existing?.slug && existing.slug !== payload.slug) {
    revalidatePath(`/blog/${existing.slug}`);
  }
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
  redirect("/admin/blog");
}
export async function toggleBlogPostStatus(id, currentStatus) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const nextStatus = currentStatus === "published" ? "draft" : "published";
  const { error } = await supabase
    .from("blog_posts")
    .update({
      status: nextStatus,
      published_at:
        nextStatus === "published" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
}

export async function deleteBlogPost(id) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
  redirect("/admin/blog");
}

// ==============================================================================
// 3. Comments Moderation & Nested Replies Actions
// ==============================================================================

export async function setCommentModerationStatus(id, status, postSlug = "") {
  await requireAdmin();
  await updateCommentStatus(id, status);
  revalidatePath("/admin/comments");
  revalidatePath("/admin");
  if (postSlug) {
    revalidatePath(`/blog/${postSlug}`);
  }
}

export async function deleteCommentAction(id, postSlug = "") {
  await requireAdmin();
  await deleteComment(id);
  revalidatePath("/admin/comments");
  revalidatePath("/admin");
  if (postSlug) {
    revalidatePath(`/blog/${postSlug}`);
  }
}

export async function adminReplyToCommentAction(formData) {
  await requireAdmin();
  const parentId = formData.get("parent_id")?.toString();
  const postSlug = formData.get("post_slug")?.toString();
  const postId = formData.get("post_id")?.toString() || null;
  const replyContent = formData.get("content")?.toString()?.trim();
  const authorName =
    formData.get("author_name")?.toString() || "CVPair Editorial Team";

  if (!replyContent || !postSlug) {
    throw new Error("Reply content and post slug are required.");
  }

  await addComment({
    post_id: postId,
    post_slug: postSlug,
    parent_id: parentId || null,
    author_name: authorName,
    author_email: "editorial@cvpair.com",
    content: replyContent,
    is_admin_reply: true,
    status: "approved",
  });

  revalidatePath("/admin/comments");
  revalidatePath(`/blog/${postSlug}`);
  revalidatePath("/admin");
}

export async function submitPublicCommentAction(formData) {
  const postSlug = formData.get("post_slug")?.toString();
  const parentId = formData.get("parent_id")?.toString() || null;
  const authorName = formData.get("author_name")?.toString()?.trim();
  const authorEmail = formData.get("author_email")?.toString()?.trim();
  const content = formData.get("content")?.toString()?.trim();

  if (!postSlug || !authorName || !authorEmail || !content) {
    return { success: false, error: "Please fill in all required fields." };
  }

  // Basic anti-spam check (honeypot or length check)
  const honeypot = formData.get("website_hp")?.toString();
  if (honeypot) {
    return {
      success: true,
      message: "Thank you! Your comment has been submitted.",
    };
  }

  try {
    await addComment({
      post_slug: postSlug,
      parent_id: parentId,
      author_name: authorName,
      author_email: authorEmail,
      content,
      is_admin_reply: false,
      status: "pending",
    });

    revalidatePath(`/blog/${postSlug}`);
    revalidatePath("/admin/comments");
    revalidatePath("/admin");
    return {
      success: true,
      message:
        "Thank you! Your comment has been submitted and is awaiting editorial moderation.",
    };
  } catch (err) {
    console.error("Error submitting comment:", err);
    return {
      success: false,
      error: "Unable to submit comment. Please try again later.",
    };
  }
}

// ==============================================================================
// 4. Contact Inbox Actions
// ==============================================================================

export async function submitContactMessageAction(formData) {
  const name = formData.get("name")?.toString()?.trim();
  const email = formData.get("email")?.toString()?.trim();
  const subject = formData.get("subject")?.toString()?.trim();
  const category =
    formData.get("category")?.toString()?.trim() || "General Inquiry";
  const message = formData.get("message")?.toString()?.trim();

  // Honeypot check
  const honeypot = formData.get("company_hp")?.toString();
  if (honeypot) {
    return { success: true };
  }

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    await addContactMessage({ name, email, subject, category, message });
    revalidatePath("/admin/inbox");
    revalidatePath("/admin");
    return {
      success: true,
      message:
        "Thank you! Your message has been received. Our team will get back to you shortly.",
    };
  } catch (err) {
    console.error("Error submitting contact message:", err);
    return {
      success: false,
      error: "Could not send message. Please try again.",
    };
  }
}

export async function toggleMessageReadAction(id, currentIsRead) {
  await requireAdmin();
  await setContactMessageRead(id, !currentIsRead);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function updateMessageStatusAction(id, newStatus) {
  await requireAdmin();
  await setContactMessageStatus(id, newStatus);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function dispatchAdminReplyAction(formData) {
  await requireAdmin();
  const messageId = formData.get("message_id")?.toString();
  const replyBody = formData.get("reply_body")?.toString()?.trim();
  const adminEmail = formData.get("admin_email")?.toString();

  if (!messageId || !replyBody) {
    throw new Error("Message ID and reply content are required.");
  }

  await dispatchAdminReplyToMessage(messageId, replyBody, adminEmail);

  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function deleteContactMessageAction(id) {
  await requireAdmin();
  await deleteContactMessage(id);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}
