"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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
      { rootMargin: "150px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[520px] overflow-hidden rounded-2xl bg-white shadow-sm">
      {visible ? (
        <div className="origin-top-left scale-[0.48] pointer-events-none">
          <Component data={data} />
        </div>
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-100" />
      )}
    </div>
  );
}
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

const templates = [
  {
    key: "modern",
    name: "Modern",
    desc: "Clean modern layout for most professionals",
    tag: "Modern",
    Component: ModernTemplate,
  },
  {
    key: "classic",
    name: "Classic",
    desc: "Traditional serif resume for formal roles",
    tag: "Classic",
    Component: ClassicTemplate,
  },
  {
    key: "compact",
    name: "Compact",
    desc: "Space-saving layout for one-page resumes",
    tag: "Compact",
    Component: CompactTemplate,
  },
  {
    key: "sidebar",
    name: "Sidebar",
    desc: "Strong side column for skills and contact info",
    tag: "Popular",
    Component: SidebarTemplate,
  },
  {
    key: "executive",
    name: "Executive",
    desc: "Premium leadership layout for senior roles",
    tag: "Senior",
    Component: ExecutiveTemplate,
  },
  {
    key: "developer",
    name: "Developer",
    desc: "Projects-first layout for engineers",
    tag: "Tech",
    Component: DeveloperTemplate,
  },
  {
    key: "timeline",
    name: "Timeline",
    desc: "Career timeline style with visual hierarchy",
    tag: "Story",
    Component: TimelineTemplate,
  },
  {
    key: "creative",
    name: "Creative",
    desc: "Visual split layout for portfolios",
    tag: "Creative",
    Component: CreativeTemplate,
  },
  {
    key: "mba",
    name: "MBA",
    desc: "Business school and product manager style",
    tag: "Business",
    Component: MBATemplate,
  },
  {
    key: "europass",
    name: "Europass",
    desc: "European profile style with clean sections",
    tag: "Formal",
    Component: EuropassTemplate,
  },
  {
    key: "harvard",
    name: "Harvard",
    desc: "Academic and professional classic layout",
    tag: "Academic",
    Component: HarvardTemplate,
  },
  {
    key: "consulting",
    name: "Consulting",
    desc: "Sharp layout for consulting and strategy roles",
    tag: "Consulting",
    Component: ConsultingTemplate,
  },
  {
    key: "productManager",
    name: "Product Manager",
    desc: "Impact-focused layout for product roles",
    tag: "PM",
    Component: ProductManagerTemplate,
  },
  {
    key: "minimalAts",
    name: "Minimal ATS",
    desc: "Simple parser-friendly resume structure",
    tag: "ATS",
    Component: MinimalATSTemplate,
  },
];

export function TemplatesShowcase() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleTemplates = templates.slice(0, visibleCount);
  const hasMore = visibleCount < templates.length;

  const selectTemplate = (templateKey) => {
    router.push(`/resume?${templateKey}`);
  };
  return (
    <section id="templates" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">
            Templates
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Real layouts for real careers.
          </h2>

          <p className="mt-4 text-slate-600">
            Choose templates that change layout, section placement, hierarchy,
            and style — not just fonts.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleTemplates.map(({ key, name, desc, tag, Component }) => {
            const data = {
              ...previewResume,
              template: key,
            };

            return (
              <button
                key={key}
                type="button"
                onClick={() => selectTemplate(key)}
                className="group text-left"
              >
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-xl">
                  <LazyTemplate Component={Component} data={data} />

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-950">
                        {name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-600">{desc}</p>
                    </div>

                    <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                      {tag}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 6)}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-700"
            >
              Load More Templates
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
