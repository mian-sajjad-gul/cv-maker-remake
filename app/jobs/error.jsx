"use client";

export default function Error({ reset }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Jobs could not be loaded</h1>
      <p className="mt-2 text-neutral-600">
        Check your connection and try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-black px-5 py-2.5 font-medium text-white"
      >
        Try again
      </button>
    </main>
  );
}
