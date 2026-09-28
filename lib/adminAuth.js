import "server-only";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "./supabase/server";

/**
 * Validates the current admin user session via Supabase's secure auth.getUser()
 * using @supabase/ssr session cookie helpers.
 * Returns the authenticated admin user object if valid, or null if unauthenticated/unauthorized.
 */
export async function getAdminSession() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@cvpair.com";
    const isAuthorizedAdmin =
      user.email?.toLowerCase() === adminEmail.toLowerCase() ||
      user.app_metadata?.role === "admin" ||
      user.user_metadata?.role === "admin";

    if (!isAuthorizedAdmin) {
      return null;
    }

    return user;
  } catch (err) {
    // Rethrow internal Next.js control signals (dynamic rendering, redirects)
    if (err?.digest === "DYNAMIC_SERVER_USAGE" || err?.digest?.startsWith?.("NEXT_")) {
      throw err;
    }
    console.error("[Admin Auth] Error retrieving Supabase admin session:", err?.message || err);
    return null;
  }
}

/**
 * Enforces admin authorization on Server Components and Server Actions.
 * Redirects unauthenticated or unauthorized users to /admin/login.
 */
export async function requireAdmin() {
  const user = await getAdminSession();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

/**
 * Signs out the current admin session through Supabase SSR,
 * automatically clearing the Supabase auth cookies via @supabase/ssr.
 */
export async function clearAdminSession() {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  } catch (err) {
    // Rethrow internal Next.js control signals
    if (err?.digest?.startsWith?.("NEXT_")) {
      throw err;
    }
    console.warn("[Admin Auth] Error signing out via Supabase SSR:", err?.message || err);
  }
}

/**
 * Legacy compatibility helper.
 * In @supabase/ssr, session cookies are populated automatically by supabase.auth.signInWithPassword().
 */
export async function setAdminSession() {
  return true;
}
