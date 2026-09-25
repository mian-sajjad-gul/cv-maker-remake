"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { encodeShareData } from "@/lib/utils";
import {
  Mail,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  FileText,
  Info,
} from "lucide-react";

export function SendCvModal({ data, isOpen, onClose }) {
  const { user, openAuthModal } = useAuth();

  const [recipientEmail, setRecipientEmail] = useState(
    user?.email || data?.personal?.email || ""
  );
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState(
    `${data?.personal?.name || "Candidate"} — Resume & CV Application`
  );
  const [message, setMessage] = useState(
    data?.coverLetter?.body
      ? `Dear Hiring Manager,\n\nPlease find my resume details attached for your review. I look forward to connecting!\n\nBest regards,\n${data?.personal?.name || ""}`
      : `Hello,\n\nPlease find my resume and qualifications attached for your consideration.\n\nBest regards,\n${data?.personal?.name || ""}`
  );
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', msg: '' }

  if (!isOpen) return null;

  async function handleSend(e) {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes("@")) {
      setStatus({ type: "error", msg: "Please enter a valid recipient email." });
      return;
    }

    setSending(true);
    setStatus(null);

    // Compute share URL
    let shareUrl = "";
    if (typeof window !== "undefined") {
      try {
        const encoded = encodeShareData(data);
        shareUrl = `${window.location.origin}/view?d=${encoded}`;
      } catch {}
    }

    try {
      const res = await fetch("/api/send-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: recipientEmail.trim(),
          recipientName: recipientName.trim(),
          candidateName: data?.personal?.name || "Candidate",
          subject,
          userMessage: message,
          resumeData: data,
          shareUrl,
        }),
      });

      const json = await res.json();
      setSending(false);

      if (res.ok && json.success) {
        setStatus({
          type: "success",
          msg: json.message || "Your CV was dispatched successfully!",
        });
        setTimeout(() => {
          onClose();
        }, 3200);
      } else {
        setStatus({
          type: "error",
          msg: json.error || "Failed to dispatch email. Please check your inputs.",
        });
      }
    } catch (err) {
      setSending(false);
      setStatus({
        type: "error",
        msg: err.message || "Network error while sending CV.",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-950">
              Send CV via Email
            </h2>
            <p className="text-xs text-slate-500">
              Integrated with Resend client for instant professional delivery.
            </p>
          </div>
        </div>

        {/* Status notification */}
        {status && (
          <div
            className={`mt-4 rounded-2xl p-4 text-xs font-semibold flex items-start gap-2.5 ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-red-50 text-red-900 border border-red-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">
                {status.type === "success" ? "Dispatched Successfully" : "Sending Failed"}
              </p>
              <p className="mt-0.5 opacity-90">{status.msg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSend} className="mt-5 space-y-4">
          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Send to:
            </span>
            <button
              type="button"
              onClick={() => {
                const target = user?.email || data?.personal?.email || "";
                if (target) setRecipientEmail(target);
              }}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              Myself ({user?.email || data?.personal?.email || "My Email"})
            </button>
            <button
              type="button"
              onClick={() => {
                setRecipientEmail("");
                setRecipientName("Hiring Manager");
              }}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              Recruiter / Company
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Recipient Email *
              </label>
              <input
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="recruiter@company.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Recipient Name (Optional)
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Sarah Connor / Hiring Team"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Subject Line *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Personalized Message / Cover Note
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Delivery Details Callout */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">What will the recipient receive?</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                A clean, responsive HTML email showcasing <strong>{data?.personal?.name}</strong>'s
                summary, work experience, skills, and a direct link to view and print the interactive CV.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50 shadow-sm transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{sending ? "Dispatching..." : "Send CV via Resend"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
