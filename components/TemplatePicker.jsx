"use client";

import { useEffect, useRef, useState } from "react";
import { previewResume } from "@/lib/sampleResume";

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
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[280px] overflow-hidden rounded-xl bg-slate-100 shadow-sm">
      {visible ? (
        <div className="origin-top-left scale-[0.255] pointer-events-none">
          <Component data={data} />
        </div>
      ) : (
        <div className="h-full w-full animate-pulse rounded-xl bg-slate-200" />
      )}
    </div>
  );
}
import {
  ModernTemplate, ClassicTemplate, CompactTemplate, SidebarTemplate,
  ExecutiveTemplate, DeveloperTemplate, TimelineTemplate, CreativeTemplate,
  MBATemplate, EuropassTemplate, HarvardTemplate, ConsultingTemplate,
  ProductManagerTemplate, MinimalATSTemplate,
  NordicTemplate, TwoColumnTemplate, BoldTemplate, InfographicTemplate, SharpTemplate,
} from "@/components/templates";

const TEMPLATES = [
  { key: "modern", name: "Modern", tag: "Popular", Component: ModernTemplate },
  { key: "nordic", name: "Nordic", tag: "Minimal", Component: NordicTemplate },
  { key: "bold", name: "Bold", tag: "Impact", Component: BoldTemplate },
  { key: "twoColumn", name: "Two Column", tag: "Balanced", Component: TwoColumnTemplate },
  { key: "sharp", name: "Sharp", tag: "Editorial", Component: SharpTemplate },
  { key: "infographic", name: "Infographic", tag: "Visual", Component: InfographicTemplate },
  { key: "sidebar", name: "Sidebar", tag: "Sidebar", Component: SidebarTemplate },
  { key: "creative", name: "Creative", tag: "Creative", Component: CreativeTemplate },
  { key: "developer", name: "Developer", tag: "Tech", Component: DeveloperTemplate },
  { key: "executive", name: "Executive", tag: "Senior", Component: ExecutiveTemplate },
  { key: "classic", name: "Classic", tag: "Classic", Component: ClassicTemplate },
  { key: "compact", name: "Compact", tag: "Compact", Component: CompactTemplate },
  { key: "timeline", name: "Timeline", tag: "Story", Component: TimelineTemplate },
  { key: "mba", name: "MBA", tag: "Business", Component: MBATemplate },
  { key: "europass", name: "Europass", tag: "Formal", Component: EuropassTemplate },
  { key: "harvard", name: "Harvard", tag: "Academic", Component: HarvardTemplate },
  { key: "consulting", name: "Consulting", tag: "Consulting", Component: ConsultingTemplate },
  { key: "productManager", name: "Product Manager", tag: "PM", Component: ProductManagerTemplate },
  { key: "minimalAts", name: "Minimal ATS", tag: "ATS", Component: MinimalATSTemplate },
];

export function TemplatePicker({ current, onSelect, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Choose a Template</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Your content stays the same — only the layout changes.
            </p>
          </div>
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

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEMPLATES.map(({ key, name, tag, Component }) => {
              const isActive = current === key;
              const data = { ...previewResume, template: key };

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { onSelect(key); onClose(); }}
                  className={`group text-left transition ${isActive ? "ring-2 ring-slate-900 rounded-2xl" : ""}`}
                >
                  <div className={`rounded-2xl border p-3 transition hover:-translate-y-0.5 hover:shadow-lg ${isActive ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"}`}>
                    <LazyTemplate Component={Component} data={data} />
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-sm font-black text-slate-900">{name}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
                        {isActive ? "Active" : tag}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
