"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  Send,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import confetti from "canvas-confetti";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/catalogData";

const FAQS = [
  {
    q: "What is your order cutoff time for next-morning delivery in Zanzibar?",
    a: "For next-morning delivery (between 05:00 AM and 07:30 AM) across Zanzibar (including Stone Town, Nungwi, Kendwa, and Paje), orders should be placed or confirmed by 18:00 (6:00 PM). Standing repeat orders run automatically without daily cutoff requirements.",
  },
  {
    q: "What wholesale egg options (Mayai) do you supply to hotels and bakeries?",
    a: "Mayai is our #1 bestselling commodity in Zanzibar. We supply Grade-A candled table eggs (Mayai ya Kisasa) and organic free-range eggs (Mayai ya Kienyeji) in standard 30-egg trays and heavy-duty 360-egg master crates. We provide standing daily deliveries to hotel breakfast buffets with a zero-crack guarantee.",
  },
  {
    q: "Which regions and beach resort zones in Zanzibar do you deliver to?",
    a: "We provide comprehensive island-wide distribution across Zanzibar: Stone Town, Urban West, Northern beach resorts (Nungwi, Kendwa), Eastern shores (Paje, Jambiani, Michamvi), North-East (Kiwengwa, Matemwe), and South (Fumba Town, Kizimkazi), with dedicated coastal connections to Dar es Salaam.",
  },
  {
    q: "What are the payment terms for commercial accounts?",
    a: "We support flexible corporate terms: Net-15 and Net-30 invoicing for vetted corporate clients, bank transfers, credit terms upon trade reference verification, and Cash/EFT on Delivery for trial orders.",
  },
  {
    q: "Can we combine fresh produce, eggs, beverages, dry grains, and hotel toilet paper on one invoice?",
    a: "Yes! That is our primary core value. Instead of dealing with separate market vendors for produce, beverages, dry rations, and cleaning supplies, you receive one consolidated morning delivery, one manifest, and one monthly invoice.",
  },
  {
    q: "How does your quality guarantee and replacement policy work?",
    a: "We inspect produce both at farm intake and before dispatch. When our driver arrives, your receiving manager checks the consignment. If any crate does not meet your specifications, we replace it on the same morning route run at no extra cost.",
  },
  {
    q: "Do you deliver bulk groceries, rice, beans, and cooking oil to construction sites?",
    a: "Yes. Our delivery fleet includes heavy-duty all-terrain distribution vehicles capable of accessing active civil works, industrial parks, and high-rise construction zones with safety-compliant PPE drivers.",
  },
];

export default function QuotePage() {
  const {
    cart,
    updateQuantity,
    setCart,
    totalCartCount,
    rfqNotes,
    setRfqNotes,
    rfqSector,
    setRfqSector,
  } = useCart();

  const [rfqName, setRfqName] = useState("");
  const [rfqCompany, setRfqCompany] = useState("");
  const [rfqContact, setRfqContact] = useState("");
  const [rfqFrequency, setRfqFrequency] = useState("Weekly Standing Order");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqReference, setRfqReference] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `MH-RFQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqReference(refCode);
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#287A74", "#f59e0b", "#059669", "#ffffff"],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-[#0b2524] to-[#287A74] py-16 text-white text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
          <Sparkles size={14} />
          <span>Fast B2B Response</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold sm:text-5xl">
          Request an Itemized<br className="hidden sm:block" /> Wholesale Quotation
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-200 text-sm sm:text-base">
          Tell us your expected quantities, delivery location, and schedule. Our commercial account desk
          will return an itemized quote with volume pricing within 15 minutes during business hours.
        </p>
      </section>

      {/* RFQ Form + Contact */}
      <section id="quote-section" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left: Contact Details */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-extrabold text-slate-900">
                Contact Our Procurement Desk
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#287A74]/10 text-[#287A74]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500">Primary Procurement Desk</span>
                    <a href="tel:+255779973333" className="font-bold text-slate-900 hover:text-[#287A74]">
                      0779 973 333 / +255 779 973 333
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500">Logistics & WhatsApp Support Hotline</span>
                    <a
                      href="https://wa.me/255776147097"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-700 hover:text-emerald-900"
                    >
                      0776 147 097 / +255 776 147 097
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#287A74]/10 text-[#287A74]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500">Official RFQ Inquiries</span>
                    <a href="mailto:quotes@mhsuppliers.co.tz" className="font-bold text-slate-900 hover:text-[#287A74]">
                      quotes@mhsuppliers.co.tz
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#287A74]/10 text-[#287A74]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500">Logistics & Distribution Center</span>
                    <span className="font-bold text-slate-900">Central Wholesale Terminal & Malindi Port, Stone Town, Zanzibar</span>
                  </div>
                </div>
              </div>

              {/* Testimonials mini */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Trusted by</h3>
                {[
                  {
                    quote: "MH General Suppliers completely transformed our morning kitchen prep. 25 crates arrive at 5:15 AM sharp.",
                    author: "Chef David M.", role: "Executive Head Chef", sector: "5-Star Kendwa Beachfront Resort",
                  },
                  {
                    quote: "Managing breakroom drinks and weekly fresh fruit for 140 staff used to consume 6 hours every Monday.",
                    author: "Sarah K.", role: "Head of Workplace Operations", sector: "Fumba Town Commercial Campus",
                  },
                ].map((t) => (
                  <div key={t.author} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs text-slate-700 italic leading-relaxed">"{t.quote}"</p>
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="font-bold text-sm text-slate-900 block">{t.author}</span>
                      <span className="text-xs text-[#287A74] block">{t.role}</span>
                      <span className="text-xs text-slate-400">{t.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: RFQ Form */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-slate-900">
                    Quotation Request Received!
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#287A74] bg-[#287A74]/10 py-1.5 px-3 rounded-lg inline-block">
                    Reference ID: {rfqReference}
                  </p>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{rfqName}</strong>. Our commercial team is
                    generating your itemized price breakdown for{" "}
                    <strong className="text-slate-900">{rfqCompany || "your facility"}</strong>. A confirmation
                    has been logged and we will contact you at <strong>{rfqContact}</strong>.
                  </p>
                  <button
                    onClick={() => { setIsSubmitted(false); setCart({}); }}
                    className="mt-6 rounded-xl bg-[#287A74] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#328e87] transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRfqSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-display text-lg font-bold text-slate-900">Commercial RFQ Form</h3>
                    <span className="text-xs font-semibold text-emerald-600">⚡ 15-Minute Response</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rfq-name" className="mb-1 block text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        id="rfq-name" type="text" required placeholder="e.g. Michael Temba"
                        value={rfqName} onChange={(e) => setRfqName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="rfq-company" className="mb-1 block text-xs font-bold text-slate-700">Company or Facility Name *</label>
                      <input
                        id="rfq-company" type="text" required placeholder="e.g. Serena Hotel or Alpha Site"
                        value={rfqCompany} onChange={(e) => setRfqCompany(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rfq-contact" className="mb-1 block text-xs font-bold text-slate-700">Phone Number or Email *</label>
                      <input
                        id="rfq-contact" type="text" required placeholder="e.g. 0779 973 333"
                        value={rfqContact} onChange={(e) => setRfqContact(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="rfq-sector" className="mb-1 block text-xs font-bold text-slate-700">Target Industry / Sector</label>
                      <select
                        id="rfq-sector" value={rfqSector} onChange={(e) => setRfqSector(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#287A74] focus:bg-white"
                      >
                        <option value="hotels">Hotel, Resort or Safari Lodge</option>
                        <option value="offices">Corporate Office / Campus</option>
                        <option value="construction">Construction Site / Industrial Camp</option>
                        <option value="catering">Restaurant or Commercial Catering</option>
                        <option value="other">Institutional / School / Hospital</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rfq-frequency" className="mb-1 block text-xs font-bold text-slate-700">Delivery Frequency Required</label>
                    <select
                      id="rfq-frequency" value={rfqFrequency} onChange={(e) => setRfqFrequency(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#287A74] focus:bg-white"
                    >
                      <option value="Daily Early Morning (5:30 AM)">Daily Early Morning (5:30 AM)</option>
                      <option value="Weekly Standing Order">Weekly Standing Order</option>
                      <option value="Bi-Weekly Restock">Bi-Weekly Restock</option>
                      <option value="One-Time Bulk Purchase Order">One-Time Bulk Purchase Order</option>
                    </select>
                  </div>

                  {totalCartCount > 0 && (
                    <div className="rounded-xl border border-[#287A74]/20 bg-[#287A74]/10 p-3 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#287A74]">
                        <span>Items Attached from Catalog:</span>
                        <span>{totalCartCount} items selected</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                        {Object.entries(cart).map(([pId, qty]) => {
                          const prod = PRODUCTS.find((p) => p.id === pId);
                          if (!prod) return null;
                          return (
                            <span
                              key={pId}
                              className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 border border-[#287A74]/20"
                            >
                              {prod.name} × {qty}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="rfq-notes" className="mb-1 block text-xs font-bold text-slate-700">
                      Product Requirements & Delivery Location *
                    </label>
                    <textarea
                      id="rfq-notes" rows={3} required
                      placeholder="List commodities needed (e.g. 5 crates tomatoes, 10 crates water, 2 drums 20L oil) and delivery address..."
                      value={rfqNotes} onChange={(e) => setRfqNotes(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 transition hover:bg-amber-400 hover:scale-[1.01]"
                  >
                    <Send size={14} />
                    <span>Send Requisition for Immediate Quote</span>
                  </button>

                  <p className="text-center text-[10px] text-slate-400">
                    Your details are kept strictly confidential. No spam guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider uppercase text-[#287A74]">Clarity & Compliance</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-2 text-sm text-slate-600">
              Clear answers on commercial terms, ordering windows, and cold-chain logistics.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="rounded-2xl border border-slate-200 bg-white/80 transition overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 hover:text-[#287A74]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#287A74]" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
