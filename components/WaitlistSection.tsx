"use client";

import React, { useState } from "react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 600);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-purple-50/80 via-white to-pink-50/50 border border-purple-200/80 shadow-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 mb-4">
            💌 LAUNCH NOTIFICATIONS
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Be the First to Know
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Want to know when the RUS web application launches? Stay tuned for the announcement.
          </p>

          {submitted ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold max-w-lg mx-auto flex items-center justify-center gap-3">
              <span className="text-xl">🎉</span>
              <span>You're on the early access list! We'll notify you as soon as the web experience launches.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white shadow-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-lg transition-all whitespace-nowrap"
              >
                {loading ? "Saving..." : "Notify Me"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
