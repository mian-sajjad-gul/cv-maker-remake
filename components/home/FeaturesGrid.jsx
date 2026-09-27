import {
  Gift,
  ShieldCheck,
  Mail,
  Sliders,
  FileCheck2,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function FeaturesGrid() {
  const features = [
    {
      title: "100% Free — No Hidden Paywalls",
      description:
        "Unlike other resume builders that demand a monthly credit card subscription right when you click download, CVPair is truly free to build, customize, and export.",
      icon: Gift,
      accent: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Recruiter-Approved ATS Formats",
      description:
        "Every layout strictly adheres to ATS compliance standards: standard font hierarchies, single or clean two-column parsing, and semantic section dividers.",
      icon: ShieldCheck,
      accent: "text-blue-600 bg-blue-50",
    },
    {
      title: "Integrated Email Dispatch via Resend",
      description:
        "Deliver your resume and personalized cover letter directly to hiring managers' inboxes in a beautifully formatted HTML email with 1-click.",
      icon: Mail,
      accent: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Live Typography & Spacing Controls",
      description:
        "Fit your career onto exactly one page with real-time controls for base font sizing, line height compression, and sectional margin spacing.",
      icon: Sliders,
      accent: "text-amber-600 bg-amber-50",
    },
    {
      title: "Matching Cover Letter Studio",
      description:
        "Create a coordinated cover letter featuring the same color palette, typography, and professional header styling as your resume.",
      icon: FileCheck2,
      accent: "text-purple-600 bg-purple-50",
    },
    {
      title: "Local-First Privacy & Optional Sync",
      description:
        "Your private employment history is saved securely in your browser's local storage with optional Google / Email sign-in for multi-device access.",
      icon: Lock,
      accent: "text-rose-600 bg-rose-50",
    },
  ];

  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
            Why CVPair?
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            Everything you need to build a winning resume
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Engineered specifically for job seekers who want a clean, professional, and fast resume builder without predatory trial traps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 hover:bg-white hover:shadow-md transition duration-200"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${feat.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Ready to create your resume for free?
            </h3>
            <p className="mt-1.5 text-sm text-slate-300 max-w-xl">
              Takes less than 5 minutes. No account required to start drafting.
            </p>
          </div>
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-950 hover:bg-slate-100 shrink-0 shadow-sm transition"
          >
            <span>Launch CV Builder</span>
            <ArrowRight className="h-4 w-4 text-indigo-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
