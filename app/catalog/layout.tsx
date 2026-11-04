import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Wholesale Catalog | Fresh Eggs, Produce, Rice & Bulk Supplies Zanzibar",
  description:
    "Browse wholesale pricing and commercial pack sizes for farm-fresh eggs (Mayai ya Kisasa & Kienyeji), crisp vegetables, tropical fruits, beverages, bulk rice, beans, cooking oil, and hotel toilet paper & tissues in Zanzibar. Request an instant RFQ.",
  keywords: [
    "wholesale catalog Zanzibar",
    "mayai ya jumla catalog Zanzibar",
    "fresh eggs price list Zanzibar",
    "hotel food supplier catalog",
    "fresh vegetables wholesale Stone Town",
    "bulk rice and beans Zanzibar",
    "cooking oil 20L wholesale price",
    "hotel toilet paper supplies Zanzibar",
    "commercial food RFQ Zanzibar",
    "Nungwi hotel food supplies",
    "Paje resort wholesale catalog",
  ],
  alternates: {
    canonical: "/catalog",
  },
  openGraph: {
    title: "Wholesale Catalog | MH General Suppliers Zanzibar",
    description:
      "Explore commercial food, fresh eggs (Mayai), produce, beverages, dry grains, and hospitality supplies in Zanzibar with next-morning delivery.",
    url: "/catalog",
    images: [
      {
        url: "/images/groceries.jpg",
        width: 1200,
        height: 675,
        alt: "MH General Suppliers Commercial Wholesale Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Wholesale Catalog | MH General Suppliers Zanzibar",
    description:
      "Instant RFQs for fresh eggs, vegetables, fruits, grains, beverages, and hotel toilet paper in Zanzibar.",
    images: ["/images/groceries.jpg"],
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

