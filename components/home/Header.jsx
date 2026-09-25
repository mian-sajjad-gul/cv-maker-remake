import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white">
            CV
          </span>
          <span className="text-lg font-black tracking-tight text-slate-950">
            CVPair
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/#templates" className="hover:text-slate-950">
            Templates
          </Link>
          <Link href="/#stories" className="hover:text-slate-950">
            Success Stories
          </Link>
          <Link href="/blog" className="hover:text-slate-950">
            Blog
          </Link>
          <Link href="/#pricing" className="hover:text-slate-950">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/resume"
            className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700"
          >
            Build Your CV
          </Link>
        </div>
      </div>
    </header>
  );
}
