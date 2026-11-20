"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Truck,
  Clock,
  FileSpreadsheet,
  ShieldCheck,
  RefreshCw,
  Calendar,
  Flame,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SMART_PRESETS } from "@/data/catalogData";
import { useCart } from "@/context/CartContext";
import { useLenis } from "@/components/SmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorksPage() {
  const { applyPreset: contextApplyPreset } = useCart();
  const { scrollTo } = useLenis();
  const processTrackRef = useRef<HTMLDivElement>(null);
  const processVanRef = useRef<HTMLDivElement>(null);

  const applyPreset = (preset: (typeof SMART_PRESETS)[0]) => {
    contextApplyPreset(preset);
    // Redirect to quote page with preset applied
    window.location.href = "/quote";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Process cards stagger
        gsap.fromTo(
          ".process-card",
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.2, duration: 0.7, ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: "#how-it-works", start: "top 75%", once: true },
          }
        );

        // Van animation
        if (processTrackRef.current && processVanRef.current) {
          const routeTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#how-it-works",
              start: "top 75%", end: "bottom 65%", scrub: 0.4,
            },
          });
          routeTl.to(processTrackRef.current, { scaleX: 1, ease: "none" }, 0);
          routeTl.to(processVanRef.current, { left: "100%", ease: "none" }, 0);
        }

        // Fleet parallax
        gsap.to(".fleet-image-inner", {
          yPercent: 12, scale: 1.08, ease: "none",
          scrollTrigger: { trigger: "#smart-assistant", start: "top bottom", end: "bottom top", scrub: true },
        });

        // Logistics image parallax
        gsap.to(".groceries-image-inner", {
          yPercent: 10, scale: 1.08, ease: "none",
          scrollTrigger: { trigger: "#logistics", start: "top bottom", end: "bottom top", scrub: true },
        });

        // Assurance cards
        gsap.fromTo(
          ".assurance-card",
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".assurance-grid", start: "top 80%", once: true },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".process-card, .assurance-card", { opacity: 1, y: 0 });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0b2524] to-[#287A74] py-16 text-white text-center px-4">
        <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
          Frictionless B2B Process
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">
          From Requisition to Dock<br className="hidden sm:block" /> in Three Clear Steps
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-200 text-sm sm:text-base">
          No endless phone tag, no mysterious substitutions. Transparent pricing and rapid dispatch.
        </p>
      </section>

      {/* Three Steps */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative mt-4">
            {/* Animated Route */}
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] z-0 pointer-events-none">
              <div className="h-2 w-full rounded-full bg-slate-200/90 overflow-hidden relative shadow-inner">
                <div
                  ref={processTrackRef}
                  className="h-full w-full origin-left bg-gradient-to-r from-[#287A74] via-amber-400 to-emerald-500 rounded-full"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <div
                ref={processVanRef}
                className="absolute -top-3.5 left-0 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#287A74] px-3 py-1 text-[11px] font-bold text-white shadow-xl border border-white/60 will-change-transform z-10"
                style={{ left: "0%" }}
              >
                <Truck size={14} className="text-amber-400" />
                <span className="hidden lg:inline text-[9px] uppercase tracking-wider font-extrabold">Cold Transit</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3 relative z-10">
              {[
                {
                  step: "01.",
                  title: "Send Your List or Select Items",
                  desc: "Choose from our live catalog, upload your Excel purchasing requisition, or send your requirements via WhatsApp.",
                  icon: FileSpreadsheet,
                  badge: "Any Format Accepted",
                },
                {
                  step: "02.",
                  title: "Receive Transparent Itemized Quote",
                  desc: "Within 15 minutes, receive verified pricing, confirmed stock status, batch delivery date, and volume tiered discounts.",
                  icon: Clock,
                  badge: "Avg. 15 Min Turnaround",
                },
                {
                  step: "03.",
                  title: "Dawn Temperature-Controlled Delivery",
                  desc: "Our refrigerated fleet delivers right to your hotel kitchen, office pantry, or site loading dock with signed electronic POD.",
                  icon: Truck,
                  badge: "05:30 AM Guaranteed",
                },
              ].map((st) => (
                <div
                  key={st.step}
                  className="process-card group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/90 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#287A74] hover:bg-white hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-4xl font-extrabold text-[#287A74]">{st.step}</span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">{st.badge}</span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-slate-900">{st.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{st.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-[#287A74]">
                    <st.icon size={16} />
                    <span>Step {st.step.replace(".", "")} Verified by MH Dispatch</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Estimator */}
      <section id="smart-assistant" className="py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
                <Sparkles size={14} />
                <span>Smart Procurement Estimator</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready-Made Supply Blueprints for Every Operation
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Not sure what quantities your facility needs? Choose a pre-calibrated commercial bundle to
                preview typical weekly volume, or load it straight into your quotation with one click.
              </p>

              <div className="space-y-3 pt-2">
                {SMART_PRESETS.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-amber-400 hover:bg-white/10 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-sm font-bold text-white group-hover:text-amber-300">{preset.title}</h4>
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                        <span>Load Bundle</span>
                        <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{preset.note}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-800 to-slate-950 p-6 shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src="/images/fleet.jpg"
                  alt="MH General Suppliers Refrigerated Cold-Chain Fleet"
                  fill
                  className="fleet-image-inner object-cover will-change-transform scale-105"
                />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">MH Logistics Center • Central Dock</span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-300">Fleet Live</span>
                </div>
                <h4 className="font-display text-lg font-bold text-white">Multi-Temperature Fleet Delivering Daily</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dual-zone refrigerated vans ensure fresh vegetables and ripe fruits remain between 3°C - 5°C,
                  while wholesale dry commodities, cooking oils, and beverage cartons are stowed safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Logistics Assurance */}
      <section id="logistics" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <Image
                src="/images/groceries.jpg"
                alt="Bulk Oils, Rice, and Groceries Warehouse"
                fill
                className="groceries-image-inner object-cover will-change-transform scale-105"
              />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#287A74]">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Zero Compromise Procurement</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Why Procurement Officers & Executive Chefs Trust MH
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When a hotel restaurant is serving 300 breakfast covers or a construction camp has hungry shifts
                waiting, late deliveries or rotten produce can disrupt your entire business.
              </p>

              <div className="assurance-grid grid gap-4 sm:grid-cols-2 pt-2">
                {[
                  {
                    icon: Flame,
                    color: "text-amber-500",
                    title: "Direct Farm Sourcing",
                    desc: "Skip middlemen markets. We partner directly with vetted growers for peak freshness and stable wholesale prices.",
                  },
                  {
                    icon: RefreshCw,
                    color: "text-emerald-600",
                    title: "Instant Replacement Policy",
                    desc: "Any crate that fails your receiving chef or manager inspection is replaced immediately on our next route run.",
                  },
                  {
                    icon: Calendar,
                    color: "text-[#287A74]",
                    title: "Automated Standing Orders",
                    desc: "Never run out of cooking oil, mineral water, or onions. Schedule weekly deliveries that run seamlessly on autopilot.",
                  },
                  {
                    icon: FileSpreadsheet,
                    color: "text-purple-600",
                    title: "Clear Digital Invoicing",
                    desc: "Detailed line items matching your internal PO numbers with signed delivery notes and VAT receipts.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#287A74] hover:shadow-md"
                  >
                    <card.icon size={20} className={card.color} />
                    <h4 className="mt-2 font-display text-sm font-bold text-slate-900">{card.title}</h4>
                    <p className="mt-1 text-xs text-slate-600">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-slate-50 text-center">
        <h2 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto">
          Submit your first requisition and receive a fully itemized price breakdown within 15 minutes.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition"
          >
            Request Instant Quote <ArrowRight size={16} />
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-xl border border-[#287A74] px-8 py-4 text-sm font-bold text-[#287A74] hover:bg-[#287A74]/10 transition"
          >
            Browse Catalog
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
