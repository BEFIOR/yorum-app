"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SearchForm from "@/components/SearchForm";
import AnalysisCard from "@/components/AnalysisCard";
import RecentSearches from "@/components/RecentSearches";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { CategoryConfig } from "@/lib/prompts";

interface AnalysisResult {
  name: string;
  analysis: string;
}

const SAMPLE_QUERIES: Record<CategoryConfig["slug"], string[]> = {
  otel: ["Rixos Sungate", "Swissotel The Bosphorus", "Hilton Bomonti"],
  otobus: ["Kamil Koc", "Pamukkale Turizm", "Metro Turizm"],
  ucak: ["Turkish Airlines", "Pegasus", "SunExpress"],
  restoran: ["Nusr-Et", "Big Chefs", "Gunaydin"],
};

export default function CategoryPage({ config }: { config: CategoryConfig }) {
  const prefersReducedMotion = useReducedMotion();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

      <section className="relative z-10 w-full overflow-hidden md:h-screen">
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
              <div className="grid gap-2 text-sm text-slate-100 md:grid-cols-3">
                <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-3 py-2 backdrop-blur-sm">
                  1) Isletme adini yaz
                </p>
                <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-3 py-2 backdrop-blur-sm">
                  2) Analiz et butonuna bas
                </p>
                <p className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-3 py-2 backdrop-blur-sm">
                  3) Ozet sonucu karsilastir
                </p>
              </div>

              <div className="mt-6">
                <SearchForm
                  onSearch={handleSearch}
                  isLoading={isAnalyzing}
                  placeholder={config.placeholder}
                  sampleQueries={SAMPLE_QUERIES[config.slug]}
                />
              </div>

              {isAnalyzing && (
                <div className="mt-5 rounded-2xl border border-cyan-300/30 bg-slate-900/50 px-4 py-3 text-sm text-cyan-100 backdrop-blur-sm">
                  {config.loadingText}
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
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-2 md:px-6 md:pt-12">
        <section className="mt-2 md:mt-8">
          {analysisResult && (
            <AnalysisCard
              hotelName={analysisResult.name}
              analysis={analysisResult.analysis}
              onClose={() => setAnalysisResult(null)}
            />
          )}

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
