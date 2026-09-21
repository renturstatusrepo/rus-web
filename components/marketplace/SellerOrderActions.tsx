"use client";

import { useActionState } from "react";
import { updateOrderStatus, type OrderStatusState } from "@/app/marketplace/sell/actions";
import type { OrderStatus } from "@/lib/seller";
import CancelOrderForm from "./CancelOrderForm";
import SubmitButton from "./SubmitButton";

// The next step a seller can take; confirming receipt is the buyer's, since it releases their payment
const NEXT: Partial<Record<OrderStatus, { status: "in-transit" | "delivered"; label: string }[]>> = {
  paid: [
    { status: "in-transit", label: "Mark as shipped" },
    { status: "delivered", label: "Mark as delivered" },
  ],
  "in-transit": [{ status: "delivered", label: "Mark as delivered" }],
};

export default function SellerOrderActions({ id, status, amount }: { id: string; status: OrderStatus; amount: number }) {
  const [state, action] = useActionState<OrderStatusState, FormData>(updateOrderStatus, null);
  const steps = NEXT[status] ?? [];

  if (steps.length === 0) {
    return (
      <p className="text-xs text-slate-500">
        {status === "delivered"
          ? "Waiting for the buyer to confirm receipt."
          : status === "completed"
            ? "Payment released to you."
            : ""}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <div className="flex flex-wrap gap-2">
        {steps.map((step) => (
          <form key={step.status} action={action}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="status" value={step.status} />
            <SubmitButton variant="secondary" pendingText="Updating…">
              {step.label}
            </SubmitButton>
          </form>
        ))}
      </div>
      {state?.error && <p className="text-xs font-semibold text-red-600">{state.error}</p>}
      {/* Sellers can cancel anything not yet delivered, e.g. when an item turns out to be out of stock */}
      <CancelOrderForm id={id} refund={amount} as="seller" />
    </div>
  );
}
