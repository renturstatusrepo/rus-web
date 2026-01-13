import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-40 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 text-slate-900 hover:opacity-80 transition-opacity">
              <div className="relative size-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="RUS Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">
                RUS
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rent Ur Status - The Attentionomics platform where businesses pay for attention and people earn from it.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neutral-dark uppercase tracking-wider">Platform</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="#for-users"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                For Users
              </Link>
              <Link
                href="#for-business"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                For Business
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                How it Works
              </Link>
              <Link
                href="#testimonials"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                Testimonials
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neutral-dark uppercase tracking-wider">Company</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neutral-dark uppercase tracking-wider">Legal</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-slate-600 hover:text-magenta-pink transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2024 RUS (Rent Ur Status). All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              className="text-slate-400 hover:text-magenta-pink transition-colors"
              href="#"
              aria-label="Twitter"
            >
              <span className="material-symbols-outlined text-2xl">post</span>
            </a>
            <a
              className="text-slate-400 hover:text-magenta-pink transition-colors"
              href="#"
              aria-label="LinkedIn"
            >
              <span className="material-symbols-outlined text-2xl">work</span>
            </a>
            <a
              className="text-slate-400 hover:text-magenta-pink transition-colors"
              href="#"
              aria-label="Instagram"
            >
              <span className="material-symbols-outlined text-2xl">photo_camera</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

