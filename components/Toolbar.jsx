"use client";

import { useState } from "react";
import { encodeShareData } from "@/lib/utils";
import { useAuth } from "@/lib/authContext";
import { UserNav } from "@/components/auth/UserNav";
import { Mail, Printer, Share2, Download, CheckCircle2 } from "lucide-react";

const ATS_CRITERIA = [
  { key: "name", label: "Full name", check: (d) => !!d.personal.name },
  { key: "email", label: "Email address", check: (d) => !!d.personal.email },
  { key: "phone", label: "Phone number", check: (d) => !!d.personal.phone },
  { key: "summary", label: "Professional summary", check: (d) => !!d.summary },
  { key: "skills", label: "5+ skills listed", check: (d) => d.skills.length >= 5 },
  { key: "experience", label: "Work experience", check: (d) => d.experience.length > 0 },
  { key: "education", label: "Education", check: (d) => d.education.length > 0 },
];

function IconButton({ onClick, title, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

export function Toolbar({
  data,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenManager,
  resumeName,
  onOpenEmailModal,
}) {
  const { user, openAuthModal } = useAuth();
  const [atsOpen, setAtsOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const criteria = ATS_CRITERIA.map((c) => ({ ...c, passed: c.check(data) }));
  const score = criteria.filter((c) => c.passed).length;
  const total = criteria.length;

  function handleShare() {
    const encoded = encodeShareData(data);
    const url = `${window.location.origin}/view?d=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    });
  }

  function handleDownload() {
    if (user) {
      window.print();
    } else {
      openAuthModal(() => {
        setTimeout(() => {
          window.print();
        }, 300);
      });
    }
  }

  function handleEmail() {
    if (user) {
      onOpenEmailModal?.();
    } else {
      openAuthModal(() => {
        onOpenEmailModal?.();
      });
    }
  }

  return (
    <div className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3">
        {/* Left — resume name + ATS score */}
        <div className="flex items-center gap-3">
          {onOpenManager && (
            <button
              type="button"
              onClick={onOpenManager}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              title="Manage all resumes"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
              </svg>
              {resumeName || "Resumes"}
            </button>
          )}

          {/* ATS Score */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setAtsOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900"
              title="ATS Checklist"
            >
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-white ${
                  score === total ? "bg-emerald-500" : score >= 5 ? "bg-amber-500" : "bg-red-400"
                }`}
              >
                {score}
              </span>
              <span className="hidden sm:inline">/{total} ATS</span>
              <svg className={`h-3 w-3 transition-transform ${atsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {atsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setAtsOpen(false)} />
                <div className="absolute left-0 top-9 z-20 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-500">
                    ATS Checklist
                  </p>
                  <ul className="space-y-2">
                    {criteria.map((c) => (
                      <li key={c.key} className="flex items-center gap-2 text-xs">
                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white ${c.passed ? "bg-emerald-500" : "bg-slate-200"}`}>
                          {c.passed ? "✓" : ""}
                        </span>
                        <span className={c.passed ? "text-slate-700" : "font-semibold text-slate-500"}>
                          {c.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {score < total && (
                    <p className="mt-3 text-[11px] leading-4 text-slate-500">
                      Complete all {total} items for the best ATS pass rate.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right — actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex gap-1">
            <IconButton onClick={onUndo} title="Undo (Ctrl+Z)" disabled={!canUndo}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </IconButton>
            <IconButton onClick={onRedo} title="Redo (Ctrl+Y)" disabled={!canRedo}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
              </svg>
            </IconButton>
          </div>

          {/* Share Link */}
          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              title="Copy shareable link"
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Share2 className="h-3.5 w-3.5 text-slate-500" />
              <span>Share</span>
            </button>
            {shareToast && (
              <div className="absolute right-0 top-10 z-20 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                Link copied to clipboard!
              </div>
            )}
          </div>

          {/* Email CV via Resend */}
          <button
            type="button"
            onClick={handleEmail}
            title="Send CV via email"
            className="flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/70 px-3.5 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100 hover:border-indigo-300"
          >
            <Mail className="h-3.5 w-3.5 text-indigo-600" />
            <span>Email CV</span>
          </button>

          {/* Print / Save PDF (Auth gated with guest fallback) */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700 shadow-sm active:scale-95"
            onClick={handleDownload}
            title="Download high-resolution ATS PDF"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Print / Save PDF</span>
          </button>

          {/* User profile / Login button */}
          <div className="ml-1 pl-2 border-l border-slate-200">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
