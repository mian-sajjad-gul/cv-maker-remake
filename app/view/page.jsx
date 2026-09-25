"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { decodeShareData } from "@/lib/utils";
import { ResumePreview } from "@/components/ResumePreview";
import { sampleResume } from "@/lib/sampleResume";

function SharedResumeView() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get("d");
  const data = encoded ? decodeShareData(encoded) : null;

  if (!data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center">
        <h1 className="text-2xl font-black text-slate-900">Invalid share link</h1>
        <p className="text-slate-500">This link may be expired or corrupted.</p>
        <Link
          href="/resume"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          Build your own resume
        </Link>
      </main>
    );
  }

  const name = data.personal?.name || "Resume";

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Banner */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Shared Resume</p>
            <h1 className="text-lg font-black text-slate-900">{name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Print / Save PDF
            </button>
            <Link
              href={`/resume?template=${data.template || "modern"}`}
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              Use this template
            </Link>
          </div>
        </div>
      </div>

      {/* Resume */}
      <div className="mx-auto w-fit px-4 py-8">
        <div className="shadow-2xl rounded-xl overflow-hidden">
          <ResumePreview data={data} />
        </div>
      </div>

      {/* CTA footer */}
      <div className="border-t border-slate-200 bg-white py-10 text-center">
        <p className="text-sm font-semibold text-slate-500">Liked this resume?</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">Build yours for free — no account needed.</h2>
        <Link
          href="/resume"
          className="mt-5 inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-black text-white transition hover:bg-slate-700"
        >
          Start Building
        </Link>
      </div>
    </main>
  );
}

export default function ViewPage() {
  return (
    <Suspense>
      <SharedResumeView />
    </Suspense>
  );
}
