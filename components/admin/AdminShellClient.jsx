"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { logoutAdmin } from "@/app/admin/actions";
import {
  Shield,
  LayoutDashboard,
  FileText,
  MessageSquare,
  Inbox,
  Plus,
  ExternalLink,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

const TAB_TITLES = {
  overview: "Dashboard Overview",
  blog: "Blog Management",
  comments: "Comment Moderation",
  inbox: "Inbound Inquiries",
};

export function AdminShellClient({
  activeTab = "overview",
  stats = {},
  adminEmail = "admin@cvpair.com",
  children,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifRef = useRef(null);

  const pendingComments = stats.comments?.pending || 0;
  const unreadMessages = stats.messages?.unread || 0;
  const totalAlerts = pendingComments + unreadMessages;

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <div className="min-h-screen bg-slate-50 flex">
      {/* =========================================================================
          1. DESKTOP SIDEBAR (Sticky, Left Side)
         ========================================================================= */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 bg-white sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-xs group-hover:bg-slate-800 transition">
              <Shield className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-slate-900">
                  CVPair
                </span>
                <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-indigo-700">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Control Center</p>
            </div>
          </Link>
        </div>

        {/* Quick Action Button */}
        <div className="px-4 pt-5 pb-2">
          <Link
            href="/admin/blog/new"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
          >
            <Plus className="h-4 w-4" />
            <span>Create Blog Post</span>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          <div className="px-2 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
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

        {/* Bottom Sidebar Area */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
              <span>View Live Website</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>

          {/* Admin User Card */}
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-2.5 border border-slate-100">
            <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center text-xs font-black shrink-0">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{adminEmail}</p>
              <p className="text-[10px] font-semibold text-emerald-600">● Authenticated</p>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MAIN CONTENT AREA (Includes Top Navbar + Children)
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                {TAB_TITLES[activeTab] || "Admin Portal"}
              </h2>
            </div>
          </div>

          {/* Right: Notification Bell & Logout Button */}
          <div className="flex items-center gap-3">
            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen((o) => !o)}
                className={`relative p-2 rounded-full border transition ${
                  notificationsOpen
                    ? "border-slate-300 bg-slate-100 text-slate-900"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="h-4 w-4" />
                {totalAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white shadow-xs">
                    {totalAlerts}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-indigo-600" />
                      <h3 className="text-sm font-black text-slate-900">Notifications</h3>
                    </div>
                    {totalAlerts > 0 ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        {totalAlerts} actionable
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">All clear</span>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 py-2">
                    {/* Pending Comments Alert */}
                    {pendingComments > 0 && (
                      <Link
                        href="/admin/comments?tab=pending"
                        onClick={() => setNotificationsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/50 transition group"
                      >
                        <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
                            {pendingComments} Pending Comment{pendingComments > 1 ? "s" : ""}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Awaiting moderation before public display.
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
                      </Link>
                    )}

                    {/* Unread Inquiries Alert */}
                    {unreadMessages > 0 && (
                      <Link
                        href="/admin/inbox?tab=unread"
                        onClick={() => setNotificationsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/50 transition group"
                      >
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                          <Inbox className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                            {unreadMessages} Unread Inquir{unreadMessages > 1 ? "ies" : "y"}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            New contact form submissions in inbox.
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
                      </Link>
                    )}

                    {totalAlerts === 0 && (
                      <div className="py-6 text-center">
                        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
                        <p className="mt-2 text-xs font-bold text-slate-900">
                          All caught up!
                        </p>
                        <p className="text-[11px] text-slate-500">
                          No pending comments or unread contact messages.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <form action={logoutAdmin}>
              <button
                type="submit"
                title="Log Out of Admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition shadow-2xs"
              >
                <LogOut className="h-3.5 w-3.5 text-slate-500 group-hover:text-red-600" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* =========================================================================
          3. MOBILE SLIDE-OUT DRAWER (Single button toggle on mobile)
         ========================================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-white">
                  <Shield className="h-4 w-4 text-indigo-400" />
                </div>
                <span className="text-base font-black text-slate-900">
                  CVPair Admin
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Action */}
            <div className="p-4 border-b border-slate-100">
              <Link
                href="/admin/blog/new"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Create Blog Post</span>
              </Link>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="px-2 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Menu
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
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

            {/* Drawer Bottom */}
            <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                  <span>View Live Site</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/80 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 transition"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out of Admin</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
