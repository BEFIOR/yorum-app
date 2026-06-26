import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Restoran Yorumlari Analizi",
  description:
    "Restoran yorumlari, yemek kalitesi, hijyen ve servis hizi hakkinda son 1 yildaki geri bildirimleri AI ile analiz edin.",
  alternates: {
    canonical: "/restoran",
  },
  keywords: [
    "restoran yorumlari",
    "restoran yorumu",
    "yemek yeri tavsiye",
    "en iyi restoran",
    "restoran analiz",
  ],
};

export default function RestoranPage() {
  return <CategoryPage config={CATEGORY_CONFIGS.restoran} />;
}
