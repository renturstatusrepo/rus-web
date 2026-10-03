"use client";

import { useActionState } from "react";
import { applyAffiliate, type ApplyState } from "@/app/marketplace/affiliate/actions";
import SubmitButton from "./SubmitButton";

const field =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20";

export default function AffiliateApplyForm({
  channels = "",
  audience = "",
  mode = "new",
}: {
  channels?: string;
  audience?: string;
  mode?: "new" | "update" | "again";
}) {
  const [state, action] = useActionState<ApplyState, FormData>(applyAffiliate, null);

  return (
    <form action={action} className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">
        Where will you share your links?
        <textarea
          name="channels"
          required
          minLength={3}
          maxLength={500}
          rows={3}
          defaultValue={channels}
          placeholder="e.g. My WhatsApp status and two student groups, Instagram @handle"
          className={field}
        />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Tell us about your audience <span className="font-normal text-slate-500">(optional)</span>
        <textarea
          name="audience"
          maxLength={500}
          rows={3}
          defaultValue={audience}
          placeholder="Who follows you, and roughly how many people see what you share?"
          className={field}
        />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {state.error}
        </p>
      )}
      <SubmitButton pendingText="Sending…" className="w-full sm:w-auto sm:min-w-48">
        {mode === "update" ? "Update application" : mode === "again" ? "Apply again" : "Apply to be an affiliate"}
      </SubmitButton>
    </form>
  );
}
