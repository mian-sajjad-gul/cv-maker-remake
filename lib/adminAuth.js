import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "resume_admin_session";
export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@cvpair.com";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionVal = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionVal) return false;

  const validEmail = process.env.ADMIN_EMAIL || "admin@cvpair.com";
  return sessionVal === validEmail || sessionVal === "admin@cvpair.com";
}

export async function requireAdmin() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) {
    redirect("/admin/login");
  }
}

export async function setAdminSession(email) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
