import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Otel Yorumlari ve Restoran Yorumlari Analizi | ${BRAND_NAME}`,
  description:
    "Otel yorumu, restoran yorumu, ucak ve otobus yorumlarini AI ile analiz edin. Son 1 yil yorumlarini tarayip en iyi secimi daha hizli yapin.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "otel yorumlari",
    "otel yorumu",
    "restoran yorumlari",
    "restoran yorumu",
    "ucak yorumlari",
    "otobus yorumlari",
    "otel tavsiye",
    "restoran tavsiye",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `Otel Yorumlari ve Restoran Yorumlari Analizi | ${BRAND_NAME}`,
    description:
      "Son 1 yil otel, restoran, ucak ve otobus yorumlarini AI ile analiz eden karar platformu.",
    siteName: BRAND_NAME,
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description:
      "Otel yorumu ve restoran yorumu aramalarinda hizli karar almaniza yardimci AI analiz platformu.",
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
  logo: `${SITE_URL}/icon.png`,
  sameAs: [],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Otel yorumu ararken hangi kriterlere bakilmali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Son 1 yil yorumlari, temizlik, konum, personel ve fiyat/performans basliklarini birlikte degerlendirmek gerekir.",
      },
    },
    {
      "@type": "Question",
      name: "Restoran yorumu seciminde en onemli noktalar nelerdir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yemek kalitesi, hijyen, servis hizi ve gercek kullanici yorum dagilimi en kritik sinyallerdir.",
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
      <HomeClient />
    </>
  );
}
