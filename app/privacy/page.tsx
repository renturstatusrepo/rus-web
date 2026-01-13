import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <article className="w-full max-w-4xl mx-auto px-6 lg:px-40 py-12 lg:py-20">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-magenta-pink transition-colors mb-6"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-dark mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600">
              <span className="font-semibold">Rent Ur Status (RUS) Limited</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Last updated: January 13, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-slate max-w-none mb-12">
            <p className="text-base leading-relaxed text-slate-700">
              Rent Ur Status (RUS) Limited ("RUS", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and related services (collectively, the "Platform").
            </p>
            <p className="text-base leading-relaxed text-slate-700 mt-4">
              By accessing or using RUS, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                1. Who We Are
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">Company Name:</span> Rent Ur Status (RUS) Limited
                </p>
                <p>
                  <span className="font-semibold">Registered Address:</span> Km 5 Lasu Igando Road, Igando, Lagos
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:info@renturstatus.com"
                    className="text-magenta-pink hover:underline"
                  >
                    info@renturstatus.com
                  </a>
                </p>
                <p className="mt-4">
                  RUS operates as a digital platform providing subscription-based services related to status, insights, reports, and digital engagement.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-6 text-slate-700">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    a. Personal Information You Provide
                  </h3>
                  <p className="mb-2">We may collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Account login details</li>
                    <li>Payment and subscription information (processed securely by third-party payment providers)</li>
                    <li>Any information you submit through forms, surveys, or customer support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    b. Automatically Collected Information
                  </h3>
                  <p className="mb-2">When you use our app or website, we may automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Device information (device type, operating system, app version)</li>
                    <li>IP address</li>
                    <li>Usage data (pages viewed, features used, session duration)</li>
                    <li>Log files and diagnostic data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    c. Third-Party Information
                  </h3>
                  <p className="mb-2">We may receive information from:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>App stores (Apple App Store, Google Play Store)</li>
                    <li>Payment processors</li>
                    <li>Analytics providers (e.g. performance and usage analytics)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-slate-700 mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                <li>Create and manage user accounts</li>
                <li>Provide and improve our services</li>
                <li>Process subscriptions and payments</li>
                <li>Communicate updates, support messages, and service notifications</li>
                <li>Personalise user experience</li>
                <li>Monitor usage and improve app performance</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                4. Legal Basis for Processing (GDPR)
              </h2>
              <p className="text-slate-700 mb-3">We process your personal data under the following legal bases:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                <li><span className="font-semibold">Consent</span> – where you have given clear permission</li>
                <li><span className="font-semibold">Contract</span> – where processing is necessary to provide our services</li>
                <li><span className="font-semibold">Legal obligation</span> – where required by law</li>
                <li><span className="font-semibold">Legitimate interests</span> – to improve our platform and prevent fraud</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                5. Sharing and Disclosure of Information
              </h2>
              <div className="space-y-3 text-slate-700">
                <p className="font-semibold">We do not sell your personal data.</p>
                <p>We may share information with:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Trusted service providers (hosting, analytics, payment processing)</li>
                  <li>Legal authorities if required by law</li>
                  <li>Business partners only where necessary to deliver services</li>
                </ul>
                <p className="mt-3">
                  All third parties are required to respect data confidentiality and comply with data protection laws.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                6. Data Retention
              </h2>
              <p className="text-slate-700 mb-3">We retain personal data only for as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                <li>Provide our services</li>
                <li>Meet legal, accounting, or regulatory requirements</li>
              </ul>
              <p className="text-slate-700 mt-3">
                When data is no longer required, it is securely deleted or anonymised.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                7. Data Security
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>We implement appropriate technical and organisational security measures to protect your information, including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Secure servers</li>
                  <li>Encrypted data transmission</li>
                  <li>Restricted access controls</li>
                </ul>
                <p className="mt-3">
                  However, no digital platform can guarantee 100% security.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                8. Your Rights (UK GDPR & GDPR)
              </h2>
              <p className="text-slate-700 mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Withdraw consent at any time</li>
                <li>Request data portability</li>
              </ul>
              <p className="text-slate-700 mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:info@renturstatus.com"
                  className="text-magenta-pink hover:underline"
                >
                  info@renturstatus.com
                </a>
                .
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-slate-700">
                RUS does not knowingly collect data from children under 13 (or under 16 where applicable by law).
                If we discover such data has been collected, we will delete it immediately.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                10. Third-Party Links & Services
              </h2>
              <p className="text-slate-700">
                Our platform may contain links to third-party websites or services.
                We are not responsible for their privacy practices and encourage users to review their policies.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                11. International Data Transfers
              </h2>
              <p className="text-slate-700">
                If your data is transferred outside the UK or EEA, we ensure appropriate safeguards are in place in line with GDPR requirements.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                12. App Store & Google Play Compliance Statements
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                <li>RUS collects only data necessary to provide its core functionality</li>
                <li>Data collection is transparently disclosed</li>
                <li>Users can request data deletion</li>
                <li>No hidden tracking or undisclosed data usage</li>
                <li>No data is sold to third parties</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p className="text-slate-700">
                We may update this Privacy Policy from time to time.
                Any changes will be posted on this page with an updated "Last updated" date.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                14. Contact Us
              </h2>
              <p className="text-slate-700 mb-3">
                If you have questions or concerns about this Privacy Policy or your data, contact us at:
              </p>
              <p className="text-slate-700">
                <a
                  href="mailto:info@renturstatus.com"
                  className="text-magenta-pink hover:underline font-semibold"
                >
                  📧 info@renturstatus.com
                </a>
              </p>
            </section>
          </div>

          {/* Back to Home Link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-magenta-pink hover:underline font-semibold"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

