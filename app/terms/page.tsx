import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsOfService() {
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
              Terms of Service
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
              These Terms of Service ("Terms") govern your access to and use of Rent Ur Status (RUS) Limited's ("RUS", "we", "our", or "us") mobile application, website, and related services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms.
            </p>
            <p className="text-base leading-relaxed text-slate-700 mt-4">
              If you do not agree to these Terms, please do not use our Platform.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  By creating an account, accessing, or using the RUS Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are using the Platform on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                2. Description of Service
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  RUS is a digital platform that connects businesses with users to facilitate attention-based marketing campaigns. Users can earn compensation by engaging with and sharing content, while businesses can reach their target audience through authentic human attention.
                </p>
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time, with or without notice.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                3. User Accounts
              </h2>
              <div className="space-y-3 text-slate-700">
                <p className="mb-3">To use certain features of the Platform, you must:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Create an account with accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Be at least 13 years of age (or 16 where applicable by law)</li>
                  <li>Notify us immediately of any unauthorized access to your account</li>
                </ul>
                <p className="mt-3">
                  You are responsible for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these Terms.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                4. User Conduct
              </h2>
              <div className="space-y-3 text-slate-700">
                <p className="mb-3">You agree not to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the Platform for any illegal or unauthorized purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others, including intellectual property rights</li>
                  <li>Post false, misleading, or fraudulent content</li>
                  <li>Engage in spam, harassment, or abusive behavior</li>
                  <li>Attempt to gain unauthorized access to the Platform or other users' accounts</li>
                  <li>Use automated systems to manipulate the Platform or campaigns</li>
                  <li>Interfere with or disrupt the Platform's operation</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                5. Content and Intellectual Property
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">Your Content:</span> You retain ownership of content you post on the Platform. By posting content, you grant RUS a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content in connection with the Platform's services.
                </p>
                <p>
                  <span className="font-semibold">RUS Content:</span> All content, features, and functionality of the Platform, including but not limited to text, graphics, logos, and software, are owned by RUS or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not copy, modify, distribute, or create derivative works from any RUS content without our express written permission.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                6. Payments and Earnings
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">User Earnings:</span> Users may earn compensation for eligible activities on the Platform. Earnings are subject to verification and may be withheld if we determine that activities violate these Terms or our policies.
                </p>
                <p>
                  <span className="font-semibold">Business Payments:</span> Businesses are responsible for payment of campaign fees as agreed upon when creating campaigns. All fees are non-refundable unless otherwise stated or required by law.
                </p>
                <p>
                  <span className="font-semibold">Payment Processing:</span> Payments are processed through third-party payment providers. We are not responsible for payment processing errors or delays caused by these providers.
                </p>
                <p>
                  We reserve the right to modify pricing, payment terms, and earning structures with reasonable notice to users.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                7. Campaigns and Advertising
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  Businesses using the Platform are responsible for ensuring that their campaigns comply with all applicable laws, regulations, and advertising standards. RUS reserves the right to reject, suspend, or remove any campaign that violates these Terms or our policies.
                </p>
                <p>
                  Users engaging with campaigns must do so authentically and in accordance with campaign requirements. Fraudulent or inauthentic engagement may result in account suspension or termination.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                8. Disclaimers and Limitation of Liability
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">Platform Availability:</span> The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the Platform will be uninterrupted, error-free, or secure.
                </p>
                <p>
                  <span className="font-semibold">Limitation of Liability:</span> To the maximum extent permitted by law, RUS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Platform.
                </p>
                <p>
                  Our total liability to you for any claims arising from or related to the Platform shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                9. Indemnification
              </h2>
              <p className="text-slate-700">
                You agree to indemnify, defend, and hold harmless RUS, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your use of the Platform, your content, or your violation of these Terms.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                10. Termination
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">By You:</span> You may terminate your account at any time by contacting us or using the account deletion features in the Platform.
                </p>
                <p>
                  <span className="font-semibold">By Us:</span> We may suspend or terminate your account immediately, without prior notice, if you violate these Terms, engage in fraudulent activity, or for any other reason we deem necessary to protect the Platform or other users.
                </p>
                <p>
                  Upon termination, your right to use the Platform will cease immediately. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, disclaimers, and limitations of liability.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                11. Dispute Resolution
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">Governing Law:</span> These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
                </p>
                <p>
                  <span className="font-semibold">Dispute Resolution:</span> Any disputes arising out of or relating to these Terms or the Platform shall be resolved through good faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with Nigerian arbitration laws, or through the courts of competent jurisdiction in Lagos, Nigeria.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-slate-700">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on the Platform and updating the "Last updated" date. Your continued use of the Platform after such changes constitutes your acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using the Platform.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                13. Severability
              </h2>
              <p className="text-slate-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                14. Entire Agreement
              </h2>
              <p className="text-slate-700">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and RUS regarding your use of the Platform and supersede all prior agreements and understandings.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                15. Contact Information
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p>
                  <span className="font-semibold">Rent Ur Status (RUS) Limited</span>
                </p>
                <p>
                  <span className="font-semibold">Address:</span> Km 5 Lasu Igando Road, Igando, Lagos
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
              </div>
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

