"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Eye } from "lucide-react";
import { previewResume } from "@/lib/sampleResume";
import {
  ModernTemplate,
  ClassicTemplate,
  CompactTemplate,
  SidebarTemplate,
  ExecutiveTemplate,
  DeveloperTemplate,
  TimelineTemplate,
  CreativeTemplate,
  MBATemplate,
  EuropassTemplate,
  HarvardTemplate,
  ConsultingTemplate,
  ProductManagerTemplate,
  MinimalATSTemplate,
} from "@/components/templates";

function LazyTemplate({ Component, data }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[460px] overflow-hidden rounded-2xl bg-white shadow-2xs border border-slate-100">
      {visible ? (
        <div className="origin-top-left scale-[0.44] pointer-events-none p-4">
          <Component data={data} />
        </div>
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-100" />
      )}
    </div>
  );
}

const TEMPLATES = [
  {
    key: "modern",
    name: "Modern Professional",
    category: "modern",
    desc: "Clean typography and balanced margins. Perfect for corporate and tech careers.",
    bestFor: "Software engineers, marketing, finance",
    Component: ModernTemplate,
  },
  {
    key: "minimalAts",
    name: "Minimal ATS Scanner",
    category: "ats",
    desc: "Engineered specifically for automated ATS parsers (Workday, Taleo, Greenhouse).",
    bestFor: "Large enterprises & government portals",
    Component: MinimalATSTemplate,
  },
  {
    key: "executive",
    name: "Executive Leadership",
    category: "executive",
    desc: "Authoritative design crafted for VP, Director, and C-Suite career timelines.",
    bestFor: "Management, VP, directors, executives",
    Component: ExecutiveTemplate,
  },
  {
    key: "harvard",
    name: "Harvard Classic",
    category: "classic",
    desc: "Traditional serif styling favored by academia, law, and corporate finance.",
    bestFor: "Consulting, banking, law, academia",
    Component: HarvardTemplate,
  },
  {
    key: "developer",
    name: "Developer & Tech",
    category: "modern",
    desc: "Emphasizes technical stack, GitHub repos, distributed architecture, and live projects.",
    bestFor: "Full-stack, DevOps, QA, architects",
    Component: DeveloperTemplate,
  },
  {
    key: "productManager",
    name: "Product & Impact",
    category: "executive",
    desc: "Metrics-driven framework highlighting user growth, roadmap delivery, and business ROI.",
    bestFor: "Product managers, product owners, agile coaches",
    Component: ProductManagerTemplate,
  },
  {
    key: "consulting",
    name: "Strategy & Consulting",
    category: "classic",
    desc: "Razor-sharp structure emphasizing client deliverables, analytics, and business transformation.",
    bestFor: "Management consultants, analysts, strategists",
    Component: ConsultingTemplate,
  },
  {
    key: "compact",
    name: "Compact 1-Page",
    category: "compact",
    desc: "Space-optimized layout engineered to fit high-density careers onto exactly one page.",
    bestFor: "Students, new graduates, career changers",
    Component: CompactTemplate,
  },
  {
    key: "sidebar",
    name: "Two-Column Sidebar",
    category: "modern",
    desc: "Distinctive sidebar layout dedicating space to skills, certifications, and languages.",
    bestFor: "Designers, data analysts, technical specialists",
    Component: SidebarTemplate,
  },
  {
    key: "mba",
    name: "MBA & Graduate",
    category: "executive",
    desc: "Elite business school layout focusing on leadership, quantitative metrics, and education.",
    bestFor: "MBA graduates, business analysts, founders",
    Component: MBATemplate,
  },
  {
    key: "creative",
    name: "Creative Portfolio",
    category: "modern",
    desc: "Modern visual hierarchy for designers, writers, and creative directors.",
    bestFor: "Designers, copywriters, art directors",
    Component: CreativeTemplate,
  },
  {
    key: "europass",
    name: "Europass Standard",
    category: "classic",
    desc: "European standard resume format with structured language competency levels.",
    bestFor: "European union job applications & visas",
    Component: EuropassTemplate,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Templates" },
  { id: "ats", label: "ATS Friendly" },
  { id: "modern", label: "Modern & Tech" },
  { id: "executive", label: "Executive & Senior" },
  { id: "classic", label: "Harvard & Classic" },
  { id: "compact", label: "Compact 1-Page" },
];

export function TemplatesShowcase() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  const selectTemplate = (templateKey) => {
    router.push(`/resume?template=${templateKey}`);
  };

  return (
    <section id="templates" className="bg-white py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
              Template Gallery
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Pick a recruiter-tested resume template
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Every design is crafted by recruitment professionals and tested against real applicant tracking systems. Choose your layout, customize it, and download for free.
            </p>
          </div>

          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition shrink-0"
          >
            <span>Open Builder Directly</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter Tabs (Interactive Segmented Bar) */}
        <div className="mt-10 flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl max-w-fit">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  isActive
                    ? "bg-white text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Template Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const sampleData = {
              ...previewResume,
              template: item.key,
            };

            return (
              <div
                key={item.key}
                className="group relative rounded-3xl border border-slate-200 bg-slate-50/60 p-5 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Preview Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xs">
                    <LazyTemplate Component={item.Component} data={sampleData} />

                    {/* Hover overlay CTA */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={() => selectTemplate(item.key)}
                        className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg hover:bg-slate-100 transition active:scale-95 flex items-center gap-1.5"
                      >
                        <span>Use This Template</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Template Meta (Zero-pill clean text) */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-950">
                        {item.name}
                      </h3>
                      <span className="text-[11px] font-mono text-emerald-700 font-bold">
                        ATS Verified
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Best for:</span>
                      <span className="truncate">{item.bestFor}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom button */}
                <div className="mt-5 pt-4 border-t border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => selectTemplate(item.key)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 py-2.5 text-xs font-bold text-slate-900 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition"
                  >
                    <span>Customize in Editor</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
