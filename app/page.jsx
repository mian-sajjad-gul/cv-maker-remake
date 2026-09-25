import { AdBlock } from "@/components/ads/AdBlock";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { HeroSlider } from "@/components/home/HeroSlider";
import { SuccessStories } from "@/components/home/SuccessStories";
import { TemplatesShowcase } from "@/components/home/TemplatesShowcase";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSlider />
      <AdBlock type="leaderboard" slot="homepage-top" />
      <TemplatesShowcase />
      <SuccessStories />

      <section id="pricing" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
            Simple Pricing
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Start free. Upgrade when you need more.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Build your CV, try templates, and export your data. Add premium
            templates and advanced sections later.
          </p>
          <div className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950">
            <Link href="/resume">Build Your CV</Link>
          </div>
        </div>
      </section>

      <BlogPreview />
      <Footer />
    </main>
  );
}
