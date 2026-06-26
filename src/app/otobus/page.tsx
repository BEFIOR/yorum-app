import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Otobus Yorumlari Analizi",
  description:
    "Otobus firmasi yorumlarini son 1 yila gore AI ile analiz edin. Konfor, zamaninda kalkis, personel kalitesi ve fiyat degerlendirmesini tek yerde gorun.",
  alternates: {
    canonical: "/otobus",
  },
  keywords: [
    "otobus yorumlari",
    "otobus firmasi yorum",
    "otobus yolculuk tavsiye",
    "otobus analiz",
  ],
};

export default function OtobusPage() {
  return <CategoryPage config={CATEGORY_CONFIGS.otobus} />;
}
