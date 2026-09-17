"use client";

import { useFormStatus } from "react-dom";

type Props = { children: React.ReactNode; pendingText?: string; className?: string; variant?: "primary" | "secondary" };

const styles = {
  primary:
    "rounded-xl bg-purple-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-700/20 hover:bg-purple-800 disabled:cursor-wait disabled:opacity-70",
  secondary:
    "rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-400 hover:text-purple-700 disabled:cursor-wait disabled:opacity-60",
};

export default function SubmitButton({ children, pendingText, className = "", variant = "primary" }: Props) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={`${styles[variant]} ${className}`}>
      {pending && pendingText ? pendingText : children}
    </button>
  );
}
