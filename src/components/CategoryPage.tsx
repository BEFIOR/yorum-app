"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SearchForm from "@/components/SearchForm";
import AnalysisCard from "@/components/AnalysisCard";
import RecentSearches from "@/components/RecentSearches";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import type { CategoryConfig } from "@/lib/prompts";

interface AnalysisResult {
  name: string;
  analysis: string;
}

const SAMPLE_QUERIES: Record<CategoryConfig["slug"], string[]> = {
  otel: ["Rixos Sungate", "Swissotel The Bosphorus", "Hilton Bomonti"],
  otobus: ["Kamil Koç", "Pamukkale Turizm", "Metro Turizm"],
  ucak: ["Turkish Airlines", "Pegasus", "SunExpress"],
  restoran: ["Nusr-Et", "Big Chefs", "Günaydın"],
};

export default function CategoryPage({ config }: { config: CategoryConfig }) {
  const prefersReducedMotion = useReducedMotion();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!analysisResult) return;

    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      resultsRef.current?.focus({ preventScroll: true });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [analysisResult, prefersReducedMotion]);

  const handleSearch = useCallback(
    async (name: string) => {
      setIsAnalyzing(true);
      setError(null);
      setAnalysisResult(null);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, category: config.slug }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Analiz sırasında bir hata oluştu.");
          return;
        }

        setAnalysisResult(data);
        setRefreshTrigger((prev) => prev + 1);
      } catch {
        setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      } finally {
        setIsAnalyzing(false);
      }
    },
    [config.slug]
  );

  const handleRecentSelect = useCallback(
    (search: { hotel_name: string }) => {
      handleSearch(search.hotel_name);
    },
    [handleSearch]
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-950/50 via-slate-900/50 to-slate-950/50 text-slate-100">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-24 top-32 h-64 w-64 rounded-full bg-cyan-400/18 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -16, 0], x: [0, 10, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -right-24 top-56 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 18, 0], x: [0, -12, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <section
        className={`relative z-10 w-full overflow-hidden ${analysisResult ? "pb-8" : "md:h-screen"}`}
      >
        <div className="absolute -right-10 top-4 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-300/18 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start px-4 pt-28 pb-6 md:h-full md:px-6 md:pt-36 md:pb-0">
          <div className="w-full">
            <div className="mb-5 md:mb-6">
              <motion.div whileHover={{ x: -4 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/40 bg-slate-900/50 px-4 py-2 text-sm font-medium text-cyan-50 transition hover:bg-slate-900/60"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Ana sayfaya dön
                </Link>
              </motion.div>
            </div>

            <div className="relative rounded-2xl border border-cyan-200/25 bg-slate-950/50 p-5 backdrop-blur-lg md:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-900/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                {config.title} yorum analiz ekranı
              </div>

              <h1 className="mt-4 text-balance text-3xl font-black tracking-tight text-slate-50 md:text-5xl">
                <span className="text-sky-300">{config.title}</span>{" "}
                için son 1 yıl yorum özeti
              </h1>

              <p className="mt-3 max-w-3xl text-pretty text-base leading-relaxed text-slate-200 md:text-lg">
                {config.subtitle}. Marka ya da işletme adını yaz, yapay zeka güçlü ve zayıf
                yönleri net şekilde çıkarsın.
              </p>
            </div>

            <div className="relative mt-4">
              {!analysisResult && (
                <div className="grid gap-2 text-sm text-slate-100 md:grid-cols-3">
                  <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-3 py-2 backdrop-blur-sm">
                    1) İşletme adını yaz
                  </p>
                  <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-3 py-2 backdrop-blur-sm">
                    2) Analiz et butonuna bas
                  </p>
                  <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-3 py-2 backdrop-blur-sm">
                    3) Özet sonucu karşılaştır
                  </p>
                </div>
              )}

              <div className={analysisResult ? "mt-0" : "mt-6"}>
                <SearchForm
                  onSearch={handleSearch}
                  isLoading={isAnalyzing}
                  placeholder={config.placeholder}
                  sampleQueries={SAMPLE_QUERIES[config.slug]}
                />
              </div>

              {isAnalyzing && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-5 flex items-center gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-4 backdrop-blur-sm"
                >
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-300" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cyan-50">{config.loadingText}</p>
                    <p className="mt-0.5 text-xs text-cyan-200/80">Bu işlem birkaç saniye sürebilir...</p>
                  </div>
                </div>
              )}

              {error && !isAnalyzing && (
                <div
                  role="alert"
                  className="mt-5 rounded-2xl border border-rose-400/40 bg-slate-900/50 px-4 py-3 text-sm text-rose-200 backdrop-blur-sm"
                >
                  {error}
                </div>
              )}

              {analysisResult && !isAnalyzing && (
                <div
                  ref={resultsRef}
                  id="analysis-results"
                  tabIndex={-1}
                  className="mt-6 scroll-mt-28 outline-none"
                >
                  <div
                    role="status"
                    aria-live="polite"
                    className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-4 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <div>
                      <p className="text-sm font-bold text-emerald-100">Analiz tamamlandı!</p>
                      <p className="mt-1 text-sm text-emerald-200/90">
                        <span className="font-semibold">{analysisResult.name}</span> için yorum özeti
                        hazır. Aşağıda detaylı raporu inceleyebilirsin.
                      </p>
                    </div>
                  </div>

                  <AnalysisCard
                    hotelName={analysisResult.name}
                    analysis={analysisResult.analysis}
                    onClose={() => setAnalysisResult(null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-2 md:px-6 md:pt-12">
        <section className="mt-2 md:mt-8">
          {!analysisResult && (
            <RecentSearches
              onSelect={handleRecentSelect}
              refreshTrigger={refreshTrigger}
              category={config.slug}
            />
          )}
        </section>

        <footer className="mt-12 border-t border-cyan-200/15 py-8 text-center">
          <p className="text-sm text-slate-400">YorumArat &mdash; OpenAI desteklidir</p>
        </footer>
      </div>
    </main>
  );
}
