import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CookiePolicy() {
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
              Cookie Policy
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
              This Cookie Policy explains how Rent Ur Status (RUS) Limited ("RUS", "we", "our", or "us") uses cookies and similar tracking technologies on our mobile application, website, and related services (collectively, the "Platform").
            </p>
            <p className="text-base leading-relaxed text-slate-700 mt-4">
              By using our Platform, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should disable cookies in your browser settings or refrain from using our Platform.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                1. What Are Cookies?
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p>
                  Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps us provide you with a better experience when you browse our Platform and allows us to improve our services.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                2. Types of Cookies We Use
              </h2>
              <div className="space-y-6 text-slate-700">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    a. Essential Cookies
                  </h3>
                  <p className="mb-2">
                    These cookies are necessary for the Platform to function properly. They enable core functionality such as:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>User authentication and login sessions</li>
                    <li>Security features and fraud prevention</li>
                    <li>Remembering your preferences and settings</li>
                    <li>Load balancing and website performance</li>
                  </ul>
                  <p className="mt-3">
                    These cookies cannot be disabled as they are essential for the Platform to work.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    b. Performance and Analytics Cookies
                  </h3>
                  <p className="mb-2">
                    These cookies help us understand how visitors interact with our Platform by collecting and reporting information anonymously. They allow us to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Count visitors and track page views</li>
                    <li>Understand how users navigate the Platform</li>
                    <li>Identify which features are most popular</li>
                    <li>Improve the performance and usability of the Platform</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    c. Functionality Cookies
                  </h3>
                  <p className="mb-2">
                    These cookies enable the Platform to provide enhanced functionality and personalization. They may:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Remember your language preferences</li>
                    <li>Store your account settings and preferences</li>
                    <li>Remember information you've entered in forms</li>
                    <li>Provide personalized content and recommendations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    d. Targeting and Advertising Cookies
                  </h3>
                  <p className="mb-2">
                    These cookies are used to deliver relevant advertisements and track campaign performance. They may:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Track your browsing habits across different websites</li>
                    <li>Build a profile of your interests</li>
                    <li>Show you relevant advertisements</li>
                    <li>Measure the effectiveness of advertising campaigns</li>
                  </ul>
                  <p className="mt-3">
                    These cookies are typically set by third-party advertising networks with our permission.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                3. How We Use Cookies
              </h2>
              <div className="space-y-3 text-slate-700">
                <p className="mb-3">We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><span className="font-semibold">Authentication:</span> To keep you logged in and maintain your session</li>
                  <li><span className="font-semibold">Security:</span> To protect against fraud and unauthorized access</li>
                  <li><span className="font-semibold">Preferences:</span> To remember your settings and preferences</li>
                  <li><span className="font-semibold">Analytics:</span> To understand how users interact with our Platform</li>
                  <li><span className="font-semibold">Performance:</span> To optimize the speed and functionality of the Platform</li>
                  <li><span className="font-semibold">Advertising:</span> To deliver relevant ads and measure campaign effectiveness</li>
                  <li><span className="font-semibold">Personalization:</span> To provide customized content and features</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                4. Third-Party Cookies
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and provide other services. These third parties may include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Analytics providers (e.g., Google Analytics)</li>
                  <li>Advertising networks</li>
                  <li>Social media platforms</li>
                  <li>Payment processors</li>
                  <li>Content delivery networks</li>
                </ul>
                <p className="mt-3">
                  These third parties may use cookies to collect information about your online activities across different websites. We do not control these third-party cookies, and their use is governed by the privacy policies of the respective third parties.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                5. Cookie Duration
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  <span className="font-semibold">Session Cookies:</span> These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while you navigate the Platform.
                </p>
                <p>
                  <span className="font-semibold">Persistent Cookies:</span> These cookies remain on your device for a set period or until you delete them. They are used to remember your preferences and settings for future visits.
                </p>
                <p>
                  The duration of persistent cookies varies depending on their purpose. Some may last for a few days, while others may remain for up to two years or until you manually delete them.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                6. Managing Your Cookie Preferences
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
                </p>
                <p className="mb-3">
                  <span className="font-semibold">Browser Settings:</span> You can control cookies through your browser settings. Here are links to instructions for popular browsers:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Google Chrome</li>
                  <li>Mozilla Firefox</li>
                  <li>Apple Safari</li>
                  <li>Microsoft Edge</li>
                  <li>Opera</li>
                </ul>
                <p className="mt-3">
                  <span className="font-semibold">Important Note:</span> If you choose to disable cookies, some features of the Platform may not function properly or may be unavailable. Essential cookies cannot be disabled as they are necessary for the Platform to work.
                </p>
                <p>
                  <span className="font-semibold">Mobile Devices:</span> On mobile devices, you can manage cookies through your device settings or within the app settings, depending on the platform.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                7. Do Not Track Signals
              </h2>
              <p className="text-slate-700">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted. As a result, our Platform does not currently respond to DNT browser signals or mechanisms.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                8. Updates to This Cookie Policy
              </h2>
              <p className="text-slate-700">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Cookie Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-slate-700 mt-3">
                Your continued use of the Platform after such changes constitutes your acceptance of the updated Cookie Policy.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                9. Additional Information
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  For more information about how we collect, use, and protect your personal information, please review our{" "}
                  <Link href="/privacy" className="text-magenta-pink hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p>
                  For information about your rights and responsibilities when using our Platform, please review our{" "}
                  <Link href="/terms" className="text-magenta-pink hover:underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                10. Contact Us
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>
                  If you have any questions about this Cookie Policy or our use of cookies, please contact us at:
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

