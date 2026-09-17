"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-slate-100 font-semibold text-slate-400">
        No image
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 sm:size-20 ${
                i === active ? "border-purple-600" : "border-transparent hover:border-slate-300"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
