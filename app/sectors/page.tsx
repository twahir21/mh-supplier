import type { Metadata } from "next";
import SectorsPage from "@/components/pages/SectorsPage";

export const metadata: Metadata = {
  title: "Sectors We Serve",
  description:
    "Tailored wholesale food supply for luxury hotels, resorts, corporate offices, construction sites, and restaurants in Zanzibar.",
};

export default function Page() {
  return <SectorsPage />;
}
