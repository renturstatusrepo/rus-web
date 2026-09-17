"use client";

import { useActionState } from "react";
import { confirmReceipt, type ReceiptState } from "@/app/marketplace/actions";
import SubmitButton from "./SubmitButton";

export default function ConfirmReceiptButton({ id }: { id: string }) {
  const [state, action] = useActionState<ReceiptState, FormData>(confirmReceipt, null);
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Confirm you received this order? This releases your payment to the seller.")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton variant="secondary" pendingText="Confirming…">
        I received this
      </SubmitButton>
      {state?.error && <p className="mt-2 text-xs font-semibold text-red-600">{state.error}</p>}
    </form>
  );
}
