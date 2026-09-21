"use client";

/* eslint-disable @next/next/no-img-element -- previews of files not yet uploaded can only be blob: URLs */
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { saveProduct, type ProductFormState } from "@/app/marketplace/sell/actions";
import { NIGERIAN_STATES } from "@/lib/format";
import SubmitButton from "./SubmitButton";

const field =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20";
const MAX_IMAGES = 6;
const MAX_BYTES = 5 * 1024 * 1024;

type Variant = { name: string; price: number };

export type ProductFormValues = {
  id?: string;
  title: string;
  description: string;
  price: number | "";
  quantity: number | "";
  deliveryFee: number | "";
  category: string;
  location: string;
  status: "available" | "draft" | "sold out";
  images: { file: string; url: string }[];
  sizes: Variant[];
  colors: Variant[];
};

type Props = { values: ProductFormValues; categories: { slug: string; title: string }[] };

function VariantEditor({ label, prefix, initial }: { label: string; prefix: "size" | "color"; initial: Variant[] }) {
  // Each row keeps a stable key: the inputs hold their own values, so keying by position would
  // make removing a middle row visually delete the wrong one
  const [rows, setRows] = useState(() => initial.map((v, i) => ({ ...v, key: `${prefix}-${i}` })));
  const [nextKey, setNextKey] = useState(initial.length);
  const placeholder = prefix === "size" ? "e.g. XL" : "e.g. Black";

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-slate-700">{label}</legend>
      {rows.map((row, i) => (
        <div key={row.key} className="flex items-center gap-2">
          <input
            name={`${prefix}Name`}
            aria-label={`${label} ${i + 1} name`}
            defaultValue={row.name}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-600 focus:outline-none"
          />
          <div className="flex w-36 items-center rounded-lg border border-slate-300 px-3 focus-within:border-purple-600">
            <span className="shrink-0 whitespace-nowrap text-sm text-slate-500">+₦</span>
            <input
              name={`${prefix}Price`}
              aria-label={`${label} ${i + 1} extra price`}
              type="number"
              min={0}
              inputMode="numeric"
              defaultValue={row.price || ""}
              placeholder="0"
              className="w-full bg-transparent px-1 py-2 text-sm focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setRows(rows.filter((r) => r.key !== row.key))}
            aria-label={`Remove ${label.toLowerCase()} ${i + 1}`}
            className="rounded-lg px-2 py-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setRows([...rows, { name: "", price: 0, key: `${prefix}-${nextKey}` }]);
          setNextKey(nextKey + 1);
        }}
        className="text-sm font-semibold text-purple-700 hover:underline"
      >
        + Add {prefix === "size" ? "a size" : "a colour"}
      </button>
    </fieldset>
  );
}

export default function ProductForm({ values, categories }: Props) {
  const [state, action] = useActionState<ProductFormState, FormData>(saveProduct, null);
  const [kept, setKept] = useState(values.images);
  const [picked, setPicked] = useState<{ name: string; url: string }[]>([]);
  const [pickError, setPickError] = useState("");

  // Release preview URLs when the selection changes or the form unmounts
  useEffect(() => () => picked.forEach((p) => URL.revokeObjectURL(p.url)), [picked]);

  const onPick = (list: FileList | null) => {
    const chosen = Array.from(list ?? []);
    const tooBig = chosen.find((f) => f.size > MAX_BYTES);
    if (tooBig) setPickError(`${tooBig.name} is larger than 5 MB.`);
    else if (kept.length + chosen.length > MAX_IMAGES) setPickError(`Use up to ${MAX_IMAGES} photos in total.`);
    else setPickError("");
    setPicked(chosen.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })));
  };

  const editing = Boolean(values.id);

  return (
    <form action={action} className="space-y-8">
      {values.id && <input type="hidden" name="id" value={values.id} />}
      {kept.map((img) => (
        <input key={img.file} type="hidden" name="keepImage" value={img.file} />
      ))}

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-extrabold text-slate-900">Photos</h2>
        <div className="flex flex-wrap gap-3">
          {kept.map((img) => (
            <div key={img.file} className="relative size-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img src={img.url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => setKept(kept.filter((k) => k.file !== img.file))}
                aria-label="Remove this photo"
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-slate-700 shadow hover:bg-red-600 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))}
          {picked.map((p) => (
            <div key={p.url} className="relative size-24 overflow-hidden rounded-xl border-2 border-dashed border-purple-300 bg-purple-50">
              <img src={p.url} alt={`New photo ${p.name}`} className="size-full object-cover" />
              <span className="absolute bottom-1 left-1 rounded bg-purple-700 px-1.5 text-[10px] font-bold text-white">NEW</span>
            </div>
          ))}
        </div>
        <label className="block text-sm font-semibold text-slate-700">
          {kept.length + picked.length > 0 ? "Add more photos" : "Add photos"}
          <input
            name="images"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => onPick(e.target.files)}
            className="mt-1.5 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
          />
        </label>
        <p className="text-xs text-slate-500">Up to {MAX_IMAGES} photos, 5 MB each. The first photo is the one buyers see first.</p>
        {pickError && <p className="text-sm font-semibold text-red-600">{pickError}</p>}
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-extrabold text-slate-900">Details</h2>
        <label className="block text-sm font-semibold text-slate-700">
          Title
          <input name="title" required minLength={3} maxLength={120} defaultValue={values.title} className={field} />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Description
          <textarea name="description" required minLength={10} rows={5} defaultValue={values.description} className={field} />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">
            Category
            <select name="category" required defaultValue={values.category} className={field}>
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
          <label className="block text-sm font-semibold text-slate-700">
            Ships from
            <select name="location" defaultValue={values.location} className={field}>
              <option value="">Not specified</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-extrabold text-slate-900">Price and stock</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="block text-sm font-semibold text-slate-700">
            Price (₦)
            <input name="price" type="number" required min={1} inputMode="numeric" defaultValue={values.price} className={field} />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            In stock
            <input name="quantity" type="number" required min={0} step={1} inputMode="numeric" defaultValue={values.quantity} className={field} />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Delivery fee (₦)
            <input name="deliveryFee" type="number" min={0} inputMode="numeric" defaultValue={values.deliveryFee} placeholder="0" className={field} />
          </label>
        </div>
        <label className="block text-sm font-semibold text-slate-700">
          Status
          <select name="status" defaultValue={values.status} className={field}>
            <option value="available">For sale</option>
            <option value="draft">Draft (hidden from buyers)</option>
            <option value="sold out">Sold out</option>
          </select>
        </label>
      </section>

      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Options</h2>
          <p className="mt-1 text-sm text-slate-500">
            Optional. Buyers must pick one of each before adding to cart. Extra prices are added to the base price.
          </p>
        </div>
        <VariantEditor label="Sizes" prefix="size" initial={values.sizes} />
        <VariantEditor label="Colours" prefix="color" initial={values.colors} />
      </section>

      {state?.error && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {state.error}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/marketplace/sell"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center text-sm font-bold text-slate-700 hover:border-slate-400"
        >
          Cancel
        </Link>
        <SubmitButton pendingText={picked.length ? "Uploading photos…" : "Saving…"} className="sm:min-w-48">
          {editing ? "Save changes" : "Add product"}
        </SubmitButton>
      </div>
    </form>
  );
}
