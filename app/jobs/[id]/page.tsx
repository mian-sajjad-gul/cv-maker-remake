import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CompanyLogo from "../components/CompanyLogo";
import { formatSalary, timeAgo } from "../lib/format";
import { getJobById } from "../lib/jobs";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) return { title: "Job not found | CVPair" };

  return {
    title: `${job.title} at ${job.company} (Remote) | CVPair`,
    description: job.description.replace(/\s+/g, " ").slice(0, 155),
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) notFound();

  const salary = formatSalary(
    job.salary_min,
    job.salary_max,
    job.salary_currency,
  );

  // Structured data so Google can show this as a job result
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    employmentType: job.job_type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      ...(job.company_logo_url ? { logo: job.company_logo_url } : {}),
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: job.location },
    ...(job.salary_min || job.salary_max
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.salary_currency,
            value: {
              "@type": "QuantitativeValue",
              ...(job.salary_min ? { minValue: job.salary_min } : {}),
              ...(job.salary_max ? { maxValue: job.salary_max } : {}),
              unitText: "YEAR",
            },
          },
        }
      : {}),
  };

  const applyButton = (
    <a
      href={job.apply_url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-block rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800"
    >
      Apply for this job
    </a>
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Link
        href="/remote-jobs"
        className="text-sm text-neutral-600 hover:text-black"
      >
        ← All remote jobs
      </Link>

      <header className="mt-6 flex items-start gap-4">
        <CompanyLogo name={job.company} url={job.company_logo_url} size={64} />
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            {job.title}
          </h1>
          <p className="mt-1 text-neutral-600">
            {job.company} · Posted{" "}
            <time dateTime={job.created_at}>{timeAgo(job.created_at)}</time>
          </p>
        </div>
      </header>

      <ul className="mt-6 flex flex-wrap gap-2 text-sm">
        <li className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-900">
          {job.job_type}
        </li>
        <li className="rounded-full bg-neutral-100 px-3 py-1">
          {job.category}
        </li>
        <li className="rounded-full bg-neutral-100 px-3 py-1">
          🌍 {job.location}
        </li>
        {salary && (
          <li className="rounded-full bg-neutral-100 px-3 py-1">
            {salary} / year
          </li>
        )}
      </ul>

      <div className="mt-6">{applyButton}</div>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">About the role</h2>
        {/* Plain text with line breaks kept. React escapes it, so it is safe. */}
        <div className="whitespace-pre-line leading-relaxed text-neutral-800">
          {job.description}
        </div>
      </section>

      {job.tags.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">Skills</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {job.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-neutral-300 px-3 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-lg font-semibold">Interested in this role?</h2>
        <p className="mb-4 mt-1 text-sm text-neutral-600">
          Make sure your resume is up to date before you apply.
        </p>
        <div className="flex flex-wrap gap-3">
          {applyButton}
          <Link
            href="/resume"
            className="inline-block rounded-lg border border-neutral-300 px-6 py-3 font-medium hover:border-black"
          >
            Update my resume
          </Link>
        </div>
      </section>
    </main>
  );
}
