import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative size-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="RUS Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-xl text-white">
                RentUrStatus
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              RentUrStatus (RUS) is the attentionomics platform where people earn from their social status and businesses access engaged audiences.
            </p>
          </div>

          {/* Mobile App Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Mobile Application</h3>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-pink-400 transition-colors"
            >
              Get on Google Play Store
            </a>
            <span className="text-xs text-purple-400 font-semibold">
              Web App: Coming Soon 🚀
            </span>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Legal & Compliance</h3>
            <Link
              href="/privacy"
              className="text-xs text-slate-400 hover:text-pink-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-400 hover:text-pink-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-slate-400 hover:text-pink-400 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/account-deletion"
              className="text-xs text-slate-400 hover:text-pink-400 transition-colors"
            >
              Account Deletion
            </Link>
          </div>

          {/* Support Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Support</h3>
            <p className="text-xs text-slate-400">
              Need assistance or have feedback? Reach out to our team directly from the mobile app or via support.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RentUrStatus (RUS). All rights reserved.</p>
          <p>Designed for iOS & Android</p>
        </div>
      </div>
    </footer>
  );
}
