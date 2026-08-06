import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Child Safety Standards & CSAM/CSAE Policy - RentUrStatus (RUS)",
  description:
    "Child Safety Standards, CSAM/CSAE Prohibition Policy, and Point of Contact for RentUrStatus (RUS) Limited.",
};

export default function ChildSafetyPolicy() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <article className="w-full max-w-4xl mx-auto px-6 lg:px-40 py-12 lg:py-20">
          {/* Back button */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-pink-600 transition-colors mb-6 font-medium"
            >
              <span className="text-lg">←</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Child Safety Standards & CSAM / CSAE Policy
            </h1>
            <p className="text-lg text-slate-600 font-semibold">
              RentUrStatus (RUS) Limited & RenturStatus Technologies
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Last updated: August 2026
            </p>
          </div>

          {/* Intro Box */}
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg mb-12">
            <p className="text-slate-800 font-medium text-base leading-relaxed">
              At <strong>RentUrStatus (RUS) Limited</strong> (and developer <strong>RenturStatus Technologies</strong>), we enforce a strict 
              <span className="text-purple-900 font-bold"> zero-tolerance policy</span> against any form of 
              <strong> Child Sexual Abuse Material (CSAM)</strong>, 
              <strong> Child Sexual Abuse and Exploitation (CSAE)</strong>, child grooming, child sexual exploitation, or any behavior that endangers minors.
            </p>
          </div>

          {/* Detailed Content */}
          <div className="space-y-10 text-slate-700">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                1. Explicit Prohibition of CSAM & CSAE
              </h2>
              <p className="mb-3">
                RentUrStatus explicitly prohibits the creation, upload, transmission, distribution, storage, or solicitation of Child Sexual Abuse Material (CSAM) and Child Sexual Abuse and Exploitation (CSAE). This prohibition applies unconditionally across our mobile application, website, and related digital services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                <li>Real, synthetic, generated, or depicted imagery, video, audio, or text representing child sexual exploitation or abuse.</li>
                <li>Online grooming behaviors, sexualized messaging targeting minors, or solicitation of intimate content from minors.</li>
                <li>Promoting, linking to, referencing, or advertising any third-party websites or services containing CSAM/CSAE content.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Moderation, Detection & Enforcement
              </h2>
              <p className="mb-3">
                To protect minors and uphold digital safety, RentUrStatus employs proactive moderation tools and immediate account enforcement workflows:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                <li><strong>Content Screening:</strong> Automated filtering and human review of flagged public media, user status updates, and uploaded content.</li>
                <li><strong>Immediate Account Termination:</strong> Any user account found uploading, sharing, or soliciting CSAM/CSAE is immediately and permanently banned without prior warning.</li>
                <li><strong>Content Takedown:</strong> Offending content is purged immediately from active systems while evidentiary logs are preserved for law enforcement reporting.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Mandatory Law Enforcement Reporting
              </h2>
              <p>
                In strict compliance with global digital safety regulations, RentUrStatus reports all confirmed incidents of CSAM/CSAE to the 
                <strong> National Center for Missing & Exploited Children (NCMEC)</strong> and appropriate international law enforcement agencies. We fully cooperate with police and judicial authorities investigating child exploitation crimes.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. In-App & Direct Reporting Channels
              </h2>
              <p className="mb-3">
                We encourage our user community to immediately flag any suspicious or inappropriate content involving minors:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                <li><strong>In-App Flagging:</strong> Tap the "Report" button on any user post, campaign, status, or user profile.</li>
                <li><strong>Direct Email Contact:</strong> Send urgent child safety concerns directly to our Child Safety Officer at the email listed below.</li>
              </ul>
            </section>

            {/* Section 5 - Point of Contact */}
            <section className="bg-white border-2 border-purple-600 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-purple-900 mb-3">
                Child Safety Point of Contact
              </h2>
              <p className="text-slate-700 mb-4">
                Our designated Child Safety Officer is prepared to address compliance inquiries, child protection practices, and urgent safety reports.
              </p>
              <div className="space-y-2 text-slate-800 text-sm font-medium">
                <p><span className="text-slate-500">App Name:</span> RentUrStatus (RUS)</p>
                <p><span className="text-slate-500">Developer / Company:</span> RentUrStatus (RUS) Limited / RenturStatus Technologies</p>
                <p>
                  <span className="text-slate-500">Child Safety Contact Email:</span>{" "}
                  <a
                    href="mailto:childsafety@renturstatus.com"
                    className="text-purple-700 hover:underline font-bold"
                  >
                    childsafety@renturstatus.com
                  </a>{" "}
                  (or{" "}
                  <a
                    href="mailto:info@renturstatus.com"
                    className="text-purple-700 hover:underline font-bold"
                  >
                    info@renturstatus.com
                  </a>)
                </p>
                <p><span className="text-slate-500">Address:</span> Km 5 Lasu Igando Road, Igando, Lagos, Nigeria</p>
                <p><span className="text-slate-500">Urgent Response SLA:</span> Reports reviewed within 24 hours</p>
              </div>
            </section>
          </div>

          {/* Footer Back Link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-purple-700 hover:underline font-semibold"
            >
              <span>← Back to Home</span>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
