import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AccountDeletion() {
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
                            Account Deletion
                        </h1>
                        <p className="text-lg text-slate-600">
                            <span className="font-semibold">Rent Ur Status (RUS) Limited</span>
                        </p>
                        <p className="text-sm text-slate-500 mt-2">
                            Last updated: January 28, 2026
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="prose prose-slate max-w-none mb-12">
                        <p className="text-base leading-relaxed text-slate-700">
                            At Rent Ur Status (RUS), we respect your right to control your personal data.
                            If you wish to delete your account and associated data, you can do so through
                            the methods outlined below.
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-10">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                                1. How to Delete Your Account
                            </h2>
                            <div className="space-y-6 text-slate-700">
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-dark mb-3">
                                        Option 1: Delete from the Mobile App
                                    </h3>
                                    <p className="mb-2">Follow these steps to delete your account directly from the RUS mobile app:</p>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>Open the RUS app and log in to your account</li>
                                        <li>Navigate to <span className="font-semibold">Profile</span> → <span className="font-semibold">Settings</span></li>
                                        <li>Scroll down and tap on <span className="font-semibold text-red-600">"Delete Account"</span></li>
                                        <li>Confirm your decision when prompted</li>
                                        <li>Your account and associated data will be permanently deleted</li>
                                    </ol>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-dark mb-3">
                                        Option 2: Request Deletion via Email
                                    </h3>
                                    <p className="mb-2">If you prefer, you can request account deletion by contacting us:</p>
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-3">
                                        <p className="mb-2">
                                            <span className="font-semibold">Email:</span>{" "}
                                            <a
                                                href="mailto:info@renturstatus.com?subject=Account%20Deletion%20Request"
                                                className="text-magenta-pink hover:underline"
                                            >
                                                info@renturstatus.com
                                            </a>
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">Subject:</span> Account Deletion Request
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            Please include your registered email address and username in your request.
                                        </p>
                                    </div>
                                    <p className="mt-3 text-sm text-slate-600">
                                        We will process your request within <span className="font-semibold">7 business days</span> and
                                        send you a confirmation email once your account has been deleted.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                                2. What Happens When You Delete Your Account
                            </h2>
                            <div className="space-y-3 text-slate-700">
                                <p>When you delete your account, the following data will be permanently removed:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Your profile information (name, email, phone number, username)</li>
                                    <li>Account login credentials</li>
                                    <li>Subscription and payment history</li>
                                    <li>User-generated content (posts, comments, interactions)</li>
                                    <li>Preferences and settings</li>
                                    <li>Wallet and transaction history</li>
                                </ul>
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                                    <p className="font-semibold text-amber-900 mb-2">⚠️ Important Notice</p>
                                    <p className="text-amber-800 text-sm">
                                        Account deletion is <span className="font-semibold">permanent and irreversible</span>.
                                        Once deleted, you will not be able to recover your account, data, or any associated content.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                                3. Data Retention After Deletion
                            </h2>
                            <div className="space-y-3 text-slate-700">
                                <p>
                                    While we delete most of your data immediately, some information may be retained for a limited period:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>
                                        <span className="font-semibold">Legal compliance:</span> We may retain certain data to comply with
                                        legal, tax, or regulatory obligations (typically up to 7 years)
                                    </li>
                                    <li>
                                        <span className="font-semibold">Fraud prevention:</span> Information related to security, fraud
                                        prevention, or dispute resolution may be retained
                                    </li>
                                    <li>
                                        <span className="font-semibold">Anonymized data:</span> Some data may be anonymized and used for
                                        analytics or research purposes
                                    </li>
                                </ul>
                                <p className="mt-3">
                                    After the retention period, all remaining data will be permanently deleted from our systems.
                                </p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                                4. Active Subscriptions
                            </h2>
                            <div className="space-y-3 text-slate-700">
                                <p>
                                    If you have an active subscription at the time of account deletion:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Your subscription will be cancelled immediately</li>
                                    <li>You will not receive a refund for any unused subscription period</li>
                                    <li>We recommend cancelling your subscription before deleting your account if you wish to use the service until the end of your billing cycle</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                                5. Your Rights Under GDPR
                            </h2>
                            <div className="space-y-3 text-slate-700">
                                <p>
                                    Under the General Data Protection Regulation (GDPR) and UK GDPR, you have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><span className="font-semibold">Right to erasure:</span> Request deletion of your personal data</li>
                                    <li><span className="font-semibold">Right to access:</span> Request a copy of your data before deletion</li>
                                    <li><span className="font-semibold">Right to data portability:</span> Receive your data in a portable format</li>
                                </ul>
                                <p className="mt-3">
                                    To exercise these rights, please contact us at{" "}
                                    <a
                                        href="mailto:info@renturstatus.com"
                                        className="text-magenta-pink hover:underline"
                                    >
                                        info@renturstatus.com
                                    </a>
                                    .
                                </p>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                                6. Need Help?
                            </h2>
                            <div className="space-y-3 text-slate-700">
                                <p>
                                    If you have questions about account deletion or need assistance, please contact our support team:
                                </p>
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-3">
                                    <p className="mb-2">
                                        <span className="font-semibold">📧 Email:</span>{" "}
                                        <a
                                            href="mailto:info@renturstatus.com"
                                            className="text-magenta-pink hover:underline"
                                        >
                                            info@renturstatus.com
                                        </a>
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        We typically respond within 24-48 hours during business days.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                                7. Related Policies
                            </h2>
                            <div className="space-y-2 text-slate-700">
                                <p>For more information about how we handle your data, please review:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>
                                        <Link href="/privacy" className="text-magenta-pink hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms" className="text-magenta-pink hover:underline">
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
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
