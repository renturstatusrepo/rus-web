"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much can I earn per post?",
    a: "Most users earn between ₦75,000–₦750,000 depending on engagement, follower count, and campaign type. Higher engagement rates and larger audiences typically result in higher earnings.",
  },
  {
    q: "Do I need a minimum number of followers?",
    a: "While 1,000 followers is recommended for optimal earnings, it's not strictly required. Users with smaller but highly engaged audiences can still participate in campaigns and earn.",
  },
  {
    q: "How do payouts work?",
    a: "Payouts are processed automatically 24 hours after campaign verification. You can withdraw your earnings directly to your bank account or mobile wallet. All transactions are secure and transparent.",
  },
  {
    q: "What types of content can I post?",
    a: "You have full control over what you post. You'll receive campaign offers from brands, and you can choose to accept or decline based on your personal values and interests. We never force you to post content you're not comfortable with.",
  },
  {
    q: "How does RUS protect my privacy?",
    a: "We take your privacy seriously. Your personal information is encrypted and never shared with advertisers without your explicit consent. You control what information is visible on your profile. For more details, see our Privacy Policy.",
  },
  {
    q: "Can businesses target specific audiences?",
    a: "Yes! Businesses can target campaigns based on demographics, interests, follower count, engagement rates, and more. This ensures your content reaches the right audience and businesses get authentic engagement.",
  },
  {
    q: "Is there a fee to join RUS?",
    a: "No, joining RUS is completely free for both users and businesses. Users earn money by participating in campaigns, and businesses only pay for the campaigns they create.",
  },
  {
    q: "What happens if I don't complete a campaign?",
    a: "If you accept a campaign but don't complete the required actions (e.g., posting content), you won't receive payment for that campaign. However, this won't affect your ability to participate in future campaigns.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-dark mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Everything you need to know about RUS and how it works
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors group"
              >
                <h3 className="text-lg font-bold text-neutral-dark pr-4 flex-1">
                  {faq.q}
                </h3>
                <span
                  className={`material-symbols-outlined text-2xl text-slate-400 group-hover:text-magenta-pink transition-all duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-magenta-pink" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 text-center p-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
        <h3 className="text-xl font-bold text-neutral-dark mb-2">
          Still have questions?
        </h3>
        <p className="text-slate-600 mb-4">
          Can't find the answer you're looking for? We're here to help.
        </p>
        <a
          href="mailto:info@renturstatus.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-magenta-pink hover:bg-pink-600 text-white font-semibold rounded-lg shadow-lg shadow-pink-500/25 transition-all"
        >
          <span className="material-symbols-outlined">mail</span>
          <span>Contact Support</span>
        </a>
      </div>
    </section>
  );
}
  