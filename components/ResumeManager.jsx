"use client";

import { useEffect, useRef, useState } from "react";
import { formatRelativeTime } from "@/lib/utils";
import { getActiveResume } from "@/lib/resumeStore";

const TEMPLATE_LABELS = {
  modern: "Modern", classic: "Classic", compact: "Compact",
  sidebar: "Sidebar", executive: "Executive", developer: "Developer",
  timeline: "Timeline", creative: "Creative", mba: "MBA",
  europass: "Europass", harvard: "Harvard", consulting: "Consulting",
  productManager: "Product Manager", minimalAts: "Minimal ATS",
};

function ResumeCard({ resume, isActive, onSelect, onDuplicate, onDelete, onRename }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(resume.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  function commitRename() {
    const trimmed = name.trim();
    if (trimmed && trimmed !== resume.name) onRename(resume.id, trimmed);
    else setName(resume.name);
    setEditing(false);
  }

  return (
    <div
      className={`group relative rounded-2xl border p-5 transition ${
        isActive
          ? "border-slate-900 bg-slate-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      {/* Name */}
      <div className="flex items-start justify-between gap-3">
        {editing ? (
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") { setName(resume.name); setEditing(false); } }}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm font-bold text-slate-900 focus:border-slate-500 focus:outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex-1 text-left text-sm font-black text-slate-900 hover:underline"
            title="Click to rename"
          >
            {resume.name}
          </button>
        )}
        {isActive && (
          <span className="shrink-0 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
            Active
          </span>
        )}
      </div>

      {/* Meta */}
      <p className="mt-1 text-xs text-slate-500">
        {TEMPLATE_LABELS[resume.data?.template] || "Unknown"} template
        {resume.updatedAt ? ` · ${formatRelativeTime(resume.updatedAt)}` : ""}
      </p>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        {!isActive && (
          <button
            type="button"
            onClick={() => onSelect(resume.id)}
            className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-700"
          >
            Open
          </button>
        )}
        <button
          type="button"
          onClick={() => onDuplicate(resume.id)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Duplicate
        </button>
        <button
          type="button"
          onClick={() => onDelete(resume.id)}
          className="ml-auto rounded-xl px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export function ResumeManager({ store, onSwitch, onDuplicate, onDelete, onRename, onAdd, onClose }) {
  const activeResume = store ? getActiveResume(store) : null;

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleAdd() {
    const name = `Resume ${(store?.resumes?.length || 0) + 1}`;
    onAdd(name);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">My Resumes</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {store?.resumes?.length || 0} resume{store?.resumes?.length !== 1 ? "s" : ""} saved locally
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              + New Resume
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-3">
            {store?.resumes?.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                isActive={resume.id === store.activeId}
                onSelect={(id) => { onSwitch(id); onClose(); }}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
                onRename={onRename}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-3">
          <p className="text-center text-xs text-slate-400">
            All resumes are saved privately in your browser — no account needed.
          </p>
        </div>
      </div>
    </div>
  );
}
