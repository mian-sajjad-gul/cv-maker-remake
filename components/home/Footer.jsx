import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950">
                CV
              </span>
              <span className="text-xl font-black text-white">CVPair</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              The 100% free online resume builder. Create, edit, and download job-winning, ATS-friendly resumes in minutes with zero surprise paywalls.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Free Forever · No Credit Card Required</span>
            </div>
          </div>

          {/* Column 1: Builder Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Resume Builder
            </h3>
            <div className="mt-4 space-y-2.5 text-sm text-slate-400">
              <Link href="/resume" className="block hover:text-white transition">Online Resume Builder</Link>
              <Link href="/#templates" className="block hover:text-white transition">Resume Templates</Link>
              <Link href="/resume?cover" className="block hover:text-white transition">Cover Letter Studio</Link>
              <Link href="/#how-it-works" className="block hover:text-white transition">How It Works</Link>
              <Link href="/#examples" className="block hover:text-white transition">Resume Examples</Link>
            </div>
          </div>

          {/* Column 2: Resources & Guides */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Resources & Advice
            </h3>
            <div className="mt-4 space-y-2.5 text-sm text-slate-400">
              <Link href="/blog" className="block hover:text-white transition">Career Advice Blog</Link>
              <Link href="/blog/write-ats-friendly-resume" className="block hover:text-white transition">ATS Optimization Guide</Link>
              <Link href="/blog/common-resume-mistakes" className="block hover:text-white transition">Top 10 Resume Mistakes</Link>
              <Link href="/#faq" className="block hover:text-white transition">Frequently Asked Questions</Link>
              <Link href="/sitemap-page" className="block hover:text-white transition">Sitemap Directory</Link>
            </div>
          </div>

          {/* Column 3: Company & Trust */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company & Legal
            </h3>
            <div className="mt-4 space-y-2.5 text-sm text-slate-400">
              <Link href="/about" className="block hover:text-white transition">About CVPair</Link>
              <Link href="/contact" className="block hover:text-white transition">Contact & Support</Link>
              <Link href="/admin" className="block hover:text-white transition">Admin Portal</Link>
              <Link href="/privacy" className="block hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-white transition">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CVPair. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
