"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Truck,
  Phone,
  ArrowRight,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

// Dispatch countdown (shared across pages)
function useCountdown() {
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
  return timeLeft;
}

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalCartCount, setIsCartOpen, isCartOpen } = useCart();
  const timeLeft = useCountdown();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/catalog", label: "Catalog" },
    { href: "/sectors", label: "Sectors" },
    { href: "/routes", label: "Island Routes" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/quote", label: "FAQ & Quote" },
  ];

  return (
    <>
      {/* Top Dispatch Bar */}
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

          <div className="hidden items-center gap-5 sm:flex">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Truck size={14} className="text-amber-400" /> Zanzibar Cold-Chain Transit
            </span>
            <div className="flex items-center gap-3">
              <a
                href="tel:+255779973333"
                className="flex items-center gap-1.5 font-bold text-white transition hover:text-amber-400"
              >
                <Phone size={13} className="text-emerald-400" /> 0779 973 333
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://wa.me/255776147097"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-amber-300 transition hover:text-white"
              >
                <MessageSquare size={13} className="text-emerald-400" /> 0776 147 097
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          isScrolled
            ? "border-slate-200/90 bg-white/95 shadow-lg backdrop-blur-md"
            : "border-slate-200/60 bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#287A74] shadow-sm transition group-hover:scale-105">
              <Image
                src="/logo.jpeg"
                alt="MH Suppliers Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-extrabold tracking-tight text-[#287A74] leading-tight">
                MH SUPPLIERS
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600">
                Zanzibar
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-[#287A74] ${
                  pathname === link.href ? "text-[#287A74] border-b-2 border-[#287A74] pb-0.5" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-[#287A74] hover:bg-[#287A74]/10"
              aria-label="Open Quote Basket"
            >
              <ShoppingBag size={16} className="text-[#287A74]" />
              <span className="hidden sm:inline">RFQ Basket</span>
              {totalCartCount > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-[11px] font-extrabold text-slate-900">
                  {totalCartCount}
                </span>
              )}
            </button>

            <Link
              href="/quote"
              className="group flex items-center gap-1.5 rounded-xl bg-[#287A74] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#071a19]/20 transition hover:bg-[#328e87]"
            >
              <span>Request Quote</span>
              <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
