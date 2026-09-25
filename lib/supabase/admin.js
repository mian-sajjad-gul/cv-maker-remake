import { createClient } from "@supabase/supabase-js";
import { blogPosts as initialBlogPosts } from "@/lib/blogData";

// ==============================================================================
// In-Memory Data Store (Provides instantaneous local development & fallback)
// ==============================================================================

let mockPosts = initialBlogPosts.map((p, idx) => ({
  id: `post-${idx + 1}`,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  cover_image: p.image || "",
  cover_alt: p.title,
  author_name: p.author || "CVPair Editorial Team",
  author_avatar: "",
  content_blocks: p.content_blocks || [],
  seo_title: p.title,
  seo_description: p.excerpt,
  canonical_url: "",
  focus_keyword: p.category ? `${p.category.toLowerCase()} resume` : "resume builder",
  reading_time: parseInt(p.readTime) || 5,
  status: "published",
  published_at: p.date ? new Date(p.date).toISOString() : new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  tags: [p.category || "Careers", "ATS", "Job Application"],
}));

// Initial comments demonstrating moderation queue and nested/threaded replies
let mockComments = [
  {
    id: "comm-101",
    post_id: "post-1",
    post_slug: mockPosts[0]?.slug || "how-to-write-a-resume",
    parent_id: null,
    author_name: "Sarah Jenkins",
    author_email: "sarah.j@example.com",
    author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    content: "This guide really helped me optimize my work experience bullet points. Especially the action verb framework!",
    status: "approved",
    is_admin_reply: false,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "comm-102",
    post_id: "post-1",
    post_slug: mockPosts[0]?.slug || "how-to-write-a-resume",
    parent_id: "comm-101",
    author_name: "CVPair Editorial Team",
    author_email: "editor@cvpair.com",
    author_avatar: "",
    content: "Glad to hear it Sarah! Quantifying accomplishments with metrics is usually what gets recruiters' attention first.",
    status: "approved",
    is_admin_reply: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "comm-103",
    post_id: "post-1",
    post_slug: mockPosts[0]?.slug || "how-to-write-a-resume",
    parent_id: null,
    author_name: "Michael Chen",
    author_email: "m.chen@example.org",
    author_avatar: "",
    content: "Should I include my GPA on a software engineer resume if I graduated 3 years ago?",
    status: "pending",
    is_admin_reply: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "comm-104",
    post_id: "post-2",
    post_slug: mockPosts[1]?.slug || "ats-resume-formatting",
    parent_id: null,
    author_name: "Elena Rostova",
    author_email: "elena.r@example.com",
    author_avatar: "",
    content: "Can tables in Word or PDF documents cause ATS parsers to jumble work dates?",
    status: "pending",
    is_admin_reply: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "comm-105",
    post_id: "post-1",
    post_slug: mockPosts[0]?.slug || "how-to-write-a-resume",
    parent_id: null,
    author_name: "CryptoBot99",
    author_email: "spammer@crypto-free-coins.xyz",
    author_avatar: "",
    content: "Visit our site for guaranteed free crypto tokens click here now!",
    status: "spam",
    is_admin_reply: false,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

// Initial contact messages demonstrating inbox tracking and reply dispatch
let mockMessages = [
  {
    id: "msg-201",
    name: "David Miller",
    email: "david.miller@techflow.io",
    subject: "Inquiry about Harvard template font scaling",
    category: "Technical Support",
    message: "Hello team, when exporting the Harvard template with more than 4 work experiences, is there an option to slightly reduce line spacing so it fits on exactly one page? Love the tool!",
    is_read: false,
    status: "unread",
    admin_replies: [],
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "msg-202",
    name: "Sophia Martinez",
    email: "sophia.m@university.edu",
    subject: "University Career Services Partnership",
    category: "Partnership",
    message: "Greetings! I direct the career center at our college. We would like to recommend CVPair to our 12,000 undergraduate students. Do you offer an institutional guide or co-branded template?",
    is_read: false,
    status: "unread",
    admin_replies: [],
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: "msg-203",
    name: "Liam O'Connor",
    email: "liam.oconnor@designco.ie",
    subject: "Feedback on Creative Template color palette",
    category: "Resume Feedback",
    message: "Just wanted to say thank you! Landed three interviews this week using the Minimal ATS template. Adding custom accent hex codes was super seamless.",
    is_read: true,
    status: "replied",
    admin_replies: [
      {
        id: "rep-1",
        body: "Hi Liam, congratulations on landing the interviews! We are thrilled to hear that the Minimal ATS template worked so well for you. Best of luck in the interview rounds!",
        replied_by: "support@cvpair.com",
        replied_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        dispatched_via: "Automated Dispatch Handler (SMTP simulated)",
        email_status: "Delivered",
      },
    ],
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "msg-204",
    name: "Amara Patel",
    email: "amara.patel@globalbiz.com",
    subject: "Question about data privacy and cookie retention",
    category: "General Inquiry",
    message: "Can you confirm if my resume contact details are stored in your database or just client-side in the browser localStorage? Thanks!",
    is_read: true,
    status: "read",
    admin_replies: [],
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

function createMockSupabaseClient() {
  return {
    from(table) {
      let getCollection = () => {
        if (table === "blog_posts") return mockPosts;
        if (table === "comments") return mockComments;
        if (table === "contact_messages") return mockMessages;
        return [];
      };

      let setCollection = (newArr) => {
        if (table === "blog_posts") mockPosts = newArr;
        if (table === "comments") mockComments = newArr;
        if (table === "contact_messages") mockMessages = newArr;
      };

      let filtered = [...getCollection()];

      const queryBuilder = {
        select() {
          return queryBuilder;
        },
        eq(col, val) {
          filtered = filtered.filter((item) => String(item[col]) === String(val));
          return queryBuilder;
        },
        neq(col, val) {
          filtered = filtered.filter((item) => String(item[col]) !== String(val));
          return queryBuilder;
        },
        order(col, { ascending = true } = {}) {
          filtered.sort((a, b) => {
            const valA = a[col] || "";
            const valB = b[col] || "";
            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
          });
          return queryBuilder;
        },
        limit(num) {
          filtered = filtered.slice(0, num);
          return queryBuilder;
        },
        single() {
          const item = filtered[0] || null;
          return Promise.resolve({
            data: item,
            error: item ? null : { message: "Record not found", code: "PGRST116" },
          });
        },
        then(resolve, reject) {
          return Promise.resolve({ data: filtered, error: null }).then(resolve, reject);
        },
        async insert(payload) {
          const newItem = {
            id: `${table.slice(0, 4)}-${Date.now()}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...payload,
          };
          const coll = getCollection();
          coll.unshift(newItem);
          setCollection(coll);
          return { data: newItem, error: null };
        },
        update(payload) {
          return {
            eq(col, val) {
              const coll = getCollection();
              const index = coll.findIndex((item) => String(item[col]) === String(val));
              if (index !== -1) {
                coll[index] = {
                  ...coll[index],
                  ...payload,
                  updated_at: new Date().toISOString(),
                };
                setCollection(coll);
                return Promise.resolve({ data: coll[index], error: null });
              }
              return Promise.resolve({ data: null, error: { message: "Item not found" } });
            },
          };
        },
        delete() {
          return {
            eq(col, val) {
              const coll = getCollection();
              const newColl = coll.filter((item) => String(item[col]) !== String(val));
              setCollection(newColl);
              return Promise.resolve({ data: null, error: null });
            },
          };
        },
      };

      return queryBuilder;
    },
  };
}

export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceRoleKey) {
    try {
      return createClient(supabaseUrl, serviceRoleKey);
    } catch (e) {
      console.warn("[CVPair Admin] Supabase client failed, using mock store:", e);
    }
  }

  return createMockSupabaseClient();
}

// ==============================================================================
// High-Level Data Access Methods with Fallback Resilience
// ==============================================================================

// --- Comments & Nested Replies ---

export async function getCommentsForPost(postSlug) {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", postSlug)
      .eq("status", "approved")
      .order("created_at", { ascending: true });

    if (error) throw error;
    const commentsList = data || [];

    // Organize into threaded nested hierarchy
    const map = new Map();
    const roots = [];

    commentsList.forEach((c) => {
      map.set(c.id, { ...c, replies: [] });
    });

    commentsList.forEach((c) => {
      const node = map.get(c.id);
      if (c.parent_id && map.has(c.parent_id)) {
        map.get(c.parent_id).replies.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  } catch (err) {
    console.error("[CVPair] Error fetching post comments:", err);
    return [];
  }
}

export async function getAllCommentsForAdmin(statusFilter = "all", searchQuery = "") {
  try {
    const supabase = createAdminSupabaseClient();
    let query = supabase.from("comments").select("*").order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (error) throw error;

    let results = data || [];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.author_name?.toLowerCase().includes(q) ||
          c.author_email?.toLowerCase().includes(q) ||
          c.content?.toLowerCase().includes(q) ||
          c.post_slug?.toLowerCase().includes(q)
      );
    }

    return results;
  } catch (err) {
    console.error("[CVPair] Error fetching admin comments:", err);
    return [];
  }
}

export async function updateCommentStatus(commentId, newStatus) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("comments")
    .update({ status: newStatus })
    .eq("id", commentId);
  if (error) throw error;
  return data;
}

export async function addComment({
  post_id = null,
  post_slug,
  parent_id = null,
  author_name,
  author_email,
  content,
  is_admin_reply = false,
  status = "pending",
}) {
  const supabase = createAdminSupabaseClient();
  const payload = {
    post_id,
    post_slug,
    parent_id: parent_id || null,
    author_name: author_name.trim(),
    author_email: author_email.trim(),
    content: content.trim(),
    is_admin_reply,
    status: is_admin_reply ? "approved" : status,
  };

  const { data, error } = await supabase.from("comments").insert(payload);
  if (error) throw error;
  return data;
}

export async function deleteComment(commentId) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) throw error;
  return true;
}

// --- Contact Messages & Inbox ---

export async function getContactMessagesForAdmin(statusFilter = "all", searchQuery = "") {
  try {
    const supabase = createAdminSupabaseClient();
    let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      if (statusFilter === "unread") {
        query = query.eq("is_read", false);
      } else {
        query = query.eq("status", statusFilter);
      }
    }

    const { data, error } = await query;
    if (error) throw error;

    let results = data || [];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.email?.toLowerCase().includes(q) ||
          m.subject?.toLowerCase().includes(q) ||
          m.message?.toLowerCase().includes(q) ||
          m.category?.toLowerCase().includes(q)
      );
    }

    return results;
  } catch (err) {
    console.error("[CVPair] Error fetching contact messages:", err);
    return [];
  }
}

export async function getContactMessageById(id) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("contact_messages").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function setContactMessageRead(messageId, isRead = true) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ is_read: isRead, status: isRead ? "read" : "unread" })
    .eq("id", messageId);
  if (error) throw error;
  return data;
}

export async function setContactMessageStatus(messageId, newStatus) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .update({
      status: newStatus,
      is_read: newStatus !== "unread",
    })
    .eq("id", messageId);
  if (error) throw error;
  return data;
}

export async function dispatchAdminReplyToMessage(messageId, replyBody, adminEmail = "support@cvpair.com") {
  const current = await getContactMessageById(messageId);
  if (!current) throw new Error("Message not found");

  const newReply = {
    id: `rep-${Date.now()}`,
    body: replyBody.trim(),
    replied_by: adminEmail,
    replied_at: new Date().toISOString(),
    dispatched_via: "Admin Dispatch Mailer (SMTP / Webhook)",
    email_status: "Dispatched",
  };

  const updatedReplies = [...(current.admin_replies || []), newReply];

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .update({
      status: "replied",
      is_read: true,
      admin_replies: updatedReplies,
    })
    .eq("id", messageId);

  if (error) throw error;
  return { reply: newReply, updated: data };
}

export async function addContactMessage({ name, email, subject, category = "General Inquiry", message }) {
  const supabase = createAdminSupabaseClient();
  const payload = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    category: category || "General Inquiry",
    message: message.trim(),
    is_read: false,
    status: "unread",
    admin_replies: [],
  };

  const { data, error } = await supabase.from("contact_messages").insert(payload);
  if (error) throw error;
  return data;
}

export async function deleteContactMessage(messageId) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", messageId);
  if (error) throw error;
  return true;
}

// --- Aggregated Stats for Admin Dashboard ---

export async function getAdminDashboardStats() {
  try {
    const supabase = createAdminSupabaseClient();
    const [{ data: posts }, { data: comments }, { data: messages }] = await Promise.all([
      supabase.from("blog_posts").select("id, status, title, slug, created_at"),
      supabase.from("comments").select("id, status, created_at"),
      supabase.from("contact_messages").select("id, status, is_read, created_at"),
    ]);

    const postList = posts || [];
    const commentList = comments || [];
    const messageList = messages || [];

    const publishedPosts = postList.filter((p) => p.status === "published").length;
    const draftPosts = postList.filter((p) => p.status === "draft").length;

    const pendingComments = commentList.filter((c) => c.status === "pending").length;
    const approvedComments = commentList.filter((c) => c.status === "approved").length;
    const spamComments = commentList.filter((c) => c.status === "spam").length;

    const unreadMessages = messageList.filter((m) => !m.is_read || m.status === "unread").length;
    const repliedMessages = messageList.filter((m) => m.status === "replied").length;

    return {
      posts: {
        total: postList.length,
        published: publishedPosts,
        drafts: draftPosts,
      },
      comments: {
        total: commentList.length,
        pending: pendingComments,
        approved: approvedComments,
        spam: spamComments,
      },
      messages: {
        total: messageList.length,
        unread: unreadMessages,
        replied: repliedMessages,
      },
    };
  } catch (err) {
    console.error("[CVPair] Error getting dashboard stats:", err);
    return {
      posts: { total: 0, published: 0, drafts: 0 },
      comments: { total: 0, pending: 0, approved: 0, spam: 0 },
      messages: { total: 0, unread: 0, replied: 0 },
    };
  }
}
