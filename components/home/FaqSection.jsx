"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    q: "Is CVPair really 100% free to build and download?",
    a: "Yes, completely free. Unlike other commercial builders that allow you to fill out your details and then lock the PDF download behind a surprise $2.99 trial or $24/month recurring subscription, CVPair provides unlimited high-resolution PDF exports with zero payment or credit card required.",
  },
  {
    q: "What makes a resume ATS-friendly (Applicant Tracking System)?",
    a: "Applicant Tracking Systems scan resumes using automated text extractors. To pass without parsing errors, a resume must use standard section headings ('Experience', 'Education', 'Skills'), avoid unreadable tables or non-standard graphical symbols, maintain consistent date formatting, and preserve readable linear column hierarchies. All CVPair templates are strictly validated for ATS compatibility across Workday, Greenhouse, Taleo, and Lever.",
  },
  {
    q: "Can I download my resume in PDF format?",
    a: "Yes. With one click on 'Print / Save PDF' in the editor, your browser compiles a vector-sharp, print-ready PDF that preserves exact margins, clean typography, and zero watermark branding.",
  },
  {
    q: "How does the 'Send CV via Email' feature work?",
    a: "We have integrated a dedicated Resend email client directly into CVPair. You can click 'Email CV', type in the recruiter or hiring manager's email address (or your own), add an optional personalized cover note, and dispatch a responsive, formatted HTML presentation of your resume in seconds.",
  },
  {
    q: "Do I need to create an account or sign in?",
    a: "You can start drafting your resume immediately without an account! Your data is saved locally on your computer in your browser's local storage. When you're ready to download or want to access your resume across multiple devices, you can quickly sign in with 1-click Google / Gmail or Email & Password.",
  },
  {
    q: "Can I adjust fonts, colors, and line spacing to fit on one page?",
    a: "Yes. In the CVPair toolbar, you will find intuitive Page Settings controls that let you adjust overall typography scale, line-height tightness, and margins. This makes it effortless to keep your resume on exactly one page without overflowing into awkward secondary pages.",
  },
  {
    q: "Can I create a matching cover letter?",
    a: "Yes. The editor features a dedicated Cover Letter tab that automatically syncs your personal contact information, header styling, and font choices from your resume so your entire application package matches seamlessly.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-20 border-b border-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            Everything you need to know about CVPair
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Got questions? We have answers. Learn how our free builder works and how to optimize your resume for recruiters.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white transition shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-slate-900 text-white" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl bg-slate-50 border border-slate-200 p-6 text-center">
          <p className="text-sm font-bold text-slate-800">
            Have a question that is not answered here?
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Check out our career blog or send our team an inquiry via the contact form.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              Contact Support &rarr;
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/blog"
              className="text-xs font-bold text-slate-700 hover:text-slate-900"
            >
              Read Career Guides &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
