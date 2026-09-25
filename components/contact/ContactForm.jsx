"use client";

import { useState } from "react";
import { submitContactMessageAction } from "@/app/admin/actions";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitContactMessageAction(formData);

    setSubmitting(false);
    if (res?.success) {
      setResult({
        type: "success",
        msg:
          res.message ||
          "Thank you! Your message has been received. Our team will get back to you shortly.",
      });
      e.target.reset();
    } else {
      setResult({
        type: "error",
        msg: res?.error || "Could not send your message. Please check all fields.",
      });
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      <h3 className="text-2xl font-black tracking-tight text-slate-950">
        Send Us a Message
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Fill out the form below and an administrator will review and respond promptly.
      </p>

      {result && (
        <div
          className={`mt-6 rounded-2xl p-4 text-sm font-semibold flex items-start gap-3 ${
            result.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
              : "bg-red-50 text-red-900 border border-red-200"
          }`}
        >
          {result.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          )}
          <div>
            <p className="font-bold">
              {result.type === "success" ? "Message Dispatched" : "Submission Notice"}
            </p>
            <p className="mt-0.5 text-xs opacity-90">{result.msg}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Anti-spam honeypot */}
        <input
          type="text"
          name="company_hp"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Your Name *
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Jordan Smith"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="jordan@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Category
            </label>
            <select
              name="category"
              defaultValue="General Inquiry"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Resume Feedback">Resume & Template Feedback</option>
              <option value="Partnership">Partnership / Educational</option>
              <option value="Billing">Billing & Commercial</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Subject *
            </label>
            <input
              name="subject"
              type="text"
              required
              placeholder="How can we help?"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Your Message *
          </label>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us about your question, template feedback, or issue..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50 shadow-sm transition w-full sm:w-auto"
        >
          <Send className="h-4 w-4" />
          <span>{submitting ? "Sending Inquiry..." : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
}
