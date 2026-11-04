import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import JsonLd from "@/components/JsonLd";

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

export const viewport: Viewport = {
  themeColor: "#0b2524",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mhsuppliers.co.tz"),
  title: {
    default:
      "MH General Suppliers | Zanzibar Wholesale Food, Fresh Eggs & Commercial Supplies",
    template: "%s | MH General Suppliers",
  },
  description:
    "Leading wholesale B2B distributor in Zanzibar & Tanzania. Direct farm-fresh eggs (Mayai ya Kisasa na Kienyeji), crisp vegetables, seasonal fruits, beverages, bulk rice, beans, cooking oil, and hotel toilet paper & tissues delivered daily to hotels, beach resorts, corporate offices, restaurants, and construction sites.",
  applicationName: "MH General Suppliers",
  authors: [{ name: "MH General Suppliers", url: "https://mhsuppliers.co.tz" }],
  generator: "Next.js",
  keywords: [
    // Brand & Identity
    "MH General Suppliers",
    "MH Suppliers Zanzibar",
    "MH General Supplies Tanzania",
    // Core Commodity: Eggs (Top Seller)
    "mayai ya jumla Zanzibar",
    "fresh eggs wholesale Zanzibar",
    "commercial egg supplier Zanzibar",
    "mayai ya kisasa wholesale",
    "mayai ya kienyeji Zanzibar",
    "hotel breakfast egg delivery Zanzibar",
    "egg tray wholesale Zanzibar",
    // Fresh Produce & Fruits
    "fresh vegetables wholesale Zanzibar",
    "wholesale produce Stone Town",
    "hotel food supplier Zanzibar",
    "Zanzibar resort fresh vegetables delivery",
    "tomatoes wholesale Zanzibar",
    "onions and potatoes supplier Zanzibar",
    "seasonal fruits supplier Zanzibar",
    "fresh pineapples and bananas wholesale Zanzibar",
    // Staples, Grains & Oils
    "bulk cooking oil Zanzibar",
    "sunflower oil 20L wholesale",
    "wholesale rice and beans Tanzania",
    "aromatic Basmati rice 25kg Zanzibar",
    "commercial baking flour supplier",
    // Beverages & Water
    "soft drinks distributor Zanzibar",
    "bottled water wholesale Zanzibar",
    "mineral water 500ml bulk crates",
    // Hospitality Hygiene & Paper
    "hotel toilet paper wholesale Zanzibar",
    "resort tissue paper supplier",
    "commercial facial tissues bulk",
    // Sectors & Geography
    "hotel food supplier Nungwi",
    "resort supplies Kendwa",
    "hotel food delivery Paje Jambiani",
    "Stone Town commercial food distributor",
    "construction site food supply Zanzibar",
    "office pantry supplier Zanzibar",
    "restaurant food supplier Unguja",
    "Zanzibar B2B food distributor",
  ],
  creator: "MH General Suppliers",
  publisher: "MH General Suppliers",
  category: "Wholesale Food Distribution",
  classification:
    "B2B Wholesale Food, Fresh Eggs, Beverages and Commercial Supplies",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.jpeg", type: "image/jpeg" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/logo.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: ["/logo.jpeg"],
  },
  openGraph: {
    type: "website",
    locale: "en_TZ",
    alternateLocale: ["sw_TZ"],
    url: "https://mhsuppliers.co.tz",
    siteName: "MH General Suppliers",
    title:
      "MH General Suppliers | Zanzibar Wholesale Food, Fresh Eggs & Hotel Supplies",
    description:
      "Premier wholesale distributor of fresh farm eggs (Mayai), vegetables, fruits, soft drinks, rice, beans, cooking oil, and hotel toilet paper & tissue supplies in Zanzibar.",
    images: [
      {
        url: "/images/produce.jpg",
        width: 1200,
        height: 675,
        alt: "MH General Suppliers Zanzibar - Farm Fresh Produce & Commercial Supplies",
      },
      {
        url: "/images/groceries.jpg",
        width: 1200,
        height: 675,
        alt: "MH General Suppliers - Wholesale Grains, Eggs, Beverages and Cooking Oils",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "MH General Suppliers | Zanzibar Wholesale Food, Fresh Eggs & Hotel Supplies",
    description:
      "Reliable daily B2B wholesale delivery of fresh eggs (Mayai), produce, beverages, dry grains, and hotel toilet paper across Zanzibar resorts & businesses.",
    images: ["/images/produce.jpg"],
    creator: "@mhsuppliers",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
    url: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased selection:bg-amber-400 selection:text-slate-900">
        <SmoothScroll>
          <CartProvider>{children}</CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
