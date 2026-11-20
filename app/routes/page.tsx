import type { Metadata } from "next";
import RoutesPage from "@/components/pages/RoutesPage";

export const metadata: Metadata = {
  title: "Island Delivery Routes",
  description:
    "Daily cold-chain delivery corridors across Zanzibar — Nungwi, Kendwa, Paje, Jambiani, Stone Town, and Pemba Island.",
};

export default function Page() {
  return <RoutesPage />;
}
