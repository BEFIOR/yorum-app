import type { MetadataRoute } from "next";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} - Otel ve Restoran Yorum Analizi`,
    short_name: BRAND_NAME,
    description:
      "Otel, restoran, uçak ve otobüs yorumlarını AI ile analiz ederek daha hızlı karar verin.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0f172a",
    lang: "tr",
    icons: [
      {
        src: "/yorumarat.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["travel", "productivity", "utilities"],
    id: SITE_URL,
  };
}
