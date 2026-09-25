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
import { clearAdminSession, setAdminSession, DEFAULT_ADMIN_EMAIL } from "@/lib/adminAuth";
import { estimateReadingTime, slugify } from "@/lib/blog";

// ==============================================================================
// 1. Authentication Actions
// ==============================================================================

export async function loginAdmin(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  const validEmail = process.env.ADMIN_EMAIL || "admin@cvpair.com";
  const validPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email !== validEmail || password !== validPassword) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession(email);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

// ==============================================================================
// 2. Blog Posts CRUD
// ==============================================================================

function parseTags(value = "") {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseBlocks(value = "[]") {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function postPayload(formData) {
  const title = formData.get("title")?.toString().trim() || "";
  const slug = slugify(formData.get("slug")?.toString() || title);
  const contentBlocks = parseBlocks(formData.get("content_blocks")?.toString());
  const status =
    formData.get("status")?.toString() === "published" ? "published" : "draft";

  return {
    title,
    slug,
    excerpt: formData.get("excerpt")?.toString() || "",
    content_blocks: contentBlocks,
    cover_image: formData.get("cover_image")?.toString() || "",
    cover_alt: formData.get("cover_alt")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    tags: parseTags(formData.get("tags")?.toString() || ""),
    author_name:
      formData.get("author_name")?.toString() || "CVPair Editorial Team",
    author_avatar: formData.get("author_avatar")?.toString() || "",
    seo_title: formData.get("seo_title")?.toString() || title,
    seo_description:
      formData.get("seo_description")?.toString() ||
      formData.get("excerpt")?.toString() ||
      "",
    canonical_url: formData.get("canonical_url")?.toString() || "",
    focus_keyword: formData.get("focus_keyword")?.toString() || "",
    reading_time: estimateReadingTime(contentBlocks),
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  };
}

export async function createBlogPost(formData) {
  const supabase = createAdminSupabaseClient();
  const payload = postPayload(formData);

  const { error } = await supabase.from("blog_posts").insert(payload);
  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
  redirect("/admin/blog");
}

export async function updateBlogPost(id, formData) {
  const supabase = createAdminSupabaseClient();
  const payload = postPayload(formData);

  const { error } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath(`/blog/${payload.slug}`);
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
  redirect("/admin/blog");
}

export async function toggleBlogPostStatus(id, currentStatus) {
  const supabase = createAdminSupabaseClient();
  const nextStatus = currentStatus === "published" ? "draft" : "published";
  const { error } = await supabase
    .from("blog_posts")
    .update({
      status: nextStatus,
      published_at: nextStatus === "published" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
}

export async function deleteBlogPost(id) {
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
  await updateCommentStatus(id, status);
  revalidatePath("/admin/comments");
  revalidatePath("/admin");
  if (postSlug) {
    revalidatePath(`/blog/${postSlug}`);
  }
}

export async function deleteCommentAction(id, postSlug = "") {
  await deleteComment(id);
  revalidatePath("/admin/comments");
  revalidatePath("/admin");
  if (postSlug) {
    revalidatePath(`/blog/${postSlug}`);
  }
}

export async function adminReplyToCommentAction(formData) {
  const parentId = formData.get("parent_id")?.toString();
  const postSlug = formData.get("post_slug")?.toString();
  const postId = formData.get("post_id")?.toString() || null;
  const replyContent = formData.get("content")?.toString()?.trim();
  const authorName = formData.get("author_name")?.toString() || "CVPair Editorial Team";

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
    return { success: true, message: "Thank you! Your comment has been submitted." };
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
      message: "Thank you! Your comment has been submitted and is awaiting editorial moderation.",
    };
  } catch (err) {
    console.error("Error submitting comment:", err);
    return { success: false, error: "Unable to submit comment. Please try again later." };
  }
}

// ==============================================================================
// 4. Contact Inbox Actions
// ==============================================================================

export async function submitContactMessageAction(formData) {
  const name = formData.get("name")?.toString()?.trim();
  const email = formData.get("email")?.toString()?.trim();
  const subject = formData.get("subject")?.toString()?.trim();
  const category = formData.get("category")?.toString()?.trim() || "General Inquiry";
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
      message: "Thank you! Your message has been received. Our team will get back to you shortly.",
    };
  } catch (err) {
    console.error("Error submitting contact message:", err);
    return { success: false, error: "Could not send message. Please try again." };
  }
}

export async function toggleMessageReadAction(id, currentIsRead) {
  await setContactMessageRead(id, !currentIsRead);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function updateMessageStatusAction(id, newStatus) {
  await setContactMessageStatus(id, newStatus);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function dispatchAdminReplyAction(formData) {
  const messageId = formData.get("message_id")?.toString();
  const replyBody = formData.get("reply_body")?.toString()?.trim();
  const adminEmail = formData.get("admin_email")?.toString() || DEFAULT_ADMIN_EMAIL;

  if (!messageId || !replyBody) {
    throw new Error("Message ID and reply content are required.");
  }

  await dispatchAdminReplyToMessage(messageId, replyBody, adminEmail);

  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function deleteContactMessageAction(id) {
  await deleteContactMessage(id);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}
