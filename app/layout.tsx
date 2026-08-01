import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";
import FontLoader from "@/components/FontLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentUrStatus (RUS) - Mobile App Available | Web App Coming Soon",
  description: "The RentUrStatus Web Application is coming soon! Download our official mobile app on Android & iOS to start monetizing your social status and running ad campaigns today.",
  keywords: ["RentUrStatus", "RUS", "Monetize WhatsApp Status", "Earn Money Online", "Status Advertising", "Mobile App"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${notoSans.variable} bg-background-light text-slate-900 font-display antialiased overflow-x-hidden`}
      >
        <FontLoader />
        {children}
      </body>
    </html>
  );
}
