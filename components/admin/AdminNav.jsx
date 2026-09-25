import Link from "next/link";
import { logoutAdmin } from "@/app/admin/actions";
import { getAdminDashboardStats } from "@/lib/supabase/admin";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Inbox,
  ExternalLink,
  LogOut,
  Plus,
  Shield,
} from "lucide-react";

export async function AdminNav({ activeTab = "overview" }) {
  const stats = await getAdminDashboardStats();
  const pendingComments = stats.comments?.pending || 0;
  const unreadMessages = stats.messages?.unread || 0;

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      id: "blog",
      label: "Blog Posts",
      href: "/admin/blog",
      icon: FileText,
      badge: stats.posts?.total,
      badgeColor: "bg-slate-100 text-slate-700",
    },
    {
      id: "comments",
      label: "Comments Queue",
      href: "/admin/comments",
      icon: MessageSquare,
      badge: pendingComments > 0 ? `${pendingComments} pending` : null,
      badgeColor: "bg-amber-100 text-amber-800 font-bold",
    },
    {
      id: "inbox",
      label: "Inbox Messages",
      href: "/admin/inbox",
      icon: Inbox,
      badge: unreadMessages > 0 ? `${unreadMessages} new` : null,
      badgeColor: "bg-blue-100 text-blue-800 font-bold",
    },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-slate-900 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white group-hover:bg-slate-800 transition">
                <Shield className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight flex items-center gap-1.5">
                  CVPair <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-bold text-indigo-700">Admin</span>
                </span>
                <span className="hidden sm:block text-[11px] text-slate-500 font-medium">
                  Administrative Control Center
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1 rounded-full px-2 py-0.5 text-[11px] leading-tight ${
                        isActive ? "bg-white/20 text-white" : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog/new"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Post</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              title="View Public Website"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">Live Site</span>
            </Link>

            <form action={logoutAdmin}>
              <button
                type="submit"
                title="Log Out of Admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 p-2 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-100 gap-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? "bg-white/20 text-white" : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
