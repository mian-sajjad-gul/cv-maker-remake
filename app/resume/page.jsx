import { Suspense } from "react";
import Link from "next/link";
import { ResumeBuilderClient } from "@/components/resume/ResumeBuilderClient";
import { AdBlock } from "@/components/ads/AdBlock";
import { Footer } from "@/components/home/Footer";
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Download,
  FileText,
  ArrowRight,
  HelpCircle,
  Layers,
  Zap,
  Award,
  Clock,
  Eye,
  Briefcase,
} from "lucide-react";

export const metadata = {
  title: "Free Resume Builder — Create ATS-Friendly Resumes Online | CVPair",
  description:
    "Build a professional, ATS-optimized resume in minutes with CVPair. 19 modern templates, live preview, cover letter generator, real-time ATS scoring, and instant PDF download. 100% free with no hidden fees.",
  keywords: [
    "free resume builder",
    "ats resume maker",
    "online cv maker",
    "ats friendly cv templates",
    "curriculum vitae generator",
    "resume builder pdf download",
    "professional cv templates",
    "job application resume maker",
    "cover letter builder",
    "harvard resume template",
  ],
  alternates: {
    canonical: "https://cvpair.com/resume",
  },
  openGraph: {
    title: "Free Resume Builder — Create ATS-Friendly Resumes Online | CVPair",
    description:
      "Build a professional, ATS-optimized resume in minutes with CVPair. 19 modern templates, live preview, and instant PDF download. 100% free.",
    url: "https://cvpair.com/resume",
    siteName: "CVPair",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder — Create ATS-Friendly Resumes Online | CVPair",
    description:
      "Build a professional, ATS-optimized resume in minutes with CVPair. 19 modern templates, live preview, and instant PDF download.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://cvpair.com/resume#webapp",
      name: "CVPair — Free ATS Online Resume Builder",
      url: "https://cvpair.com/resume",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        category: "Free",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1280",
        bestRating: "5",
        worstRating: "1",
      },
      description:
        "Create professional, ATS-optimized resumes and matching cover letters in minutes with 19 responsive templates, live preview, real-time ATS scoring, and instant PDF download.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://cvpair.com/resume#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is CVPair Resume Builder really free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, CVPair is 100% free. You can choose from all 19 professional ATS templates, customize fonts, colors, sections, live preview your CV, and download high-resolution PDFs without any hidden fees, subscription traps, or credit card requirements.",
          },
        },
        {
          "@type": "Question",
          name: "What is an ATS-friendly resume and how does CVPair ensure compliance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An Applicant Tracking System (ATS) is automated software used by employers and recruiters to screen resumes before a human reviews them. CVPair ensures 100% ATS compliance by utilizing clean single and two-column layouts, standard semantic headings (Work Experience, Skills, Education), machine-readable typography, and standard bullet point formatting that ATS parsers like Workday, Greenhouse, Taleo, and Lever can read seamlessly without formatting errors.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download my resume as a PDF without creating an account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can build your resume and trigger browser-native print-to-PDF instantly. If you create a free account, you unlock cloud synchronisation across devices, multiple saved CV profiles, and direct one-click email delivery to recruiters.",
          },
        },
        {
          "@type": "Question",
          name: "How does the built-in ATS Score checker work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The CVPair ATS Checker monitors 7 fundamental recruitment criteria in real-time as you type: verified contact details, professional headline, summary statement, minimum skill density (5+ skills), chronological work experience, and accredited education. A green 7/7 score signifies maximum machine-parser readiness.",
          },
        },
        {
          "@type": "Question",
          name: "Is my personal information kept secure and private?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, privacy is paramount. By default, your resume data is saved locally inside your browser's encrypted localStorage. We do not sell your career history, resume data, or contact details to third-party data brokers.",
          },
        },
        {
          "@type": "Question",
          name: "Can I also write a matching cover letter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! CVPair includes an integrated Cover Letter Editor accessible from the top tab. It automatically pulls your candidate details, formats recipient information professionally, and renders a matching second page in your print and PDF export.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://cvpair.com/resume#breadcrumbs",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://cvpair.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Resume Builder",
          item: "https://cvpair.com/resume",
        },
      ],
    },
  ],
};

const TEMPLATE_HIGHLIGHTS = [
  {
    key: "minimalAts",
    name: "Minimal ATS",
    category: "ATS Optimized",
    desc: "Single-column layout with high contrast, ideal for strict enterprise ATS parsers like Workday and Taleo.",
  },
  {
    key: "modern",
    name: "Modern",
    category: "Most Popular",
    desc: "Clean, contemporary balance of typography and subtle accent highlights suited for any industry.",
  },
  {
    key: "harvard",
    name: "Harvard Academic",
    category: "Academic / Formal",
    desc: "Prestigious serif typography formatted according to Ivy League resume standards.",
  },
  {
    key: "developer",
    name: "Developer / Tech",
    category: "Engineering",
    desc: "Focused on technical skill stacks, GitHub links, open-source projects, and engineering achievements.",
  },
  {
    key: "executive",
    name: "Executive Leadership",
    category: "Management",
    desc: "Designed for Senior Managers, Directors, and VPs emphasizing leadership impact and key business metrics.",
  },
  {
    key: "twoColumn",
    name: "Two Column",
    category: "Balanced",
    desc: "Displays skills and personal contacts in a dedicated sidebar while keeping experience front-and-center.",
  },
  {
    key: "consulting",
    name: "Consulting",
    category: "Business",
    desc: "Structured specifically for analytical, strategy, and management consulting roles.",
  },
  {
    key: "creative",
    name: "Creative",
    category: "Design & Arts",
    desc: "Expressive yet professional styling ideal for UI/UX designers, copywriters, and marketers.",
  },
];

const FAQS = [
  {
    q: "Is CVPair really 100% free to build and download a resume?",
    a: "Yes. Unlike other resume makers that force you into a paid subscription right when you try to download, CVPair allows you to design, edit, and export high-resolution PDFs completely free. All 19 templates and features are available at no charge.",
  },
  {
    q: "What makes a resume ATS-friendly?",
    a: "An Applicant Tracking System (ATS) scans resumes for keywords, formatting, and structure before a recruiter reads them. A resume is ATS-friendly when it uses clear, standard headings ('Work Experience', 'Skills', 'Education'), clean machine-readable typography, bullet points, and avoids unparseable complex background graphics or non-standard tables that confuse parsing bots.",
  },
  {
    q: "Can I download my resume as a PDF without creating an account?",
    a: "Yes. You can edit your resume immediately as a guest and click 'Print / Save PDF' to generate your file. Creating a free account is optional and allows you to sync your data across devices and email your CV directly to recruiters.",
  },
  {
    q: "How does the built-in ATS score calculator work?",
    a: "The toolbar features a real-time 7-point ATS checklist that evaluates your resume as you type. It checks for essential components like contact details, professional summary, 5+ skills, structured work experience, and educational background to ensure maximum compatibility with modern recruitment software.",
  },
  {
    q: "Can I create multiple versions of my resume for different jobs?",
    a: "Yes! Using the Resume Manager modal in the top toolbar, you can create new resumes, duplicate an existing resume into a targeted copy, rename profiles, and switch between versions instantly. All versions are saved securely.",
  },
  {
    q: "Does CVPair support writing a Cover Letter?",
    a: "Yes. At the top of the editor panel, you can toggle between 'Resume' and 'Cover Letter'. The cover letter synchronizes with your candidate details and generates a matching formatted cover letter page ready for PDF export.",
  },
];

export default function ResumeBuilderPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Schema.org Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Interactive Client Resume Builder (Suspense Boundary) */}
      <div id="builder-canvas">
        <Suspense
          fallback={
            <div className="mx-auto grid max-w-[1600px] gap-3 px-4 py-12 lg:grid-cols-[440px_minmax(0,1fr)] animate-pulse">
              <div className="h-96 rounded-2xl bg-slate-200" />
              <div className="h-[900px] rounded-2xl bg-slate-200" />
            </div>
          }
        >
          <ResumeBuilderClient />
        </Suspense>
      </div>

      {/* =========================================================================
          CRAWLABLE SEO & EDUCATIONAL SECTION (Server Rendered for Google Search & Ads)
          Wrapped in no-print so it never appears on printed or exported PDFs
         ========================================================================= */}
      <div className="no-print">
        {/* AdSense Placement 1: Responsive Leaderboard Banner */}
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <AdBlock
            type="leaderboard"
            slot="resume-page-mid"
            className="my-4"
          />
        </section>

        {/* Semantic H1 & Introduction Article */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-12 shadow-xs">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free ATS Resume Maker & Career Engine</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Free Online Resume Builder — Create ATS-Friendly CVs in Minutes
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl">
              CVPair is a free, modern online curriculum vitae and resume builder engineered to help
              job seekers pass Applicant Tracking Systems (ATS) and land more interviews. With 19
              professionally designed templates, real-time live preview, instant ATS score evaluation,
              and seamless PDF export, creating a job-winning resume has never been faster or easier.
            </p>

            {/* 4 Core Value Pillars */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  100% ATS Optimized
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Clean single and multi-column formatting guaranteed to pass enterprise screening
                  bots like Workday, Greenhouse, Taleo, and Lever.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  Live Side-by-Side Preview
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Watch your resume format automatically in real-time as you type your experience,
                  skills, and personal summary.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white font-bold">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  19 Expert Templates
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Tailored designs for software engineers, product designers, executives, university
                  graduates, and academic professionals.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  No Hidden Paywalls
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Download high-resolution print-ready PDFs at standard A4 sizing with zero watermark
                  restrictions or forced subscriptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works: 4-Step Actionable Process */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-12 shadow-xs">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Simple Step-By-Step Process
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                How to Build a Job-Winning Resume in 4 Easy Steps
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Follow our recruiter-approved blueprint to craft an interview-ready resume in under 10 minutes.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
                <span className="text-3xl font-black text-slate-300">01</span>
                <h3 className="mt-3 text-base font-bold text-slate-900">Enter Details</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Fill in your contact information, headline, and a punchy 2-3 sentence professional summary focusing on your career accomplishments.
                </p>
              </div>

              <div className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
                <span className="text-3xl font-black text-slate-300">02</span>
                <h3 className="mt-3 text-base font-bold text-slate-900">Add Experience & Skills</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Input work experiences using quantifiable metric bullet points. Add relevant industry skills separated by commas with smooth typing.
                </p>
              </div>

              <div className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
                <span className="text-3xl font-black text-slate-300">03</span>
                <h3 className="mt-3 text-base font-bold text-slate-900">Choose a Template</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Browse our gallery of 19 ATS-friendly templates. Change accent colors or template layouts instantly without losing any entered text.
                </p>
              </div>

              <div className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
                <span className="text-3xl font-black text-slate-300">04</span>
                <h3 className="mt-3 text-base font-bold text-slate-900">Validate & Download</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Check your score on the live ATS evaluator (target 7/7). Click &ldquo;Print / Save PDF&rdquo; to download your document or send it via email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Article: What is an ATS and Why Does It Matter? */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-12 shadow-xs">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Industry Insights & Optimization
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                What is an Applicant Tracking System (ATS) and Why Does It Matter?
              </h2>
              <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  Over <strong>98% of Fortune 500 companies</strong> and more than 75% of mid-sized
                  organizations utilize Applicant Tracking Systems (ATS) to manage incoming job applications.
                  Before any human hiring manager or recruiter reads your resume, automated software algorithms
                  parse the raw document, categorize your skills, and rank you against target job descriptions.
                </p>
                <p>
                  Unfortunately, millions of qualified candidates are automatically rejected simply because of
                  unparseable formatting: complex multi-nested tables, unreadable graphics, missing standard
                  section headings, or non-standard fonts.
                </p>
                <h3 className="text-lg font-bold text-slate-900 pt-2">
                  How CVPair Solves the ATS Parsing Challenge:
                </h3>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Standard Section Headings:</strong> Uses universal naming (Summary, Skills, Experience, Education) recognized by all major ATS parsers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Machine-Readable Fonts:</strong> Formatted with system fonts and high contrast ratios ensuring flawless optical character reading.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Header/Footer Confusion:</strong> Personal details and contact information are placed directly in the main stream to prevent truncation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Direct PDF Output:</strong> High-fidelity vector PDF print styling that preserves selectable text layers and searchability.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense Placement 2: Mid-Content Responsive Native Banner */}
        <section className="mx-auto max-w-6xl px-4 py-4">
          <AdBlock
            type="native"
            slot="resume-page-content"
            className="my-2"
          />
        </section>

        {/* Template Directory & Deep-Linking Showcase */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-12 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Curated Template Directory
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  19 Resume Templates Tailored for Every Industry
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Select any template below to automatically preview your CV in that layout.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TEMPLATE_HIGHLIGHTS.map((tpl) => (
                <Link
                  key={tpl.key}
                  href={`/resume?template=${tpl.key}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-900 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition">
                        {tpl.name}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {tpl.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    <span>Use this template</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ) Section */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-12 shadow-xs">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Got Questions?
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Frequently Asked Questions About Resume Building
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Everything you need to know about ATS optimization, formatting, downloading, and privacy.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                      <h3 className="text-base font-bold text-slate-900">
                        {faq.q}
                      </h3>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="mx-auto max-w-6xl px-4 py-8 mb-8">
          <div className="rounded-3xl bg-slate-950 p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to create your interview-winning resume?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-slate-400">
              Join thousands of job seekers who landed interviews with CVPair. 100% free, fast, and ATS-optimized.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#builder-canvas"
                className="rounded-full bg-white px-8 py-3 text-sm font-bold text-slate-950 hover:bg-slate-100 transition shadow-sm"
              >
                Scroll to Editor &uarr;
              </a>
              <Link
                href="/blog"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
              >
                Read Career & ATS Guides &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
    </main>
  );
}
