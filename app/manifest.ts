import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MH General Suppliers Zanzibar",
    short_name: "MH Suppliers",
    description:
      "Leading B2B wholesale food distributor & commercial supplier in Zanzibar. Fresh farm eggs (Mayai), vegetables, fruits, soft drinks, rice, beans, cooking oil & hotel supplies.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b2524",
    theme_color: "#287A74",
    icons: [
      {
        src: "/logo.jpeg",
        sizes: "any",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}

