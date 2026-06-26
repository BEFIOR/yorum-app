import type { MetadataRoute } from "next";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} - Otel ve Restoran Yorum Analizi`,
    short_name: BRAND_NAME,
    description:
      "Otel, restoran, ucak ve otobus yorumlarini AI ile analiz ederek daha hizli karar verin.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0f172a",
    lang: "tr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["travel", "productivity", "utilities"],
    id: SITE_URL,
  };
}
