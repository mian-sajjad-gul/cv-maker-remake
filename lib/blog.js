import "server-only";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export function slugify(value = "") {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function estimateReadingTime(blocks = []) {
  const text = blocks
    .map((block) => {
      if (block.type === "list") return (block.items || []).join(" ");
      if (block.type === "faq")
        return `${block.question || ""} ${block.answer || ""}`;
      return block.text || block.heading || "";
    })
    .join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export async function getPublishedPosts() {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getAllPostsForAdmin() {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function getPostForAdmin(id) {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
export async function getRelatedPosts(currentSlug, limit = 3) {
  try {
    const supabase = createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .neq("slug", currentSlug)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch {
    return [];
  }
}
