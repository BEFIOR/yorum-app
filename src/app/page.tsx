import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Otel Yorumları ve Restoran Yorumları Analizi | ${BRAND_NAME}`,
  description:
    "Otel yorumu, restoran yorumu, uçak ve otobüs yorumlarını AI ile analiz edin. Son 1 yıl yorumlarını tarayıp en iyi seçimi daha hızlı yapın.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "otel yorumları",
    "otel yorumu",
    "restoran yorumları",
    "restoran yorumu",
    "uçak yorumları",
    "otobüs yorumları",
    "otel tavsiye",
    "restoran tavsiye",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `Otel Yorumları ve Restoran Yorumları Analizi | ${BRAND_NAME}`,
    description:
      "Son 1 yıl otel, restoran, uçak ve otobüs yorumlarını AI ile analiz eden karar platformu.",
    siteName: BRAND_NAME,
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description:
      "Otel yorumu ve restoran yorumu aramalarında hızlı karar almanıza yardımcı AI analiz platformu.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: SITE_URL,
  inLanguage: "tr-TR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/otel?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/yorumarat.png`,
  sameAs: [],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Otel yorumu ararken hangi kriterlere bakılmalı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Son 1 yıl yorumları, temizlik, konum, personel ve fiyat/performans başlıklarını birlikte değerlendirmek gerekir.",
      },
    },
    {
      "@type": "Question",
      name: "Restoran yorumu seçiminde en önemli noktalar nelerdir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yemek kalitesi, hijyen, servis hızı ve gerçek kullanıcı yorum dağılımı en kritik sinyallerdir.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroVideoBackground src="/homepageyorum.mp4" />
      <HomeClient />
    </>
  );
}
