import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/marketplace/LoginForm";
import { getToken } from "@/lib/account";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

type SearchParams = Promise<{ next?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { next: requested } = await searchParams;
  const next = requested?.startsWith("/marketplace") && !requested.startsWith("//") ? requested : "/marketplace";
  if (await getToken()) redirect(next);

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Log in to RUS</h1>
        <p className="mt-2 text-sm text-slate-600">Use the same account as the RUS mobile app.</p>
        <div className="mt-8">
          <LoginForm next={next} />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        New to RUS?{" "}
        <a
          href="https://play.google.com/store/apps/details?id=com.renturstatus.rus"
          className="font-semibold text-purple-700 hover:underline"
        >
          Create an account in the app
        </a>
      </p>
    </div>
  );
}
