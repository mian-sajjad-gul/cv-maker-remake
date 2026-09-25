import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950">CV</span>
            <span className="text-lg font-black">CVPair</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Create, edit & download job-winning CVs with beautiful templates, live preview, and one-click PDF export.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Product</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link href="/#templates" className="block hover:text-white">Templates</Link>
            <Link href="/resume" className="block hover:text-white">CV Builder</Link>
            <Link href="/#stories" className="block hover:text-white">Success Stories</Link>
            <Link href="/#pricing" className="block hover:text-white">Pricing</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Resources</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link href="/blog" className="block hover:text-white">Blog</Link>
            <Link href="/blog/write-ats-friendly-resume" className="block hover:text-white">ATS Guide</Link>
            <Link href="/blog/common-resume-mistakes" className="block hover:text-white">CV Mistakes</Link>
            <Link href="/sitemap-page" className="block hover:text-white">Sitemap</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Company</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link href="/about" className="block hover:text-white">About Us</Link>
            <Link href="/contact" className="block hover:text-white">Contact Us</Link>
            <Link href="/admin" className="block hover:text-white">Admin Portal</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Legal</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link href="/privacy" className="block hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block hover:text-white">Terms & Conditions</Link>
            <Link href="/disclaimer" className="block hover:text-white">Disclaimer</Link>
            <Link href="/cookie-policy" className="block hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} CVPair. All rights reserved.
      </div>
    </footer>
  );
}
