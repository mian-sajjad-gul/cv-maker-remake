import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">
          Get Started in Minutes
        </p>

        <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Ready to build your interview-winning resume?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          Join over 150,000 job seekers who have accelerated their career searches with CVPair. 100% free, ATS-compliant, and no surprise paywalls.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm sm:text-base font-bold text-slate-950 hover:bg-slate-100 shadow-xl transition active:scale-[0.98]"
          >
            <span>Build Your Resume for Free</span>
            <ArrowRight className="h-4 w-4 text-indigo-600" />
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm sm:text-base font-bold text-white hover:bg-white/10 transition"
          >
            <span>Read Resume Writing Guide</span>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            No credit card needed
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Unlimited PDF downloads
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ATS screening verified
          </span>
        </div>
      </div>
    </section>
  );
}
