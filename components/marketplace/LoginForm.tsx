"use client";

import { useActionState } from "react";
import { requestLoginCode, verifyLoginCode, type LoginState } from "@/app/marketplace/actions";
import SubmitButton from "./SubmitButton";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20";

export default function LoginForm({ next }: { next: string }) {
  const [passwordState, passwordAction] = useActionState<LoginState, FormData>(requestLoginCode, { step: "password" });
  const [codeState, codeAction] = useActionState<LoginState, FormData>(verifyLoginCode, { step: "code" });

  if (passwordState.step === "code") {
    return (
      <form action={codeAction} className="space-y-5">
        <input type="hidden" name="email" value={passwordState.email} />
        <input type="hidden" name="challenge" value={codeState.challenge ?? passwordState.challenge ?? ""} />
        <input type="hidden" name="next" value={next} />
        <p className="text-sm text-slate-600">
          We emailed a sign-in code to <strong className="text-slate-900">{passwordState.email}</strong>.
        </p>
        <label className="block text-sm font-semibold text-slate-700">
          Sign-in code
          <input
            name="code"
            required
            autoFocus
            autoComplete="one-time-code"
            inputMode="numeric"
            className={`${inputClass} tracking-[0.3em]`}
          />
        </label>
        {codeState.error && <p className="text-sm font-semibold text-red-600">{codeState.error}</p>}
        <SubmitButton pendingText="Checking…" className="w-full">
          Sign in
        </SubmitButton>
      </form>
    );
  }

  return (
    <form action={passwordAction} className="space-y-5">
      <label className="block text-sm font-semibold text-slate-700">
        Email
        <input name="email" type="email" required autoComplete="email" defaultValue={passwordState.email} className={inputClass} />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Password
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </label>
      {passwordState.error && <p className="text-sm font-semibold text-red-600">{passwordState.error}</p>}
      <SubmitButton pendingText="Sending code…" className="w-full">
        Continue
      </SubmitButton>
    </form>
  );
}
