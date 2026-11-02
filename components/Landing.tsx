"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import {
  Building2,
  HardHat,
  Hotel,
  UtensilsCrossed,
  Truck,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Search,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Send,
  RefreshCw,
  Flame,
  Calendar,
  X,
  FileSpreadsheet,
  ChevronUp,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { useLenis } from "@/components/SmoothScroll";
import { useCart } from "@/context/CartContext";
import {
  PRODUCTS,
  CATEGORIES,
  SECTORS,
  SMART_PRESETS,
} from "@/data/catalogData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------
export default function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollTo, stop, start } = useLenis();

  // Quotation Cart from shared context
  const {
    cart,
    updateQuantity,
    setCart,
    clearCart,
    totalCartCount,
    isCartOpen,
    setIsCartOpen,
    applyPreset: contextApplyPreset,
    rfqNotes,
    setRfqNotes,
    rfqSector,
    setRfqSector,
  } = useCart();

  // Scroll Animation Refs
  const progressBarRef = useRef<HTMLDivElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const processVanRef = useRef<HTMLDivElement>(null);

  // Scroll interactive states
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // RFQ Form State
  const [rfqName, setRfqName] = useState("");
  const [rfqCompany, setRfqCompany] = useState("");
  const [rfqContact, setRfqContact] = useState("");
  const [rfqFrequency, setRfqFrequency] = useState("Weekly Standing Order");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqReference, setRfqReference] = useState("");

  // Wrap applyPreset to also scroll to the RFQ form smoothly
  const applyPreset = (preset: (typeof SMART_PRESETS)[0]) => {
    contextApplyPreset(preset);
    const formEl = document.getElementById("quote-section");
    if (formEl) {
      scrollTo("#quote-section");
    }
  };

  // Active sector tab in Sectors section
  const [selectedSectorTab, setSelectedSectorTab] = useState(0);

  // FAQ open item
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dispatch countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync drawer with Lenis smooth scroll
  useEffect(() => {
    if (isCartOpen) {
      stop();
    } else {
      start();
    }
  }, [isCartOpen, stop, start]);

  // Refresh ScrollTrigger calculations on dynamic tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [selectedSectorTab]);

  // Refresh ScrollTrigger when images and full layout finish loading
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  // GSAP Animations with ScrollTrigger & MatchMedia
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Top Reading Scroll Progress Bar
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
                const progress = self.progress;
                setScrollPercentage(Math.round(progress * 100));
                setShowBackToTop(self.scroll() > 380);
                setIsScrolled(self.scroll() > 40);
              },
            },
          });
        }

        // 2. Hero initial entrance reveal
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6 })
          .from(".hero-heading span", { yPercent: 100, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.3")
          .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-ctas", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
          .from(".hero-trust-bar", { opacity: 0, duration: 0.5 }, "-=0.2")
          .from(".hero-image-card", { scale: 0.95, opacity: 0, duration: 0.9, ease: "back.out(1.4)" }, "-=0.7")
          .from(".floating-pill", { scale: 0.7, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.4");

        // 3. Hero Parallax Layers (Scrubbed with smooth scroll)
        gsap.to(".hero-ambient-orb-1", {
          yPercent: 35,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        gsap.to(".hero-ambient-orb-2", {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        gsap.to(".floating-pill-top", {
          yPercent: -45,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".floating-pill-bottom", {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(".hero-image-inner", {
          yPercent: 10,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // 4. Counters on scroll
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const target = Number(el.dataset.counter);
          const suffix = el.dataset.suffix || "";
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = Math.round(counterObj.val).toLocaleString() + suffix;
            },
          });
        });

        // 5. Section reveals (slide up + soft fade with bulletproof fromTo)
        gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
          gsap.fromTo(
            section,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
                onEnter: () => {
                  gsap.to(section, { opacity: 1, y: 0, duration: 0.5, overwrite: "auto" });
                },
              },
            }
          );
        });

        // 6. Categories grid 3D stagger
        gsap.fromTo(
          ".category-card",
          { y: 35, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: "back.out(1.2)",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".categories-container",
              start: "top 85%",
              once: true,
            },
          }
        );

        // 7. Interactive Delivery Route Animation in "How It Works"
        if (processTrackRef.current && processVanRef.current) {
          const routeTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#how-it-works",
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.4,
            },
          });

          routeTl.to(processTrackRef.current, {
            scaleX: 1,
            ease: "none",
          }, 0);

          routeTl.to(processVanRef.current, {
            left: "100%",
            ease: "none",
          }, 0);
        }

        // Staggered step cards
        gsap.fromTo(
          ".process-card",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.7,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: "#how-it-works",
              start: "top 75%",
              once: true,
            },
          }
        );

        // 8. Smart Estimator Parallax Image
        gsap.to(".fleet-image-inner", {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: "#smart-assistant",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // 9. Logistics Warehouse Parallax Image
        gsap.to(".groceries-image-inner", {
          yPercent: 10,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: "#logistics",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // 10. Logistics Assurance Cards Stagger
        gsap.fromTo(
          ".assurance-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".assurance-grid",
              start: "top 80%",
              once: true,
            },
          }
        );

        // 11. Client Testimonials Stagger
        gsap.fromTo(
          ".testimonial-card",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".testimonials-grid",
              start: "top 80%",
              once: true,
            },
          }
        );

        // 12. RFQ Quote Section Ambient Spotlight Scale
        gsap.fromTo(
          ".quote-ambient-glow",
          { scale: 0.6, opacity: 0.1 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: "#quote-section",
              start: "top 80%",
              once: true,
            },
          }
        );

        // 13. Ensure dynamic catalog items are always visible and ready
        gsap.set(".catalog-card", { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Immediate appearance for users preferring reduced motion
        gsap.set(".section-reveal, .process-card, .category-card, .assurance-card, .testimonial-card, .catalog-card", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);



  // Handle RFQ Submit
  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `MH-RFQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqReference(refCode);
    setIsSubmitted(true);

    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#287A74", "#f59e0b", "#059669", "#ffffff"],
    });
  };

  return (
    <div ref={root} className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-400">
      {/* ----------------------------------------------------
          0. LUMINOUS SCROLL PROGRESS BAR (GSAP + Lenis)
      ---------------------------------------------------- */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-slate-900/10">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-gradient-to-r from-amber-400 via-emerald-400 to-[#287A74] shadow-[0_0_12px_rgba(245,158,11,0.6)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ----------------------------------------------------
          1. TOP DISPATCH & HOTLINE NOTIFICATION BAR
      ---------------------------------------------------- */}
      <div className="border-b border-[#287A74]/25 bg-[#071a19] text-xs font-medium text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Daily Dispatch Active:</span>
            <span>
              Next order cutoff in{" "}
              <span className="font-mono font-bold text-amber-400">
                {String(timeLeft.hours).padStart(2, "0")}h:{String(timeLeft.minutes).padStart(2, "0")}m:
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>{" "}
              for guaranteed 05:30 AM drop-off.
            </span>
          </div>

          <div className="hidden items-center gap-6 sm:flex">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Truck size={14} className="text-amber-400" /> Cold-Chain Transit Guaranteed
            </span>
            <a
              href="tel:+255700000000"
              className="flex items-center gap-1.5 font-bold text-white transition hover:text-amber-400"
            >
              <Phone size={14} className="text-emerald-400" /> +255 700 000 000
            </a>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          2. ENTERPRISE HEADER
      ---------------------------------------------------- */}
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${isScrolled
            ? "border-slate-200/90 bg-white/95 shadow-lg backdrop-blur-md"
            : "border-slate-200/60 bg-white/90 backdrop-blur-sm"
          }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-all duration-300 ${isScrolled ? "h-16" : "h-20"
            }`}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#287A74] shadow-sm transition group-hover:scale-105">
              <Image
                src="/logo.jpeg"
                alt="MH General Suppliers Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-[#287A74]">
                MH GENERAL SUPPLIERS
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
                Fresh Produce & Commercial Logistics
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex" aria-label="Main">
            <Link href="/catalog" className="transition hover:text-[#287A74]">
              Wholesale Catalog
            </Link>
            <a href="#sectors" className="transition hover:text-[#287A74]">
              Sectors We Supply
            </a>
            <a href="#how-it-works" className="transition hover:text-[#287A74]">
              How It Works
            </a>
            <a href="#smart-assistant" className="transition hover:text-[#287A74]">
              Smart Estimator
            </a>
            <a href="#logistics" className="transition hover:text-[#287A74]">
              Cold-Chain Fleet
            </a>
            <a href="#faq" className="transition hover:text-[#287A74]">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-[#287A74] hover:bg-[#287A74]/10"
              aria-label="Open Quote Basket"
            >
              <ShoppingBag size={18} className="text-[#287A74]" />
              <span className="hidden sm:inline">RFQ Basket</span>
              {totalCartCount > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-[11px] font-extrabold text-slate-900">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Request a Quote CTA */}
            <a
              href="#quote-section"
              className="group flex items-center gap-2 rounded-xl bg-[#287A74] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#071a19]/25 transition hover:bg-[#328e87] hover:shadow-lg"
            >
              <span>Request Quote</span>
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------
          3. HERO SECTION (Mercora inspired + Wholesale Produce)
      ---------------------------------------------------- */}
      <section className="hero-section relative overflow-hidden bg-gradient-to-b from-[#0b2524] via-[#287A74] to-[#1a5a55] pt-12 pb-24 text-white lg:pt-20 lg:pb-32">
        {/* Soft Background Accents */}
        <div className="hero-ambient-orb-1 pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#287A74]/20 blur-3xl will-change-transform" />
        <div className="hero-ambient-orb-2 pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl will-change-transform" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-amber-300 backdrop-blur-md">
                <Sparkles size={14} className="text-amber-400" />
                <span>Premier B2B Fresh & Commercial Supply</span>
              </div>

              <h1 className="hero-heading font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                <span className="block overflow-hidden">
                  <span>The Smarter Way to Source</span>
                </span>
                <span className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300">
                  <span>Fresh Produce & Bulk Supplies.</span>
                </span>
              </h1>

              <p className="hero-desc max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                MH General Suppliers delivers farm-fresh vegetables, seasonal fruits, wholesale beverages,
                commercial groceries, snacks, and pure cooking oils. One dependable partner for luxury hotels,
                corporate offices, and construction sites with guaranteed next-morning cold delivery.
              </p>

              {/* CTAs */}
              <div className="hero-ctas flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#quote-section"
                  className="group flex items-center gap-2.5 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 hover:scale-[1.02]"
                >
                  <span>Request Instant Quotation</span>
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </a>

                <Link
                  href="/catalog"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white hover:bg-white/20"
                >
                  <Search size={16} className="text-amber-300" />
                  <span>Browse Wholesale Catalog</span>
                </Link>
              </div>

              {/* B2B Assurance Bar */}
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
            </div>

            {/* Right Visual: Showcase & Floating Status Badges */}
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

                {/* Overlaid Bottom Title */}
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

              {/* Floating Pill 1: 1800+ SKUs */}
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

              {/* Floating Pill 2: Live Dispatch Ticket */}
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

      {/* ----------------------------------------------------
          4. STATS METRICS BAR (Mirroring Mercora Stats Strip)
      ---------------------------------------------------- */}
      <section className="relative z-10 -mt-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:grid-cols-4 sm:p-8">
          <div className="border-r border-slate-100 pr-4 last:border-0 sm:pr-6">
            <span
              data-counter="500"
              data-suffix="+"
              className="font-display text-3xl font-extrabold text-[#287A74] sm:text-4xl"
            >
              500+
            </span>
            <span className="mt-1 block text-xs font-semibold text-slate-500 sm:text-sm">
              Hotels, Offices & Sites
            </span>
          </div>

          <div className="border-r-0 border-slate-100 pr-0 sm:border-r sm:pr-6">
            <span
              data-counter="24"
              data-suffix="h"
              className="font-display text-3xl font-extrabold text-amber-500 sm:text-4xl"
            >
              24h
            </span>
            <span className="mt-1 block text-xs font-semibold text-slate-500 sm:text-sm">
              Standard Dispatch Cycle
            </span>
          </div>

          <div className="border-r border-slate-100 pr-4 sm:pr-6">
            <span
              data-counter="100"
              data-suffix="%"
              className="font-display text-3xl font-extrabold text-emerald-600 sm:text-4xl"
            >
              100%
            </span>
            <span className="mt-1 block text-xs font-semibold text-slate-500 sm:text-sm">
              Quality Inspection Pass
            </span>
          </div>

          <div>
            <span
              data-counter="15"
              data-suffix="m"
              className="font-display text-3xl font-extrabold text-[#287A74] sm:text-4xl"
            >
              15m
            </span>
            <span className="mt-1 block text-xs font-semibold text-slate-500 sm:text-sm">
              Average Quote Response
            </span>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          5. FEATURED CATEGORIES SHOWCASE & COMMODITY MATRIX
      ---------------------------------------------------- */}
      <section className="section-reveal py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Header */}
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

          {/* High-Visibility Category Showcase Grid */}
          <div className="categories-container mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.id}`}
                  className="category-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#287A74] hover:shadow-2xl hover:shadow-[#287A74]/15 will-change-transform"
                >
                  {/* Decorative ambient gradient backdrop on hover */}
                  <div
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${cat.accentGradient || "from-[#287A74]/10 to-transparent"} blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`}
                  />

                  {/* Top colored accent indicator line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#287A74]/30 to-transparent transition-all duration-300 group-hover:h-2 group-hover:via-[#287A74]" />

                  <div>
                    {/* Top Row: Icon and Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cat.iconBg || "bg-[#287A74] text-white"} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
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

                    {/* Category Title & Description */}
                    <div className="mt-5">
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#287A74] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {/* Operational Perk Banner */}
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-100">
                      <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                      <span className="truncate">{cat.perk}</span>
                    </div>

                    {/* Popular Commercial Stock Chips */}
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

                  {/* Interactive Explore Click Indicator Footer */}
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

          {/* Commercial Bridge Banner: Prompting Full Wholesale Catalog */}
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
                <a
                  href="#quote-section"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <MessageSquare size={16} />
                  <span>Request Custom Supply Plan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          7. SECTORS WE SERVE (Hotels, Offices, Construction, Catering)
      ---------------------------------------------------- */}
      <section id="sectors" className="section-reveal py-20 bg-slate-100/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider uppercase text-[#287A74]">
              Targeted Logistics Solutions
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Engineered for the Demands of Your Specific Sector
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 text-sm sm:text-base">
              A luxury hotel has completely different receiving windows than an active high-rise construction
              site. Here is how we customize our supply chain for you.
            </p>
          </div>

          {/* Sector Navigation Tabs */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex flex-wrap rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
              {SECTORS.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectorTab(idx)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition ${selectedSectorTab === idx
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

          {/* Active Sector Display Card */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-8 sm:p-12 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#287A74]/10 px-3.5 py-1 text-xs font-bold text-[#287A74]">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>{SECTORS[selectedSectorTab].tagline}</span>
                </div>

                <h3 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  Bespoke Procurement for {SECTORS[selectedSectorTab].title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {SECTORS[selectedSectorTab].description}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    SLA & Operational Highlights:
                  </h4>
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
                  <a
                    href="#quote-section"
                    onClick={() => setRfqSector(SECTORS[selectedSectorTab].id)}
                    className="rounded-xl bg-[#287A74] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#328e87] transition"
                  >
                    Set Up Supply for {SECTORS[selectedSectorTab].title}
                  </a>
                  <a
                    href="tel:+255700000000"
                    className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Phone size={14} /> Talk to Sector Specialist
                  </a>
                </div>
              </div>

              {/* Side Card: Popular Items for this sector */}
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
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#287A74]/10 text-[#287A74]">
                          ✓
                        </span>
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
        </div>
      </section>

      {/* ----------------------------------------------------
          8. HOW IT WORKS (Three-Step Pill Flow from full.webp)
      ---------------------------------------------------- */}
      <section id="how-it-works" className="section-reveal py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider uppercase text-[#287A74]">
              Frictionless B2B Process
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              From Requisition to Dock in Three Clear Steps
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 text-sm sm:text-base">
              No endless phone tag, no mysterious substitutions. Transparent pricing and rapid dispatch.
            </p>
          </div>

          {/* Interactive Delivery Road Track */}
          <div className="relative mt-16">
            {/* Desktop Animated Route Line & Traveling Cold-Chain Delivery Van */}
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] z-0 pointer-events-none">
              {/* Route Roadway Track */}
              <div className="h-2 w-full rounded-full bg-slate-200/90 overflow-hidden relative shadow-inner">
                {/* Active Progress Fill that draws on scroll */}
                <div
                  ref={processTrackRef}
                  className="h-full w-full origin-left bg-gradient-to-r from-[#287A74] via-amber-400 to-emerald-500 rounded-full"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>

              {/* Real-time Animated Van Indicator riding along the route track */}
              <div
                ref={processVanRef}
                className="absolute -top-3.5 left-0 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#287A74] px-3 py-1 text-[11px] font-bold text-white shadow-xl shadow-[#071a19]/35 border border-white/60 will-change-transform z-10"
                style={{ left: "0%" }}
              >
                <Truck size={14} className="text-amber-400" />
                <span className="hidden lg:inline text-[9px] uppercase tracking-wider font-extrabold text-white">Cold Transit</span>
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
                  className="process-card group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/90 backdrop-blur-sm p-8 transition duration-300 hover:-translate-y-2 hover:border-[#287A74] hover:bg-white hover:shadow-xl will-change-transform"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-4xl font-extrabold text-[#287A74] transition group-hover:scale-105">
                        {st.step}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                        {st.badge}
                      </span>
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

      {/* ----------------------------------------------------
          9. SMART PROCUREMENT ESTIMATOR (AI Assistant inspired by full.webp)
      ---------------------------------------------------- */}
      <section id="smart-assistant" className="section-reveal py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
                <Sparkles size={14} />
                <span>Smart Procurement Estimator</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
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
                      <h4 className="font-display text-sm font-bold text-white group-hover:text-amber-300">
                        {preset.title}
                      </h4>
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

            {/* Visual Box: Cold Chain Warehouse & Fleet Showcase */}
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
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-300">
                    Fleet Live
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-white">
                  Multi-Temperature Fleet Delivering Daily
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dual-zone refrigerated vans ensure fresh vegetables and ripe fruits remain between 3°C - 5°C,
                  while wholesale dry commodities, cooking oils, and beverage cartons are stowed safely in secure
                  bulk cargo sections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          10. QUALITY, OPERATIONS & LOGISTICS ASSURANCE
      ---------------------------------------------------- */}
      <section id="logistics" className="section-reveal py-20 bg-white">
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
                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#287A74] hover:shadow-md will-change-transform">
                  <Flame size={20} className="text-amber-500" />
                  <h4 className="mt-2 font-display text-sm font-bold text-slate-900">
                    Direct Farm Sourcing
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Skip middlemen markets. We partner directly with vetted growers for peak freshness and stable
                    wholesale prices.
                  </p>
                </div>

                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#287A74] hover:shadow-md will-change-transform">
                  <RefreshCw size={20} className="text-emerald-600" />
                  <h4 className="mt-2 font-display text-sm font-bold text-slate-900">
                    Instant Replacement Policy
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Any crate that fails your receiving chef or manager inspection is replaced immediately on our
                    next route run.
                  </p>
                </div>

                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#287A74] hover:shadow-md will-change-transform">
                  <Calendar size={20} className="text-[#287A74]" />
                  <h4 className="mt-2 font-display text-sm font-bold text-slate-900">
                    Automated Standing Orders
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Never run out of cooking oil, mineral water, or onions. Schedule weekly deliveries that run
                    seamlessly on autopilot.
                  </p>
                </div>

                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#287A74] hover:shadow-md will-change-transform">
                  <FileSpreadsheet size={20} className="text-purple-600" />
                  <h4 className="mt-2 font-display text-sm font-bold text-slate-900">
                    Clear Digital Invoicing
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Detailed line items matching your internal PO numbers with signed delivery notes and VAT
                    receipts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          11. CLIENT TESTIMONIALS
      ---------------------------------------------------- */}
      <section className="section-reveal py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider uppercase text-[#287A74]">
              Operational Proof
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Trusted by Procurement Managers Across the Region
            </h2>
          </div>

          <div className="testimonials-grid mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "MH General Suppliers completely transformed our morning kitchen prep. Produce arrives at 5:15 AM sharp with tomatoes and greens at uniform ripeness. Their cooking oil pricing is unmatched.",
                author: "Chef David M.",
                role: "Executive Head Chef",
                sector: "5-Star Waterfront Hotel & Resort",
              },
              {
                quote:
                  "Managing breakroom drinks and weekly fresh fruit for 140 staff used to consume 6 hours every Monday. MH delivers the full order in one shot with clean consolidated monthly invoicing.",
                author: "Sarah K.",
                role: "Head of Workplace Operations",
                sector: "Regional FinTech Campus",
              },
              {
                quote:
                  "Our infrastructure project has 220 workers on site. MH supplies 50kg sacks of rice, beans, cooking oil, and pallets of bottled water without fail, even through the rainy season.",
                author: "Eng. Joseph T.",
                role: "Site Operations Director",
                sector: "Coastal Highway Infrastructure Project",
              },
            ].map((t) => (
              <div
                key={t.author}
                className="testimonial-card flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1.5 will-change-transform"
              >
                <p className="text-sm leading-relaxed text-slate-700 italic">“{t.quote}”</p>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="font-display text-base font-bold text-slate-900 block">{t.author}</span>
                  <span className="text-xs font-semibold text-[#287A74] block">{t.role}</span>
                  <span className="text-xs text-slate-400 block">{t.sector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          12. INTERACTIVE RFQ / QUOTE BUILDER SECTION
      ---------------------------------------------------- */}
      <section id="quote-section" className="section-reveal py-20 bg-[#0b2524] text-white relative overflow-hidden">
        {/* Ambient Glow Spotlight */}
        <div className="quote-ambient-glow pointer-events-none absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full bg-[#287A74]/15 blur-[120px] will-change-transform" />
        <div className="quote-ambient-glow pointer-events-none absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[120px] will-change-transform" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Value Proposition & Direct Contact */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
                <Sparkles size={14} />
                <span>Fast B2B Response</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Request an Itemized Wholesale Quotation
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Tell us your expected quantities, delivery location, and schedule. Our commercial account desk
                will return an itemized quote with volume pricing within 15 minutes during business hours.
              </p>

              <div className="space-y-4 pt-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-amber-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Direct Procurement Hotline</span>
                    <a href="tel:+255700000000" className="font-bold text-white hover:text-amber-300">
                      +255 700 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-amber-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Official RFQ Inquiries</span>
                    <a
                      href="mailto:quotes@mhsuppliers.co.tz"
                      className="font-bold text-white hover:text-amber-300"
                    >
                      quotes@mhsuppliers.co.tz
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-amber-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Logistics & Distribution Center</span>
                    <span className="font-bold text-white">Central Wholesale Terminal, Dar es Salaam</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Quotation Form */}
            <div className="rounded-3xl border border-white/15 bg-white p-8 text-slate-900 shadow-2xl">
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
                    onClick={() => {
                      setIsSubmitted(false);
                      setCart({});
                    }}
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
                      <label htmlFor="rfq-name" className="mb-1 block text-xs font-bold text-slate-700">
                        Full Name *
                      </label>
                      <input
                        id="rfq-name"
                        type="text"
                        required
                        placeholder="e.g. Michael Temba"
                        value={rfqName}
                        onChange={(e) => setRfqName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="rfq-company" className="mb-1 block text-xs font-bold text-slate-700">
                        Company or Facility Name *
                      </label>
                      <input
                        id="rfq-company"
                        type="text"
                        required
                        placeholder="e.g. Serena Hotel or Alpha Site"
                        value={rfqCompany}
                        onChange={(e) => setRfqCompany(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rfq-contact" className="mb-1 block text-xs font-bold text-slate-700">
                        Phone Number or Email *
                      </label>
                      <input
                        id="rfq-contact"
                        type="text"
                        required
                        placeholder="e.g. +255 712 345 678"
                        value={rfqContact}
                        onChange={(e) => setRfqContact(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="rfq-sector" className="mb-1 block text-xs font-bold text-slate-700">
                        Target Industry / Sector
                      </label>
                      <select
                        id="rfq-sector"
                        value={rfqSector}
                        onChange={(e) => setRfqSector(e.target.value)}
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
                    <label htmlFor="rfq-frequency" className="mb-1 block text-xs font-bold text-slate-700">
                      Delivery Frequency Required
                    </label>
                    <select
                      id="rfq-frequency"
                      value={rfqFrequency}
                      onChange={(e) => setRfqFrequency(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#287A74] focus:bg-white"
                    >
                      <option value="Daily Early Morning (5:30 AM)">Daily Early Morning (5:30 AM)</option>
                      <option value="Weekly Standing Order">Weekly Standing Order</option>
                      <option value="Bi-Weekly Restock">Bi-Weekly Restock</option>
                      <option value="One-Time Bulk Purchase Order">One-Time Bulk Purchase Order</option>
                    </select>
                  </div>

                  {/* Cart Summary if items added */}
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
                      id="rfq-notes"
                      rows={3}
                      required
                      placeholder="List commodities needed (e.g. 5 crates tomatoes, 10 crates water, 2 drums 20L oil) and delivery address..."
                      value={rfqNotes}
                      onChange={(e) => setRfqNotes(e.target.value)}
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

      {/* ----------------------------------------------------
          13. FREQUENTLY ASKED QUESTIONS (Accordion)
      ---------------------------------------------------- */}
      <section id="faq" className="section-reveal py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider uppercase text-[#287A74]">
              Clarity & Compliance
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-2 text-sm text-slate-600">
              Clear answers on commercial terms, ordering windows, and cold-chain logistics.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {[
              {
                q: "What is your order cutoff time for next-morning delivery?",
                a: "For next-morning delivery (between 05:00 AM and 07:30 AM), orders should be placed or confirmed by 18:00 (6:00 PM). Standing repeat orders run automatically without daily cutoff requirements.",
              },
              {
                q: "What are the payment terms for commercial accounts?",
                a: "We support flexible corporate terms: Net-15 and Net-30 invoicing for vetted corporate clients, bank transfers, credit terms upon trade reference verification, and Cash/EFT on Delivery for trial orders.",
              },
              {
                q: "How does your quality guarantee and replacement policy work?",
                a: "We inspect produce both at farm intake and before dispatch. When our driver arrives, your receiving manager checks the consignment. If any crate does not meet your specifications, we replace it on the same morning route run at no extra cost.",
              },
              {
                q: "Do you deliver to remote or active construction sites?",
                a: "Yes. Our delivery fleet includes heavy-duty all-terrain distribution vehicles capable of accessing active civil works, industrial parks, and high-rise construction zones with safety-compliant PPE drivers.",
              },
              {
                q: "Can we combine fresh produce, beverages, and bulk groceries on one invoice?",
                a: "Yes! That is our primary core value. Instead of dealing with five different market vendors, you receive one consolidated monthly invoice, one delivery manifest, and one accountable contact.",
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 transition overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 hover:text-[#287A74]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#287A74]" : ""
                        }`}
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

      {/* ----------------------------------------------------
          14. BOTTOM CTA BANNER (Mercora Style)
      ---------------------------------------------------- */}
      <section className="section-reveal px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b2524] via-[#287A74] to-[#389d95] p-8 sm:p-14 text-white shadow-2xl relative">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
              Upgrade Your Supply Chain Today
            </span>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Start Sourcing Smarter with MH General Suppliers
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Consolidate your fresh vegetables, fruits, soft drinks, grains, snacks, and cooking oils under one
              contract. Speak directly to our logistics team today.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#quote-section"
                className="rounded-xl bg-amber-500 px-7 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
              >
                Request Custom Quote
              </a>
              <a
                href="tel:+255700000000"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-sm hover:bg-white/10 transition"
              >
                <Phone size={16} /> Call Hotline: +255 700 000 000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          15. FOOTER (With Brand Watermark like Mercora full.webp)
      ---------------------------------------------------- */}
      <footer className="relative overflow-hidden bg-[#071817] text-white pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                  <Image src="/logo.jpeg" alt="MH Logo" fill className="object-contain" />
                </div>
                <span className="font-display text-lg font-extrabold tracking-tight text-white">
                  MH GENERAL SUPPLIERS
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Wholesale food and commercial distribution. Supplying fresh farm vegetables, seasonal fruits,
                soft drinks, groceries, snacks, and cooking oil to premier businesses.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Cold-Chain Logistics Licensed</span>
              </div>
            </div>

            {/* Commodities */}
            <div>
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Supply Categories
              </h4>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/catalog?category=eggs" className="hover:text-amber-400 transition flex items-center justify-between">
                    <span>Fresh Farm Eggs (Mayai)</span>
                    <span className="text-[10px] text-amber-400 font-bold">Top Seller</span>
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=vegetables" className="hover:text-amber-400 transition">
                    Fresh Farm Vegetables
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=fruits" className="hover:text-amber-400 transition">
                    Orchard & Tropical Fruits
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=beverages" className="hover:text-amber-400 transition">
                    Soft Drinks & Mineral Water
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=groceries" className="hover:text-amber-400 transition">
                    Wholesale Rice, Flour & Grains
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=cooking_oil" className="hover:text-amber-400 transition">
                    Commercial Cooking Oils & Fats
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=snacks" className="hover:text-amber-400 transition">
                    Office Snacks & Breakroom Kits
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sectors */}
            <div>
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Sectors We Serve
              </h4>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li>
                  <a href="#sectors" className="hover:text-amber-400 transition">
                    Luxury Hotels & Resorts
                  </a>
                </li>
                <li>
                  <a href="#sectors" className="hover:text-amber-400 transition">
                    Corporate Offices & Campuses
                  </a>
                </li>
                <li>
                  <a href="#sectors" className="hover:text-amber-400 transition">
                    Construction Sites & Worker Camps
                  </a>
                </li>
                <li>
                  <a href="#sectors" className="hover:text-amber-400 transition">
                    Restaurants & Catering Companies
                  </a>
                </li>
                <li>
                  <a href="#sectors" className="hover:text-amber-400 transition">
                    Hospitals & Institutional Dining
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Logistics Hub
              </h4>
              <ul className="mt-4 space-y-3 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-amber-400" />
                  <span>+255 700 000 000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-amber-400" />
                  <span>orders@mhsuppliers.co.tz</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-amber-400" />
                  <span>Central Wholesale Terminal, Dar es Salaam</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-400" />
                  <span>Dispatch: Mon - Sat • 05:00 AM - 18:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between items-center gap-4 text-xs text-slate-500 sm:flex-row">
            <span>© 2026 MH General Suppliers. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-300">
                Terms of Supply
              </a>
              <a href="#" className="hover:text-slate-300">
                Food Safety Compliance
              </a>
            </div>
          </div>
        </div>

        {/* Huge Subtle Watermark (Like MERCORA in full.webp) */}
        <div className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-[15vw] font-black text-white/[0.025] leading-none tracking-tighter whitespace-nowrap">
          MH SUPPLIERS
        </div>
      </footer>

      {/* ----------------------------------------------------
          16. SLIDE-OVER RFQ BASKET DRAWER
      ---------------------------------------------------- */}
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
                  <h4 className="mt-4 font-display text-base font-bold text-slate-800">
                    Your basket is currently empty
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">
                    Add commodities from the wholesale catalog to generate an instant quotation.
                  </p>
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
                      <div
                        key={pId}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                      >
                        <div className="pr-2">
                          <h4 className="font-bold text-slate-900">{prod.name}</h4>
                          <span className="text-[11px] text-slate-500">{prod.packSize}</span>
                          <span className="block font-semibold text-[#287A74]">{prod.priceEstimate}</span>
                        </div>

                        <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                          <button
                            onClick={() => updateQuantity(pId, -1)}
                            className="p-1 text-slate-600 hover:text-red-600"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center font-bold text-slate-900">{qty}</span>
                          <button
                            onClick={() => updateQuantity(pId, 1)}
                            className="p-1 text-slate-600 hover:text-emerald-600"
                          >
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
                <a
                  href="#quote-section"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#287A74] py-3 text-xs font-bold text-white hover:bg-[#328e87] transition"
                >
                  <span>Proceed to Finalize RFQ</span>
                  <ArrowRight size={14} />
                </a>
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

      {/* ----------------------------------------------------
          17. STICKY FLOATING QUICK-ORDER SUMMARY BAR (Desktop)
      ---------------------------------------------------- */}
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
              <a
                href="#quote-section"
                className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          18. FLOATING BACK TO TOP WITH SCROLL PROGRESS RING
      ---------------------------------------------------- */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${showBackToTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <button
          onClick={() => scrollTo(0)}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#287A74] hover:text-[#287A74] hover:shadow-2xl"
          aria-label="Scroll to top"
        >
          <svg className="absolute inset-0 -rotate-90" width="48" height="48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#e2e8f0"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#287A74"
              strokeWidth="2.5"
              fill="transparent"
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
    </div>
  );
}
