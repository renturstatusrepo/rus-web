"use client";

import Link from "next/link";
import { useActionState } from "react";
import { addToCart, type CartActionState } from "@/app/marketplace/actions";
import { formatPrice } from "@/lib/format";
import type { Variant } from "@/lib/marketplace";
import SubmitButton from "./SubmitButton";

type Props = { productId: string; sizes: Variant[]; colors: Variant[] };

export default function AddToCart({ productId, sizes, colors }: Props) {
  const [state, action] = useActionState<CartActionState, FormData>(addToCart, null);

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
      <input type="hidden" name="productId" value={productId} />

      {[
        { name: "size", label: "Size", options: sizes },
        { name: "color", label: "Colour", options: colors },
      ]
        .filter((group) => group.options.length > 0)
        .map((group) => (
          <fieldset key={group.name}>
            <legend className="text-xs font-extrabold uppercase tracking-widest text-slate-500">{group.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.options.map((option, i) => (
                <label key={option.name} className="cursor-pointer">
                  <input
                    type="radio"
                    name={group.name}
                    value={option.name}
                    defaultChecked={i === 0}
                    required
                    className="peer sr-only"
                  />
                  <span className="block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 peer-checked:border-purple-700 peer-checked:bg-purple-50 peer-checked:text-purple-800 peer-focus-visible:outline-2 peer-focus-visible:outline-purple-600">
                    {option.name}
                    {option.price > 0 && <span className="text-slate-500"> +{formatPrice(option.price)}</span>}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

      <div className="flex items-end gap-3">
        <label className="flex flex-col text-xs font-extrabold uppercase tracking-widest text-slate-500">
          Qty
          <input
            type="number"
            name="quantity"
            min={1}
            max={99}
            defaultValue={1}
            inputMode="numeric"
            className="mt-2 w-20 rounded-xl border border-slate-300 px-3 py-3 text-base font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
          />
        </label>
        <SubmitButton pendingText="Adding…" className="flex-1 py-4 text-base">
          Add to cart
        </SubmitButton>
      </div>

      <div aria-live="polite" className="text-sm">
        {state?.ok && (
          <p className="font-semibold text-emerald-700">
            Added to your cart.{" "}
            <Link href="/marketplace/cart" className="text-purple-700 underline">
              View cart
            </Link>
          </p>
        )}
        {state?.error && <p className="font-semibold text-red-600">{state.error}</p>}
      </div>
    </form>
  );
}
