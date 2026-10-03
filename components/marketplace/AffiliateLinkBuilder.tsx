"use client";

import { useMemo, useState } from "react";
import CopyLink from "./CopyLink";

/** Turns any marketplace page (a product, store, category or search) into a link that credits this affiliate. */
export default function AffiliateLinkBuilder({ siteUrl, code }: { siteUrl: string; code: string }) {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    const value = input.trim();
    if (!value) return null;
    try {
      const url = new URL(value, siteUrl);
      const site = new URL(siteUrl);
      const sameSite = url.hostname.replace(/^www\./, "") === site.hostname.replace(/^www\./, "");
      if (!sameSite || !url.pathname.startsWith("/marketplace")) {
        return { error: "Paste a link to a page on the RUS Marketplace." };
      }
      const link = new URL(url.pathname + url.search, site.origin);
      link.searchParams.set("ref", code);
      return { link: link.toString() };
    } catch {
      return { error: "That doesn’t look like a link." };
    }
  }, [input, siteUrl, code]);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700">
        Make a link to any marketplace page
        <input
          type="url"
          inputMode="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${siteUrl}/marketplace/product/…`}
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
        />
      </label>
      {result?.error && <p className="text-sm font-semibold text-red-600">{result.error}</p>}
      {result?.link && <CopyLink value={result.link} />}
    </div>
  );
}
