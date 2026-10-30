import Link from "next/link";
import CompanyLogo from "./CompanyLogo";
import { formatSalary, timeAgo } from "../lib/format";
import type { Job } from "../lib/jobs";

export default function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(
    job.salary_min,
    job.salary_max,
    job.salary_currency,
  );

  return (
    <article className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-black">
      <CompanyLogo name={job.company} url={job.company_logo_url} />

      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-semibold leading-snug">
          <Link href={`/jobs/${job.id}`} className="hover:underline">
            {job.title}
          </Link>
        </h2>
        <p className="text-sm text-neutral-600">{job.company}</p>

        <ul className="mt-3 flex flex-wrap gap-2 text-xs">
          <li className="rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-900">
            {job.job_type}
          </li>
          <li className="rounded-full bg-neutral-100 px-2.5 py-1">
            {job.category}
          </li>
          <li className="rounded-full bg-neutral-100 px-2.5 py-1">
            🌍 {job.location}
          </li>
          {salary && (
            <li className="rounded-full bg-neutral-100 px-2.5 py-1">
              {salary}
            </li>
          )}
        </ul>

        {job.tags.length > 0 && (
          <p className="mt-3 truncate text-sm text-neutral-500">
            {job.tags.join(" · ")}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-3">
        <time dateTime={job.created_at} className="text-xs text-neutral-500">
          {timeAgo(job.created_at)}
        </time>
        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${job.id}`}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:border-black"
          >
            Details
          </Link>
          <a
            href={`/jobs/${job.id}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Apply
          </a>
        </div>
      </div>
    </article>
  );
}
