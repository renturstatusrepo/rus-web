import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignupForm from "@/components/marketplace/SignupForm";
import { getToken } from "@/lib/account";
import { safeNext } from "@/lib/format";

export const metadata: Metadata = { title: "Create an account", robots: { index: false } };

type SearchParams = Promise<{ next?: string }>;

export default async function SignupPage({ searchParams }: { searchParams: SearchParams }) {
  const { next: requested } = await searchParams;
  const next = requested ? safeNext(requested) : "/marketplace/account";
  if (await getToken()) redirect(next);

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Create your RUS account</h1>
        <p className="mt-2 text-sm text-slate-600">Shop the marketplace, or open your own store. The same account works in the RUS app.</p>
        <div className="mt-8">
          <SignupForm next={next} />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href={`/marketplace/login${requested ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-purple-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
