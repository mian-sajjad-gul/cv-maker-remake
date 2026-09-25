"use client";

import { useState } from "react";
import { submitPublicCommentAction } from "@/app/admin/actions";
import {
  MessageSquare,
  Reply,
  Shield,
  Send,
  CheckCircle2,
  Clock,
  User,
  CornerDownRight,
  AlertCircle,
} from "lucide-react";

function CommentItem({ comment, postSlug, onReplySuccess }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [replyStatus, setReplyStatus] = useState(null);

  async function handleReplySubmit(e) {
    e.preventDefault();
    setSubmittingReply(true);
    setReplyStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitPublicCommentAction(formData);

    setSubmittingReply(false);
    if (result?.success) {
      setReplyStatus({
        type: "success",
        msg: result.message || "Reply submitted and pending approval.",
      });
      e.target.reset();
      setTimeout(() => setShowReplyForm(false), 3000);
      if (onReplySuccess) onReplySuccess();
    } else {
      setReplyStatus({
        type: "error",
        msg: result?.error || "Could not submit reply.",
      });
    }
  }

  return (
    <div className="group">
      <div
        className={`rounded-2xl border p-4 sm:p-5 transition ${
          comment.is_admin_reply
            ? "border-indigo-200 bg-indigo-50/40"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Header: Author & Date */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
                comment.is_admin_reply
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {comment.is_admin_reply ? (
                <Shield className="h-4 w-4" />
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900">
                  {comment.author_name}
                </span>
                {comment.is_admin_reply && (
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-black text-indigo-700">
                    CVPair Editorial Team
                  </span>
                )}
              </div>
              <time
                dateTime={comment.created_at}
                className="text-[11px] text-slate-400 block"
              >
                {new Date(comment.created_at).toLocaleDateString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <Reply className="h-3.5 w-3.5" />
            <span>Reply</span>
          </button>
        </div>

        {/* Comment Text */}
        <div className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line pl-12">
          {comment.content}
        </div>

        {/* Inline Threaded Reply Form */}
        {showReplyForm && (
          <div className="mt-4 ml-12 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <CornerDownRight className="h-3.5 w-3.5 text-indigo-600" />
                Reply to {comment.author_name}
              </span>
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Cancel
              </button>
            </div>

            {replyStatus && (
              <div
                className={`mb-3 rounded-xl p-3 text-xs font-semibold flex items-center gap-2 ${
                  replyStatus.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {replyStatus.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                )}
                <span>{replyStatus.msg}</span>
              </div>
            )}

            <form onSubmit={handleReplySubmit} className="space-y-3">
              <input type="hidden" name="post_slug" value={postSlug} />
              <input type="hidden" name="parent_id" value={comment.id} />
              {/* Honeypot */}
              <input type="text" name="website_hp" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  name="author_name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  name="author_email"
                  type="email"
                  required
                  placeholder="Your Email (kept private)"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <textarea
                name="content"
                rows={2}
                required
                placeholder="Write your response..."
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingReply}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition"
                >
                  <Send className="h-3 w-3" />
                  <span>{submittingReply ? "Submitting..." : "Submit Reply"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Render Nested Child Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 ml-6 sm:ml-10 pl-3 sm:pl-4 border-l-2 border-slate-200 space-y-3">
          {comment.replies.map((childReply) => (
            <CommentItem
              key={childReply.id}
              comment={childReply}
              postSlug={postSlug}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentsSection({ postSlug, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [submitting, setSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);

  // Total comment count including nested replies
  const totalCount = comments.reduce(
    (acc, curr) => acc + 1 + (curr.replies?.length || 0),
    0
  );

  async function handleMainSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitFeedback(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitPublicCommentAction(formData);

    setSubmitting(false);
    if (result?.success) {
      setSubmitFeedback({
        type: "success",
        msg:
          result.message ||
          "Thank you! Your comment has been submitted and is awaiting editorial moderation.",
      });
      e.target.reset();
    } else {
      setSubmitFeedback({
        type: "error",
        msg: result?.error || "Unable to submit comment. Please check all fields.",
      });
    }
  }

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-600" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Community Discussion ({totalCount})
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Moderated & Threaded
        </span>
      </div>

      {/* Submit New Comment Box */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">
          Leave a comment or ask a question
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Your email address will not be published. Questions may receive official verified replies from our resume specialists.
        </p>

        {submitFeedback && (
          <div
            className={`mt-4 rounded-2xl p-4 text-xs sm:text-sm font-semibold flex items-start gap-2.5 ${
              submitFeedback.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-red-50 text-red-900 border border-red-200"
            }`}
          >
            {submitFeedback.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            )}
            <div>
              <p className="font-bold">
                {submitFeedback.type === "success"
                  ? "Submission Received"
                  : "Submission Error"}
              </p>
              <p className="mt-0.5 text-xs opacity-90">{submitFeedback.msg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleMainSubmit} className="mt-5 space-y-4">
          <input type="hidden" name="post_slug" value={postSlug} />
          {/* Honeypot field */}
          <input type="text" name="website_hp" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Your Full Name *
              </label>
              <input
                name="author_name"
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Email Address *
              </label>
              <input
                name="author_email"
                type="email"
                required
                placeholder="alex@example.com (not published)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Your Comment *
            </label>
            <textarea
              name="content"
              rows={4}
              required
              placeholder="Share your experience, ask about ATS formatting, or suggest a template tip..."
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Comments are checked for spam before posting.
            </span>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50 shadow-sm transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{submitting ? "Submitting..." : "Post Comment"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Render Comments List */}
      <div className="mt-8 space-y-4">
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
            <MessageSquare className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No comments yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Be the first to share your thoughts or questions about this article!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postSlug={postSlug}
              onReplySuccess={() => {}}
            />
          ))
        )}
      </div>
    </section>
  );
}
