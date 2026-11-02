"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import {
  Apple,
  Carrot,
  CupSoda,
  Wheat,
  Cookie,
  Droplets,
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
  Filter,
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
  type LucideIcon,
} from "lucide-react";
import { useLenis } from "@/components/SmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------
// TYPES
// ----------------------------------------------------
type SectorId = "all" | "hotels" | "offices" | "construction" | "catering";
type CategoryId = "all" | "vegetables" | "fruits" | "beverages" | "groceries" | "snacks" | "cooking_oil";

type Product = {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  packSize: string;
  priceEstimate: string;
  grade: string;
  inStock: boolean;
  sectors: SectorId[];
  description: string;
  icon: LucideIcon;
  badge?: string;
};

// ----------------------------------------------------
// DATA: PRODUCTS (Directly aligned with README.md)
// ----------------------------------------------------
const PRODUCTS: Product[] = [
  // Vegetables
  {
    id: "veg-1",
    name: "Grade-A Roma Tomatoes",
    category: "vegetables",
    categoryName: "Fresh Vegetables",
    packSize: "25kg Wooden Crate",
    priceEstimate: "TZS 45,000 / crate",
    grade: "Export Grade • Uniform Ripeness",
    inStock: true,
    sectors: ["hotels", "catering", "construction"],
    description: "Daily harvested, chef-grade firm tomatoes sorted for maximum kitchen shelf-life.",
    icon: Carrot,
    badge: "Best Seller",
  },
  {
    id: "veg-2",
    name: "Red & Yellow Bulb Onions",
    category: "vegetables",
    categoryName: "Fresh Vegetables",
    packSize: "50kg Net Sack",
    priceEstimate: "TZS 85,000 / sack",
    grade: "Cured & Graded Clean",
    inStock: true,
    sectors: ["hotels", "construction", "catering"],
    description: "Dry-cured commercial onions with tight skins, ideal for bulk culinary preparation.",
    icon: Carrot,
  },
  {
    id: "veg-3",
    name: "Crisp Green & Red Bell Peppers",
    category: "vegetables",
    categoryName: "Fresh Vegetables",
    packSize: "10kg Box",
    priceEstimate: "TZS 28,000 / box",
    grade: "Greenhouse Grown",
    inStock: true,
    sectors: ["hotels", "catering"],
    description: "Thick-walled, vibrant sweet peppers hand-selected for hotel salads and buffets.",
    icon: Carrot,
  },
  {
    id: "veg-4",
    name: "Dutch Ware Cooking Potatoes",
    category: "vegetables",
    categoryName: "Fresh Vegetables",
    packSize: "50kg Heavy Sack",
    priceEstimate: "TZS 65,000 / sack",
    grade: "Grade 1 Starch Variety",
    inStock: true,
    sectors: ["hotels", "construction", "catering"],
    description: "Washed and graded potatoes perfect for high-yield frying, boiling, and roasting.",
    icon: Carrot,
  },
  {
    id: "veg-5",
    name: "Fresh Farm Carrots",
    category: "vegetables",
    categoryName: "Fresh Vegetables",
    packSize: "25kg Mesh Sack",
    priceEstimate: "TZS 38,000 / sack",
    grade: "Sweet High-Sugar Variety",
    inStock: true,
    sectors: ["hotels", "catering", "construction"],
    description: "Crisp, washed sweet carrots harvested fresh from partner highland growers.",
    icon: Carrot,
  },
  {
    id: "veg-6",
    name: "Highland Cabbage & Spinach Bundle",
    category: "vegetables",
    categoryName: "Fresh Vegetables",
    packSize: "30kg Mixed Crate",
    priceEstimate: "TZS 32,000 / crate",
    grade: "Daily Cut Freshness",
    inStock: true,
    sectors: ["hotels", "construction", "catering"],
    description: "High-yield hearty cabbage heads and tender dark greens for institutional kitchens.",
    icon: Carrot,
  },

  // Fruits
  {
    id: "fruit-1",
    name: "Sweet Cavendish Bananas",
    category: "fruits",
    categoryName: "Fresh Fruits",
    packSize: "20kg Padded Crate",
    priceEstimate: "TZS 26,000 / crate",
    grade: "Stage 3-4 Breakfast Ready",
    inStock: true,
    sectors: ["hotels", "offices", "catering"],
    description: "Naturally ripened, unbruised bananas for hotel buffets and corporate pantry baskets.",
    icon: Apple,
    badge: "Popular",
  },
  {
    id: "fruit-2",
    name: "Sweet Coastal Pineapples",
    category: "fruits",
    categoryName: "Fresh Fruits",
    packSize: "Box of 10 Jumbo",
    priceEstimate: "TZS 30,000 / box",
    grade: "High Brix Sweetness",
    inStock: true,
    sectors: ["hotels", "catering", "offices"],
    description: "Golden ripe coastal pineapples selected for juicing and fresh fruit displays.",
    icon: Apple,
  },
  {
    id: "fruit-3",
    name: "Crisp Royal Gala Apples",
    category: "fruits",
    categoryName: "Fresh Fruits",
    packSize: "18kg Export Carton",
    priceEstimate: "TZS 72,000 / carton",
    grade: "Class 1 Waxed",
    inStock: true,
    sectors: ["hotels", "offices"],
    description: "Uniformly sized crunchy sweet apples, ideal for executive meetings and guest fruit platters.",
    icon: Apple,
  },
  {
    id: "fruit-4",
    name: "Tropical Seedless Watermelons",
    category: "fruits",
    categoryName: "Fresh Fruits",
    packSize: "Bulk Crate (~100kg)",
    priceEstimate: "TZS 80,000 / crate",
    grade: "Deep Red Crimson Sweet",
    inStock: true,
    sectors: ["hotels", "catering", "construction"],
    description: "Heavy, hydrating fresh melons for large-scale catering and site refreshments.",
    icon: Apple,
  },

  // Soft Drinks & Beverages
  {
    id: "bev-1",
    name: "Natural Spring Water 500ml",
    category: "beverages",
    categoryName: "Soft Drinks & Beverages",
    packSize: "Shrink Pack (24 Bottles)",
    priceEstimate: "TZS 10,500 / pack",
    grade: "Purified & Certified",
    inStock: true,
    sectors: ["offices", "construction", "hotels", "catering"],
    description: "Essential hydration cartons for office boardrooms, desks, and construction site workers.",
    icon: CupSoda,
    badge: "Volume Staple",
  },
  {
    id: "bev-2",
    name: "Assorted Coca-Cola Sodas 350ml",
    category: "beverages",
    categoryName: "Soft Drinks & Beverages",
    packSize: "Crate (24 Cans/Bottles)",
    priceEstimate: "TZS 22,000 / crate",
    grade: "Original Factory Sealed",
    inStock: true,
    sectors: ["offices", "hotels", "construction"],
    description: "Full variety including Coke, Sprite, Fanta, and Stoney Tangawizi.",
    icon: CupSoda,
  },
  {
    id: "bev-3",
    name: "100% Pure Tropical Fruit Juices 1L",
    category: "beverages",
    categoryName: "Soft Drinks & Beverages",
    packSize: "Carton (12 x 1L)",
    priceEstimate: "TZS 36,000 / carton",
    grade: "No Added Sugar",
    inStock: true,
    sectors: ["hotels", "offices", "catering"],
    description: "Mango, Passion, Orange, and Guava blends for breakfast bars and executive lounges.",
    icon: CupSoda,
  },
  {
    id: "bev-4",
    name: "Electrolyte Hydration & Energy Cans",
    category: "beverages",
    categoryName: "Soft Drinks & Beverages",
    packSize: "Carton of 24 Cans",
    priceEstimate: "TZS 48,000 / carton",
    grade: "Rapid Electrolyte Refill",
    inStock: true,
    sectors: ["construction", "offices"],
    description: "High-demand energy and hydration cans for heavy construction shift teams.",
    icon: CupSoda,
  },

  // Wholesale Groceries
  {
    id: "groc-1",
    name: "Aromatic Basmati Rice Grade-1",
    category: "groceries",
    categoryName: "Wholesale Groceries",
    packSize: "25kg Double Bag",
    priceEstimate: "TZS 78,000 / sack",
    grade: "Extra Long Grain (0% Broken)",
    inStock: true,
    sectors: ["hotels", "catering", "construction"],
    description: "Premium fragrant aged rice delivering superior fluffiness for restaurants and hotel menus.",
    icon: Wheat,
    badge: "Top Rated",
  },
  {
    id: "groc-2",
    name: "Commercial Baker's Wheat Flour",
    category: "groceries",
    categoryName: "Wholesale Groceries",
    packSize: "25kg Heavy Kraft Sack",
    priceEstimate: "TZS 48,000 / sack",
    grade: "High Gluten Protein",
    inStock: true,
    sectors: ["hotels", "catering"],
    description: "Fortified white wheat flour for pastry chefs, bread ovens, and commercial kitchens.",
    icon: Wheat,
  },
  {
    id: "groc-3",
    name: "Polished Red Kidney Beans",
    category: "groceries",
    categoryName: "Wholesale Groceries",
    packSize: "50kg Woven Sack",
    priceEstimate: "TZS 115,000 / sack",
    grade: "Machine Cleaned & De-stoned",
    inStock: true,
    sectors: ["construction", "hotels", "catering"],
    description: "Nutritious dried beans with quick-cook properties, perfect for staff mess halls.",
    icon: Wheat,
  },
  {
    id: "groc-4",
    name: "Pure Refined Cane Sugar",
    category: "groceries",
    categoryName: "Wholesale Groceries",
    packSize: "50kg Industrial Bag",
    priceEstimate: "TZS 130,000 / bag",
    grade: "Fine Crystal White",
    inStock: true,
    sectors: ["hotels", "offices", "catering"],
    description: "High-grade pure crystal sugar for beverage service, baking, and office pantries.",
    icon: Wheat,
  },

  // Snacks & Breakroom
  {
    id: "snack-1",
    name: "Executive Biscuit & Cookie Assortment",
    category: "snacks",
    categoryName: "Snacks & Breakroom",
    packSize: "Master Case (48 Individual Packs)",
    priceEstimate: "TZS 34,000 / case",
    grade: "Premium Tea Companions",
    inStock: true,
    sectors: ["offices", "hotels"],
    description: "Shortbread, cream biscuits, and digestive cookies packaged for corporate tea stations.",
    icon: Cookie,
    badge: "Office Favorite",
  },
  {
    id: "snack-2",
    name: "Roasted Cashews & Salted Peanuts",
    category: "snacks",
    categoryName: "Snacks & Breakroom",
    packSize: "Tub of 24 x 50g Pouches",
    priceEstimate: "TZS 42,000 / tub",
    grade: "Grade-1 Jumbo Kernels",
    inStock: true,
    sectors: ["offices", "hotels"],
    description: "Freshly roasted and vacuum-sealed energy snacks for desk refuels and hotel minibars.",
    icon: Cookie,
  },
  {
    id: "snack-3",
    name: "Premium Roast Coffee & Spiced Tea Kit",
    category: "snacks",
    categoryName: "Snacks & Breakroom",
    packSize: "Monthly Breakroom Pack (5kg)",
    priceEstimate: "TZS 68,000 / pack",
    grade: "Arabica & Tangawizi Tea",
    inStock: true,
    sectors: ["offices", "hotels"],
    description: "Complete pantry setup with fresh ground Arabica coffee and traditional spiced tea leaves.",
    icon: Cookie,
  },

  // Cooking Oil
  {
    id: "oil-1",
    name: "Pure Refined Sunflower Cooking Oil",
    category: "cooking_oil",
    categoryName: "Cooking Oil & Culinary Fats",
    packSize: "20L Heavy Duty Jerrycan",
    priceEstimate: "TZS 75,000 / 20L",
    grade: "Triple Refined • High Smoke Point",
    inStock: true,
    sectors: ["hotels", "catering", "construction"],
    description: "Zero-cholesterol light golden oil with neutral aroma, ideal for hotel deep frying and sautéing.",
    icon: Droplets,
    badge: "Kitchen Core",
  },
  {
    id: "oil-2",
    name: "All-Purpose Commercial Vegetable Oil",
    category: "cooking_oil",
    categoryName: "Cooking Oil & Culinary Fats",
    packSize: "10L Sealed Jug",
    priceEstimate: "TZS 39,000 / 10L",
    grade: "Fortified with Vitamin A",
    inStock: true,
    sectors: ["hotels", "catering", "construction"],
    description: "Economical and stable cooking oil tailored for continuous commercial frying operations.",
    icon: Droplets,
  },
  {
    id: "oil-3",
    name: "Commercial Culinary Shortening & Margarine",
    category: "cooking_oil",
    categoryName: "Cooking Oil & Culinary Fats",
    packSize: "15kg Solid Block",
    priceEstimate: "TZS 58,000 / block",
    grade: "High Melting Point Bakery Fat",
    inStock: true,
    sectors: ["hotels", "catering"],
    description: "Specially formulated shortening for fluffy bakery pastries and industrial food service.",
    icon: Droplets,
  },
];

// ----------------------------------------------------
// SECTORS DETAILS (Hotels, Offices, Construction, Catering)
// ----------------------------------------------------
const SECTORS = [
  {
    id: "hotels",
    title: "Hotels & Resorts",
    tagline: "Dawn delivery before kitchen prep starts",
    icon: Hotel,
    accent: "from-blue-600 to-indigo-700",
    description:
      "We understand luxury hospitality standards: calibrated ripeness, uniform fruit cuts, pristine greens, and delivery by 5:30 AM directly to your executive kitchen loading dock.",
    perks: [
      "Guaranteed 5:00 AM - 6:30 AM dock delivery",
      "Rigid grading for banquet & buffet presentations",
      "100% same-day replacement for any substandard crate",
      "Net-30 consolidated accounting with itemized POs",
    ],
    popularItems: ["Roma Tomatoes", "Cavendish Bananas", "Pure Sunflower Oil 20L", "Basmati Rice"],
  },
  {
    id: "offices",
    title: "Corporate Offices & Campuses",
    tagline: "Stress-free breakroom and pantry replenishment",
    icon: Building2,
    accent: "from-emerald-600 to-teal-700",
    description:
      "Keep your teams energized and hydrated. We deliver scheduled weekly fresh fruit crates, mineral water cases, sodas, premium coffee, tea, and healthy snack assortments.",
    perks: [
      "Weekly scheduled standing order drops",
      "Direct floor-by-floor pantry restocking available",
      "Curated fresh seasonal fruit baskets for wellness",
      "Single monthly corporate invoice for all pantry needs",
    ],
    popularItems: ["Natural Spring Water 500ml", "Royal Gala Apples", "Executive Biscuit Case", "Roast Coffee Kit"],
  },
  {
    id: "construction",
    title: "Construction Sites & Camps",
    tagline: "Heavy-duty bulk rations and hydration at scale",
    icon: HardHat,
    accent: "from-amber-600 to-orange-700",
    description:
      "Feeding 50 to 500+ site workers demands reliability and bulk pricing. We dispatch forklift-ready pallets of 50kg grain sacks, bulk cooking oil, beans, and hydration crates.",
    perks: [
      "All-weather rugged packaging (double-stitched sacks)",
      "High-volume pallet drops directly onto site",
      "Bulk hydration supplies to prevent heat fatigue",
      "Flexible delivery access to restricted industrial sites",
    ],
    popularItems: ["50kg Potatoes", "50kg Kidney Beans", "20L Cooking Oil", "Mineral Water 500ml"],
  },
  {
    id: "catering",
    title: "Commercial Caterers & Institutions",
    tagline: "Just-in-time ingredients with predictable wholesale margins",
    icon: UtensilsCrossed,
    accent: "from-slate-700 to-slate-900",
    description:
      "High volume, tight deadlines, and strict cost controls. We supply restaurants, hospitals, school dining halls, and event caterers with wholesale commodities.",
    perks: [
      "Transparent tiered volume discounts",
      "Daily replenishment orders via WhatsApp or portal",
      "Chef-tested cooking fats and staple flours",
      "Reliable delivery regardless of rain or market spikes",
    ],
    popularItems: ["Baker's Wheat Flour 25kg", "Roma Tomatoes", "Refined Cane Sugar 50kg", "Sunflower Oil 20L"],
  },
];

// ----------------------------------------------------
// SMART LIST ASSISTANT PRESETS
// ----------------------------------------------------
const SMART_PRESETS = [
  {
    title: "🏨 Luxury Hotel 7-Day Breakfast (150 Guests)",
    sector: "hotels",
    note: "Chef-selected fresh fruits, vegetables, beverages & culinary oils",
    items: [
      { name: "Grade-A Roma Tomatoes", qty: "4 crates (100kg)" },
      { name: "Sweet Cavendish Bananas", qty: "6 crates (120kg)" },
      { name: "Sweet Coastal Pineapples", qty: "4 boxes (40 count)" },
      { name: "100% Pure Tropical Fruit Juices", qty: "8 cartons (96L)" },
      { name: "Pure Refined Sunflower Oil", qty: "3 jerrycans (60L)" },
      { name: "Aromatic Basmati Rice", qty: "4 sacks (100kg)" },
    ],
  },
  {
    title: "🏢 Corporate Office Monthly Pantry (80 Staff)",
    sector: "offices",
    note: "All-in-one monthly water, beverages, weekly fruit crates & snacks",
    items: [
      { name: "Natural Spring Water 500ml", qty: "20 cartons (480 bottles)" },
      { name: "Assorted Coca-Cola Sodas", qty: "8 crates (192 cans)" },
      { name: "Crisp Royal Gala Apples", qty: "3 cartons (54kg)" },
      { name: "Sweet Cavendish Bananas", qty: "4 crates (80kg)" },
      { name: "Executive Biscuit Assortment", qty: "4 cases (192 packs)" },
      { name: "Coffee & Spiced Tea Kit", qty: "2 master packs" },
    ],
  },
  {
    title: "🏗️ Construction Site Mess Hall (100 Workers)",
    sector: "construction",
    note: "Heavy bulk staple grains, cooking oil, beans & daily hydration",
    items: [
      { name: "Dutch Ware Potatoes", qty: "8 sacks (400kg)" },
      { name: "Polished Red Kidney Beans", qty: "4 sacks (200kg)" },
      { name: "All-Purpose Cooking Oil", qty: "6 drums (120L)" },
      { name: "Red & Yellow Onions", qty: "4 sacks (200kg)" },
      { name: "Natural Spring Water 500ml", qty: "30 cartons (720 bottles)" },
      { name: "Electrolyte Hydration Cans", qty: "10 cartons (240 cans)" },
    ],
  },
];

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------
export default function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollTo, stop, start } = useLenis();

  // Scroll Animation Refs
  const progressBarRef = useRef<HTMLDivElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const processVanRef = useRef<HTMLDivElement>(null);

  // Scroll interactive states
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Filter state
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [activeSector, setActiveSector] = useState<SectorId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Quotation Cart State
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // RFQ Form State
  const [rfqName, setRfqName] = useState("");
  const [rfqCompany, setRfqCompany] = useState("");
  const [rfqContact, setRfqContact] = useState("");
  const [rfqSector, setRfqSector] = useState("hotels");
  const [rfqFrequency, setRfqFrequency] = useState("Weekly Standing Order");
  const [rfqNotes, setRfqNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqReference, setRfqReference] = useState("");

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

  // Refresh ScrollTrigger calculations on dynamic filter / tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [activeCategory, activeSector, searchQuery, selectedSectorTab]);

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

        // 5. Section reveals (slide up + soft fade)
        gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
          gsap.from(section, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          });
        });

        // 6. Categories grid 3D stagger
        gsap.from(".category-card", {
          y: 35,
          opacity: 0,
          scale: 0.94,
          stagger: 0.08,
          duration: 0.7,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".categories-container",
            start: "top 85%",
            once: true,
          },
        });

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
        gsap.from(".process-card", {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#how-it-works",
            start: "top 75%",
            once: true,
          },
        });

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
        gsap.from(".assurance-card", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".assurance-grid",
            start: "top 80%",
            once: true,
          },
        });

        // 11. Client Testimonials Stagger
        gsap.from(".testimonial-card", {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 80%",
            once: true,
          },
        });

        // 12. RFQ Quote Section Ambient Spotlight Scale
        gsap.from(".quote-ambient-glow", {
          scale: 0.6,
          opacity: 0.1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#quote-section",
            start: "top 80%",
            once: true,
          },
        });

        // 13. Catalog cards initial entrance
        gsap.from(".catalog-card", {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#catalog-grid",
            start: "top 85%",
            once: true,
          },
        });
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

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSector = activeSector === "all" || item.sectors.includes(activeSector);
      const matchesQuery =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.packSize.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSector && matchesQuery;
    });
  }, [activeCategory, activeSector, searchQuery]);

  // Cart operations
  const updateQuantity = (productId: string, delta: number) => {
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
  };

  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }, [cart]);

  // Load Smart Assistant preset into cart & form
  const applyPreset = (preset: (typeof SMART_PRESETS)[0]) => {
    const listSummary = preset.items.map((i) => `• ${i.name} (${i.qty})`).join("\n");
    setRfqSector(preset.sector);
    setRfqNotes(`Selected Preset: ${preset.title}\n\nRequested Estimate Quantities:\n${listSummary}`);

    // Pre-populate some matching items in cart
    const newCart = { ...cart };
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
    setCart(newCart);

    // Smooth scroll to RFQ form
    const formEl = document.getElementById("quote-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      colors: ["#0f3b70", "#f59e0b", "#059669", "#ffffff"],
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
          className="h-full w-full origin-left bg-gradient-to-r from-amber-400 via-emerald-400 to-[#1e5cb3] shadow-[0_0_12px_rgba(245,158,11,0.6)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ----------------------------------------------------
          1. TOP DISPATCH & HOTLINE NOTIFICATION BAR
      ---------------------------------------------------- */}
      <div className="border-b border-blue-950/40 bg-[#071c36] text-xs font-medium text-slate-300">
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
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-900 shadow-sm transition group-hover:scale-105">
              <Image
                src="/logo.jpeg"
                alt="MH General Suppliers Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-[#0f3b70]">
                MH GENERAL SUPPLIERS
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
                Fresh Produce & Commercial Logistics
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex" aria-label="Main">
            <a href="#catalog" className="transition hover:text-[#0f3b70]">
              Wholesale Catalog
            </a>
            <a href="#sectors" className="transition hover:text-[#0f3b70]">
              Sectors We Supply
            </a>
            <a href="#how-it-works" className="transition hover:text-[#0f3b70]">
              How It Works
            </a>
            <a href="#smart-assistant" className="transition hover:text-[#0f3b70]">
              Smart Estimator
            </a>
            <a href="#logistics" className="transition hover:text-[#0f3b70]">
              Cold-Chain Fleet
            </a>
            <a href="#faq" className="transition hover:text-[#0f3b70]">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-900 hover:bg-blue-50"
              aria-label="Open Quote Basket"
            >
              <ShoppingBag size={18} className="text-[#0f3b70]" />
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
              className="group flex items-center gap-2 rounded-xl bg-[#0f3b70] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-950/20 transition hover:bg-[#1a4f8b] hover:shadow-lg"
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
      <section className="hero-section relative overflow-hidden bg-gradient-to-b from-[#0a2547] via-[#0f3b70] to-[#12427a] pt-12 pb-24 text-white lg:pt-20 lg:pb-32">
        {/* Soft Background Accents */}
        <div className="hero-ambient-orb-1 pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl will-change-transform" />
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

                <a
                  href="#catalog"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white hover:bg-white/20"
                >
                  <Search size={16} className="text-amber-300" />
                  <span>Browse Wholesale Catalog</span>
                </a>
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
                  <FileSpreadsheet size={20} className="shrink-0 text-blue-300" />
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
                  <span className="font-semibold text-[#0f3b70]">ETA: 05:25 AM</span>
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
              className="font-display text-3xl font-extrabold text-[#0f3b70] sm:text-4xl"
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
              className="font-display text-3xl font-extrabold text-[#0f3b70] sm:text-4xl"
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
          5. FEATURED CATEGORIES SPOTLIGHT
      ---------------------------------------------------- */}
      <section className="section-reveal py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0f3b70]">
              Wholesale Supply Range
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Every Category Your Daily Operations Need
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 text-sm sm:text-base">
              Combine fresh farm greens, soft drinks, orchard fruits, wholesale grains, snacks, and cooking
              oils into a single consolidated purchase order.
            </p>
          </div>

          <div className="categories-container mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                id: "vegetables" as CategoryId,
                name: "Fresh Vegetables",
                count: "6 Varieties",
                icon: Carrot,
                color: "bg-emerald-50 text-emerald-700 border-emerald-200",
              },
              {
                id: "fruits" as CategoryId,
                name: "Seasonal Fruits",
                count: "4 Varieties",
                icon: Apple,
                color: "bg-amber-50 text-amber-700 border-amber-200",
              },
              {
                id: "beverages" as CategoryId,
                name: "Soft Drinks & Water",
                count: "4 Varieties",
                icon: CupSoda,
                color: "bg-blue-50 text-blue-700 border-blue-200",
              },
              {
                id: "groceries" as CategoryId,
                name: "Wholesale Grains",
                count: "4 Varieties",
                icon: Wheat,
                color: "bg-orange-50 text-orange-700 border-orange-200",
              },
              {
                id: "snacks" as CategoryId,
                name: "Office Snacks & Tea",
                count: "3 Varieties",
                icon: Cookie,
                color: "bg-rose-50 text-rose-700 border-rose-200",
              },
              {
                id: "cooking_oil" as CategoryId,
                name: "Pure Cooking Oils",
                count: "3 Varieties",
                icon: Droplets,
                color: "bg-yellow-50 text-yellow-800 border-yellow-200",
              },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  scrollTo("#catalog");
                }}
                className={`category-card group flex flex-col items-center justify-between rounded-2xl border p-5 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl will-change-transform ${
                  activeCategory === cat.id ? "ring-2 ring-[#0f3b70] shadow-md" : ""
                } ${cat.color}`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-sm transition group-hover:scale-110">
                  <cat.icon size={24} />
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-sm font-bold leading-tight">{cat.name}</h3>
                  <span className="mt-1 block text-xs opacity-75">{cat.count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          6. WHOLESALE CATALOG & QUICK-ORDER MATRIX (Core Feature)
      ---------------------------------------------------- */}
      <section id="catalog" className="section-reveal border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-emerald-700">
                <Sparkles size={14} /> Commercial Order Matrix
              </div>
              <h2 className="mt-1 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Wholesale Product Catalog & Pricing
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Select quantities to generate an immediate itemized quotation for your accounts department.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search tomatoes, rice, oil..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-[#0f3b70] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills & Sector Toggles */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Items" },
                { id: "vegetables", label: "Vegetables" },
                { id: "fruits", label: "Fruits" },
                { id: "beverages", label: "Soft Drinks" },
                { id: "groceries", label: "Groceries & Grains" },
                { id: "snacks", label: "Snacks & Breakroom" },
                { id: "cooking_oil", label: "Cooking Oil" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveCategory(pill.id as CategoryId)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    activeCategory === pill.id
                      ? "bg-[#0f3b70] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Sector Filter Dropdown / Filter */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Filter size={14} className="text-slate-400" />
              <span>Filter by Destination:</span>
              <select
                value={activeSector}
                onChange={(e) => setActiveSector(e.target.value as SectorId)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-bold text-[#0f3b70] outline-none focus:border-[#0f3b70]"
              >
                <option value="all">All Sectors</option>
                <option value="hotels">Hotels & Resorts</option>
                <option value="offices">Corporate Offices</option>
                <option value="construction">Construction Sites</option>
                <option value="catering">Commercial Catering</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div id="catalog-grid" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod) => {
              const currentQty = cart[prod.id] || 0;
              return (
                <article
                  key={prod.id}
                  className="catalog-card group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl will-change-transform"
                >
                  <div>
                    {/* Card Top: Badges & Category */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#0f3b70]">
                        <prod.icon size={12} />
                        {prod.categoryName}
                      </span>
                      {prod.badge && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800">
                          {prod.badge}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="mt-3 font-display text-lg font-bold text-slate-900 group-hover:text-[#0f3b70] transition">
                      {prod.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">{prod.description}</p>

                    {/* Spec / Grade Box */}
                    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Commercial Pack:</span>
                        <span className="font-bold text-slate-800">{prod.packSize}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-slate-500">Specification:</span>
                        <span className="font-semibold text-emerald-700">{prod.grade}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-slate-500">Indicative Pricing:</span>
                        <span className="font-bold text-[#0f3b70]">{prod.priceEstimate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Stock Status & Quantity Controls */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Ready for Dispatch</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {currentQty > 0 ? (
                        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                          <button
                            onClick={() => updateQuantity(prod.id, -1)}
                            className="p-1.5 text-slate-600 hover:text-red-600"
                            aria-label={`Reduce ${prod.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-extrabold text-slate-900">
                            {currentQty}
                          </span>
                          <button
                            onClick={() => updateQuantity(prod.id, 1)}
                            className="p-1.5 text-slate-600 hover:text-emerald-600"
                            aria-label={`Add ${prod.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateQuantity(prod.id, 1)}
                          className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-[#0f3b70] transition hover:bg-[#0f3b70] hover:text-white"
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

          {filteredProducts.length === 0 && (
            <div className="my-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <Search size={32} className="mx-auto text-slate-400" />
              <h3 className="mt-3 font-display text-lg font-bold text-slate-800">No matching products found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try searching for another item or clear your active category filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSector("all");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-[#0f3b70] px-4 py-2 text-xs font-bold text-white"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------
          7. SECTORS WE SERVE (Hotels, Offices, Construction, Catering)
      ---------------------------------------------------- */}
      <section id="sectors" className="section-reveal py-20 bg-slate-100/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0f3b70]">
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
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
                    selectedSectorTab === idx
                      ? "bg-[#0f3b70] text-white shadow-md"
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
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#0f3b70]">
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
                    className="rounded-xl bg-[#0f3b70] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1a4f8b] transition"
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
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-blue-50 text-[#0f3b70]">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700">Daily Restock</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#0f3b70] to-[#12427a] p-5 text-white">
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
            <span className="text-xs font-bold tracking-wider uppercase text-[#0f3b70]">
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
                  className="h-full w-full origin-left bg-gradient-to-r from-[#0f3b70] via-amber-400 to-emerald-500 rounded-full"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>

              {/* Real-time Animated Van Indicator riding along the route track */}
              <div
                ref={processVanRef}
                className="absolute -top-3.5 left-0 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#0f3b70] px-3 py-1 text-[11px] font-bold text-white shadow-xl shadow-blue-900/40 border border-white/60 will-change-transform z-10"
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
                  className="process-card group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/90 backdrop-blur-sm p-8 transition duration-300 hover:-translate-y-2 hover:border-[#0f3b70] hover:bg-white hover:shadow-xl will-change-transform"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-4xl font-extrabold text-[#0f3b70] transition group-hover:scale-105">
                        {st.step}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                        {st.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold text-slate-900">{st.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{st.desc}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-[#0f3b70]">
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
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#0f3b70]">
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
                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#0f3b70] hover:shadow-md will-change-transform">
                  <Flame size={20} className="text-amber-500" />
                  <h4 className="mt-2 font-display text-sm font-bold text-slate-900">
                    Direct Farm Sourcing
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Skip middlemen markets. We partner directly with vetted growers for peak freshness and stable
                    wholesale prices.
                  </p>
                </div>

                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#0f3b70] hover:shadow-md will-change-transform">
                  <RefreshCw size={20} className="text-emerald-600" />
                  <h4 className="mt-2 font-display text-sm font-bold text-slate-900">
                    Instant Replacement Policy
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Any crate that fails your receiving chef or manager inspection is replaced immediately on our
                    next route run.
                  </p>
                </div>

                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#0f3b70] hover:shadow-md will-change-transform">
                  <Calendar size={20} className="text-blue-600" />
                  <h4 className="mt-2 font-display text-sm font-bold text-slate-900">
                    Automated Standing Orders
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Never run out of cooking oil, mineral water, or onions. Schedule weekly deliveries that run
                    seamlessly on autopilot.
                  </p>
                </div>

                <div className="assurance-card rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#0f3b70] hover:shadow-md will-change-transform">
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
            <span className="text-xs font-bold tracking-wider uppercase text-[#0f3b70]">
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
                  <span className="text-xs font-semibold text-[#0f3b70] block">{t.role}</span>
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
      <section id="quote-section" className="section-reveal py-20 bg-[#0a2547] text-white relative overflow-hidden">
        {/* Ambient Glow Spotlight */}
        <div className="quote-ambient-glow pointer-events-none absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] will-change-transform" />
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
                      href="mailto:quotes@mhgeneralsuppliers.com"
                      className="font-bold text-white hover:text-amber-300"
                    >
                      quotes@mhgeneralsuppliers.com
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
                  <p className="text-xs font-mono font-bold text-[#0f3b70] bg-blue-50 py-1.5 px-3 rounded-lg inline-block">
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
                    className="mt-6 rounded-xl bg-[#0f3b70] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1a4f8b] transition"
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#0f3b70] focus:bg-white"
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#0f3b70] focus:bg-white"
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-[#0f3b70] focus:bg-white"
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#0f3b70] focus:bg-white"
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
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#0f3b70] focus:bg-white"
                    >
                      <option value="Daily Early Morning (5:30 AM)">Daily Early Morning (5:30 AM)</option>
                      <option value="Weekly Standing Order">Weekly Standing Order</option>
                      <option value="Bi-Weekly Restock">Bi-Weekly Restock</option>
                      <option value="One-Time Bulk Purchase Order">One-Time Bulk Purchase Order</option>
                    </select>
                  </div>

                  {/* Cart Summary if items added */}
                  {totalCartCount > 0 && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#0f3b70]">
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
                              className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 border border-blue-200"
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
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs outline-none transition focus:border-[#0f3b70] focus:bg-white"
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
            <span className="text-xs font-bold tracking-wider uppercase text-[#0f3b70]">
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
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 hover:text-[#0f3b70]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#0f3b70]" : ""
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
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a2547] via-[#0f3b70] to-[#1a559e] p-8 sm:p-14 text-white shadow-2xl relative">
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
      <footer className="relative overflow-hidden bg-[#071629] text-white pt-16 pb-12">
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
                  <a href="#catalog" className="hover:text-amber-400 transition">
                    Fresh Farm Vegetables
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-amber-400 transition">
                    Orchard & Tropical Fruits
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-amber-400 transition">
                    Soft Drinks & Mineral Water
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-amber-400 transition">
                    Wholesale Rice, Flour & Grains
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-amber-400 transition">
                    Commercial Cooking Oils & Fats
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-amber-400 transition">
                    Office Snacks & Breakroom Kits
                  </a>
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
                  <span>orders@mhgeneralsuppliers.com</span>
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
                  <ShoppingBag size={20} className="text-[#0f3b70]" />
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
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 rounded-xl bg-[#0f3b70] px-5 py-2.5 text-xs font-bold text-white"
                  >
                    Explore Products
                  </button>
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
                          <span className="block font-semibold text-[#0f3b70]">{prod.priceEstimate}</span>
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
                  <span className="text-base text-[#0f3b70]">{totalCartCount} Packs</span>
                </div>
                <a
                  href="#quote-section"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0f3b70] py-3 text-xs font-bold text-white hover:bg-[#1a4f8b] transition"
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
          <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-[#0f3b70]/95 px-5 py-3.5 text-white shadow-2xl backdrop-blur-md">
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
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showBackToTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => scrollTo(0)}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#0f3b70] hover:text-[#0f3b70] hover:shadow-2xl"
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
              stroke="#0f3b70"
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
