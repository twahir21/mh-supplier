import React from "react";

export default function JsonLd() {
  const baseUrl = "https://mhsuppliers.co.tz";

  const wholesaleStoreSchema = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "@id": `${baseUrl}/#organization`,
    name: "MH General Suppliers",
    alternateName: [
      "MH Suppliers Zanzibar",
      "MH Wholesale Food Suppliers",
      "MH General Supplies Tanzania",
      "Mayai ya Jumla Zanzibar MH",
    ],
    url: baseUrl,
    logo: `${baseUrl}/logo.jpeg`,
    image: `${baseUrl}/images/produce.jpg`,
    description:
      "Premier B2B wholesale food distributor & commercial supplier in Zanzibar and Tanzania. Farm-fresh eggs (Mayai ya Kisasa na Kienyeji), fresh vegetables, tropical fruits, soft drinks, natural spring water, bulk rice, beans, cooking oil, and hotel toilet paper & tissue supplies delivered daily to luxury hotels, beach resorts, corporate offices, restaurants, and construction sites.",
    telephone: "+255700000000",
    email: "orders@mhsuppliers.co.tz",
    currenciesAccepted: "TZS, USD",
    paymentAccepted:
      "Cash, Bank Transfer, EFT, Corporate Invoicing Net-15/Net-30, Mobile Money (M-Pesa, Tigo Pesa, Airtel Money)",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Central Wholesale Terminal, Stone Town",
      addressLocality: "Zanzibar",
      addressRegion: "Unguja",
      postalCode: "71100",
      addressCountry: "TZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.1659,
      longitude: 39.2026,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "05:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Stone Town" },
      { "@type": "AdministrativeArea", name: "Zanzibar Urban/West" },
      { "@type": "AdministrativeArea", name: "Nungwi, North Zanzibar" },
      { "@type": "AdministrativeArea", name: "Kendwa, Zanzibar" },
      { "@type": "AdministrativeArea", name: "Paje, East Coast Zanzibar" },
      { "@type": "AdministrativeArea", name: "Jambiani, Zanzibar" },
      { "@type": "AdministrativeArea", name: "Kiwengwa, Zanzibar" },
      { "@type": "AdministrativeArea", name: "Matemwe, Zanzibar" },
      { "@type": "AdministrativeArea", name: "Fumba Town, Zanzibar" },
      { "@type": "AdministrativeArea", name: "Unguja Island" },
      { "@type": "AdministrativeArea", name: "Pemba Island" },
      { "@type": "City", name: "Dar es Salaam, Tanzania" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial Wholesale Food & Hospitality Supplies",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Fresh Farm Eggs (Mayai ya Jumla)",
          description:
            "Grade-A candled table eggs, Kienyeji organic free-range eggs, 30-egg trays and 360-egg master wholesale crates for hotel breakfast buffets and bakeries.",
        },
        {
          "@type": "OfferCatalog",
          name: "Farm-Fresh Vegetables",
          description:
            "Chef-graded tomatoes, cured bulb onions, highland Irish potatoes, washed carrots, bell peppers, and fresh greens.",
        },
        {
          "@type": "OfferCatalog",
          name: "Seasonal Tropical Fruits",
          description:
            "Sweet coastal pineapples, Cavendish bananas, sweet melons, watermelons, and imported Gala apples calibrated for hotel dining.",
        },
        {
          "@type": "OfferCatalog",
          name: "Beverages & Mineral Water",
          description:
            "Bottled spring water in 500ml and 1.5L crates, Coca-Cola sodas, sparkling water, fruit juices, and electrolyte hydration.",
        },
        {
          "@type": "OfferCatalog",
          name: "Wholesale Grains & Staples",
          description:
            "Extra-long grain Basmati rice, premium Mbeya rice, polished kidney beans, wheat flour, and refined cane sugar in 25kg & 50kg bags.",
        },
        {
          "@type": "OfferCatalog",
          name: "Pure Cooking Oils & Culinary Fats",
          description:
            "Triple-refined sunflower oil 20L jerrycans, vegetable cooking oil 10L, and commercial bakery shortening 15kg.",
        },
        {
          "@type": "OfferCatalog",
          name: "Hotel & Office Hygiene Supplies",
          description:
            "Luxury 2-ply individually wrapped hotel toilet paper bales, executive facial tissue dispenser boxes, and heavy-duty kitchen towel rolls.",
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "MH General Suppliers",
    description:
      "Wholesale fresh eggs, vegetables, fruits, groceries, beverages, cooking oil, and hotel provisions supplier in Zanzibar.",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: ["en-US", "sw-TZ"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/catalog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is your order cutoff time for next-morning delivery in Zanzibar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For next-morning delivery between 05:00 AM and 07:30 AM across Zanzibar (including Stone Town, Nungwi, Kendwa, and Paje), orders should be placed or confirmed by 18:00 (6:00 PM). Standing repeat orders run automatically every scheduled day.",
        },
      },
      {
        "@type": "Question",
        name: "What wholesale egg options (Mayai) do you supply to hotels and bakeries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mayai is our #1 bestselling commodity. We supply Grade-A candled table eggs (Mayai ya Kisasa) and free-range indigenous organic eggs (Mayai ya Kienyeji) in standard 30-egg trays as well as reinforced 360-egg master wholesale transit crates with a zero-crack replacement guarantee.",
        },
      },
      {
        "@type": "Question",
        name: "Which regions and resort areas in Zanzibar do you deliver to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide comprehensive island-wide distribution across Zanzibar: Stone Town, Urban West, Northern beach resorts (Nungwi, Kendwa), Eastern shores (Paje, Jambiani, Michamvi), North-East (Kiwengwa, Matemwe), and South (Fumba Town, Kizimkazi), with dedicated coastal logistics to Dar es Salaam.",
        },
      },
      {
        "@type": "Question",
        name: "What payment terms do you offer for corporate and hotel accounts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support flexible corporate terms including Net-15 and Net-30 invoicing for vetted corporate clients, bank transfers, credit terms upon trade reference verification, and Cash/EFT on Delivery for initial trial orders.",
        },
      },
      {
        "@type": "Question",
        name: "Can we order fresh produce, eggs, beverages, dry grains, and hotel toilet paper together?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Consolidating your supply chain is our core advantage. Instead of coordinating with multiple fragmented suppliers, you receive one consolidated morning delivery, one manifest, and one monthly invoice covering eggs, produce, beverages, grains, cooking oil, and hotel toilet paper.",
        },
      },
      {
        "@type": "Question",
        name: "How does your quality guarantee and produce replacement policy work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We inspect produce both at farm intake and before dispatch. When our route driver arrives at your loading dock, your receiving chef inspects the consignment. If any crate fails your specifications, we replace it on the same morning route run at no extra charge.",
        },
      },
      {
        "@type": "Question",
        name: "Do you supply heavy bulk rations to construction sites and worker camps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our delivery fleet includes heavy-duty all-terrain distribution vehicles capable of accessing active civil works, industrial parks, and high-rise construction zones with safety-compliant PPE drivers delivering 25kg/50kg sacks of rice, flour, beans, and hydration crates.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Wholesale Catalog",
        item: `${baseUrl}/catalog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wholesaleStoreSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

