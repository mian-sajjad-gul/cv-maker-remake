import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  params: Record<string, string>; // current filters, kept in every link
};

function buildHref(params: Record<string, string>, page: number) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `/jobs?${qs}` : "/jobs";
}

export default function Pagination({ page, totalPages, params }: Props) {
  if (totalPages <= 1) return null;

  const wanted = new Set([1, totalPages, page - 1, page, page + 1]);
  const nums = [...wanted]
    .filter((n) => n >= 1 && n <= totalPages)
    .sort((a, b) => a - b);

  const items: (number | "gap")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) items.push("gap");
    items.push(n);
  });

  const base = "rounded-lg border px-3 py-1.5 text-sm";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={buildHref(params, page - 1)}
          className={`${base} border-neutral-300 hover:border-black`}
        >
          Previous
        </Link>
      ) : (
        <span className={`${base} border-neutral-200 text-neutral-400`}>
          Previous
        </span>
      )}

      {items.map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-neutral-400">
            …
          </span>
        ) : item === page ? (
          <span
            key={item}
            aria-current="page"
            className={`${base} border-black bg-black text-white`}
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={buildHref(params, item)}
            className={`${base} border-neutral-300 hover:border-black`}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={buildHref(params, page + 1)}
          className={`${base} border-neutral-300 hover:border-black`}
        >
          Next
        </Link>
      ) : (
        <span className={`${base} border-neutral-200 text-neutral-400`}>
          Next
        </span>
      )}
    </nav>
  );
}
