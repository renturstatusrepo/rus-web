import Link from "next/link";

type Props = { page: number; pageCount: number; basePath: string; params?: Record<string, string | undefined> };

export default function Pagination({ page, pageCount, basePath, params = {} }: Props) {
  if (pageCount <= 1) return null;

  const href = (target: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
    if (target > 1) search.set("page", String(target));
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const linkClass =
    "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-300 hover:text-purple-700";
  const disabledClass = "rounded-xl border border-slate-100 px-4 py-2.5 text-sm font-bold text-slate-300";

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
      {page > 1 ? (
        <Link href={href(page - 1)} className={linkClass} rel="prev">
          Previous
        </Link>
      ) : (
        <span className={disabledClass}>Previous</span>
      )}
      <span className="text-sm font-semibold text-slate-500">
        Page {page} of {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={href(page + 1)} className={linkClass} rel="next">
          Next
        </Link>
      ) : (
        <span className={disabledClass}>Next</span>
      )}
    </nav>
  );
}
