"use client";

import React, { createContext, useContext, useEffect, useRef, useCallback, useMemo } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LenisContextType = {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
};

const LenisContext = createContext<LenisContextType>({
  getLenis: () => null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Register GSAP ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with smooth inertial scrolling
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenisInstance;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Connect Lenis to GSAP Ticker for 120fps fluid synchronization
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Smoothly intercept in-page hash links (e.g. href="#catalog", href="#quote-section")
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      if (href === "#top") {
        e.preventDefault();
        lenisInstance.scrollTo(0, { duration: 1.2 });
        return;
      }

      try {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenisInstance.scrollTo(targetElement as HTMLElement, {
            offset: -85,
            duration: 1.2,
          });

          // Instantly safeguard visibility of target section and contents
          if (targetElement instanceof HTMLElement) {
            gsap.to(targetElement, { opacity: 1, y: 0, duration: 0.4, overwrite: "auto" });
            const childReveals = targetElement.querySelectorAll<HTMLElement>(".section-reveal, .catalog-card");
            if (childReveals.length > 0) {
              gsap.to(childReveals, { opacity: 1, y: 0, duration: 0.4, overwrite: "auto" });
            }
          }
        }
      } catch {
        // Fallback for non-standard selector
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Refresh ScrollTrigger upon images and layout adjustments
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    // Initial calculation refresh once Lenis is bound
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      gsap.ticker.remove(tickerCallback);
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: Record<string, unknown>) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -85, duration: 1.2, ...options });
    } else if (typeof target === "string" && target.startsWith("#")) {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }

    // Safety reveal for target element if target is a selector string
    if (typeof target === "string" && target.startsWith("#")) {
      try {
        const el = document.querySelector(target);
        if (el instanceof HTMLElement) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.4, overwrite: "auto" });
          const childReveals = el.querySelectorAll<HTMLElement>(".section-reveal, .catalog-card");
          if (childReveals.length > 0) {
            gsap.to(childReveals, { opacity: 1, y: 0, duration: 0.4, overwrite: "auto" });
          }
        }
      } catch {}
    } else if (target instanceof HTMLElement) {
      gsap.to(target, { opacity: 1, y: 0, duration: 0.4, overwrite: "auto" });
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const contextValue = useMemo(() => ({
    getLenis,
    scrollTo,
    stop,
    start,
  }), [getLenis, scrollTo, stop, start]);

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
