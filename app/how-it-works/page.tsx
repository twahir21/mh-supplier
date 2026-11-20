import type { Metadata } from "next";
import HowItWorksPage from "@/components/pages/HowItWorksPage";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Three simple steps from your requisition to dock delivery — MH General Suppliers Zanzibar wholesale procurement process.",
};

export default function Page() {
  return <HowItWorksPage />;
}
