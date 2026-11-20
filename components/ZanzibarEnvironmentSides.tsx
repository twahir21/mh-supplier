"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ZanzibarEnvironmentSides
 * Displays 4 prominent, beautifully animated tropical palm trees framing the website:
 * - Tree 1: Top-Left Coconut Palm (arching over the upper left flank)
 * - Tree 2: Mid-Left Coastal Palm (swaying gently down the left side)
 * - Tree 3: Top-Right Coconut Palm (arching over the upper right flank)
 * - Tree 4: Mid-Right Coastal Palm (swaying along the right side)
 *
 * Positioned with z-30 (above section backgrounds, below modals) and pointer-events-none,
 * animated with GSAP ScrollTrigger & Lenis smooth inertia scroll.
 */
export default function ZanzibarEnvironmentSides() {
  const containerRef = useRef<HTMLDivElement>(null);
  const palm1Ref = useRef<HTMLDivElement>(null);
  const palm2Ref = useRef<HTMLDivElement>(null);
  const palm3Ref = useRef<HTMLDivElement>(null);
  const palm4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance reveal for all 4 palm trees
      if (palm1Ref.current) {
        gsap.fromTo(
          palm1Ref.current,
          { x: -70, opacity: 0, rotate: -6 },
          { x: 0, opacity: 1, rotate: 0, duration: 1.4, ease: "power3.out" }
        );
      }

      if (palm2Ref.current) {
        gsap.fromTo(
          palm2Ref.current,
          { x: -60, opacity: 0, rotate: -4 },
          { x: 0, opacity: 1, rotate: 0, duration: 1.6, ease: "power3.out", delay: 0.1 }
        );
      }

      if (palm3Ref.current) {
        gsap.fromTo(
          palm3Ref.current,
          { x: 70, opacity: 0, rotate: 6 },
          { x: 0, opacity: 1, rotate: 0, duration: 1.4, ease: "power3.out", delay: 0.15 }
        );
      }

      if (palm4Ref.current) {
        gsap.fromTo(
          palm4Ref.current,
          { x: 60, opacity: 0, rotate: 4 },
          { x: 0, opacity: 1, rotate: 0, duration: 1.6, ease: "power3.out", delay: 0.25 }
        );
      }

      // 2. Lenis ScrollTrigger scrub parallax across page scroll
      // Each tree moves at a distinct rate to create natural depth
      if (palm1Ref.current) {
        gsap.to(palm1Ref.current, {
          y: 140,
          rotation: -3,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
      }

      if (palm2Ref.current) {
        gsap.to(palm2Ref.current, {
          y: -120,
          rotation: 3.5,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        });
      }

      if (palm3Ref.current) {
        gsap.to(palm3Ref.current, {
          y: 120,
          rotation: 2.5,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
      }

      if (palm4Ref.current) {
        gsap.to(palm4Ref.current, {
          y: -100,
          rotation: -3,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      }

      // 3. Continuous Island Ocean Breeze: gentle sinusoidal swaying of the 4 palms
      if (palm1Ref.current) {
        gsap.to(palm1Ref.current, {
          rotation: 2.5,
          yoyo: true,
          repeat: -1,
          duration: 5.8,
          ease: "sine.inOut",
          transformOrigin: "0% 0%",
        });
      }

      if (palm2Ref.current) {
        gsap.to(palm2Ref.current, {
          rotation: -2.2,
          yoyo: true,
          repeat: -1,
          duration: 6.6,
          ease: "sine.inOut",
          transformOrigin: "0% 50%",
        });
      }

      if (palm3Ref.current) {
        gsap.to(palm3Ref.current, {
          rotation: -2.6,
          yoyo: true,
          repeat: -1,
          duration: 6.2,
          ease: "sine.inOut",
          transformOrigin: "100% 0%",
        });
      }

      if (palm4Ref.current) {
        gsap.to(palm4Ref.current, {
          rotation: 2.4,
          yoyo: true,
          repeat: -1,
          duration: 7.4,
          ease: "sine.inOut",
          transformOrigin: "100% 50%",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
    >
      {/* ========================================================
          PALM TREE 1: TOP-LEFT COCONUT PALM
      ======================================================== */}
      <div
        ref={palm1Ref}
        className="absolute -top-6 -left-8 w-44 sm:w-60 md:w-72 lg:w-88 xl:w-96 opacity-85 transition-opacity will-change-transform drop-shadow-[0_12px_28px_rgba(11,79,72,0.35)]"
      >
        <svg viewBox="0 0 420 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="p1Trunk" x1="0%" y1="100%" x2="60%" y2="0%">
              <stop offset="0%" stopColor="#4A2E16" />
              <stop offset="40%" stopColor="#784E29" />
              <stop offset="80%" stopColor="#A0693B" />
              <stop offset="100%" stopColor="#5E381A" />
            </linearGradient>
            <linearGradient id="p1Leaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B4F48" />
              <stop offset="45%" stopColor="#0D9488" />
              <stop offset="85%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="p1Stem" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#063530" />
              <stop offset="60%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Curved Palm Trunk */}
          <path
            d="M-30,540 Q60,360 85,210 Q105,90 145,20 C125,90 100,215 75,360 C50,450 -10,540 -30,540 Z"
            fill="url(#p1Trunk)"
          />
          {/* Trunk Bark Rings */}
          <path d="M5,490 Q30,475 55,485" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22,430 Q48,415 70,425" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42,370 Q68,355 88,365" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60,310 Q82,295 100,305" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M78,245 Q98,230 114,240" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M96,175 Q114,162 128,170" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M116,105 Q130,95 140,102" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />

          {/* Coconut Cluster at Apex */}
          <circle cx="135" cy="38" r="9" fill="#523218" stroke="#3A220E" strokeWidth="1.5" />
          <circle cx="147" cy="42" r="8.5" fill="#6B4222" stroke="#3A220E" strokeWidth="1.5" />
          <circle cx="140" cy="50" r="8" fill="#42250F" stroke="#3A220E" strokeWidth="1.5" />

          {/* Crown Frond 1: Sweeping Arch Outward */}
          <path d="M142,25 Q230,20 310,85 Q365,135 410,230 C335,175 255,120 145,28 Z" fill="url(#p1Leaf)" />
          <path d="M142,25 Q245,35 330,110 Q380,165 415,245" stroke="url(#p1Stem)" strokeWidth="3.5" strokeLinecap="round" />
          {/* Detailed Leaflets */}
          <path d="M185,42 L225,18 M215,55 L265,30 M245,70 L305,45 M275,88 L345,65 M305,110 L375,90 M335,138 L400,125 M360,172 L415,170 M380,210 L418,220" stroke="url(#p1Leaf)" strokeWidth="2.8" strokeLinecap="round" />

          {/* Crown Frond 2: Broad Middle Outward Canopy */}
          <path d="M140,32 Q215,80 280,170 Q325,245 340,360 C275,275 205,195 142,35 Z" fill="url(#p1Leaf)" opacity="0.95" />
          <path d="M140,32 Q225,95 295,195 Q335,270 348,375" stroke="url(#p1Stem)" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M175,80 L220,55 M205,115 L255,90 M235,150 L290,125 M265,190 L320,170 M290,235 L345,220 M310,285 L355,280 M325,335 L352,345" stroke="url(#p1Leaf)" strokeWidth="2.6" strokeLinecap="round" />

          {/* Crown Frond 3: Drooping Lower Breeze Leaf */}
          <path d="M136,36 Q185,120 205,230 Q215,320 185,430 C170,330 155,235 137,39 Z" fill="url(#p1Leaf)" opacity="0.88" />
          <path d="M136,36 Q195,140 215,255 Q220,345 190,445" stroke="url(#p1Stem)" strokeWidth="3" strokeLinecap="round" />
          <path d="M165,115 L195,95 M182,165 L220,150 M195,220 L235,215 M205,280 L240,285 M205,340 L232,355 M195,395 L215,420" stroke="url(#p1Leaf)" strokeWidth="2.4" strokeLinecap="round" />

          {/* Crown Frond 4: High Upward Arching Leaf */}
          <path d="M140,20 Q175,-30 250,-10 Q305,10 350,75 C285,40 210,15 142,22 Z" fill="url(#p1Leaf)" opacity="0.8" />
          <path d="M140,20 Q185,-35 265,-12 Q320,12 360,85" stroke="url(#p1Stem)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* ========================================================
          PALM TREE 2: MID-LEFT COASTAL PALM
      ======================================================== */}
      <div
        ref={palm2Ref}
        className="absolute top-[48%] -left-12 w-40 sm:w-52 md:w-64 lg:w-76 xl:w-84 opacity-80 transition-opacity will-change-transform drop-shadow-[0_12px_24px_rgba(11,79,72,0.3)]"
      >
        <svg viewBox="0 0 380 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="p2Trunk" x1="0%" y1="100%" x2="80%" y2="0%">
              <stop offset="0%" stopColor="#3E2512" />
              <stop offset="50%" stopColor="#6C4323" />
              <stop offset="100%" stopColor="#4A2C15" />
            </linearGradient>
            <linearGradient id="p2Leaf" x1="0%" y1="0%" x2="100%" y2="90%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="45%" stopColor="#059669" />
              <stop offset="85%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="p2Stem" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#022C22" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Steeper Coastal Trunk */}
          <path
            d="M-40,480 Q50,340 90,210 Q120,110 160,40 C140,110 115,210 80,340 C45,420 -20,480 -40,480 Z"
            fill="url(#p2Trunk)"
          />
          <circle cx="152" cy="52" r="8" fill="#4B2C16" />
          <circle cx="162" cy="56" r="7.5" fill="#61391C" />

          {/* Spreading Fronds */}
          <path d="M158,42 Q230,35 300,95 Q345,145 375,230 C310,180 240,130 160,45 Z" fill="url(#p2Leaf)" />
          <path d="M158,42 Q245,50 315,115 Q360,170 380,240" stroke="url(#p2Stem)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M195,58 L230,35 M225,72 L270,50 M255,90 L305,70 M285,115 L335,95 M315,145 L360,130 M340,185 L375,185" stroke="url(#p2Leaf)" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M156,48 Q215,95 260,180 Q290,250 285,345 C240,265 195,190 157,50 Z" fill="url(#p2Leaf)" opacity="0.9" />
          <path d="M156,48 Q225,110 270,200 Q298,270 292,360" stroke="url(#p2Stem)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M185,95 L225,75 M215,130 L260,110 M240,170 L285,155 M260,220 L300,215 M270,275 L305,280" stroke="url(#p2Leaf)" strokeWidth="2.4" strokeLinecap="round" />

          <path d="M152,48 Q180,120 185,210 Q180,290 140,370 C145,290 152,210 154,52 Z" fill="url(#p2Leaf)" opacity="0.85" />
          <path d="M152,48 Q188,135 192,230 Q188,310 148,385" stroke="url(#p2Stem)" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* ========================================================
          PALM TREE 3: TOP-RIGHT COCONUT PALM
      ======================================================== */}
      <div
        ref={palm3Ref}
        className="absolute -top-6 -right-8 w-44 sm:w-60 md:w-72 lg:w-88 xl:w-96 opacity-85 transition-opacity will-change-transform drop-shadow-[0_12px_28px_rgba(245,158,11,0.3)]"
      >
        <svg viewBox="0 0 420 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="p3Trunk" x1="100%" y1="100%" x2="40%" y2="0%">
              <stop offset="0%" stopColor="#4A2E16" />
              <stop offset="40%" stopColor="#784E29" />
              <stop offset="80%" stopColor="#A0693B" />
              <stop offset="100%" stopColor="#5E381A" />
            </linearGradient>
            <linearGradient id="p3Leaf" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B4F48" />
              <stop offset="40%" stopColor="#0D9488" />
              <stop offset="80%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="p3Stem" x1="100%" y1="0%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#063530" />
              <stop offset="60%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Mirrored Curved Palm Trunk (Right to Left) */}
          <path
            d="M450,540 Q360,360 335,210 Q315,90 275,20 C295,90 320,215 345,360 C370,450 430,540 450,540 Z"
            fill="url(#p3Trunk)"
          />
          {/* Trunk Bark Rings */}
          <path d="M415,490 Q390,475 365,485" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M398,430 Q372,415 350,425" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M378,370 Q352,355 332,365" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M360,310 Q338,295 320,305" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M342,245 Q322,230 306,240" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M324,175 Q306,162 292,170" stroke="#3A220E" strokeWidth="2.5" strokeLinecap="round" />

          {/* Coconut Cluster at Apex */}
          <circle cx="285" cy="38" r="9" fill="#523218" stroke="#3A220E" strokeWidth="1.5" />
          <circle cx="273" cy="42" r="8.5" fill="#6B4222" stroke="#3A220E" strokeWidth="1.5" />
          <circle cx="280" cy="50" r="8" fill="#42250F" stroke="#3A220E" strokeWidth="1.5" />

          {/* Right Crown Frond 1: Sweeping Inward Arch */}
          <path d="M278,25 Q190,20 110,85 Q55,135 10,230 C85,175 165,120 275,28 Z" fill="url(#p3Leaf)" />
          <path d="M278,25 Q175,35 90,110 Q40,165 5,245" stroke="url(#p3Stem)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M235,42 L195,18 M205,55 L155,30 M175,70 L115,45 M145,88 L75,65 M115,110 L45,90 M85,138 L20,125 M60,172 L5,170 M40,210 L2,220" stroke="url(#p3Leaf)" strokeWidth="2.8" strokeLinecap="round" />

          {/* Right Crown Frond 2: Broad Middle Inward Canopy */}
          <path d="M280,32 Q205,80 140,170 Q95,245 80,360 C145,275 215,195 278,35 Z" fill="url(#p3Leaf)" opacity="0.95" />
          <path d="M280,32 Q195,95 125,195 Q85,270 72,375" stroke="url(#p3Stem)" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M245,80 L200,55 M215,115 L165,90 M185,150 L130,125 M155,190 L100,170 M130,235 L75,220 M110,285 L65,280 M95,335 L68,345" stroke="url(#p3Leaf)" strokeWidth="2.6" strokeLinecap="round" />

          {/* Right Crown Frond 3: Drooping Lower Breeze Leaf */}
          <path d="M284,36 Q235,120 215,230 Q205,320 235,430 C250,330 265,235 283,39 Z" fill="url(#p3Leaf)" opacity="0.88" />
          <path d="M284,36 Q225,140 205,255 Q200,345 230,445" stroke="url(#p3Stem)" strokeWidth="3" strokeLinecap="round" />
          <path d="M255,115 L225,95 M238,165 L200,150 M225,220 L185,215 M215,280 L180,285 M215,340 L188,355 M225,395 L205,420" stroke="url(#p3Leaf)" strokeWidth="2.4" strokeLinecap="round" />

          {/* Right Crown Frond 4: High Upward Arching Leaf */}
          <path d="M280,20 Q245,-30 170,-10 Q115,10 70,75 C135,40 210,15 278,22 Z" fill="url(#p3Leaf)" opacity="0.8" />
          <path d="M280,20 Q235,-35 155,-12 Q100,12 60,85" stroke="url(#p3Stem)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* ========================================================
          PALM TREE 4: MID-RIGHT COASTAL PALM
      ======================================================== */}
      <div
        ref={palm4Ref}
        className="absolute top-[52%] -right-12 w-40 sm:w-52 md:w-64 lg:w-76 xl:w-84 opacity-80 transition-opacity will-change-transform drop-shadow-[0_12px_24px_rgba(245,158,11,0.25)]"
      >
        <svg viewBox="0 0 380 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="p4Trunk" x1="100%" y1="100%" x2="20%" y2="0%">
              <stop offset="0%" stopColor="#3E2512" />
              <stop offset="50%" stopColor="#6C4323" />
              <stop offset="100%" stopColor="#4A2C15" />
            </linearGradient>
            <linearGradient id="p4Leaf" x1="100%" y1="0%" x2="0%" y2="90%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="45%" stopColor="#059669" />
              <stop offset="85%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="p4Stem" x1="100%" y1="0%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#022C22" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Steeper Coastal Trunk (Inward from Right) */}
          <path
            d="M420,480 Q330,340 290,210 Q260,110 220,40 C240,110 265,210 300,340 C335,420 400,480 420,480 Z"
            fill="url(#p4Trunk)"
          />
          <circle cx="228" cy="52" r="8" fill="#4B2C16" />
          <circle cx="218" cy="56" r="7.5" fill="#61391C" />

          {/* Inward Spreading Fronds */}
          <path d="M222,42 Q150,35 80,95 Q35,145 5,230 C70,180 140,130 220,45 Z" fill="url(#p4Leaf)" />
          <path d="M222,42 Q135,50 65,115 Q20,170 0,240" stroke="url(#p4Stem)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M185,58 L150,35 M155,72 L110,50 M125,90 L75,70 M95,115 L45,95 M65,145 L20,130 M40,185 L5,185" stroke="url(#p4Leaf)" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M224,48 Q165,95 120,180 Q90,250 95,345 C140,265 185,190 223,50 Z" fill="url(#p4Leaf)" opacity="0.9" />
          <path d="M224,48 Q155,110 110,200 Q82,270 88,360" stroke="url(#p4Stem)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M195,95 L155,75 M165,130 L120,110 M140,170 L95,155 M120,220 L80,215 M110,275 L75,280" stroke="url(#p4Leaf)" strokeWidth="2.4" strokeLinecap="round" />

          <path d="M228,48 Q200,120 195,210 Q200,290 240,370 C235,290 228,210 226,52 Z" fill="url(#p4Leaf)" opacity="0.85" />
          <path d="M228,48 Q192,135 188,230 Q192,310 232,385" stroke="url(#p4Stem)" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
