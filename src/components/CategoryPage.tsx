"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import AnalysisCard from "@/components/AnalysisCard";
import RecentSearches from "@/components/RecentSearches";
import { Component as AiLoader } from "@/components/ui/ai-loader";
import { Component as BgGradient } from "@/components/ui/bg-gredient";
import type { CategoryConfig } from "@/lib/prompts";

interface AnalysisResult {
  name: string;
  analysis: string;
}

export default function CategoryPage({ config }: { config: CategoryConfig }) {
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
    <main className="relative min-h-screen overflow-hidden">
      <BgGradient
        gradientFrom={config.pageGradientFrom}
        gradientTo={config.pageGradientTo}
        gradientSize={config.pageGradientSize}
        gradientPosition={config.pageGradientPosition}
        gradientStop={config.pageGradientStop}
      />

      <div className="relative z-10">
        {/* Back button */}
        <div className="pt-6 px-4 max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ana Sayfa
          </Link>
        </div>

        {/* Hero */}
        <div className="pt-8 pb-8 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm`}>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {config.title} Yorum Analizi
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {config.title}
              </span>
              <span className="text-gray-900"> Analizi</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              {config.subtitle}. Yapay zeka son 1 yılın yorumlarını analiz etsin.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <SearchForm
            onSearch={handleSearch}
            isLoading={isAnalyzing}
            placeholder={config.placeholder}
          />
        </div>

        {/* Analyzing */}
        {isAnalyzing && <AiLoader text="Yukleniyor" />}

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto px-4 mt-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Result */}
        <div className="px-4 pb-16">
          {analysisResult && (
            <AnalysisCard
              hotelName={analysisResult.name}
              analysis={analysisResult.analysis}
              onClose={() => setAnalysisResult(null)}
            />
          )}

          {!analysisResult && !isAnalyzing && (
            <RecentSearches
              onSelect={handleRecentSelect}
              refreshTrigger={refreshTrigger}
              category={config.slug}
            />
          )}
        </div>

        <footer className="border-t border-gray-100 py-8 text-center">
          <p className="text-sm text-gray-400">
            Yorum Analiz &mdash; OpenAI ile desteklenmektedir
          </p>
        </footer>
      </div>
    </main>
  );
}
