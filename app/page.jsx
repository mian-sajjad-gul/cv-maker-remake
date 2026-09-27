import { Header } from "@/components/home/Header";
import { ResumeHero } from "@/components/home/ResumeHero";
import { AtsTrustBanner } from "@/components/home/AtsTrustBanner";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TemplatesShowcase } from "@/components/home/TemplatesShowcase";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ResumeExamples } from "@/components/home/ResumeExamples";
import { SuccessStories } from "@/components/home/SuccessStories";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Footer } from "@/components/home/Footer";
import { AdBlock } from "@/components/ads/AdBlock";

export const metadata = {
  title: "CVPair — Free Online Resume Builder | Create Professional Resumes",
  description:
    "Build a professional, ATS-friendly resume for free in minutes. Choose from recruiter-approved templates, get step-by-step guidance, and download unwatermarked PDFs or email employers directly.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ResumeHero />
      <AtsTrustBanner />
      <AdBlock type="leaderboard" slot="homepage-top" />
      <HowItWorks />
      <TemplatesShowcase />
      <FeaturesGrid />
      <ResumeExamples />
      <SuccessStories />
      <FaqSection />
      <CtaBanner />
      <BlogPreview />
      <Footer />
    </main>
  );
}
