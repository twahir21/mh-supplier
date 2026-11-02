import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhgeneralsuppliers.com"),
  title: "MH General Suppliers | Fresh Produce, Beverages & Bulk Commercial Supplies",
  description:
    "Leading wholesale distributor of farm-fresh vegetables, seasonal fruits, soft drinks, groceries, snacks, and cooking oils to hotels, corporate offices, and construction sites.",
  keywords: [
    "MH General Suppliers",
    "wholesale food supplier",
    "fresh vegetables wholesale",
    "hotel food supplier",
    "office pantry supplier",
    "construction site food supply",
    "bulk cooking oil",
    "soft drinks distributor",
  ],
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "MH General Suppliers | Commercial Food & Operations Supply",
    description:
      "Wholesale fresh vegetables, fruits, soft drinks, groceries, snacks, and cooking oils for hotels, offices, and construction sites.",
    images: [{ url: "/images/produce.jpg", width: 1200, height: 675, alt: "MH General Suppliers Produce" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}>
      <body className="antialiased selection:bg-amber-400 selection:text-slate-900">{children}</body>
    </html>
  );
}
