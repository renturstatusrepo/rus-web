"use client";

import { useActionState, useState } from "react";
import { becomeSeller, type BecomeSellerState } from "@/app/marketplace/sell/actions";
import { NIGERIAN_STATES } from "@/lib/format";
import SubmitButton from "./SubmitButton";

const field =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20";

type Props = { categories: { slug: string; title: string }[]; suggestedName: string };

const toHandle = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

export default function BecomeSellerForm({ categories, suggestedName }: Props) {
  const [state, action] = useActionState<BecomeSellerState, FormData>(becomeSeller, null);
  const [handle, setHandle] = useState(toHandle(suggestedName));
  const [handleEdited, setHandleEdited] = useState(false);

  return (
    <form action={action} className="space-y-5">
      <label className="block text-sm font-semibold text-slate-700">
        Business name
        <input
          name="name"
          required
          defaultValue={suggestedName}
          onChange={(e) => !handleEdited && setHandle(toHandle(e.target.value))}
          className={field}
        />
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Store handle
        <div className="mt-1.5 flex items-center rounded-xl border border-slate-300 bg-white focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/20">
          <span className="pl-4 text-slate-500">@</span>
          <input
            name="handle"
            required
            minLength={3}
            maxLength={40}
            pattern="[a-z0-9][a-z0-9-]*[a-z0-9]"
            value={handle}
            onChange={(e) => {
              setHandleEdited(true);
              setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
            }}
            className="w-full rounded-xl bg-transparent px-2 py-3 text-base text-slate-900 focus:outline-none"
          />
        </div>
        <span className="mt-1 block text-xs font-normal text-slate-500">Lowercase letters, numbers and hyphens.</span>
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        What do you sell?
        <select name="category" required defaultValue="" className={field}>
          <option value="" disabled>
            Choose a category
          </option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          State
          <select name="state" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose
            </option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Phone or RC number
          <input name="rcNumber" required minLength={5} inputMode="tel" className={field} />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Business address
        <textarea name="address" required minLength={10} rows={2} autoComplete="street-address" className={field} />
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Logo <span className="font-normal text-slate-500">(optional, up to 5 MB)</span>
        <input
          name="logo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="mt-1.5 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
        />
      </label>

      {state?.error && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {state.error}
        </p>
      )}
      <SubmitButton pendingText="Opening your store…" className="w-full py-4 text-base">
        Open my store
      </SubmitButton>
      <p className="text-center text-xs text-slate-500">Opening a store is free. You can edit these details later in the RUS app.</p>
    </form>
  );
}
