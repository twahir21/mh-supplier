import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mhsuppliers.co.tz";
  const lastModified = new Date();

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Specific category query routes for search engine indexing
  const categoryIds = [
    "eggs",
    "vegetables",
    "fruits",
    "beverages",
    "groceries",
    "cooking_oil",
    "snacks",
    "hygiene",
  ];

  const categoryPages: MetadataRoute.Sitemap = categoryIds.map((cat) => ({
    url: `${baseUrl}/catalog?category=${cat}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages];
}

