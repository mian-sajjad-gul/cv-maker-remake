"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResumeEditor } from "@/components/ResumeEditor";
import { ResumePreview } from "@/components/ResumePreview";
import { CoverLetterEditor } from "@/components/CoverLetterEditor";
import { Toolbar } from "@/components/Toolbar";
import { ResumeManager } from "@/components/ResumeManager";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { AdBlock } from "@/components/ads/AdBlock";
import { useResumeStore } from "@/lib/useResumeStore";
import { getActiveResume } from "@/lib/resumeStore";

const TABS = [
  { key: "resume", label: "Resume" },
  { key: "cover", label: "Cover Letter" },
];

function ResumeBuilderContent() {
  const searchParams = useSearchParams();
  // Support both ?template=modern and the shorter ?modern
  const templateOverride =
    searchParams.get("template") ||
    [...searchParams.keys()].find((k) => searchParams.get(k) === "") ||
    null;

  const {
    ready, store, data, setData,
    undo, redo, canUndo, canRedo,
    switchResume, addResume, duplicateActive, removeResume, renameActive,
  } = useResumeStore(templateOverride);

  const [tab, setTab] = useState("resume");
  const [managerOpen, setManagerOpen] = useState(false);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [undo, redo]);

  if (!ready || !data) return null;

  const activeResume = store ? getActiveResume(store) : null;

  return (
    <main>
      <div className="no-print">
        <Header />
      </div>

      <Toolbar
        data={data}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onOpenManager={() => setManagerOpen(true)}
        resumeName={activeResume?.name}
      />

      <div className="mx-auto grid max-w-[1600px] gap-3 px-4 py-6 lg:grid-cols-[440px_minmax(0,1fr)]">
        {/* Left panel — editor */}
        <aside className="no-print flex max-h-[calc(100vh-92px)] flex-col overflow-hidden">
          {/* Tabs */}
          <div className="mb-3 flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  tab === t.key
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Scrollable editor */}
          <div className="flex-1 overflow-y-auto pr-1">
            {tab === "resume" ? (
              <ResumeEditor data={data} setData={setData} />
            ) : (
              <CoverLetterEditor data={data} setData={setData} />
            )}
          </div>
        </aside>

        {/* Right panel — preview */}
        <section className="print-area min-w-0 overflow-x-auto overflow-y-auto rounded-2xl bg-slate-100 p-4">
          <div className="mx-auto w-fit min-w-[794px]">
            <ResumePreview data={data} />

            {/* Cover letter print page */}
            {data.coverLetter?.body?.trim() && (
              <div className="mt-4 resume-page bg-white p-10 font-sans text-sm text-slate-900 shadow-paper">
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">Cover Letter</p>
                <h1 className="text-2xl font-black">{data.personal.name}</h1>
                <p className="mt-1 text-sm text-slate-600">
                  {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" · ")}
                </p>
                <div className="mt-8 space-y-4 text-sm leading-7 text-slate-800">
                  {data.coverLetter.recipientName && (
                    <p>Dear {data.coverLetter.recipientName},</p>
                  )}
                  <div className="whitespace-pre-wrap">{data.coverLetter.body}</div>
                  <p className="mt-6">
                    Sincerely,<br />
                    <span className="font-semibold">{data.personal.name}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <AdBlock type="leaderboard" slot="leaderboard" />

      <div className="no-print">
        <Footer />
      </div>

      {/* Resume Manager modal */}
      {managerOpen && (
        <ResumeManager
          store={store}
          onSwitch={switchResume}
          onDuplicate={duplicateActive}
          onDelete={removeResume}
          onRename={renameActive}
          onAdd={addResume}
          onClose={() => setManagerOpen(false)}
        />
      )}
    </main>
  );
}

export default function ResumeBuilderPage() {
  return (
    <Suspense>
      <ResumeBuilderContent />
    </Suspense>
  );
}
