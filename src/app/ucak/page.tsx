import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Ucak Yorumlari Analizi",
  description:
    "Havayolu yorumlarini son 1 yil verileriyle AI destekli analiz edin. Rotar, bagaj, kabin hizmeti ve fiyat/performans basliklarini karsilastirin.",
  alternates: {
    canonical: "/ucak",
  },
  keywords: [
    "ucak yorumlari",
    "havayolu yorumlari",
    "ucak bileti tavsiye",
    "havayolu analiz",
  ],
};

export default function UcakPage() {
  return <CategoryPage config={CATEGORY_CONFIGS.ucak} />;
}
