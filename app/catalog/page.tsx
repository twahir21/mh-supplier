"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Phone,
  Truck,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Send,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, type CategoryId, type SectorId } from "@/data/catalogData";
import { useCart } from "@/context/CartContext";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as CategoryId) || "all";

  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory);
  const [activeSector, setActiveSector] = useState<SectorId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Sync category from URL param if query changes
  useEffect(() => {
    const cat = searchParams.get("category") as CategoryId;
    if (cat && (cat === "all" || CATEGORIES.some((c) => c.id === cat))) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const {
    cart,
    updateQuantity,
    setCart,
    clearCart,
    totalCartCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSector = activeSector === "all" || item.sectors.includes(activeSector);
      const matchesQuery =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.packSize.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.grade.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSector && matchesQuery;
    });
  }, [activeCategory, activeSector, searchQuery]);

  // Generate WhatsApp Order Message
  const getWhatsAppMessage = () => {
    const items = Object.entries(cart)
      .map(([id, qty]) => {
        const p = PRODUCTS.find((prod) => prod.id === id);
        return p ? `• ${p.name} - ${qty} x ${p.packSize}` : null;
      })
      .filter(Boolean)
      .join("%0A");

    return `https://wa.me/255700000000?text=Hello%20MH%20General%20Suppliers,%20I%20would%20like%20to%20request%20an%20official%20commercial%20quote%20for%20the%20following%20items:%0A%0A${items}%0A%0APlease%20provide%20delivery%20schedule%20and%20Net-30%20invoicing%20terms.`;
  };

  const copyQuoteText = () => {
    const text = Object.entries(cart)
      .map(([id, qty]) => {
        const p = PRODUCTS.find((prod) => prod.id === id);
        return p ? `• ${p.name} (${qty} x ${p.packSize}) - ${p.priceEstimate}` : null;
      })
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(`MH General Suppliers Requisition:\n\n${text}`);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-400">
      {/* ----------------------------------------------------
          1. TOP NOTIFICATION BAR
      ---------------------------------------------------- */}
      <div className="border-b border-[#287A74]/25 bg-[#071a19] text-xs font-medium text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Daily Order Cutoff:</span>
            <span>Next dispatch window locks at 10:00 PM for 05:30 AM drop-off.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-1.5 text-slate-300 sm:flex">
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
          2. STICKY HEADER
      ---------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Back button */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-[#287A74] hover:bg-white hover:text-[#287A74]"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Overview</span>
            </Link>

            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#287A74] shadow-sm transition group-hover:scale-105">
                <Image
                  src="/logo.jpeg"
                  alt="MH General Suppliers Logo"
                  fill
                  className="object-contain"
                  sizes="44px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-extrabold tracking-tight text-[#287A74]">
                  MH GENERAL SUPPLIERS
                </span>
                <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Wholesale Catalog & RFQ Matrix
                </span>
              </div>
            </Link>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/#quote-section"
              className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <FileSpreadsheet size={15} className="text-[#287A74]" />
              <span>Submit Custom RFP</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-xl bg-[#287A74] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#287A74]/20 transition hover:bg-[#328e87] active:scale-95"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Quote Basket</span>
              {totalCartCount > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400 font-mono text-[11px] font-extrabold text-slate-950">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------
          3. HERO / PAGE HEADER
      ---------------------------------------------------- */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#0b2524] via-[#103332] to-[#0b2524] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <Sparkles size={13} className="text-amber-400" />
                <span>Commercial Order Matrix • Live Wholesale Rates</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Wholesale Product Catalog & Pricing • Zanzibar
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Browse commercial wholesale commodities across Zanzibar: Farm-fresh eggs (Mayai ya Kisasa & Kienyeji),
                organic vegetables, seasonal fruits, bulk rice, cooking oil, soft drinks, and hotel toilet paper & tissue supplies.
                Build an itemized quotation with next-morning resort dock delivery.
              </p>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck size={16} /> 100% Chef-Graded Quality
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Truck size={16} /> 5:30 AM Delivery Window
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="flex items-center gap-1.5 text-teal-300">
                  <FileSpreadsheet size={16} /> Net-30 Monthly Billing
                </span>
              </div>
            </div>

            {/* Quick summary stat */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md md:w-72">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Catalog Statistics
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-white">{PRODUCTS.length}+</span>
                <span className="text-xs text-slate-300">Commercial SKUs Available</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                All commodities available in bulk pallet or crate lots with volume tiered discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          4. FILTER CONTROLS & SEARCH BAR
      ---------------------------------------------------- */}
      <section className="sticky top-20 z-30 border-b border-slate-200 bg-white/95 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  activeCategory === "all"
                    ? "bg-[#287A74] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Categories ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    activeCategory === cat.id
                      ? "bg-[#287A74] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <cat.icon size={13} />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Right: Search & Sector filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Sector Destination Filter */}
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                <Filter size={14} className="text-slate-400" />
                <span className="hidden sm:inline">Destination:</span>
                <select
                  value={activeSector}
                  onChange={(e) => setActiveSector(e.target.value as SectorId)}
                  className="bg-transparent font-bold text-[#287A74] outline-none cursor-pointer"
                >
                  <option value="all">All Sectors</option>
                  <option value="hotels">Hotels & Resorts</option>
                  <option value="offices">Corporate Offices</option>
                  <option value="construction">Construction Sites</option>
                  <option value="catering">Commercial Catering</option>
                </select>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search tomatoes, rice, oil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 py-2 text-xs outline-none transition focus:border-[#287A74] focus:bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          5. PRODUCT GRID
      ---------------------------------------------------- */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Active filtering feedback */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/80">
          <div className="text-xs font-semibold text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> commercial products
            {activeCategory !== "all" && (
              <span> in <span className="text-[#287A74] font-bold capitalize">{activeCategory.replace("_", " ")}</span></span>
            )}
            {activeSector !== "all" && (
              <span> filtered for <span className="text-[#287A74] font-bold capitalize">{activeSector}</span></span>
            )}
          </div>

          {(activeCategory !== "all" || activeSector !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveSector("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-[#287A74] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((prod) => {
            const currentQty = cart[prod.id] || 0;
            return (
              <article
                key={prod.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#287A74]/10 px-2.5 py-1 text-xs font-bold text-[#287A74]">
                      <prod.icon size={13} />
                      {prod.categoryName}
                    </span>
                    {prod.badge && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-[#287A74] transition">
                    {prod.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Commercial Spec Table Box */}
                  <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 text-xs space-y-1.5 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Commercial Pack:</span>
                      <span className="font-bold text-slate-900">{prod.packSize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Grading Spec:</span>
                      <span className="font-semibold text-emerald-700">{prod.grade}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500">Indicative Pricing:</span>
                      <span className="font-extrabold text-[#287A74] text-sm">{prod.priceEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Stock & Quantity Selector */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Ready for Dispatch</span>
                  </div>

                  <div>
                    {currentQty > 0 ? (
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
                        <button
                          onClick={() => updateQuantity(prod.id, -1)}
                          className="p-2 text-slate-600 hover:text-red-600 transition"
                          aria-label={`Reduce ${prod.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-extrabold text-slate-900">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => updateQuantity(prod.id, 1)}
                          className="p-2 text-slate-600 hover:text-emerald-600 transition"
                          aria-label={`Add ${prod.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateQuantity(prod.id, 1)}
                        className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-[#287A74] transition hover:bg-[#287A74] hover:text-white shadow-sm"
                      >
                        <Plus size={14} />
                        <span>Add to Quote</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredProducts.length === 0 && (
          <div className="my-16 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <Search size={36} className="mx-auto text-slate-300" />
            <h3 className="mt-4 font-display text-xl font-bold text-slate-800">No matching commodities found</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              We supply custom procurement requests beyond listed items. Contact our commercial desk directly.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSector("all");
                  setSearchQuery("");
                }}
                className="rounded-xl bg-[#287A74] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#328e87] transition"
              >
                Reset All Filters
              </button>
              <a
                href="tel:+255700000000"
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Call Procurement Desk
              </a>
            </div>
          </div>
        )}
      </main>

      {/* ----------------------------------------------------
          6. FLOATING QUICK-ORDER SUMMARY BAR
      ---------------------------------------------------- */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xl">
          <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-[#287A74]/95 px-5 py-3.5 text-white shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400 text-slate-950 font-bold text-xs">
                {totalCartCount}
              </div>
              <div className="text-xs">
                <span className="block font-bold">Selected Commodities</span>
                <span className="text-slate-200">Ready to generate itemized quotation</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#287A74] shadow-sm hover:bg-amber-400 hover:text-slate-950 transition"
            >
              <span>View Basket</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          7. QUOTE BASKET SLIDE-OVER DRAWER
      ---------------------------------------------------- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between">
              {/* Drawer Top */}
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
                      Select items and quantities from the wholesale catalog above.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 rounded-xl bg-[#287A74] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#328e87] transition"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
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

              {/* Drawer Bottom Actions */}
              {totalCartCount > 0 && (
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Total Selected Units:</span>
                    <span className="text-base text-[#287A74]">{totalCartCount} Packs</span>
                  </div>

                  {/* Proceed to RFP Form on Homepage */}
                  <Link
                    href="/#quote-section"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#287A74] py-3 text-xs font-bold text-white hover:bg-[#328e87] transition shadow-md"
                  >
                    <span>Finalize Commercial RFQ</span>
                    <ArrowRight size={14} />
                  </Link>

                  {/* Order via WhatsApp */}
                  <a
                    href={getWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition"
                  >
                    <MessageSquare size={14} />
                    <span>Send Order via WhatsApp</span>
                  </a>

                  {/* Copy Requisition summary */}
                  <button
                    onClick={copyQuoteText}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    <FileSpreadsheet size={13} className="text-[#287A74]" />
                    <span>{copiedQuote ? "Copied to Clipboard!" : "Copy Itemized Summary"}</span>
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-red-600 pt-1"
                  >
                    Clear All Items
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          8. FOOTER
      ---------------------------------------------------- */}
      <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-slate-900">MH General Suppliers Ltd</span>
            <span>•</span>
            <span>Wholesale Supply & Commercial Distribution</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/" className="hover:text-[#287A74]">
              Home
            </Link>
            <Link href="/#sectors" className="hover:text-[#287A74]">
              Sectors We Serve
            </Link>
            <Link href="/#how-it-works" className="hover:text-[#287A74]">
              Logistics
            </Link>
            <Link href="/#quote-section" className="hover:text-[#287A74]">
              RFQ Desk
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-500">Loading Wholesale Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
