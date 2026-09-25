"use client";

import { Field } from "@/components/Field";

const PLACEHOLDER_BODY = `Dear [Hiring Manager's Name],

I am excited to apply for the [Position] role at [Company]. With my background in [relevant experience], I am confident I can bring immediate value to your team.

[Add 1-2 paragraphs about your specific experience and why you're a strong fit for this role and company.]

Thank you for your time and consideration. I look forward to discussing this opportunity.

Sincerely,
[Your Name]`;

export function CoverLetterEditor({ data, setData }) {
  const cl = data.coverLetter || { recipientName: "", company: "", position: "", body: "" };

  function update(key, value) {
    setData((d) => ({
      ...d,
      coverLetter: { ...(d.coverLetter || {}), [key]: value },
    }));
  }

  const hasContent = cl.body?.trim();

  return (
    <div className="space-y-4">
      {/* Info Panel */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <h2 className="text-sm font-black text-blue-900">Cover Letter</h2>
        <p className="mt-1 text-xs leading-5 text-blue-700">
          Tailor this for each application. Keep it to 3 short paragraphs — hiring managers spend less than 30 seconds on most cover letters.
        </p>
      </section>

      {/* Addressing */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900">
          Addressing
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label="Recipient Name"
            placeholder="e.g. Sarah Johnson"
            value={cl.recipientName}
            onChange={(v) => update("recipientName", v)}
          />
          <Field
            label="Company"
            placeholder="e.g. Stripe"
            value={cl.company}
            onChange={(v) => update("company", v)}
          />
          <Field
            label="Position"
            placeholder="e.g. Senior Frontend Engineer"
            value={cl.position}
            onChange={(v) => update("position", v)}
          />
        </div>
      </section>

      {/* Body */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900">
          Letter Body
        </h2>
        <Field
          label="Content"
          textarea
          rows={16}
          placeholder={PLACEHOLDER_BODY}
          value={cl.body}
          onChange={(v) => update("body", v)}
        />
      </section>

      {/* Preview */}
      {hasContent && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900">
            Preview
          </h2>
          <div className="rounded-xl bg-slate-50 p-6 text-sm leading-7 text-slate-800">
            {cl.recipientName || cl.company ? (
              <p className="mb-4 font-semibold">
                {cl.recipientName ? `Dear ${cl.recipientName},` : "Dear Hiring Manager,"}
              </p>
            ) : null}
            <div className="whitespace-pre-wrap">{cl.body}</div>
            {data.personal?.name && (
              <p className="mt-6">
                Sincerely,
                <br />
                <span className="font-semibold">{data.personal.name}</span>
              </p>
            )}
          </div>
        </section>
      )}

      {/* Print tip */}
      <p className="pb-2 text-center text-xs text-slate-400">
        Use <strong>Print / Save PDF</strong> from the toolbar — cover letter prints on a separate page after your resume.
      </p>
    </div>
  );
}
