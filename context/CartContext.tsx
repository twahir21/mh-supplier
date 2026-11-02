"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { PRODUCTS, SMART_PRESETS, type Product } from "@/data/catalogData";

type CartState = { [productId: string]: number };

type CartContextType = {
  cart: CartState;
  updateQuantity: (productId: string, delta: number) => void;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  clearCart: () => void;
  totalCartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  applyPreset: (preset: (typeof SMART_PRESETS)[0]) => void;
  rfqNotes: string;
  setRfqNotes: (notes: string) => void;
  rfqSector: string;
  setRfqSector: (sector: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "mh_quote_basket_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [rfqNotes, setRfqNotes] = useState("");
  const [rfqSector, setRfqSector] = useState("hotels");
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart, isHydrated]);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }, [cart]);

  const applyPreset = useCallback((preset: (typeof SMART_PRESETS)[0]) => {
    const listSummary = preset.items.map((i) => `• ${i.name} (${i.qty})`).join("\n");
    setRfqSector(preset.sector);
    setRfqNotes(`Selected Preset: ${preset.title}\n\nRequested Estimate Quantities:\n${listSummary}`);

    setCart((prev) => {
      const newCart = { ...prev };
      if (preset.sector === "hotels") {
        newCart["veg-1"] = 4;
        newCart["fruit-1"] = 6;
        newCart["oil-1"] = 3;
        newCart["groc-1"] = 4;
      } else if (preset.sector === "offices") {
        newCart["bev-1"] = 20;
        newCart["bev-2"] = 8;
        newCart["fruit-3"] = 3;
        newCart["snack-1"] = 4;
      } else if (preset.sector === "construction") {
        newCart["veg-4"] = 8;
        newCart["groc-3"] = 4;
        newCart["oil-2"] = 6;
        newCart["bev-1"] = 30;
      }
      return newCart;
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      updateQuantity,
      setCart,
      clearCart,
      totalCartCount,
      isCartOpen,
      setIsCartOpen,
      applyPreset,
      rfqNotes,
      setRfqNotes,
      rfqSector,
      setRfqSector,
    }),
    [
      cart,
      updateQuantity,
      clearCart,
      totalCartCount,
      isCartOpen,
      applyPreset,
      rfqNotes,
      rfqSector,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
