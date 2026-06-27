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

const TRANSPARENT_POSTER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const SAMPLE_QUERIES: Record<CategoryConfig["slug"], string[]> = {
  otel: ["Rixos Sungate", "Swissotel The Bosphorus", "Hilton Bomonti"],
  otobus: ["Kamil Koc", "Pamukkale Turizm", "Metro Turizm"],
  ucak: ["Turkish Airlines", "Pegasus", "SunExpress"],
  restoran: ["Nusr-Et", "Big Chefs", "Gunaydin"],
};

export default function CategoryPage({ config }: { config: CategoryConfig }) {
  const isHotelCategory = config.slug === "otel";
  const isFlightCategory = config.slug === "ucak";
  const backgroundVideo = isHotelCategory
    ? "/otelyorum.mp4"
    : isFlightCategory
      ? "/ucakyorum.mp4"
      : config.slug === "restoran"
        ? "/restoranyorum.mp4"
        : config.slug === "otobus"
          ? "/otobusyorum.mp4"
      : null;
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
    <main className="min-h-screen bg-linear-to-b from-cyan-950/85 via-sky-950/75 to-slate-900 text-slate-100">
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

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 h-screen w-full overflow-hidden"
      >
        {backgroundVideo && (
          <div className="pointer-events-none fixed inset-0 z-0">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={TRANSPARENT_POSTER}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-b from-cyan-900/28 via-sky-900/18 to-slate-900/50" />
          </div>
        )}
        <div className="absolute -right-10 top-4 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-300/18 blur-3xl" />

        <div className="relative mx-auto flex h-full w-full max-w-6xl items-start px-4 pt-32 md:px-6 md:pt-36">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6"
            >
              <motion.div whileHover={{ x: -4 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-100/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-cyan-100/18"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Ana sayfaya dön
                </Link>
              </motion.div>
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100"
              >
                <Sparkles className="h-4 w-4 text-cyan-200" />
                {config.title} yorum analiz ekranı
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-4 text-balance text-3xl font-black tracking-tight text-white md:text-5xl"
              >
                <span className={`bg-linear-to-r ${config.gradient} bg-clip-text text-transparent`}>
                  {config.title}
                </span>{" "}
                için son 1 yıl yorum özeti
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="mt-3 max-w-3xl text-pretty text-base leading-relaxed text-slate-200 md:text-lg"
              >
                {config.subtitle}. Marka ya da işletme adını yaz, yapay zeka güçlü ve zayıf
                yönleri net şekilde çıkarsın.
              </motion.p>

              <div className="mt-4 grid gap-2 text-sm text-slate-200 md:grid-cols-3">
                <p className="rounded-xl border border-white/20 bg-white/10 px-3 py-2">
                  1) Isletme adini yaz
                </p>
                <p className="rounded-xl border border-white/20 bg-white/10 px-3 py-2">
                  2) Analiz et butonuna bas
                </p>
                <p className="rounded-xl border border-white/20 bg-white/10 px-3 py-2">
                  3) Ozet sonucu karsilastir
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
                className="mt-6"
              >
                <SearchForm
                  onSearch={handleSearch}
                  isLoading={isAnalyzing}
                  placeholder={config.placeholder}
                  sampleQueries={SAMPLE_QUERIES[config.slug]}
                />
              </motion.div>

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-2xl border border-cyan-200/30 bg-cyan-300/12 px-4 py-3 text-sm text-cyan-100"
                >
                  {config.loadingText}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-rose-300/30 bg-rose-400/10 px-5 py-4 text-sm text-rose-100"
          >
            {error}
          </motion.div>
        )}

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-8"
        >
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
        </motion.section>

        <footer className="mt-12 border-t border-white/10 py-8 text-center">
          <p className="text-sm text-slate-400">YorumArat &mdash; OpenAI desteklidir</p>
        </footer>
      </div>
    </main>
  );
}
