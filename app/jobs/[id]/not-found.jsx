import Link from "next/link";

export default function JobNotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">This job is no longer available</h1>
      <p className="mt-2 text-neutral-600">
        It may have been filled or removed. Browse the latest remote jobs instead.
      </p>
      <Link
        href="/remote-jobs"
        className="mt-6 inline-block rounded-lg bg-black px-5 py-2.5 font-medium text-white"
      >
        See all remote jobs
      </Link>
    </main>
  );
}
