import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "RUS Child Safety Standards - RentUrStatus (RUS) Limited",
  description:
    "Published Child Safety Standards, CSAE and CSAM Prohibition Policy, Reporting Mechanisms, and Point of Contact for RUS - Speed Marketing Platform by RentUrStatus (RUS) Limited.",
};

export default function ChildSafetyStandardsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <Header />

      <main className="flex-1 bg-slate-50 py-12">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="mb-8 border-b border-slate-200 pb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-pink-600 transition-colors mb-4 font-medium"
              >
                <span>← Back to Home</span>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                RUS Child Safety Standards
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Last Updated: 10 August 2026
              </p>
            </div>

            <div className="space-y-8 text-slate-700 text-base leading-relaxed">
              <section>
                <p className="text-base text-slate-800 leading-relaxed">
                  <strong>RentUrStatus (RUS) Limited</strong>, developer of{" "}
                  <strong>RUS - Speed Marketing Platform</strong>, is committed to
                  protecting children and maintaining a safe environment for
                  users of our platform.
                </p>
              </section>

              <section className="bg-pink-50/80 border border-pink-200 rounded-xl p-5 sm:p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>🛡️</span> Zero Tolerance for Child Sexual Abuse and Exploitation
                </h2>
                <p className="mb-4 text-slate-800">
                  RUS has a <strong>zero-tolerance policy</strong> for Child Sexual Abuse
                  and Exploitation (CSAE).
                </p>
                <p className="font-semibold text-slate-900 mb-2">
                  Users must not use RUS to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>sexually abuse or exploit a child;</li>
                  <li>groom a child for sexual purposes;</li>
                  <li>sexually solicit or target a minor;</li>
                  <li>
                    create, upload, request, store, share or distribute Child
                    Sexual Abuse Material (CSAM);
                  </li>
                  <li>sexually exploit or traffic children;</li>
                  <li>engage in sextortion involving a child;</li>
                  <li>facilitate or promote the sexual exploitation of children;</li>
                  <li>encourage or assist another person in engaging in CSAE.</li>
                </ul>
                <p className="mt-4 text-slate-800 font-medium">
                  Any content or behaviour that facilitates, promotes or attempts to
                  facilitate CSAE is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Child Sexual Abuse Material (CSAM)
                </h2>
                <p className="mb-3">
                  Child Sexual Abuse Material (CSAM) is strictly prohibited on
                  RUS.
                </p>
                <p className="mb-4">
                  Users must not create, upload, request, store, distribute or
                  otherwise make CSAM available through RUS.
                </p>
                <p className="mb-3 font-semibold text-slate-800">
                  Where RUS obtains actual knowledge of CSAM or suspected CSAE,
                  RUS will take appropriate action in accordance with these
                  standards, applicable law and our internal procedures.
                </p>
                <p className="mb-2 text-slate-700">This may include:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
                  <li>removing or restricting access to prohibited content;</li>
                  <li>suspending accounts;</li>
                  <li>permanently terminating accounts;</li>
                  <li>investigating reports;</li>
                  <li>
                    preserving relevant information where legally appropriate; and
                  </li>
                  <li>
                    reporting to relevant authorities where required by law.
                  </li>
                </ul>
              </section>

              <section className="bg-slate-100/70 border border-slate-200 rounded-xl p-5">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Reporting Child Safety Concerns
                </h2>
                <p className="mb-3">
                  Users can report concerns involving child safety, CSAE or CSAM
                  through the reporting functionality available at the top of the menu within the
                  RUS application (under{" "}
                  <code className="text-purple-800 bg-white border border-purple-200 px-2 py-0.5 rounded font-mono text-sm font-bold">
                    Account → Child Safety & CSAM Reporting
                  </code>
                  , or directly via user and post content reporting options).
                </p>
                <p className="mb-3">Reports should be submitted as soon as possible.</p>
                <p className="text-amber-800 font-medium bg-amber-50 border border-amber-200 p-3 rounded-lg">
                  ⚠️ Users should not download, copy, redistribute or otherwise share
                  suspected CSAM.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Enforcement</h2>
                <p className="mb-3">
                  RUS may immediately suspend or permanently terminate an account
                  where there is evidence of behaviour that violates these Child Safety
                  Standards.
                </p>
                <p>
                  We may also take action against users who attempt to circumvent our
                  safety controls or facilitate prohibited activity through another
                  account.
                </p>
              </section>

              <section className="border border-slate-200 bg-slate-50 rounded-xl p-5 sm:p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Child Safety Point of Contact
                </h2>
                <p className="mb-4">
                  RUS has designated a Child Safety Point of Contact responsible for
                  receiving and responding to child-safety-related communications.
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2 text-slate-800">
                  <p>
                    <strong className="text-slate-900">Name:</strong> Temiloluwa
                    Daniella Ojo
                  </p>
                  <p>
                    <strong className="text-slate-900">Organisation:</strong> RentUrStatus
                    (RUS) Limited
                  </p>
                  <p>
                    <strong className="text-slate-900">Role:</strong> Child Safety &
                    Compliance Officer
                  </p>
                  <p>
                    <strong className="text-slate-900">Email:</strong>{" "}
                    <a
                      href="mailto:childsafety@renturstatus.com"
                      className="text-pink-600 underline font-medium hover:text-pink-700"
                    >
                      childsafety@renturstatus.com
                    </a>
                  </p>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  The designated contact is responsible for child-safety
                  communications and is prepared to discuss RUS’s CSAE prevention,
                  reporting, review and enforcement procedures.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Compliance With Applicable Laws
                </h2>
                <p>
                  RUS is committed to complying with applicable child-safety and
                  online-safety laws and regulations in the jurisdictions in which it
                  operates. Where legally required, RUS will cooperate with relevant
                  authorities concerning suspected CSAE or CSAM.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Policy Updates</h2>
                <p>
                  RUS may update these Child Safety Standards periodically to reflect
                  changes to our platform, safety procedures, legal requirements and
                  applicable Google Play policies.
                </p>
              </section>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
              <span>© 2026 RentUrStatus (RUS) Limited. All rights reserved.</span>
              <Link
                href="/"
                className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
