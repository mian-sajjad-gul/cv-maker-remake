import Link from "next/link";
import { LayoutTemplate, Edit3, Download, ArrowRight, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Pick an HR-Approved Template",
      description:
        "Choose from 14+ recruiter-tested resume templates designed to meet modern hiring standards and pass automated ATS filters cleanly.",
      icon: LayoutTemplate,
      highlight: "Clean layouts & typography",
      link: "#templates",
      ctaText: "Browse Templates",
    },
    {
      step: "02",
      title: "Add Your Details with Guidance",
      description:
        "Fill out your contact info, career achievements, and technical skills using our guided prompts and impactful action-verb formulations.",
      icon: Edit3,
      highlight: "Real-time preview as you type",
      link: "/resume",
      ctaText: "Open CV Editor",
    },
    {
      step: "03",
      title: "Download Free or Email Directly",
      description:
        "Export an unwatermarked, high-resolution PDF instantly for free, or dispatch your CV directly to recruiters with our built-in Resend client.",
      icon: Download,
      highlight: "100% Free with zero paywalls",
      link: "/resume",
      ctaText: "Start Building Now",
    },
  ];

  return (
    <section id="how-it-works" className="bg-slate-50 py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            Create your job-winning resume in 3 easy steps
          </h2>
          <p className="mt-3 text-base text-slate-600">
            No design skills needed. Our intuitive builder handles formatting, line spacing, and ATS validation so you can focus on your story.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-xs hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 group-hover:bg-slate-950 group-hover:text-white transition">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{item.highlight}</span>
                  </div>

                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick action bar */}
        <div className="mt-12 text-center">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-3.5 text-sm font-bold text-white hover:bg-slate-800 shadow-md transition"
          >
            <span>Start Building for Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
