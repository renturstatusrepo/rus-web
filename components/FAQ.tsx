const faqs = [
  {
    q: "How much can I earn per post?",
    a: "Most users earn between ₦75,000–₦750,000 depending on engagement.",
  },
  {
    q: "Do I need a minimum number of followers?",
    a: "1,000 followers is recommended, but not required.",
  },
  {
    q: "How do payouts work?",
    a: "Payouts are processed 24 hours after campaign verification.",
  },
];

export default function FAQ() {
  return (
    <section className="w-full max-w-3xl px-5 py-20">
      <h2 className="text-4xl font-extrabold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="bg-white border rounded-xl p-6 cursor-pointer"
          >
            <summary className="font-bold text-lg">{f.q}</summary>
            <p className="mt-4 text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
  