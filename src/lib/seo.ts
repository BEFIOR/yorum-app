import type { Metadata } from "next";

export const BRAND_NAME = "YorumArat";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yorumarat.com";

export type SeoCategory = "otel" | "restoran" | "otobus" | "ucak";

type CategorySeoConfig = {
  path: `/${SeoCategory}`;
  title: string;
  description: string;
  keywords: string[];
  faq: Array<{ question: string; answer: string }>;
};

const CATEGORY_SEO: Record<SeoCategory, CategorySeoConfig> = {
  otel: {
    path: "/otel",
    title: "Otel Yorumlari Analizi",
    description:
      "Otel yorumlarini son 1 yila odaklanarak AI ile analiz edin. Temizlik, konum, personel ve fiyat/performans basliklarini tek ekranda gorun.",
    keywords: [
      "otel yorumlari",
      "otel yorumu",
      "otel tavsiye",
      "otel analizi",
      "en iyi oteller",
    ],
    faq: [
      {
        question: "Otel yorumlarinda en onemli kriterler nelerdir?",
        answer:
          "Temizlik, konum, personel kalitesi ve fiyat/performans kriterleri birlikte degerlendirilmelidir.",
      },
      {
        question: "Sadece son 1 yil yorumlarina bakmak neden onemli?",
        answer:
          "Guncel yorumlar, hizmet kalitesindeki degisimleri daha dogru yansitir ve karar hatasini azaltir.",
      },
    ],
  },
  restoran: {
    path: "/restoran",
    title: "Restoran Yorumlari Analizi",
    description:
      "Restoran yorumlarini son 1 yil verileriyle AI destekli analiz edin. Yemek kalitesi, hijyen ve servis hizi gibi basliklari net gorun.",
    keywords: [
      "restoran yorumlari",
      "restoran yorumu",
      "yemek yeri tavsiye",
      "restoran analizi",
      "en iyi restoranlar",
    ],
    faq: [
      {
        question: "Restoran secerken yorumlarda nelere dikkat edilmeli?",
        answer:
          "Yemek kalitesi, hijyen, servis hizi ve gercek kullanici deneyimlerinin tutarliligina dikkat edilmelidir.",
      },
      {
        question: "Restoran puani tek basina yeterli mi?",
        answer:
          "Hayir. Puanin yaninda yorum icerigi, tarih dagilimi ve sikayet basliklari da birlikte okunmalidir.",
      },
    ],
  },
  otobus: {
    path: "/otobus",
    title: "Otobus Yorumlari Analizi",
    description:
      "Otobus firmasi yorumlarini AI ile analiz edin. Konfor, zamaninda kalkis, hizmet kalitesi ve fiyat degerlendirmesini tek ekranda inceleyin.",
    keywords: [
      "otobus yorumlari",
      "otobus firmasi yorum",
      "otobus yolculuk tavsiye",
      "otobus analizi",
    ],
    faq: [
      {
        question: "Otobus firmasi secerken hangi yorumlar onemlidir?",
        answer:
          "Zamaninda kalkis, koltuk konforu, personel davranisi ve mola kalitesi hakkindaki yorumlar kritik onemdedir.",
      },
      {
        question: "Otobus yorumlari nasil karsilastirilir?",
        answer:
          "Ayni rota ve benzer tarihli yorumlar birlikte degerlendirilerek daha dogru bir karsilastirma yapilir.",
      },
    ],
  },
  ucak: {
    path: "/ucak",
    title: "Ucak Yorumlari Analizi",
    description:
      "Havayolu yorumlarini son 1 yil verisiyle analiz edin. Rotar, bagaj, kabin hizmeti ve fiyat/performans kriterlerini karsilastirin.",
    keywords: [
      "ucak yorumlari",
      "havayolu yorumlari",
      "ucak bileti tavsiye",
      "havayolu analizi",
    ],
    faq: [
      {
        question: "Havayolu secerken hangi yorumlara bakilmali?",
        answer:
          "Rotar sikligi, bagaj sureci, kabin hizmeti ve check-in deneyimi hakkindaki yorumlar birlikte okunmalidir.",
      },
      {
        question: "Ucak yorumlarinda fiyat/performans nasil degerlendirilir?",
        answer:
          "Bilet fiyatinin yaninda sunulan hizmetler, zamaninda kalkis orani ve musteri memnuniyeti birlikte incelenmelidir.",
      },
    ],
  },
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path}`;
}

export function buildCategoryMetadata(category: SeoCategory): Metadata {
  const data = CATEGORY_SEO[category];

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: data.path,
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(data.path),
      title: `${data.title} | ${BRAND_NAME}`,
      description: data.description,
      siteName: BRAND_NAME,
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | ${BRAND_NAME}`,
      description: data.description,
    },
  };
}

export function buildCategorySchemas(category: SeoCategory) {
  const data = CATEGORY_SEO[category];
  const pageUrl = absoluteUrl(data.path);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${data.title} | ${BRAND_NAME}`,
    description: data.description,
    url: pageUrl,
    inLanguage: "tr-TR",
    isPartOf: {
      "@type": "WebSite",
      name: BRAND_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [webPageSchema, breadcrumbSchema, faqSchema];
}
