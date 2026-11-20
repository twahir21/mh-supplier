"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageSquare, Mail, MapPin, Clock } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#071817] text-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
          {/* Brand */}
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
              soft drinks, groceries, snacks, and cooking oil to premier businesses across Zanzibar.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cold-Chain Logistics Licensed</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Supply Categories
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              {[
                { href: "/catalog?category=eggs", label: "Fresh Farm Eggs (Mayai)", badge: "Top Seller" },
                { href: "/catalog?category=vegetables", label: "Fresh Farm Vegetables" },
                { href: "/catalog?category=fruits", label: "Orchard & Tropical Fruits" },
                { href: "/catalog?category=beverages", label: "Soft Drinks & Mineral Water" },
                { href: "/catalog?category=groceries", label: "Wholesale Rice, Flour & Grains" },
                { href: "/catalog?category=cooking_oil", label: "Commercial Cooking Oils & Fats" },
                { href: "/catalog?category=hygiene", label: "Tissues & Hotel Paper Supplies", badge2: "Hygiene" },
                { href: "/catalog?category=snacks", label: "Office Snacks & Breakroom Kits" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-amber-400 transition flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && <span className="text-[10px] text-amber-400 font-bold">{item.badge}</span>}
                    {item.badge2 && <span className="text-[10px] text-teal-400 font-bold">{item.badge2}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Sectors We Serve
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              {[
                "Luxury Hotels & Resorts",
                "Corporate Offices & Campuses",
                "Construction Sites & Worker Camps",
                "Restaurants & Catering Companies",
                "Hospitals & Institutional Dining",
              ].map((s) => (
                <li key={s}>
                  <Link href="/sectors" className="hover:text-amber-400 transition">{s}</Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-6 font-display text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li><Link href="/how-it-works" className="hover:text-amber-400 transition">How It Works</Link></li>
              <li><Link href="/routes" className="hover:text-amber-400 transition">Island Routes</Link></li>
              <li><Link href="/quote" className="hover:text-amber-400 transition">Request a Quote</Link></li>
              <li><Link href="/quote#faq" className="hover:text-amber-400 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Logistics Hub • Zanzibar
            </h4>
            <ul className="mt-4 space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Sales & Direct Orders</span>
                  <a href="tel:+255779973333" className="font-semibold text-slate-200 hover:text-amber-400">
                    0779 973 333 / +255 779 973 333
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Customer Support & WhatsApp</span>
                  <a
                    href="https://wa.me/255776147097"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-300 hover:text-white"
                  >
                    0776 147 097 / +255 776 147 097
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <span>orders@mhsuppliers.co.tz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Central Wholesale Hub & Malindi Port, Stone Town, Zanzibar</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-emerald-400 shrink-0" />
                <span>Dispatch: Mon - Sat • 05:00 AM - 18:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between items-center gap-4 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 MH General Suppliers. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Supply</a>
            <a href="#" className="hover:text-slate-300">Food Safety Compliance</a>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-[15vw] font-black text-white/[0.025] leading-none tracking-tighter whitespace-nowrap">
        MH SUPPLIERS
      </div>
    </footer>
  );
}
