"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { bulkAffiliate, type BulkAffiliateState } from "@/app/marketplace/sell/actions";

/**
 * A submit button that carries which scope was chosen. The browser sends the name and value of the
 * button that was actually pressed, so "ticked" and "all" need no state of their own.
 */
function ScopeButton({ scope, className, children }: { scope: "selected" | "all"; className: string; children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" name="scope" value={scope} disabled={pending} aria-busy={pending} className={className}>
      {pending ? "Applying…" : children}
    </button>
  );
}

/**
 * Sets the affiliate commission across a catalogue in one go.
 *
 * It wraps the product list, so the checkboxes beside each product are part of this form: a seller
 * ticks what they want, types a percentage, and applies it — or applies it to everything without
 * ticking anything. Opening one edit form per product was the only way to do this before.
 */
export default function BulkAffiliate({
  children,
  productCount,
  offeringCount,
  minRate,
  maxRate,
}: {
  children: React.ReactNode;
  productCount: number;
  offeringCount: number;
  minRate: number;
  maxRate: number;
}) {
  const [state, action] = useActionState<BulkAffiliateState, FormData>(bulkAffiliate, null);
  const [open, setOpen] = useState(false);

  if (productCount === 0) return <>{children}</>;

  return (
    <form action={action}>
      <div className="mb-5 rounded-2xl border border-purple-200 bg-purple-50/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-extrabold text-purple-900">Affiliate commission</p>
            <p className="mt-0.5 text-sm text-purple-900/70">
              {offeringCount === 0
                ? "None of your products offer commission yet. Affiliates promote what pays them."
                : `${offeringCount} of your ${productCount} products offer commission to affiliates.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-xl border border-purple-300 bg-white px-4 py-2 text-sm font-bold text-purple-800 hover:border-purple-500"
          >
            {open ? "Close" : "Set for many at once"}
          </button>
        </div>

        {open && (
          <div className="mt-4 border-t border-purple-200 pt-4">
            <div className="flex flex-wrap items-end gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-purple-900/70">Commission</span>
                <div className="flex items-center gap-2">
                  <input
                    name="rate"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={maxRate}
                    step={0.5}
                    defaultValue={minRate}
                    required
                    className="w-28 rounded-xl border border-purple-300 bg-white px-3 py-2.5 font-bold text-slate-900 outline-none focus:border-purple-500"
                  />
                  <span className="font-bold text-purple-900">%</span>
                </div>
              </label>

              <ScopeButton
                scope="selected"
                className="rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white hover:bg-purple-800 disabled:cursor-wait disabled:opacity-60"
              >
                Apply to ticked products
              </ScopeButton>

              <ScopeButton
                scope="all"
                className="rounded-xl border border-purple-300 bg-white px-5 py-3 text-sm font-bold text-purple-800 hover:border-purple-500 disabled:cursor-wait disabled:opacity-60"
              >
                Apply to all {productCount}
              </ScopeButton>
            </div>

            <p className="mt-3 text-xs text-purple-900/70">
              Between {minRate}% and {maxRate}% of the item price, taken from your share of each sale.
              Set <strong>0</strong> to stop offering commission. Affiliates keep earning the rate saved
              when a buyer ordered, so changing it never alters commission already owed.
            </p>
          </div>
        )}

        {state?.error && (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{state.error}</p>
        )}
        {state?.done && (
          <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{state.done}</p>
        )}
      </div>

      {children}
    </form>
  );
}
