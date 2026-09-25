"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "Professional CV Builder",
    title: "Build your professional CV in minutes.",
    text: "Choose from modern, MBA, ATS, developer, and executive templates with live preview.",
    cta: "Build Your CV",
    bg: "from-slate-950 via-slate-800 to-slate-700",
  },
  {
    eyebrow: "ATS Friendly",
    title: "Designed to look great and pass screening tools.",
    text: "Clean sections, readable formatting, and recruiter-friendly CV structure for every industry.",
    cta: "View Templates",
    bg: "from-blue-950 via-slate-900 to-cyan-900",
  },
  {
    eyebrow: "Success Focused",
    title: "Turn your experience into measurable impact.",
    text: "Use guided sections for achievements, projects, skills, education, and certifications.",
    cta: "See Stories",
    bg: "from-purple-950 via-slate-900 to-indigo-900",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section
      id="builder"
      className={`overflow-hidden bg-gradient-to-br ${slide.bg} text-white`}
    >
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
            {slide.eyebrow}
          </p>

          <h1 className="mt-5 min-h-[170px] max-w-3xl text-5xl font-black tracking-tight md:text-7xl">
            {slide.title}
          </h1>

          <p className="mt-6 min-h-[64px] max-w-2xl text-lg leading-8 text-white/75">
            {slide.text}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/resume"
              className="rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 hover:bg-slate-100"
            >
              Build Your CV
            </a>

            <a
              href="/blog"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-black text-white hover:bg-white/10"
            >
              Read Resume Tips
            </a>
          </div>

          <div className="mt-8 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all ${
                  active === index ? "w-9 bg-white" : "w-2 bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="h-[460px] rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
            <div className="h-full overflow-hidden rounded-[1.5rem] border border-slate-200 p-6">
              <div className="border-b border-slate-300 pb-4 text-center font-serif">
                <h2 className="text-lg font-black uppercase tracking-wide">
                  Your Name
                </h2>
                <p className="text-xs text-slate-500">
                  email | phone | linkedin | portfolio
                </p>
              </div>

              <div className="mt-5 grid grid-cols-[80px_minmax(0,1fr)] gap-5 text-xs">
                <p className="font-bold lowercase text-slate-600">experience</p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between gap-3 font-black uppercase">
                      <span>Product Manager</span>
                      <span>2023</span>
                    </div>
                    <p className="mt-1 text-slate-600">
                      Improved conversion by 18% through onboarding experiments.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between gap-3 font-black uppercase">
                      <span>Software Engineer</span>
                      <span>2021</span>
                    </div>
                    <p className="mt-1 text-slate-600">
                      Built dashboards used by 15K monthly active users.
                    </p>
                  </div>
                </div>

                <p className="font-bold lowercase text-slate-600">skills</p>
                <p className="min-w-0 text-slate-600">
                  React • Next.js • Product Strategy • Analytics • APIs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
