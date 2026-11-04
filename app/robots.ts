import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://mhsuppliers.co.tz";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/catalog"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/catalog"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/catalog"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Applebot",
        allow: ["/", "/catalog"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

