import Link from "next/link";

export default function MarketplaceNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold text-slate-900">We couldn’t find that</h1>
      <p className="mt-3 text-slate-600">The product or store may have been removed or is no longer for sale.</p>
      <Link
        href="/marketplace"
        className="mt-8 inline-block rounded-xl bg-purple-700 px-6 py-3 text-sm font-bold text-white hover:bg-purple-800"
      >
        Back to the marketplace
      </Link>
    </div>
  );
}
