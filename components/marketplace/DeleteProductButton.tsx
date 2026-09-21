"use client";

import { deleteProduct } from "@/app/marketplace/sell/actions";
import SubmitButton from "./SubmitButton";

export default function DeleteProductButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(`Delete “${title}”? Buyers will no longer see it. This can’t be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton variant="secondary" pendingText="Deleting…" className="hover:!border-red-300 hover:!text-red-600">
        Delete
      </SubmitButton>
    </form>
  );
}
