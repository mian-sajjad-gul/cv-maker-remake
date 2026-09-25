import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import {
  getAdminDashboardStats,
  getAllCommentsForAdmin,
  getContactMessagesForAdmin,
} from "@/lib/supabase/admin";
import { getAllPostsForAdmin } from "@/lib/blog";
import { AdminNav } from "@/components/admin/AdminNav";
import {
  setCommentModerationStatus,
  toggleBlogPostStatus,
  toggleMessageReadAction,
} from "./actions";
import {
  FileText,
  MessageSquare,
  Inbox,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Send,
  ShieldCheck,
  Eye,
  CornerDownRight,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard Overview | CVPair",
  description: "Administrative command center for CVPair CV Maker.",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [stats, recentPosts, pendingComments, recentMessages] = await Promise.all([
    getAdminDashboardStats(),
    getAllPostsForAdmin(),
    getAllCommentsForAdmin("pending"),
    getContactMessagesForAdmin("all"),
  ]);

  const unreadMessages = recentMessages.filter((m) => !m.is_read || m.status === "unread");

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav activeTab="overview" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Welcome Banner & Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Administrative Control Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage content, review community discussions, and handle user inquiries.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition"
            >
              <Plus className="h-4 w-4" />
              <span>Create Blog Post</span>
            </Link>
          </div>
        </div>

        {/* Action Attention Alert if items need moderation/reply */}
        {(stats.comments.pending > 0 || stats.messages.unread > 0) && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5 text-amber-900 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-amber-950">
                  Items requiring administrative attention
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-amber-800 leading-relaxed">
                  You have{" "}
                  {stats.comments.pending > 0 && (
                    <strong className="underline underline-offset-2">
                      {stats.comments.pending} pending comment{stats.comments.pending > 1 ? "s" : ""}
                    </strong>
                  )}
                  {stats.comments.pending > 0 && stats.messages.unread > 0 && " and "}
                  {stats.messages.unread > 0 && (
                    <strong className="underline underline-offset-2">
                      {stats.messages.unread} unread contact message{stats.messages.unread > 1 ? "s" : ""}
                    </strong>
                  )}{" "}
                  waiting in the moderation queues.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.comments.pending > 0 && (
                  <Link
                    href="/admin/comments?tab=pending"
                    className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700 shadow-xs transition"
                  >
                    Review Comments
                  </Link>
                )}
                {stats.messages.unread > 0 && (
                  <Link
                    href="/admin/inbox?tab=unread"
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs transition"
                  >
                    View Inbox
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Core Metric Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Blog Management */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Blog Management
              </span>
              <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {stats.posts.total}
              </span>
              <span className="text-xs text-slate-500 font-medium">total articles</span>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                {stats.posts.published} Published
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                {stats.posts.drafts} Drafts
              </span>
              <Link
                href="/admin/blog"
                className="ml-auto font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Manage <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Card 2: Comments Moderation */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Comment Moderation
              </span>
              <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {stats.comments.total}
              </span>
              <span className="text-xs text-slate-500 font-medium">total comments</span>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-amber-700">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                {stats.comments.pending} Pending
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                {stats.comments.approved} Approved
              </span>
              <Link
                href="/admin/comments"
                className="ml-auto font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                Queue <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Card 3: Contact Inbox */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact Messages
              </span>
              <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                <Inbox className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {stats.messages.total}
              </span>
              <span className="text-xs text-slate-500 font-medium">inbound inquiries</span>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                {stats.messages.unread} Unread
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-slate-600">
                <Send className="h-3 w-3 text-slate-400" />
                {stats.messages.replied} Replied
              </span>
              <Link
                href="/admin/inbox"
                className="ml-auto font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Inbox <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Dual Queues Section: Pending Comments & Inbound Inquiries */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Comments Column */}
          <section className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-600" />
                <h2 className="text-base font-black text-slate-900">
                  Comments Awaiting Moderation
                </h2>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                  {pendingComments.length}
                </span>
              </div>
              <Link
                href="/admin/comments"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                View all queue &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100 flex-1">
              {pendingComments.length === 0 ? (
                <div className="p-8 text-center">
                  <ShieldCheck className="mx-auto h-8 w-8 text-emerald-500" />
                  <p className="mt-2 text-sm font-bold text-slate-900">All comments moderated!</p>
                  <p className="text-xs text-slate-500">There are no pending submissions right now.</p>
                </div>
              ) : (
                pendingComments.slice(0, 4).map((comment) => (
                  <div key={comment.id} className="p-4 hover:bg-slate-50/60 transition">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            {comment.author_name}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({comment.author_email})
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                          On post: <strong className="text-slate-700">/{comment.post_slug}</strong>
                        </p>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      &ldquo;{comment.content}&rdquo;
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex gap-2">
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
                            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 shadow-2xs transition"
                          >
                            Approve
                          </button>
                        </form>
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
                            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-700 transition"
                          >
                            Spam
                          </button>
                        </form>
                      </div>
                      <Link
                        href={`/admin/comments?search=${encodeURIComponent(comment.author_name)}`}
                        className="text-xs font-bold text-indigo-600 hover:underline"
                      >
                        Reply / Moderate
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Recent Inbound Messages Column */}
          <section className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Inbox className="h-4 w-4 text-blue-600" />
                <h2 className="text-base font-black text-slate-900">
                  Recent Inbound Inquiries
                </h2>
                {unreadMessages.length > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                    {unreadMessages.length} unread
                  </span>
                )}
              </div>
              <Link
                href="/admin/inbox"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Open Inbox &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100 flex-1">
              {recentMessages.length === 0 ? (
                <div className="p-8 text-center">
                  <Inbox className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="mt-2 text-sm font-bold text-slate-900">Inbox is empty</p>
                  <p className="text-xs text-slate-500">Contact submissions will appear here.</p>
                </div>
              ) : (
                recentMessages.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 transition ${
                      !msg.is_read ? "bg-blue-50/30 font-medium" : "hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {!msg.is_read && (
                          <span
                            className="h-2 w-2 rounded-full bg-blue-600 shrink-0"
                            title="Unread"
                          ></span>
                        )}
                        <span className="text-sm font-bold text-slate-900">{msg.name}</span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          {msg.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="mt-1 text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                      {msg.subject}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {msg.message}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wide ${
                          msg.status === "replied"
                            ? "text-emerald-600"
                            : !msg.is_read
                            ? "text-blue-600"
                            : "text-slate-500"
                        }`}
                      >
                        {msg.status === "replied" ? "✓ Replied" : !msg.is_read ? "• Unread" : "Seen"}
                      </span>
                      <Link
                        href={`/admin/inbox?id=${msg.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white hover:bg-slate-800 transition"
                      >
                        <CornerDownRight className="h-3 w-3" />
                        Reply
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Blog Posts Summary Section */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-xs p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Recent Blog Content
              </h2>
              <p className="text-xs text-slate-500">
                Fast status overview and SEO metadata management.
              </p>
            </div>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Full Blog Manager &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Focus Keyword</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPosts.slice(0, 5).map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{post.title}</p>
                      <p className="text-xs text-slate-400">/{post.slug}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                        {post.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                          post.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            post.status === "published" ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        ></span>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {post.focus_keyword || <span className="text-slate-400 italic">None set</span>}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50"
                        >
                          Edit
                        </Link>
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="rounded-lg border border-slate-200 p-1 text-slate-600 hover:bg-slate-50"
                            title="View public post"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
