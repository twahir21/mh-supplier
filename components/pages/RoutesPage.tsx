"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Phone,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CORRIDORS = [
  {
    emoji: "🏖️",
    badge: "05:00 AM Dawn Drop",
    badgeColor: "bg-amber-50 border-amber-200/60 text-amber-800",
    accent: "from-amber-400 to-emerald-500",
    title: "North Shore Resort Route",
    subtitle: "Nungwi & Kendwa Beach",
    desc: "Daily priority delivery to 5-star beachfront resorts, ocean villas, and executive kitchens before breakfast buffet preparations begin.",
    freight: "Mayai ya Kisasa, Salad Greens, Ripe Pineapples, Cooking Oils.",
    hubs: "Kendwa Rocks, Nungwi Bay, Matemwe.",
  },
  {
    emoji: "🏛️",
    badge: "15m Rapid Dispatch",
    badgeColor: "bg-emerald-50 border-emerald-200/60 text-emerald-800",
    accent: "from-[#287A74] to-cyan-500",
    title: "Stone Town & Urban Hub",
    subtitle: "Port, Malindi & Fumba",
    desc: "Multiple intra-day supply runs for heritage boutique hotels, government pantries, corporate offices, maritime provisioning, and Fumba Town.",
    freight: "Basmati Rice, Cured Onions, Drinking Water, Restroom Tissues.",
    hubs: "Forodhani, Malindi Port, Chukwani, Fumba.",
  },
  {
    emoji: "🏄‍♂️",
    badge: "Daily 06:30 AM Route",
    badgeColor: "bg-teal-50 border-teal-200/60 text-teal-800",
    accent: "from-teal-400 to-amber-500",
    title: "East & South Coast Route",
    subtitle: "Paje, Jambiani & Kiwengwa",
    desc: "Refrigerated transit catering to eco-lodges, kitesurfing camps, boutique villas, and seafood grill houses along the turquoise coast.",
    freight: "Mayai ya Kienyeji, Tropical Melons, Soft Drinks, Bakery Flour.",
    hubs: "Kiwengwa, Paje Strip, Jambiani, Kizimkazi.",
  },
  {
    emoji: "⛵",
    badge: "Scheduled Maritime",
    badgeColor: "bg-blue-50 border-blue-200/60 text-blue-800",
    accent: "from-blue-500 to-emerald-400",
    title: "Pemba Island Maritime Link",
    subtitle: "Chake Chake, Wete & Mkoani",
    desc: "Scheduled ferry container crates and consolidated institutional consignments to Pemba Island lodges, diving resorts, and camps.",
    freight: "Heavy Dry Goods, 20L Cooking Oil Cans, Wholesale Water.",
    hubs: "Chake Chake Port, Wete, Mkoani.",
  },
];

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b2524] to-[#287A74] py-20 text-white text-center px-4">
        <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay">
          <Image src="/images/zanzibar-east-shore.jpg" alt="" fill className="object-cover object-center" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/30 bg-[#0d9488]/20 px-4 py-1.5 text-xs font-bold text-emerald-200 mb-4">
            🌴 Karibu Zanzibar • Visiwani Cold-Chain Express
          </div>
          <h1 className="font-display text-3xl font-extrabold sm:text-5xl">
            Island-Wide Logistics Across<br className="hidden sm:block" /> Unguja & Pemba
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200 text-sm sm:text-base">
            From the historic docks of Stone Town to the white sandy shorelines of Nungwi and Jambiani,
            our multi-temperature fleet powers daily resort kitchens, restaurants, villas, and construction camps.
          </p>
        </div>
      </section>

      {/* Corridor Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORRIDORS.map((corridor) => (
              <div
                key={corridor.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#0d9488] hover:shadow-xl"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${corridor.accent}`} />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{corridor.emoji}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${corridor.badgeColor}`}>
                      {corridor.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-[#0b4f48]">
                    {corridor.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#0d9488]">{corridor.subtitle}</span>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">{corridor.desc}</p>
                  <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500 space-y-1">
                    <p><strong className="text-slate-700">Top Freight:</strong> {corridor.freight}</p>
                    <p><strong className="text-slate-700">Key Hubs:</strong> {corridor.hubs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Banner */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#0b2524] to-[#1a5a55] p-6 text-white sm:flex-row sm:px-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400 text-slate-950 font-bold">
                <Truck size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Zanzibar Fleet Dispatch Desk
                </span>
                <p className="text-xs text-slate-200 sm:text-sm">
                  Need a standing delivery window for your hotel, villa or construction site?
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+255779973333"
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                <Phone size={13} />
                <span>Call 0779 973 333</span>
              </a>
              <a
                href="https://wa.me/255776147097"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-emerald-400/50 bg-emerald-600/30 px-4 py-2 text-xs font-bold text-emerald-200 hover:bg-emerald-600/50 hover:text-white transition"
              >
                <MessageSquare size={13} className="text-emerald-400" />
                <span>WhatsApp 0776 147 097</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-slate-50 text-center">
        <h2 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Book a Standing Delivery Window
        </h2>
        <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto">
          Set up a recurring supply arrangement to ensure your facility never runs short.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition"
          >
            Request Custom Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
