"use client";

import { useState } from "react";

/** A read-only link with a copy button. Falls back to selecting the text where the clipboard is blocked. */
export default function CopyLink({ value, label = "Copy link", className = "" }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async (input: HTMLInputElement | null) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      input?.select();
    }
  };

  return (
    <div className={`flex items-stretch gap-2 ${className}`}>
      <input
        readOnly
        value={value}
        aria-label="Your referral link"
        onFocus={(e) => e.currentTarget.select()}
        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 font-mono text-sm text-slate-700"
      />
      <button
        type="button"
        onClick={(e) => copy(e.currentTarget.previousElementSibling as HTMLInputElement | null)}
        className="shrink-0 rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-purple-800"
        aria-live="polite"
      >
        {copied ? "Copied ✓" : label}
      </button>
    </div>
  );
}
