import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { getAllCommentsForAdmin } from "@/lib/supabase/admin";
import { AdminNav } from "@/components/admin/AdminNav";
import {
  setCommentModerationStatus,
  deleteCommentAction,
  adminReplyToCommentAction,
} from "@/app/admin/actions";
import {
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  CornerDownRight,
  Reply,
  ShieldCheck,
  Search,
  ExternalLink,
  User,
  Shield,
} from "lucide-react";

export const metadata = {
  title: "Comment Moderation & Threaded Replies | CVPair Admin",
  description: "Moderate blog comments, handle spam, and manage nested replies.",
};

export default async function AdminCommentsPage({ searchParams }) {
  await requireAdmin();

  const params = await searchParams;
  const currentTab = params?.tab || "all";
  const searchQuery = params?.search || "";

  const allComments = await getAllCommentsForAdmin("all");

  const pendingCount = allComments.filter((c) => c.status === "pending").length;
  const approvedCount = allComments.filter((c) => c.status === "approved").length;
  const spamCount = allComments.filter((c) => c.status === "spam").length;

  let displayedComments = allComments;
  if (currentTab !== "all") {
    displayedComments = displayedComments.filter((c) => c.status === currentTab);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayedComments = displayedComments.filter(
      (c) =>
        c.author_name?.toLowerCase().includes(q) ||
        c.author_email?.toLowerCase().includes(q) ||
        c.content?.toLowerCase().includes(q) ||
        c.post_slug?.toLowerCase().includes(q)
    );
  }

  // Create lookup for parent comments so we can display parent context for nested replies
  const commentsById = new Map();
  allComments.forEach((c) => commentsById.set(c.id, c));

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav activeTab="comments" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Comment Moderation
              </h1>
              {pendingCount > 0 && (
                <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-800 animate-pulse">
                  {pendingCount} Pending
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Audit submitted comments, approve verified thoughts, filter spam, and publish official nested replies.
            </p>
          </div>
        </div>

        {/* Tab Filters & Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Comments", count: allComments.length },
              {
                id: "pending",
                label: "Pending Review",
                count: pendingCount,
                highlight: pendingCount > 0,
              },
              { id: "approved", label: "Approved", count: approvedCount },
              { id: "spam", label: "Spam", count: spamCount },
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/admin/comments?tab=${tab.id}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`}
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
                        ? "bg-amber-100 text-amber-800 font-black"
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
          <form method="GET" action="/admin/comments" className="relative max-w-sm w-full">
            <input type="hidden" name="tab" value={currentTab} />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search comments, author, slug..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm shadow-xs focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
            />
          </form>
        </div>

        {/* Comments Stream */}
        <div className="mt-6 space-y-4">
          {displayedComments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-3 text-base font-bold text-slate-800">No comments found</h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                {searchQuery
                  ? `No comments matched your search for "${searchQuery}".`
                  : `There are currently no comments in the "${currentTab}" filter.`}
              </p>
              {searchQuery && (
                <Link
                  href={`/admin/comments?tab=${currentTab}`}
                  className="mt-4 inline-block text-xs font-bold text-indigo-600 hover:underline"
                >
                  Clear search query
                </Link>
              )}
            </div>
          ) : (
            displayedComments.map((comment) => {
              const parentComment = comment.parent_id
                ? commentsById.get(comment.parent_id)
                : null;

              return (
                <div
                  key={comment.id}
                  className={`rounded-2xl border bg-white p-5 shadow-xs transition ${
                    comment.status === "pending"
                      ? "border-amber-200 ring-1 ring-amber-100"
                      : comment.status === "spam"
                      ? "border-red-200 bg-red-50/10 opacity-75"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    {/* Author & Context Info */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200">
                        {comment.is_admin_reply ? (
                          <Shield className="h-5 w-5 text-indigo-600" />
                        ) : comment.author_avatar ? (
                          <img
                            src={comment.author_avatar}
                            alt={comment.author_name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          comment.author_name.charAt(0).toUpperCase()
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {comment.author_name}
                          </span>

                          {comment.is_admin_reply && (
                            <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-black text-indigo-700">
                              STAFF REPLY
                            </span>
                          )}

                          <span className="text-xs text-slate-400">
                            {comment.author_email}
                          </span>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              comment.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : comment.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {comment.status}
                          </span>
                        </div>

                        {/* Target Post context */}
                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <span>Post:</span>
                          <Link
                            href={`/blog/${comment.post_slug}`}
                            target="_blank"
                            className="font-medium text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            <span>/{comment.post_slug}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                          <span>·</span>
                          <time dateTime={comment.created_at} className="text-slate-400">
                            {new Date(comment.created_at).toLocaleString()}
                          </time>
                        </div>
                      </div>
                    </div>

                    {/* Moderation Status Actions */}
                    <div className="flex flex-wrap items-center gap-2 self-start">
                      {comment.status !== "approved" && (
                        <form
                          action={setCommentModerationStatus.bind(
                            null,
                            comment.id,
                            "approved",
                            comment.post_slug
                          )}
                        >
                          <button
                            type="submit"
                            title="Approve Comment"
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Approve</span>
                          </button>
                        </form>
                      )}

                      {comment.status !== "spam" && (
                        <form
                          action={setCommentModerationStatus.bind(
                            null,
                            comment.id,
                            "spam",
                            comment.post_slug
                          )}
                        >
                          <button
                            type="submit"
                            title="Mark as Spam"
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition"
                          >
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>Spam</span>
                          </button>
                        </form>
                      )}

                      {comment.status !== "pending" && (
                        <form
                          action={setCommentModerationStatus.bind(
                            null,
                            comment.id,
                            "pending",
                            comment.post_slug
                          )}
                        >
                          <button
                            type="submit"
                            title="Send back to pending"
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                          >
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span className="hidden sm:inline">Set Pending</span>
                          </button>
                        </form>
                      )}

                      <form
                        action={deleteCommentAction.bind(
                          null,
                          comment.id,
                          comment.post_slug
                        )}
                      >
                        <button
                          type="submit"
                          title="Permanently Delete Comment"
                          className="inline-flex items-center rounded-xl p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Threaded Parent Reference (if this comment is a nested reply) */}
                  {parentComment && (
                    <div className="mt-3 ml-4 border-l-2 border-indigo-200 bg-indigo-50/40 pl-3 py-1.5 rounded-r-lg text-xs text-slate-600">
                      <span className="font-bold text-indigo-900 flex items-center gap-1">
                        <CornerDownRight className="h-3 w-3 text-indigo-600" />
                        In reply to {parentComment.author_name}:
                      </span>
                      <p className="italic text-slate-600 line-clamp-1 mt-0.5">
                        &ldquo;{parentComment.content}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Comment Body */}
                  <div className="mt-3 text-sm text-slate-800 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                    {comment.content}
                  </div>

                  {/* Inline Admin Reply Form Toggle */}
                  <details className="mt-3 group">
                    <summary className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer select-none">
                      <Reply className="h-3.5 w-3.5" />
                      <span>Post Nested Administrative Reply</span>
                    </summary>
                    <form
                      action={adminReplyToCommentAction}
                      className="mt-3 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 space-y-3"
                    >
                      <input type="hidden" name="parent_id" value={comment.id} />
                      <input type="hidden" name="post_slug" value={comment.post_slug} />
                      <input type="hidden" name="post_id" value={comment.post_id || ""} />

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                          Official Reply as Editorial Staff
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Will be auto-approved and threaded under {comment.author_name}
                        </span>
                      </div>

                      <textarea
                        name="content"
                        rows={2}
                        required
                        placeholder={`Write an official answer or clarification to ${comment.author_name}...`}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300"
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] font-bold text-slate-600">
                            Sender name:
                          </label>
                          <input
                            name="author_name"
                            defaultValue="CVPair Editorial Team"
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium"
                          />
                        </div>

                        <button
                          type="submit"
                          className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
                        >
                          Dispatch Reply
                        </button>
                      </div>
                    </form>
                  </details>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
