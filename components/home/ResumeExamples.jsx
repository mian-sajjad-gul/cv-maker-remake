import Link from "next/link";
import { ArrowRight, Code, Briefcase, Database, Megaphone, Stethoscope, Landmark, Shield, GraduationCap } from "lucide-react";

export function ResumeExamples() {
  const examples = [
    {
      role: "Software Engineer",
      category: "Technology",
      icon: Code,
      template: "developer",
      focus: "Projects, system scale, GitHub & tech stack",
      experience: "Entry to Staff Engineer",
    },
    {
      role: "Product Manager",
      category: "Product & Strategy",
      icon: Briefcase,
      template: "productManager",
      focus: "KPI impact, roadmap ownership, agile metrics",
      experience: "Associate to Group PM",
    },
    {
      role: "Data Analyst & Scientist",
      category: "Analytics",
      icon: Database,
      template: "minimalAts",
      focus: "SQL, Python, dashboard adoption & ROI metrics",
      experience: "Junior to Principal",
    },
    {
      role: "Marketing Manager",
      category: "Growth & Creative",
      icon: Megaphone,
      template: "modern",
      focus: "CAC/LTV, conversion pipelines, brand reach",
      experience: "Specialist to Director",
    },
    {
      role: "Registered Nurse (RN)",
      category: "Healthcare",
      icon: Stethoscope,
      template: "classic",
      focus: "Clinical rotations, certifications, patient outcomes",
      experience: "New Grad to Nurse Manager",
    },
    {
      role: "Financial Analyst",
      category: "Finance",
      icon: Landmark,
      template: "harvard",
      focus: "Financial modeling, forecasting, audit controls",
      experience: "Analyst to VP Finance",
    },
    {
      role: "Management Consultant",
      category: "Consulting",
      icon: Shield,
      template: "consulting",
      focus: "Case frameworks, client deliverables, cost reductions",
      experience: "Associate to Partner",
    },
    {
      role: "College Student / Graduate",
      category: "Early Career",
      icon: GraduationCap,
      template: "compact",
      focus: "Relevant coursework, internships, academic honors",
      experience: "Entry-Level & Internships",
    },
  ];

  return (
    <section id="examples" className="bg-slate-50 py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
              Resume Examples
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Tailored for your specific industry
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Start with an optimized layout pre-configured with the section order and phrasing that recruiters in your field expect.
            </p>
          </div>

          <Link
            href="/resume"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            <span>View all 14+ templates</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {examples.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-950">
                    {item.role}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.focus}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    href={`/resume?template=${item.template}`}
                    className="inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-900 hover:text-white transition"
                  >
                    <span>Use this example</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
