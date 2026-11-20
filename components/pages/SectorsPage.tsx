"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SECTORS } from "@/data/catalogData";
import { useCart } from "@/context/CartContext";

export default function SectorsPage() {
  const [selectedSectorTab, setSelectedSectorTab] = useState(0);
  const { setRfqSector } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-[#0b2524] to-[#287A74] py-16 text-white text-center px-4">
        <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
          Targeted Logistics Solutions
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">
          Engineered for the Demands<br className="hidden sm:block" /> of Your Specific Sector
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-200 text-sm sm:text-base">
          A luxury hotel has completely different receiving windows than an active high-rise construction
          site. Here is how we customize our supply chain for you.
        </p>
      </section>

      {/* Sector Tabs + Detail */}
      <section className="py-20 bg-slate-100/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
              {SECTORS.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectorTab(idx)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
                    selectedSectorTab === idx
                      ? "bg-[#287A74] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <sec.icon size={18} />
                  <span>{sec.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Card */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-8 sm:p-12 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#287A74]/10 px-3.5 py-1 text-xs font-bold text-[#287A74]">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>{SECTORS[selectedSectorTab].tagline}</span>
                </div>

                <h2 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  Bespoke Procurement for {SECTORS[selectedSectorTab].title}
                </h2>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {SECTORS[selectedSectorTab].description}
                </p>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    SLA & Operational Highlights:
                  </h3>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {SECTORS[selectedSectorTab].perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 size={16} className="shrink-0 text-emerald-600 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/quote"
                    onClick={() => setRfqSector(SECTORS[selectedSectorTab].id)}
                    className="rounded-xl bg-[#287A74] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#328e87] transition"
                  >
                    Set Up Supply for {SECTORS[selectedSectorTab].title}
                  </Link>
                  <a
                    href="tel:+255779973333"
                    className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Phone size={14} className="text-[#287A74]" /> Specialist: 0779 973 333
                  </a>
                  <a
                    href="https://wa.me/255776147097"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition"
                  >
                    <MessageSquare size={14} className="text-emerald-600" /> WhatsApp: 0776 147 097
                  </a>
                </div>
              </div>

              {/* Side: Popular Items */}
              <div className="border-t border-slate-100 bg-slate-50 p-8 sm:p-12 lg:border-t-0 lg:border-l">
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-500">
                  Top Ordered Commodities
                </h4>
                <div className="mt-4 space-y-3">
                  {SECTORS[selectedSectorTab].popularItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 text-xs shadow-sm"
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#287A74]/10 text-[#287A74]">✓</span>
                        <span>{item}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700">Daily Restock</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#287A74] to-[#1a5a55] p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <ShieldCheck size={16} /> Dedicated Account Manager
                  </div>
                  <p className="mt-1 text-xs text-slate-200">
                    All regular commercial accounts receive a single point of contact available 24/7 on WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition"
            >
              Request a Custom Supply Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
