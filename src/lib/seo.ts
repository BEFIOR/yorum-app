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
    title: "Otel Yorumları Analizi",
    description:
      "Otel yorumlarını son 1 yıla odaklanarak AI ile analiz edin. Temizlik, konum, personel ve fiyat/performans başlıklarını tek ekranda görün.",
    keywords: [
      "otel yorumları",
      "otel yorumu",
      "otel tavsiye",
      "otel analizi",
      "en iyi oteller",
    ],
    faq: [
      {
        question: "Otel yorumlarında en önemli kriterler nelerdir?",
        answer:
          "Temizlik, konum, personel kalitesi ve fiyat/performans kriterleri birlikte değerlendirilmelidir.",
      },
      {
        question: "Sadece son 1 yıl yorumlarına bakmak neden önemli?",
        answer:
          "Güncel yorumlar, hizmet kalitesindeki değişimleri daha doğru yansıtır ve karar hatasını azaltır.",
      },
    ],
  },
  restoran: {
    path: "/restoran",
    title: "Restoran Yorumları Analizi",
    description:
      "Restoran yorumlarını son 1 yıl verileriyle AI destekli analiz edin. Yemek kalitesi, hijyen ve servis hızı gibi başlıkları net görün.",
    keywords: [
      "restoran yorumları",
      "restoran yorumu",
      "yemek yeri tavsiye",
      "restoran analizi",
      "en iyi restoranlar",
    ],
    faq: [
      {
        question: "Restoran seçerken yorumlarda nelere dikkat edilmeli?",
        answer:
          "Yemek kalitesi, hijyen, servis hızı ve gerçek kullanıcı deneyimlerinin tutarlılığına dikkat edilmelidir.",
      },
      {
        question: "Restoran puanı tek başına yeterli mi?",
        answer:
          "Hayır. Puanın yanında yorum içeriği, tarih dağılımı ve şikayet başlıkları da birlikte okunmalıdır.",
      },
    ],
  },
  otobus: {
    path: "/otobus",
    title: "Otobüs Yorumları Analizi",
    description:
      "Otobüs firması yorumlarını AI ile analiz edin. Konfor, zamanında kalkış, hizmet kalitesi ve fiyat değerlendirmesini tek ekranda inceleyin.",
    keywords: [
      "otobüs yorumları",
      "otobüs firması yorum",
      "otobüs yolculuk tavsiye",
      "otobüs analizi",
    ],
    faq: [
      {
        question: "Otobüs firması seçerken hangi yorumlar önemlidir?",
        answer:
          "Zamanında kalkış, koltuk konforu, personel davranışı ve mola kalitesi hakkındaki yorumlar kritik öneme sahiptir.",
      },
      {
        question: "Otobüs yorumları nasıl karşılaştırılır?",
        answer:
          "Aynı rota ve benzer tarihli yorumlar birlikte değerlendirilerek daha doğru bir karşılaştırma yapılır.",
      },
    ],
  },
  ucak: {
    path: "/ucak",
    title: "Uçak Yorumları Analizi",
    description:
      "Havayolu yorumlarını son 1 yıl verisiyle analiz edin. Rötar, bagaj, kabin hizmeti ve fiyat/performans kriterlerini karşılaştırın.",
    keywords: [
      "uçak yorumları",
      "havayolu yorumları",
      "uçak bileti tavsiye",
      "havayolu analizi",
    ],
    faq: [
      {
        question: "Havayolu seçerken hangi yorumlara bakılmalı?",
        answer:
          "Rötar sıklığı, bagaj süreci, kabin hizmeti ve check-in deneyimi hakkındaki yorumlar birlikte okunmalıdır.",
      },
      {
        question: "Uçak yorumlarında fiyat/performans nasıl değerlendirilir?",
        answer:
          "Bilet fiyatının yanında sunulan hizmetler, zamanında kalkış oranı ve müşteri memnuniyeti birlikte incelenmelidir.",
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
