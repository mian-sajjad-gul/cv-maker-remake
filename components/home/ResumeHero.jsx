"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Download,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const HERO_TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    tagline: "Sleek & balanced for corporate & tech roles",
    role: "Senior Software Engineer",
    nameCandidate: "Alex Morgan",
    accentColor: "bg-indigo-600",
  },
  {
    id: "minimalAts",
    name: "Minimal ATS",
    tagline: "Pure scanner-first format with zero parse friction",
    role: "Product Operations Lead",
    nameCandidate: "Jordan Taylor",
    accentColor: "bg-slate-900",
  },
  {
    id: "executive",
    name: "Executive",
    tagline: "Bold leadership presence for management & VP tiers",
    role: "VP of Product Strategy",
    nameCandidate: "Elena Vance",
    accentColor: "bg-blue-900",
  },
  {
    id: "harvard",
    name: "Harvard Classic",
    tagline: "Traditional academic & consulting serif typography",
    role: "Management Consultant",
    nameCandidate: "Marcus Sterling",
    accentColor: "bg-emerald-800",
  },
];

export function ResumeHero() {
  const [selectedTemplate, setSelectedTemplate] = useState(HERO_TEMPLATES[0]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200/80">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-indigo-50/60 to-transparent blur-3xl opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            {/* Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-indigo-700">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>100% Free Online Resume Builder</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-semibold normal-case">No Credit Card Needed</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]">
              Build a professional resume <span className="text-indigo-600 underline decoration-indigo-200 decoration-wavy decoration-2 underline-offset-8">for free</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Create a job-winning, ATS-friendly resume in minutes. Pick from HR-approved templates, customize your work history with guided prompts, and download clean PDFs or email recruiters directly — completely free with no hidden paywalls.
            </p>

            {/* Key feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>100% Free with unlimited PDF exports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Engineered to pass modern ATS scanners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Step-by-step guidance & action verbs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Direct email dispatch via Resend client</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-slate-950 px-8 py-4 text-sm sm:text-base font-bold text-white hover:bg-slate-800 shadow-lg shadow-slate-950/15 hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <span>Create My Resume</span>
                <ArrowRight className="h-4 w-4 text-indigo-300" />
              </Link>

              <a
                href="#templates"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-4 text-sm sm:text-base font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition"
              >
                <span>Pick a Template</span>
              </a>
            </div>

            {/* Social proof metric */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-200/80 text-xs text-slate-500">
              <div className="flex -space-x-2">
                {["AM", "JT", "EV", "MS"].map((initials, i) => (
                  <div
                    key={initials}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 border-2 border-white text-[10px] font-black text-white"
                    style={{ zIndex: 4 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <span className="font-bold text-slate-800">150,000+ job seekers</span> have built resumes to land roles at Google, Stripe, Microsoft, and top healthcare systems.
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Resume Preview */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Template switcher tabs */}
              <div className="mb-3 flex items-center justify-between gap-2 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
                <span className="hidden sm:inline-block px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Preview:
                </span>
                <div className="flex gap-1">
                  {HERO_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setSelectedTemplate(tmpl)}
                      className={`rounded-xl px-2.5 py-1 text-xs font-bold transition ${
                        selectedTemplate.id === tmpl.id
                          ? "bg-slate-950 text-white shadow-2xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Realistic Resume Card */}
              <div className="relative rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xl transition-all">
                {/* ATS Score Floating Pill */}
                <div className="absolute -top-3 -right-3 sm:-right-4 flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-black text-white shadow-md">
                  <ShieldCheck className="h-4 w-4" />
                  <span>98% ATS Pass Score</span>
                </div>

                {/* Resume Paper Container */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 text-slate-900 font-sans shadow-xs">
                  {/* Header */}
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                          {selectedTemplate.nameCandidate}
                        </h2>
                        <p className="text-xs sm:text-sm font-bold text-indigo-700 mt-0.5">
                          {selectedTemplate.role}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">San Francisco, CA</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span>alex.morgan@email.com</span>
                      <span>·</span>
                      <span>(415) 555-0192</span>
                      <span>·</span>
                      <span>linkedin.com/in/alexmorgan</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Executive Summary
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      Accomplished engineering leader with 7+ years directing high-throughput cloud infrastructure and cross-functional teams. Increased platform reliability to 99.98% while reducing cloud costs by 34%.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="mt-4 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Work Experience
                    </p>

                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>Lead Software Architect</span>
                        <span className="text-[11px] font-normal text-slate-500">2021 — Present</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium">Stripe / Cloud Billing Platform</p>
                      <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                        <li>Spearheaded redesign of real-time payment ledger processing <strong>$4.2M daily transactions</strong>.</li>
                        <li>Mentored team of 11 engineers and reduced release cycle velocity by <strong>45%</strong>.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>Senior Full-Stack Engineer</span>
                        <span className="text-[11px] font-normal text-slate-500">2018 — 2021</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium">Apex Global Technologies</p>
                    </div>
                  </div>

                  {/* Skills tags preview */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Core Competencies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Distributed Systems", "TypeScript", "React", "PostgreSQL", "Next.js", "Docker & Kubernetes"].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instant Action Bar */}
                <div className="mt-4 flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    <span>Formatted with <strong>{selectedTemplate.name}</strong> layout</span>
                  </div>

                  <Link
                    href={`/resume?template=${selectedTemplate.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-2xs"
                  >
                    <span>Use This Layout</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
