import type { Metadata } from "next";
import QuotePage from "@/components/pages/QuotePage";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit your wholesale requisition to MH General Suppliers. Receive an itemized quotation within 15 minutes during business hours.",
};

export default function Page() {
  return <QuotePage />;
}
