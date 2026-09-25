import Link from "next/link";
import { UserNav } from "@/components/auth/UserNav";
import { ArrowRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-white font-black text-sm group-hover:bg-slate-800 transition">
            CV
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-950">
              CVPair
            </span>
            <span className="hidden sm:block text-[10px] font-semibold text-slate-400 -mt-1">
              Free Resume Builder
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
          <Link href="/resume" className="hover:text-slate-950 transition">
            Resume Builder
          </Link>
          <Link href="/#templates" className="hover:text-slate-950 transition">
            Templates
          </Link>
          <Link href="/#how-it-works" className="hover:text-slate-950 transition">
            How It Works
          </Link>
          <Link href="/#examples" className="hover:text-slate-950 transition">
            Examples
          </Link>
          <Link href="/#faq" className="hover:text-slate-950 transition">
            FAQ
          </Link>
          <Link href="/blog" className="hover:text-slate-950 transition">
            Career Blog
          </Link>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          <UserNav />
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition active:scale-95"
          >
            <span>Create My Resume</span>
            <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  );
}
