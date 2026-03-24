import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEV — Offres d'emploi",
  description: "Trouvez votre prochain poste tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#f5f3ef] font-[var(--font-inter)]">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          <Link href="/mentions" className="hover:text-[#2563eb] transition-colors">
            Mentions légales
          </Link>
        </footer>
      </body>
    </html>
  );
}
