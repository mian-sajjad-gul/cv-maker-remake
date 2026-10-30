import Link from "next/link";
import JobCard from "@/components/JobCard";
import Pagination from "@/components/Pagination";
import { CATEGORIES, JOB_TYPES, getJobs } from "@/lib/jobs";

export const metadata = {
  title: "Remote Jobs | CVPair",
  description:
    "Browse remote jobs from companies hiring worldwide. Search by role, category and job type, then apply directly.",
};

export default async function RemoteJobsPage({ searchParams }) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const category = sp.category ?? "";
  const type = sp.type ?? "";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const { jobs, total, totalPages } = await getJobs({
    q,
    category,
    type,
    page,
  });
  const hasFilters = Boolean(q || category || type);

  const field =
    "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-black";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Remote jobs</h1>
        <p className="mt-2 text-neutral-600">
          Work from anywhere. Find a role, then apply directly with the company.
        </p>
      </header>

      {/* Plain GET form: works without JavaScript and keeps URLs shareable */}
      <form
        action="/remote-jobs"
        method="get"
        className="mb-6 grid gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-[1fr_180px_160px_auto]"
      >
        <label className="sr-only" htmlFor="q">
          Search jobs
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Job title or company"
          className={field}
        />

        <label className="sr-only" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={category}
          className={field}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="type">
          Job type
        </label>
        <select id="type" name="type" defaultValue={type} className={field}>
          <option value="">All job types</option>
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Search
          </button>
          {hasFilters && (
            <Link
              href="/remote-jobs"
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-black"
            >
              Reset
            </Link>
          )}
        </div>
      </form>

      <p className="mb-4 text-sm text-neutral-600" aria-live="polite">
        {total === 0
          ? "No jobs found"
          : `${total} job${total === 1 ? "" : "s"} found`}
        {totalPages > 1 && ` · page ${page} of ${totalPages}`}
      </p>

      {jobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-neutral-300 p-10 text-center">
          <p className="font-medium">No jobs match your search.</p>
          <p className="mt-1 text-sm text-neutral-600">
            Try a different keyword, or clear the filters.
          </p>
          {hasFilters && (
            <Link
              href="/remote-jobs"
              className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Show all jobs
            </Link>
          )}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        params={{ q, category, type }}
      />
    </main>
  );
}
