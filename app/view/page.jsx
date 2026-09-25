"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { decodeShareData } from "@/lib/utils";
import { ResumePreview } from "@/components/ResumePreview";
import { SendCvModal } from "@/components/email/SendCvModal";
import { useAuth } from "@/lib/authContext";
import { UserNav } from "@/components/auth/UserNav";
import { Download, Mail } from "lucide-react";

function SharedResumeView() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get("d");
  const data = encoded ? decodeShareData(encoded) : null;
  const { user, openAuthModal } = useAuth();
  const [emailModalOpen, setEmailModalOpen] = useState(false);

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

  function handleDownload() {
    if (user) {
      window.print();
    } else {
      openAuthModal(() => {
        setTimeout(() => window.print(), 300);
      });
    }
  }

  function handleEmail() {
    if (user) {
      setEmailModalOpen(true);
    } else {
      openAuthModal(() => setEmailModalOpen(true));
    }
  }

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Banner */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-30 shadow-xs">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Shared Resume</p>
            <h1 className="text-lg font-black text-slate-900">{name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEmail}
              className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email CV</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <Link
              href={`/resume?template=${data.template || "modern"}`}
              className="hidden sm:inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              Use Template
            </Link>

            <div className="ml-1 pl-2 border-l border-slate-200">
              <UserNav />
            </div>
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
        <h2 className="mt-2 text-2xl font-black text-slate-900">Build yours for free with CVPair.</h2>
        <Link
          href="/resume"
          className="mt-5 inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-black text-white transition hover:bg-slate-700"
        >
          Start Building Now
        </Link>
      </div>

      <SendCvModal
        data={data}
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      />
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
