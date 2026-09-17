export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8" aria-busy="true" aria-label="Loading products">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-6 h-12 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-square animate-pulse bg-slate-200" />
            <div className="space-y-2 p-4">
              <div className="h-4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
