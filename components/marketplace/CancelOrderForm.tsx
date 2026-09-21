"use client";

import { useActionState } from "react";
import { cancelMyOrder, type CancelState } from "@/app/marketplace/actions";
import { cancelSellerOrder, type OrderStatusState } from "@/app/marketplace/sell/actions";
import { formatPrice } from "@/lib/format";
import SubmitButton from "./SubmitButton";

type Props = { id: string; refund: number; as: "buyer" | "seller" };

/** An inline "Cancel order" panel: buyers may give a reason, sellers must tell the buyer why. */
export default function CancelOrderForm({ id, refund, as }: Props) {
  const [state, action] = useActionState<CancelState | OrderStatusState, FormData>(
    as === "buyer" ? cancelMyOrder : cancelSellerOrder,
    null,
  );
  const seller = as === "seller";

  return (
    <details className="group w-full sm:w-72">
      <summary className="cursor-pointer list-none text-right text-sm font-semibold text-slate-500 hover:text-red-600 group-open:text-red-600">
        {seller ? "Cancel and refund" : "Cancel order"}
      </summary>
      <form
        action={action}
        className="mt-3 space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left"
        onSubmit={(e) => {
          const message = seller
            ? `Cancel this order and refund the buyer ${formatPrice(refund)}? This can’t be undone.`
            : `Cancel this order? ${formatPrice(refund)} will go back to your RUS wallet.`;
          if (!confirm(message)) e.preventDefault();
        }}
      >
        <input type="hidden" name="id" value={id} />
        <p className="text-sm text-red-900">
          {seller
            ? `The buyer gets ${formatPrice(refund)} back in their wallet straight away.`
            : `You’ll get ${formatPrice(refund)} back in your RUS wallet straight away.`}
        </p>
        <label className="block text-xs font-semibold text-red-900">
          {seller ? "Reason (shown to the buyer)" : "Reason (optional)"}
          <textarea
            name="reason"
            rows={2}
            maxLength={500}
            required={seller}
            minLength={seller ? 3 : undefined}
            placeholder={seller ? "e.g. Out of stock" : "e.g. Ordered by mistake"}
            className="mt-1 w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-red-400 focus:outline-none"
          />
        </label>
        {state?.error && <p className="text-xs font-semibold text-red-700">{state.error}</p>}
        <SubmitButton pendingText="Cancelling…" className="w-full !bg-red-600 !shadow-none hover:!bg-red-700">
          {seller ? "Cancel and refund buyer" : "Cancel my order"}
        </SubmitButton>
      </form>
    </details>
  );
}
