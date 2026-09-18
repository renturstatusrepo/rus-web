"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addToCart, type CartActionState } from "@/app/marketplace/actions";

const iconClass = "size-5";

function CartIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-.5 2.5h12" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className={`${iconClass} animate-spin`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Button({ added, title }: { added: boolean; title: string }) {
  const { pending } = useFormStatus();
  const label = pending ? "Adding to cart" : added ? `${title} is in your cart` : `Add ${title} to cart`;

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={label}
      title={added ? "In your cart" : "Add to cart"}
      className={`flex size-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-colors disabled:cursor-wait ${
        added ? "bg-emerald-600 text-white" : "bg-purple-700 text-white hover:bg-purple-800 active:scale-95"
      }`}
    >
      {pending ? <Spinner /> : added ? <CheckIcon /> : <CartIcon />}
    </button>
  );
}

/** One-tap add for a listing with no size or colour to pick. */
export default function AddToCartButton({ productId, title }: { productId: string; title: string }) {
  const [state, action] = useActionState<CartActionState, FormData>(addToCart, null);

  return (
    <form action={action} className="shrink-0">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={1} />
      <Button added={Boolean(state?.ok)} title={title} />
      <p aria-live="polite" className="sr-only">
        {state?.ok ? `${title} added to your cart` : state?.error ?? ""}
      </p>
      {state?.error && <p className="absolute right-0 mt-1 text-xs font-semibold text-red-600">{state.error}</p>}
    </form>
  );
}
