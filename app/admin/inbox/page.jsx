import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { getContactMessagesForAdmin } from "@/lib/supabase/admin";
import { AdminNav } from "@/components/admin/AdminNav";
import {
  toggleMessageReadAction,
  updateMessageStatusAction,
  dispatchAdminReplyAction,
  deleteContactMessageAction,
} from "@/app/admin/actions";
import {
  Inbox,
  Mail,
  MailOpen,
  Send,
  Trash2,
  Archive,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  Tag,
  Calendar,
} from "lucide-react";

export const metadata = {
  title: "Inbox & Inquiries | CVPair Admin",
  description: "Centralized message viewer, read/unread tracking, and email reply dispatch.",
};

export default async function AdminInboxPage({ searchParams }) {
  await requireAdmin();

  const params = await searchParams;
  const currentTab = params?.tab || "all";
  const searchQuery = params?.search || "";
  const selectedId = params?.id;

  const allMessages = await getContactMessagesForAdmin("all");

  const unreadCount = allMessages.filter((m) => !m.is_read || m.status === "unread").length;
  const repliedCount = allMessages.filter((m) => m.status === "replied").length;
  const archivedCount = allMessages.filter((m) => m.status === "archived").length;

  let filtered = allMessages;
  if (currentTab === "unread") {
    filtered = filtered.filter((m) => !m.is_read || m.status === "unread");
  } else if (currentTab === "read") {
    filtered = filtered.filter((m) => m.is_read && m.status !== "archived");
  } else if (currentTab === "replied") {
    filtered = filtered.filter((m) => m.status === "replied");
  } else if (currentTab === "archived") {
    filtered = filtered.filter((m) => m.status === "archived");
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q) ||
        m.category?.toLowerCase().includes(q)
    );
  }

  // Active message to view details
  const activeMessage =
    filtered.find((m) => m.id === selectedId) ||
    allMessages.find((m) => m.id === selectedId) ||
    filtered[0] ||
    null;

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav activeTab="inbox" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Contact Messages & Inbound Inbox
              </h1>
              {unreadCount > 0 && (
                <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold text-blue-800 animate-pulse">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Manage user inquiries, technical support questions, feedback, and dispatch direct administrative email replies.
            </p>
          </div>
        </div>

        {/* Tab Filters & Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Messages", count: allMessages.length },
              {
                id: "unread",
                label: "Unread",
                count: unreadCount,
                highlight: unreadCount > 0,
              },
              { id: "replied", label: "Replied", count: repliedCount },
              { id: "archived", label: "Archived", count: archivedCount },
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/admin/inbox?tab=${tab.id}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.2 text-[11px] ${
                      isActive
                        ? "bg-white/20 text-white"
                        : tab.highlight
                        ? "bg-blue-100 text-blue-800 font-black"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Search Form */}
          <form method="GET" action="/admin/inbox" className="relative max-w-sm w-full">
            <input type="hidden" name="tab" value={currentTab} />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search sender, email, subject, text..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm shadow-xs focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
            />
          </form>
        </div>

        {/* Master-Detail Split Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Messages List Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Inbound Inquiries ({filtered.length})
              </span>
              <span className="text-[11px] text-slate-400">Sorted by newest</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[720px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-8 text-center">
                  <Inbox className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-2 text-sm font-bold text-slate-800">No messages found</p>
                  <p className="text-xs text-slate-500">
                    {searchQuery
                      ? `No inquiries match "${searchQuery}".`
                      : "No messages in this filter."}
                  </p>
                </div>
              ) : (
                filtered.map((msg) => {
                  const isSelected = activeMessage?.id === msg.id;
                  const isUnread = !msg.is_read || msg.status === "unread";

                  return (
                    <Link
                      key={msg.id}
                      href={`/admin/inbox?tab=${currentTab}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}&id=${msg.id}`}
                      className={`block p-4 transition ${
                        isSelected
                          ? "bg-indigo-50/60 border-l-4 border-indigo-600"
                          : isUnread
                          ? "bg-blue-50/20 hover:bg-blue-50/40"
                          : "hover:bg-slate-50/70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {isUnread ? (
                            <span
                              className="h-2 w-2 rounded-full bg-blue-600 shrink-0"
                              title="Unread"
                            ></span>
                          ) : (
                            <span
                              className="h-2 w-2 rounded-full bg-transparent shrink-0"
                            ></span>
                          )}
                          <span
                            className={`truncate text-sm ${
                              isUnread ? "font-black text-slate-900" : "font-semibold text-slate-700"
                            }`}
                          >
                            {msg.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {new Date(msg.created_at).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <p
                        className={`mt-1 text-xs truncate ${
                          isUnread ? "font-bold text-slate-900" : "text-slate-800"
                        }`}
                      >
                        {msg.subject}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                        {msg.message}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          {msg.category}
                        </span>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            msg.status === "replied"
                              ? "text-emerald-600"
                              : isUnread
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}
                        >
                          {msg.status === "replied"
                            ? "✓ Replied"
                            : isUnread
                            ? "• Unread"
                            : msg.status === "archived"
                            ? "Archived"
                            : "Seen"}
                        </span>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Message Detail & Reply Dispatcher Column (7 cols) */}
          <div className="lg:col-span-7">
            {activeMessage ? (
              <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                {/* Message Header & Action Toolbar */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                          {activeMessage.category}
                        </span>
                        {activeMessage.status === "replied" && (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                            Replied
                          </span>
                        )}
                        {activeMessage.status === "archived" && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                            Archived
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2 text-xl font-black text-slate-900">
                        {activeMessage.subject}
                      </h2>
                    </div>

                    {/* Quick message toolbar actions */}
                    <div className="flex items-center gap-2">
                      <form
                        action={toggleMessageReadAction.bind(
                          null,
                          activeMessage.id,
                          activeMessage.is_read
                        )}
                      >
                        <button
                          type="submit"
                          title={activeMessage.is_read ? "Mark as Unread" : "Mark as Read"}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                          {activeMessage.is_read ? (
                            <>
                              <Mail className="h-3.5 w-3.5 text-slate-500" />
                              <span>Mark Unread</span>
                            </>
                          ) : (
                            <>
                              <MailOpen className="h-3.5 w-3.5 text-blue-600" />
                              <span>Mark Read</span>
                            </>
                          )}
                        </button>
                      </form>

                      {activeMessage.status !== "archived" ? (
                        <form
                          action={updateMessageStatusAction.bind(
                            null,
                            activeMessage.id,
                            "archived"
                          )}
                        >
                          <button
                            type="submit"
                            title="Archive message"
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                          >
                            <Archive className="h-3.5 w-3.5 text-slate-400" />
                            <span className="hidden sm:inline">Archive</span>
                          </button>
                        </form>
                      ) : (
                        <form
                          action={updateMessageStatusAction.bind(
                            null,
                            activeMessage.id,
                            "read"
                          )}
                        >
                          <button
                            type="submit"
                            title="Unarchive message"
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                          >
                            <span>Unarchive</span>
                          </button>
                        </form>
                      )}

                      <form
                        action={deleteContactMessageAction.bind(null, activeMessage.id)}
                      >
                        <button
                          type="submit"
                          title="Delete message"
                          className="inline-flex items-center rounded-xl p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Sender Metadata Box */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold text-sm">
                        {activeMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {activeMessage.name}
                        </div>
                        <a
                          href={`mailto:${activeMessage.email}`}
                          className="text-indigo-600 hover:underline font-medium"
                        >
                          {activeMessage.email}
                        </a>
                      </div>
                    </div>

                    <div className="text-right text-slate-500">
                      <div>
                        {new Date(activeMessage.created_at).toLocaleDateString([], {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div>{new Date(activeMessage.created_at).toLocaleTimeString()}</div>
                    </div>
                  </div>
                </div>

                {/* Message Content Body */}
                <div className="p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Inquiry Details
                  </h3>
                  <div className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    {activeMessage.message}
                  </div>

                  {/* Administrative Reply Dispatch History */}
                  {activeMessage.admin_replies && activeMessage.admin_replies.length > 0 && (
                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Previous Administrative Responses ({activeMessage.admin_replies.length})</span>
                      </h4>
                      <div className="space-y-3">
                        {activeMessage.admin_replies.map((reply, idx) => (
                          <div
                            key={reply.id || idx}
                            className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-xs sm:text-sm text-slate-800"
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
                              <span>Sent by {reply.replied_by}</span>
                              <span className="text-emerald-700 font-normal">
                                {new Date(reply.replied_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="whitespace-pre-line text-slate-700">{reply.body}</p>
                            <div className="mt-2 pt-2 border-t border-emerald-100/60 flex items-center justify-between text-[11px] text-emerald-800/80">
                              <span>Channel: {reply.dispatched_via || "Automated SMTP Dispatch"}</span>
                              <span className="font-semibold text-emerald-700">Status: {reply.email_status || "Delivered"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Composer linked to Email Dispatcher */}
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-indigo-600" />
                        <h4 className="text-sm font-bold text-slate-900">
                          Dispatch Administrative Reply
                        </h4>
                      </div>
                      <span className="text-xs text-slate-500">
                        To: <strong className="text-slate-700">{activeMessage.email}</strong>
                      </span>
                    </div>

                    <form action={dispatchAdminReplyAction} className="space-y-3">
                      <input type="hidden" name="message_id" value={activeMessage.id} />

                      {/* Quick Canned Template selector */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-slate-500 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-amber-500" /> Quick Responses:
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            const textarea = e.currentTarget.form.querySelector("textarea[name='reply_body']");
                            if (textarea) {
                              textarea.value = `Hi ${activeMessage.name},\n\nThank you for reaching out to CVPair support! You can adjust template font scales and single-page line compactness directly from the Top Toolbar in the CV editor under the "Page Settings" dropdown.\n\nPlease let us know if you need any further assistance.\n\nBest regards,\nCVPair Support Team`;
                            }
                          }}
                          className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                          Template Guidance
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            const textarea = e.currentTarget.form.querySelector("textarea[name='reply_body']");
                            if (textarea) {
                              textarea.value = `Hello ${activeMessage.name},\n\nThank you for your interest in partnering with CVPair! We are excited to support university career centers and student job seekers. Our team would love to discuss custom templates and resources for your institution.\n\nLet us know when you would be available for a brief call.\n\nWarm regards,\nCVPair Partnerships`;
                            }
                          }}
                          className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                          Partnership Response
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            const textarea = e.currentTarget.form.querySelector("textarea[name='reply_body']");
                            if (textarea) {
                              textarea.value = `Hi ${activeMessage.name},\n\nThank you for getting in touch! We have verified this with our engineering team and your question has been resolved.\n\nThank you for using CVPair!\n\nBest regards,\nCVPair Team`;
                            }
                          }}
                          className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                          General Resolution
                        </button>
                      </div>

                      <textarea
                        name="reply_body"
                        rows={5}
                        required
                        placeholder={`Write your official reply to ${activeMessage.name} (${activeMessage.email})...`}
                        className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-xs sm:text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 shadow-2xs"
                      />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>Dispatch from:</span>
                          <input
                            name="admin_email"
                            defaultValue="support@cvpair.com"
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-800"
                          />
                        </div>

                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition"
                        >
                          <Send className="h-4 w-4" />
                          <span>Dispatch Email & Record Reply</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <Mail className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-3 text-base font-bold text-slate-800">No message selected</h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Select an inquiry from the list on the left to read and dispatch replies.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
