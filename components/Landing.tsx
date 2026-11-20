"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Truck,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  MessageSquare,
  Phone,
  CheckCircle2,
  Search,
  Plus,
  Minus,
  X,
  ChevronUp,
} from "lucide-react";
import { useLenis } from "@/components/SmoothScroll";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, CATEGORIES } from "@/data/catalogData";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollTo, stop, start } = useLenis();
  const progressBarRef = useRef<HTMLDivElement>(null);

  const {
    cart,
    updateQuantity,
    setCart,
    totalCartCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    if (isCartOpen) stop();
    else start();
  }, [isCartOpen, stop, start]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Progress bar
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.15,
              onUpdate: (self) => {
                setScrollPercentage(Math.round(self.progress * 100));
                setShowBackToTop(self.scroll() > 380);
                setIsScrolled(self.scroll() > 40);
              },
            },
          });
        }

        // Hero entrance
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6 })
          .from(".hero-heading span", { yPercent: 100, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.3")
          .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-ctas", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
          .from(".hero-trust-bar", { opacity: 0, duration: 0.5 }, "-=0.2")
          .from(".hero-image-card", { scale: 0.95, opacity: 0, duration: 0.9, ease: "back.out(1.4)" }, "-=0.7")
          .from(".floating-pill", { scale: 0.7, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.4");

        // Hero parallax
        gsap.to(".hero-ambient-orb-1", {
          yPercent: 35, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.5 },
        });
        gsap.to(".hero-ambient-orb-2", {
          yPercent: -25, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.5 },
        });
        gsap.to(".floating-pill-top", {
          yPercent: -45, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".floating-pill-bottom", {
          yPercent: -25, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.2 },
        });
        gsap.to(".hero-image-inner", {
          yPercent: 10, scale: 1.05, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        });

        // Counters
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const target = Number(el.dataset.counter);
          const suffix = el.dataset.suffix || "";
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: target, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => { el.textContent = Math.round(counterObj.val).toLocaleString() + suffix; },
          });
        });

        // Category cards
        gsap.fromTo(
          ".category-card",
          { y: 35, opacity: 0, scale: 0.94 },
          {
            y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.7, ease: "back.out(1.2)",
            immediateRender: false,
            scrollTrigger: { trigger: ".categories-container", start: "top 85%", once: true },
          }
        );

        // Nav cards
        gsap.fromTo(
          ".nav-card",
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".nav-cards-grid", start: "top 85%", once: true },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".category-card, .nav-card", { opacity: 1, y: 0, scale: 1 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-400">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-slate-900/10">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-gradient-to-r from-amber-400 via-emerald-400 to-[#287A74] shadow-[0_0_12px_rgba(245,158,11,0.6)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <SiteHeader />

      {/* HERO */}
      <section className="hero-section relative overflow-hidden bg-gradient-to-b from-[#0b2524] via-[#287A74] to-[#1a5a55] pt-12 pb-24 text-white lg:pt-20 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay">
          <Image src="/images/zanzibar-east-shore.jpg" alt="" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a5a55] via-transparent to-[#0b2524]" />
        </div>

        <div className="hero-ambient-orb-1 pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#287A74]/20 blur-3xl will-change-transform" />
        <div className="hero-ambient-orb-2 pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl will-change-transform" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="space-y-6">
              <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-amber-300 backdrop-blur-md">
                <Sparkles size={14} className="text-amber-400" />
                <span>Karibu Zanzibar 🌴 Premier Island B2B Food & Resort Logistics</span>
              </div>

              <h1 className="hero-heading font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                <span className="block overflow-hidden">
                  <span>Zanzibar Wholesale Food Supplier</span>
                </span>
                <span className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300">
                  <span>Fresh Eggs, Produce & Bulk Goods.</span>
                </span>
              </h1>

              <p className="hero-desc max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                MH General Suppliers is Zanzibar&apos;s premier wholesale partner. From Stone Town&apos;s central hub directly
                to beachfront resorts in Nungwi, Kendwa, Kiwengwa, Paje, and Jambiani — farm-fresh eggs, crisp vegetables,
                tropical fruits, bulk rice, cooking oils, and hotel supplies with guaranteed 05:30 AM kitchen dock drop-off.
              </p>

              <div className="hero-ctas flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/quote"
                  className="group flex items-center gap-2.5 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 hover:scale-[1.02]"
                >
                  <span>Request Instant Quotation</span>
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://wa.me/255776147097?text=Habari%20MH%20Suppliers%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20supplies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-600/30 px-5 py-3.5 text-sm font-bold text-emerald-200 backdrop-blur-md transition hover:bg-emerald-600/50 hover:text-white"
                >
                  <MessageSquare size={16} className="text-emerald-400" />
                  <span>WhatsApp: 0776 147 097</span>
                </a>

                <a
                  href="tel:+255779973333"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white hover:bg-white/20"
                >
                  <Phone size={15} className="text-amber-300" />
                  <span>Call: 0779 973 333</span>
                </a>

                <Link
                  href="/catalog"
                  className="hidden xl:flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-4 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur-md transition hover:text-white hover:bg-white/10"
                >
                  <Search size={15} className="text-amber-300" />
                  <span>Catalog</span>
                </Link>
              </div>

              <div className="hero-trust-bar grid grid-cols-3 gap-4 border-t border-white/15 pt-8 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="shrink-0 text-emerald-400" />
                  <div>
                    <span className="block font-bold text-white">100% Chef-Graded</span>
                    <span className="text-slate-300">Instant crate replacement</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={20} className="shrink-0 text-amber-400" />
                  <div>
                    <span className="block font-bold text-white">5:30 AM Delivery</span>
                    <span className="text-slate-300">Before kitchen prep starts</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet size={20} className="shrink-0 text-teal-300" />
                  <div>
                    <span className="block font-bold text-white">Net-30 Invoicing</span>
                    <span className="text-slate-300">Consolidated monthly billing</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 text-[11px] font-medium text-emerald-200/80">
                <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Unguja & Pemba Corridors: Stone Town • Nungwi • Kendwa • Kiwengwa • Paje • Jambiani • Kizimkazi • Fumba</span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="hero-image-card relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl shadow-slate-950/40">
                <Image
                  src="/images/produce.jpg"
                  alt="MH General Suppliers Farm Produce and Wholesale Warehouse"
                  fill
                  className="hero-image-inner object-cover transition duration-700 hover:scale-105 will-change-transform"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                        Warehouse Bay 04 • Daily Inflow
                      </span>
                      <h3 className="font-display text-xl font-bold text-white">
                        Farm-Gate Certified Produce & Bulk Dry Goods
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-pill floating-pill-top animate-float-slow absolute -top-5 -right-3 sm:-right-6 rounded-2xl border border-white/30 bg-white/95 p-3.5 text-slate-900 shadow-xl backdrop-blur-md will-change-transform">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase">Live Inventory</span>
                    <span className="font-display text-lg font-extrabold text-slate-900">1,800+ SKUs</span>
                  </div>
                </div>
              </div>

              <div className="floating-pill floating-pill-bottom animate-float-reverse absolute -bottom-6 -left-3 sm:-left-6 max-w-xs rounded-2xl border border-white/30 bg-white/95 p-4 text-slate-900 shadow-2xl backdrop-blur-md will-change-transform">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Dispatched • Cold Transit</span>
                  </div>
                  <span className="font-mono text-slate-400">Order #MH-409</span>
                </div>
                <p className="mt-1.5 text-xs font-bold text-slate-800">
                  Serena Hotel Dock: 140kg Vegetables, Fruits & Cooking Oil
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Refrigerated: +3.8°C</span>
                  <span className="font-semibold text-[#287A74]">ETA: 05:25 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative z-10 -mt-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:grid-cols-4 sm:p-8">
          {[
            { counter: 500, suffix: "+", color: "text-[#287A74]", label: "Hotels, Offices & Sites" },
            { counter: 24, suffix: "h", color: "text-amber-500", label: "Standard Dispatch Cycle" },
            { counter: 100, suffix: "%", color: "text-emerald-600", label: "Quality Inspection Pass" },
            { counter: 15, suffix: "m", color: "text-[#287A74]", label: "Average Quote Response" },
          ].map((stat, i) => (
            <div key={stat.label} className={`${i < 3 ? "border-r border-slate-100 pr-4 sm:pr-6" : ""}`}>
              <span
                data-counter={stat.counter}
                data-suffix={stat.suffix}
                className={`font-display text-3xl font-extrabold ${stat.color} sm:text-4xl`}
              >
                {stat.counter}{stat.suffix}
              </span>
              <span className="mt-1 block text-xs font-semibold text-slate-500 sm:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#287A74]/10 px-4 py-1.5 text-xs font-bold text-[#287A74]">
              <Sparkles size={14} className="text-emerald-600" />
              <span className="tracking-wide uppercase">Commercial Supply Directory</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
              Every Category Your Daily Operations Need
            </h2>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              Consolidate your institutional procurement under a single master contract. Click any commodity category below to browse specific wholesale pack sizes, grades, and immediate itemized quotations.
            </p>
          </div>

          <div className="categories-container mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.id}`}
                  className="category-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#287A74] hover:shadow-2xl hover:shadow-[#287A74]/15 will-change-transform"
                >
                  <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${cat.accentGradient || "from-[#287A74]/10 to-transparent"} blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`} />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#287A74]/30 to-transparent transition-all duration-300 group-hover:h-2 group-hover:via-[#287A74]" />

                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cat.iconBg || "bg-[#287A74] text-white"} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <IconComp size={26} />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold text-slate-700 transition-colors group-hover:bg-[#287A74]/10 group-hover:text-[#287A74]">
                          {cat.count}
                        </span>
                        {cat.badge && (
                          <span className="rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#287A74] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{cat.description}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-100">
                      <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                      <span className="truncate">{cat.perk}</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Institutional Staples:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.popularItems.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg bg-slate-100/90 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors group-hover:bg-slate-100 group-hover:text-slate-900"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#287A74] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#287A74]" />
                      </span>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-[#287A74] transition-colors">
                        Explore by clicking here
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 group-hover:bg-[#287A74] px-3.5 py-2 text-xs font-extrabold text-slate-700 group-hover:text-white transition-all duration-300 shadow-sm">
                      <span>View Products</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Full Catalog Banner */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#071a19] via-[#0d2a28] to-[#133c39] p-8 sm:p-12 text-white shadow-xl relative">
            <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold text-amber-300">
                  <FileSpreadsheet size={14} />
                  <span>Interactive Wholesale Catalog & RFQ Builder</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Looking for Complete Pricing & Instant Commercial Quotations?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Browse our full inventory of fresh eggs (mayai), fresh vegetables, chilled fruits, soft drinks, bulk grains, and commercial cooking oils. Adjust pack quantities, download customized PDF/Excel RFQs, or send directly to WhatsApp.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 hover:scale-105 active:scale-95"
                >
                  <ShoppingBag size={16} />
                  <span>Open Full Wholesale Catalog</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <MessageSquare size={16} />
                  <span>Request Custom Supply Plan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION NAVIGATION CARDS */}
      <section className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Explore More About MH Suppliers
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Everything you need to know, organized by topic.
            </p>
          </div>
          <div className="nav-cards-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/sectors",
                emoji: "🏨",
                title: "Sectors We Serve",
                desc: "Hotels, resorts, construction sites, corporate offices — see your bespoke supply solution.",
                cta: "View Sectors",
                color: "hover:border-[#287A74]",
              },
              {
                href: "/how-it-works",
                emoji: "🚚",
                title: "How It Works",
                desc: "Three simple steps from your order to cold-chain dock delivery at 5:30 AM.",
                cta: "Learn Process",
                color: "hover:border-amber-400",
              },
              {
                href: "/routes",
                emoji: "🗺️",
                title: "Island Routes",
                desc: "Daily delivery corridors across Zanzibar — Nungwi, Paje, Stone Town, Pemba.",
                cta: "See Routes",
                color: "hover:border-teal-500",
              },
              {
                href: "/quote",
                emoji: "📋",
                title: "FAQ & Get a Quote",
                desc: "Get answers to common questions and submit your wholesale quotation request.",
                cta: "Request Quote",
                color: "hover:border-emerald-500",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`nav-card group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${card.color}`}
              >
                <div>
                  <span className="text-3xl">{card.emoji}</span>
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900 group-hover:text-[#287A74] transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#287A74]">
                  <span>{card.cta}</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* RFQ Basket Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-md flex-col justify-between bg-white p-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#287A74]" />
                  <h3 className="font-display text-lg font-bold text-slate-900">Your Quote Basket</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close Basket"
                >
                  <X size={20} />
                </button>
              </div>

              {totalCartCount === 0 ? (
                <div className="py-20 text-center">
                  <ShoppingBag size={48} className="mx-auto text-slate-300" />
                  <h4 className="mt-4 font-display text-base font-bold text-slate-800">Your basket is currently empty</h4>
                  <p className="mt-1 text-xs text-slate-500">Add commodities from the wholesale catalog to generate an instant quotation.</p>
                  <Link
                    href="/catalog"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#287A74] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#328e87] transition"
                  >
                    <span>Explore Wholesale Catalog</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div data-lenis-prevent className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {Object.entries(cart).map(([pId, qty]) => {
                    const prod = PRODUCTS.find((p) => p.id === pId);
                    if (!prod) return null;
                    return (
                      <div key={pId} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                        <div className="pr-2">
                          <h4 className="font-bold text-slate-900">{prod.name}</h4>
                          <span className="text-[11px] text-slate-500">{prod.packSize}</span>
                          <span className="block font-semibold text-[#287A74]">{prod.priceEstimate}</span>
                        </div>
                        <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                          <button onClick={() => updateQuantity(pId, -1)} className="p-1 text-slate-600 hover:text-red-600">
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center font-bold text-slate-900">{qty}</span>
                          <button onClick={() => updateQuantity(pId, 1)} className="p-1 text-slate-600 hover:text-emerald-600">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {totalCartCount > 0 && (
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Total Selected Units:</span>
                  <span className="text-base text-[#287A74]">{totalCartCount} Packs</span>
                </div>
                <Link
                  href="/quote"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#287A74] py-3 text-xs font-bold text-white hover:bg-[#328e87] transition"
                >
                  <span>Proceed to Finalize RFQ</span>
                  <ArrowRight size={14} />
                </Link>
                <button
                  onClick={() => setCart({})}
                  className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-red-600"
                >
                  Clear All Items
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Cart Bar */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xl">
          <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-[#287A74]/95 px-5 py-3.5 text-white shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400 text-slate-950 font-bold text-xs">
                {totalCartCount}
              </div>
              <div className="text-xs">
                <span className="block font-bold">Commodities in Your RFQ</span>
                <span className="text-slate-300">Ready to submit for instant itemized pricing</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
              >
                Review
              </button>
              <Link
                href="/quote"
                className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showBackToTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => scrollTo(0)}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#287A74] hover:text-[#287A74] hover:shadow-2xl"
          aria-label="Scroll to top"
        >
          <svg className="absolute inset-0 -rotate-90" width="48" height="48">
            <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="2.5" fill="transparent" />
            <circle
              cx="24" cy="24" r="20" stroke="#287A74" strokeWidth="2.5" fill="transparent"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * scrollPercentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-75 ease-out"
            />
          </svg>
          <ChevronUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 shadow transition-opacity group-hover:opacity-100 whitespace-nowrap">
            {scrollPercentage}% Top
          </span>
        </button>
      </div>

      {/* Floating WhatsApp + Call */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <a
          href="https://wa.me/255776147097?text=Habari%20MH%20Suppliers%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20supplies"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-950/30 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-emerald-500"
          aria-label="Chat on WhatsApp 0776 147 097"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <MessageSquare size={16} />
          <span className="hidden sm:inline">WhatsApp: 0776 147 097</span>
          <span className="sm:hidden font-bold">0776 147 097</span>
        </a>

        <a
          href="tel:+255779973333"
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3.5 py-3 text-xs font-bold text-slate-800 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#287A74] hover:text-[#287A74]"
          aria-label="Call 0779 973 333"
        >
          <Phone size={15} className="text-[#287A74]" />
          <span className="hidden md:inline">Call: 0779 973 333</span>
        </a>
      </div>
    </div>
  );
}
