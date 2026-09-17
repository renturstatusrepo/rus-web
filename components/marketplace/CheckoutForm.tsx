"use client";

import { useActionState } from "react";
import { placeOrder, type CheckoutState } from "@/app/marketplace/actions";
import { formatPrice, NIGERIAN_STATES } from "@/lib/format";
import type { Gateway } from "@/lib/account";
import SubmitButton from "./SubmitButton";

type Props = { total: number; walletBalance: number; gateways: Gateway[] };

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20";

export default function CheckoutForm({ total, walletBalance, gateways }: Props) {
  const [state, action] = useActionState<CheckoutState, FormData>(placeOrder, null);
  const shortfall = Math.max(0, Math.ceil(total - walletBalance));
  const cardUnavailable = shortfall > 0 && gateways.length === 0;

  return (
    <form action={action} className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-extrabold text-slate-900">Delivery</h2>
        <label className="block text-sm font-semibold text-slate-700">
          State
          <select name="state" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose a state
            </option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Full delivery address
          <textarea
            name="address"
            required
            minLength={10}
            rows={3}
            autoComplete="street-address"
            placeholder="Street address, house number, landmark"
            className={fieldClass}
          />
        </label>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-extrabold text-slate-900">Payment</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">RUS wallet balance</dt>
            <dd className="font-bold text-slate-900">{formatPrice(walletBalance)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Order total</dt>
            <dd className="font-bold text-slate-900">{formatPrice(total)}</dd>
          </div>
        </dl>

        {shortfall === 0 ? (
          <p className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
            Your wallet covers this order. It will be paid from your balance.
          </p>
        ) : (
          <>
            <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
              Your wallet is <strong>{formatPrice(shortfall)}</strong> short. You’ll pay that by card to top up your wallet,
              then the order is placed automatically.
            </p>
            {gateways.length > 1 && (
              <fieldset>
                <legend className="text-sm font-semibold text-slate-700">Pay with</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {gateways.map((g, i) => (
                    <label key={g.id} className="cursor-pointer">
                      <input type="radio" name="gateway" value={g.id} defaultChecked={i === 0} className="peer sr-only" />
                      <span className="block rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 peer-checked:border-purple-700 peer-checked:bg-purple-50 peer-checked:text-purple-800">
                        {g.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            {gateways.length === 1 && <input type="hidden" name="gateway" value={gateways[0].id} />}
            {cardUnavailable && (
              <p className="text-sm font-semibold text-red-600">Card payments are unavailable right now. Please try again later.</p>
            )}
          </>
        )}
      </section>

      <div aria-live="polite">{state?.error && <p className="mb-4 text-sm font-semibold text-red-600">{state.error}</p>}</div>

      {!cardUnavailable && (
        <SubmitButton pendingText={shortfall > 0 ? "Opening payment…" : "Placing order…"} className="w-full py-4 text-base">
          {shortfall > 0 ? `Pay ${formatPrice(shortfall)} and place order` : `Pay ${formatPrice(total)} from wallet`}
        </SubmitButton>
      )}
      <p className="text-center text-xs leading-relaxed text-slate-500">
        Your payment is held in escrow and released to the seller only after you confirm delivery.
      </p>
    </form>
  );
}
