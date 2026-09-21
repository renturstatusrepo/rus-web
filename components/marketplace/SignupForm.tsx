"use client";

import { useActionState } from "react";
import { checkSignupCode, createAccount, sendSignupCode, type SignupState } from "@/app/marketplace/signup/actions";
import { NIGERIAN_STATES } from "@/lib/format";
import SubmitButton from "./SubmitButton";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20";

const FormError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm font-semibold text-red-600" role="alert">{message}</p> : null;

export default function SignupForm({ next }: { next: string }) {
  const [emailState, emailAction] = useActionState<SignupState, FormData>(sendSignupCode, { step: "email" });
  const [codeState, codeAction] = useActionState<SignupState, FormData>(checkSignupCode, { step: "code" });
  const [profileState, profileAction] = useActionState<SignupState, FormData>(createAccount, { step: "profile" });

  const email = emailState.email ?? "";
  const verified = codeState.step === "profile";

  if (emailState.step === "email") {
    return (
      <form action={emailAction} className="space-y-5">
        <label className="block text-sm font-semibold text-slate-700">
          Gmail address
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@gmail.com"
            defaultValue={email}
            className={inputClass}
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">RUS accounts currently need a Gmail address.</span>
        </label>
        <FormError message={emailState.error} />
        <SubmitButton pendingText="Sending code…" className="w-full">
          Continue
        </SubmitButton>
      </form>
    );
  }

  if (!verified) {
    return (
      <form action={codeAction} className="space-y-5">
        <input type="hidden" name="email" value={email} />
        <p className="text-sm text-slate-600">
          We emailed a 6-digit code to <strong className="text-slate-900">{email}</strong>.
        </p>
        <label className="block text-sm font-semibold text-slate-700">
          Verification code
          <input name="code" required autoFocus autoComplete="one-time-code" inputMode="numeric" className={`${inputClass} tracking-[0.3em]`} />
        </label>
        <FormError message={codeState.error} />
        <SubmitButton pendingText="Checking…" className="w-full">
          Verify email
        </SubmitButton>
      </form>
    );
  }

  return (
    <form action={profileAction} className="space-y-4">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="code" value={codeState.code ?? ""} />
      <input type="hidden" name="next" value={next} />
      <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{email} is verified.</p>

      <label className="block text-sm font-semibold text-slate-700">
        Full name
        <input name="name" required autoComplete="name" className={inputClass} />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Username
        <input
          name="username"
          required
          minLength={3}
          maxLength={30}
          pattern="[A-Za-z0-9_]+"
          autoComplete="username"
          className={inputClass}
        />
        <span className="mt-1 block text-xs font-normal text-slate-500">Letters, numbers and underscores. This is your store link.</span>
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          State
          <select name="state" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Choose
            </option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Phone <span className="font-normal text-slate-500">(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>
      <label className="block text-sm font-semibold text-slate-700">
        Password
        <input name="password" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
        <span className="mt-1 block text-xs font-normal text-slate-500">At least 8 characters, with a letter and a number.</span>
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Confirm password
        <input name="confirm" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
      </label>

      <FormError message={profileState.error} />
      <SubmitButton pendingText="Creating your account…" className="w-full">
        Create account
      </SubmitButton>
    </form>
  );
}
