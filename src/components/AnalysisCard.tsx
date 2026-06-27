"use client";

import { useMemo, useState } from "react";
import { getDisplayScore, googleScoreLabel } from "@/lib/analysis-score";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bed,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Sparkles,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Users,
  UtensilsCrossed,
  Waves,
  X,
} from "lucide-react";

interface AnalysisCardProps {
  hotelName: string;
  analysis: string;
  onClose: () => void;
}

interface Section {
  title: string;
  content: string[];
  tone: SectionTone;
}

type SectionTone = "neutral" | "positive" | "negative" | "warning" | "verdict" | "price";

const TONE_STYLES: Record<
  SectionTone,
  {
    icon: typeof BarChart3;
    iconClass: string;
    badgeClass: string;
    borderClass: string;
    dotClass: string;
  }
> = {
  neutral: {
    icon: BarChart3,
    iconClass: "text-sky-300",
    badgeClass: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    borderClass: "border-sky-400/25",
    dotClass: "bg-sky-400",
  },
  positive: {
    icon: ThumbsUp,
    iconClass: "text-emerald-300",
    badgeClass: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    borderClass: "border-emerald-400/25",
    dotClass: "bg-emerald-400",
  },
  negative: {
    icon: ThumbsDown,
    iconClass: "text-rose-300",
    badgeClass: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    borderClass: "border-rose-400/25",
    dotClass: "bg-rose-400",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-300",
    badgeClass: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    borderClass: "border-amber-400/25",
    dotClass: "bg-amber-400",
  },
  verdict: {
    icon: CheckCircle2,
    iconClass: "text-cyan-300",
    badgeClass: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    borderClass: "border-cyan-400/30",
    dotClass: "bg-cyan-400",
  },
  price: {
    icon: Tag,
    iconClass: "text-violet-300",
    badgeClass: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    borderClass: "border-violet-400/25",
    dotClass: "bg-violet-400",
  },
};

function getToneForSection(title: string): SectionTone {
  const n = title.toLowerCase().trim();
  if (n.includes("sonuç") || n.includes("tavsiye")) return "verdict";
  if (n.includes("övgü") || n.includes("olumlu") || n.includes("beğen")) return "positive";
  if (n.includes("şikayet") || n.includes("olumsuz")) return "negative";
  if (n.includes("dikkat") || n.includes("uyarı")) return "warning";
  if (n.includes("fiyat")) return "price";
  return "neutral";
}

function getIconForSection(title: string, tone: SectionTone) {
  const n = title.toLowerCase();
  if (n.includes("konum") || n.includes("ulaşım")) return MapPin;
  if (n.includes("oda") || n.includes("temizlik")) return Bed;
  if (n.includes("personel") || n.includes("hizmet")) return Users;
  if (n.includes("yeme") || n.includes("yemek") || n.includes("kahvaltı")) return UtensilsCrossed;
  if (n.includes("havuz") || n.includes("plaj") || n.includes("tesis")) return Waves;
  return TONE_STYLES[tone].icon;
}

function parseSections(analysis: string): Section[] {
  const sections: Section[] = [];
  const lines = analysis.split("\n");
  let currentTitle = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentTitle) {
        sections.push({
          title: currentTitle,
          content: currentContent,
          tone: getToneForSection(currentTitle),
        });
      }
      currentTitle = line.replace("## ", "").trim();
      currentContent = [];
    } else if (currentTitle) {
      currentContent.push(line);
    }
  }

  if (currentTitle) {
    sections.push({
      title: currentTitle,
      content: currentContent,
      tone: getToneForSection(currentTitle),
    });
  }

  return sections;
}

function scoreMeta(score: number) {
  if (score >= 8) {
    return {
      label: "Çok iyi",
      ring: "stroke-emerald-400",
      text: "text-emerald-300",
      bar: "from-emerald-400 to-teal-300",
    };
  }
  if (score >= 6) {
    return {
      label: "İyi",
      ring: "stroke-amber-400",
      text: "text-amber-200",
      bar: "from-amber-400 to-yellow-300",
    };
  }
  if (score >= 4) {
    return {
      label: "Orta",
      ring: "stroke-orange-400",
      text: "text-orange-300",
      bar: "from-orange-400 to-amber-300",
    };
  }
  return {
    label: "Zayıf",
    ring: "stroke-rose-400",
    text: "text-rose-300",
    bar: "from-rose-400 to-red-400",
  };
}

function InlineFormatter({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|"[^"]+"|“[^”]+”)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-slate-100">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (
          (part.startsWith('"') && part.endsWith('"')) ||
          (part.startsWith("\u201C") && part.endsWith("\u201D"))
        ) {
          return (
            <span
              key={i}
              className="mx-0.5 inline rounded-md border border-amber-400/25 bg-amber-400/10 px-1.5 py-0.5 text-sm font-medium text-amber-200"
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function ContentRenderer({ lines, tone }: { lines: string[]; tone: SectionTone }) {
  const styles = TONE_STYLES[tone];

  return (
    <div className="space-y-2.5">
      {lines.map((line, i) => {
        if (line.trim() === "") return null;

        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-slate-950/30 px-3 py-2">
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dotClass}`} />
              <p className="text-sm leading-relaxed text-slate-200 md:text-[15px]">
                <InlineFormatter text={line.slice(2)} />
              </p>
            </div>
          );
        }

        if (line.match(/^\d+\.\s/)) {
          const num = line.match(/^(\d+)/)?.[1];
          return (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-slate-950/30 px-3 py-2">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800/90 text-xs font-bold text-slate-200">
                {num}
              </span>
              <p className="text-sm leading-relaxed text-slate-200 md:text-[15px]">
                <InlineFormatter text={line.replace(/^\d+\.\s/, "")} />
              </p>
            </div>
          );
        }

        return (
          <p key={i} className="text-sm leading-relaxed text-slate-200 md:text-[15px]">
            <InlineFormatter text={line} />
          </p>
        );
      })}
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const meta = scoreMeta(score);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-800/80" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${meta.ring} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-black ${meta.text}`}>{score.toFixed(1)}</span>
          <span className="text-[10px] uppercase tracking-wide text-slate-400">/10</span>
        </div>
      </div>
      <span className={`text-xs font-semibold ${meta.text}`}>{meta.label}</span>
    </div>
  );
}

function SectionCard({
  section,
  index,
  defaultOpen,
}: {
  section: Section;
  index: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const styles = TONE_STYLES[section.tone];
  const Icon = getIconForSection(section.title, section.tone);
  const isVerdict = section.tone === "verdict";

  return (
    <article
      id={`section-${index}`}
      className={`scroll-mt-28 overflow-hidden rounded-2xl border backdrop-blur-lg transition-colors ${
        isVerdict
          ? "border-cyan-300/35 bg-slate-950/55 shadow-lg shadow-cyan-950/20"
          : `border-cyan-200/20 bg-slate-900/50 ${styles.borderClass}`
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-4 text-left md:px-5"
        aria-expanded={open}
      >
        <div className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${styles.badgeClass}`}>
          <Icon className={`h-5 w-5 ${styles.iconClass}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-slate-50 md:text-lg">{section.title}</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            {section.content.filter((l) => l.trim()).length} madde
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-cyan-200/10 px-4 pb-5 pt-4 md:px-5">
          <ContentRenderer lines={section.content} tone={section.tone} />
        </div>
      )}
    </article>
  );
}

export default function AnalysisCard({ hotelName, analysis, onClose }: AnalysisCardProps) {
  const sections = useMemo(() => parseSections(analysis), [analysis]);
  const score = useMemo(() => getDisplayScore(analysis), [analysis]);
  const googleRating = useMemo(() => googleScoreLabel(analysis), [analysis]);
  const scoreInfo = score !== null ? scoreMeta(score) : null;

  const positiveSections = sections.filter((s) => s.tone === "positive");
  const negativeSections = sections.filter((s) => s.tone === "negative");

  return (
    <div className="animate-fadeIn pb-24 md:pb-8">
      {/* Ust bar */}
      <div className="sticky top-[calc(4.5rem+env(safe-area-inset-top))] z-20 -mx-4 mb-6 border-b border-cyan-200/15 bg-slate-950/70 px-4 py-3 backdrop-blur-xl md:static md:mx-0 md:rounded-2xl md:border md:border-cyan-200/20 md:bg-slate-900/50 md:px-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Yeni arama</span>
          </button>
          <p className="truncate text-sm font-semibold text-slate-200">{hotelName}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-1.5 text-slate-300 transition hover:bg-slate-800"
            aria-label="Sonucu kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-200/25 bg-slate-900/50 p-6 backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-100">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              AI Analiz Raporu
            </div>
            <h1 className="text-balance text-2xl font-black tracking-tight text-slate-50 md:text-4xl">
              {hotelName}
            </h1>
            <p className="mt-2 text-sm text-slate-300 md:text-base">
              Son 1 yıl yorumları {sections.length} başlıkta özetlendi.
              {googleRating && (
                <span className="mt-1 block text-cyan-200/90">
                  Google Maps: {googleRating}
                </span>
              )}
            </p>

            {scoreInfo && score !== null && (
              <div className="mt-4 hidden md:block">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
                  <span>YorumArat puanı</span>
                  <span className={scoreInfo.text}>{scoreInfo.label}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${scoreInfo.bar} transition-all duration-1000`}
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {score !== null && (
            <div className="flex justify-center md:justify-end">
              <ScoreRing score={score} />
            </div>
          )}
        </div>

        {/* Hızlı özet */}
        {(positiveSections.length > 0 || negativeSections.length > 0) && (
          <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
            {positiveSections.length > 0 && (
              <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-200">
                  <ThumbsUp className="h-4 w-4" />
                  Öne çıkan artılar
                </div>
                <p className="text-xs text-slate-300">
                  {positiveSections.map((s) => s.title).join(" · ")}
                </p>
              </div>
            )}
            {negativeSections.length > 0 && (
              <div className="rounded-xl border border-rose-400/25 bg-rose-400/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-200">
                  <ThumbsDown className="h-4 w-4" />
                  Dikkat edilen eksiler
                </div>
                <p className="text-xs text-slate-300">
                  {negativeSections.map((s) => s.title).join(" · ")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* İçindekiler */}
      <nav aria-label="Rapor başlıkları" className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          İçindekiler
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section, i) => {
            const styles = TONE_STYLES[section.tone];
            const Icon = getIconForSection(section.title, section.tone);
            return (
              <a
                key={i}
                href={`#section-${i}`}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition hover:bg-slate-800/60 ${styles.badgeClass}`}
              >
                <Icon className={`h-3.5 w-3.5 ${styles.iconClass}`} />
                {section.title}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Bolumler */}
      <div className="mt-6 space-y-3">
        {sections.map((section, i) => (
          <SectionCard
            key={i}
            section={section}
            index={i}
            defaultOpen={i === 0 || section.tone === "verdict"}
          />
        ))}
      </div>

      {/* Alt CTA */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-300 via-cyan-200 to-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Başka bir işletme ara
        </button>
      </div>

      {/* Mobil sabit CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cyan-200/15 bg-slate-950/80 p-3 backdrop-blur-xl md:hidden">
        <button
          type="button"
          onClick={onClose}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-300 via-cyan-200 to-white text-sm font-semibold text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Yeni arama yap
        </button>
      </div>
    </div>
  );
}
