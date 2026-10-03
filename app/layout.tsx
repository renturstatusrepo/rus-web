import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FontLoader from "@/components/FontLoader";

// One variable font for the whole site: every weight is a real cut (no faux bold). latin-ext carries ₦,
// and browsers only fetch it on pages that show a price.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RUS: Speed Marketing Platform",
  description: "Monetize your status, shop verified merchant stores and run speed marketing campaigns with RUS.",
  keywords: ["RUS", "RentUrStatus", "Monetize WhatsApp Status", "Earn Money Online", "Status Advertising", "Mobile App"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`bg-background-light text-slate-900 font-sans antialiased overflow-x-hidden`}
      >
        <FontLoader />
        {children}
      </body>
    </html>
  );
}
