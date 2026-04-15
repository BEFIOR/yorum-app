import Link from "next/link";
import { Component as BgGradient } from "@/components/ui/bg-gredient";
import { Bus, Hotel, Plane, UtensilsCrossed } from "lucide-react";
import { CATEGORY_CONFIGS } from "@/lib/prompts";

const categories = [
  {
    slug: "otel",
    title: "Otel",
    description: "Kalmak istediğiniz otelin yorumlarını analiz edin",
    gradient: "from-blue-600 to-indigo-600",
    hoverGradient: "group-hover:from-blue-700 group-hover:to-indigo-700",
    bgLight: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: (
      <Hotel className="w-8 h-8" strokeWidth={1.8} />
    ),
    examples: "Hilton, Rixos, Swissotel...",
  },
  {
    slug: "otobus",
    title: "Otobüs",
    description: "Otobüs firması yorumlarını analiz edin",
    gradient: "from-emerald-600 to-teal-600",
    hoverGradient: "group-hover:from-emerald-700 group-hover:to-teal-700",
    bgLight: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: (
      <Bus className="w-8 h-8" strokeWidth={1.8} />
    ),
    examples: "Metro, Pamukkale, Kamil Koç...",
  },
  {
    slug: "ucak",
    title: "Uçak",
    description: "Havayolu şirketi yorumlarını analiz edin",
    gradient: "from-sky-600 to-blue-600",
    hoverGradient: "group-hover:from-sky-700 group-hover:to-blue-700",
    bgLight: "bg-sky-50",
    iconColor: "text-sky-600",
    icon: (
      <Plane className="w-8 h-8" strokeWidth={1.8} />
    ),
    examples: "THY, Pegasus, SunExpress...",
  },
  {
    slug: "restoran",
    title: "Restoran",
    description: "Restoran yorumlarını analiz edin",
    gradient: "from-orange-600 to-red-600",
    hoverGradient: "group-hover:from-orange-700 group-hover:to-red-700",
    bgLight: "bg-orange-50",
    iconColor: "text-orange-600",
    icon: (
      <UtensilsCrossed className="w-8 h-8" strokeWidth={1.8} />
    ),
    examples: "Nusr-Et, Big Chefs, Günaydın...",
  },
];

export default function Home() {
  const homeBg = CATEGORY_CONFIGS.otel;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BgGradient
        gradientFrom={homeBg.pageGradientFrom}
        gradientTo={homeBg.pageGradientTo}
        gradientSize={homeBg.pageGradientSize}
        gradientPosition={homeBg.pageGradientPosition}
        gradientStop={homeBg.pageGradientStop}
      />

      <div className="relative z-10">
        {/* Hero */}
        <div className="pt-20 pb-12 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              AI Destekli Yorum Analizi
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-gray-900">Her Yorum</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Tek Bakışta
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Yapay zeka internetten son 1 yılın gerçek kullanıcı yorumlarını bulup
              analiz eder. Otel, otobüs, uçak veya restoran &mdash; hangisini merak
              ediyorsanız seçin.
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${cat.bgLight} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={cat.iconColor}>
                      {cat.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-1.5 group-hover:text-gray-800">
                    {cat.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Examples */}
                  <p className="text-xs text-gray-400">
                    {cat.examples}
                  </p>

                  {/* Arrow */}
                  <div className="absolute top-6 right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8 text-center">
          <p className="text-sm text-gray-400">
            Yorum Analiz &mdash; OpenAI ile desteklenmektedir
          </p>
        </footer>
      </div>
    </main>
  );
}
