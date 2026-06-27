import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";
import AppNavbar from "@/components/AppNavbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | Otel ve Restoran Yorum Analizi`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Otel, restoran, ucak ve otobus yorumlarini yapay zeka ile analiz ederek daha dogru karar vermenizi saglayan yorum platformu.",
  applicationName: BRAND_NAME,
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  category: "Travel",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/yorumarat.png?v=2", type: "image/png" }],
    shortcut: ["/yorumarat.png?v=2"],
    apple: ["/yorumarat.png?v=2"],
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    "otel yorumlari",
    "restoran yorumlari",
    "otel yorumu analizi",
    "restoran yorumu analizi",
    "ucak yorumlari",
    "otobus yorumlari",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | Otel ve Restoran Yorum Analizi`,
    description:
      "Son 1 yil otel, restoran, ucak ve otobus yorumlarini AI ile analiz edin.",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description:
      "Otel ve restoran yorumlarini analiz ederek daha hizli karar alin.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}
