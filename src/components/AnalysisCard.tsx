"use client";

import { useMemo } from "react";
import { ArrowUpRight, CircleX, Sparkles } from "lucide-react";

interface AnalysisCardProps {
  hotelName: string;
  analysis: string;
  onClose: () => void;
}

interface Section {
  title: string;
  content: string[];
  borderColor: string;
}

const SECTION_STYLES: Record<string, { borderColor: string }> = {
  "genel değerlendirme": { borderColor: "border-l-sky-400" },
  "güncel fiyatlar": { borderColor: "border-l-emerald-400" },
  "en çok övgü alan konular": { borderColor: "border-l-teal-400" },
  "en çok şikayet edilen konular": { borderColor: "border-l-rose-400" },
  "dikkat edilmesi gerekenler": { borderColor: "border-l-amber-400" },
  "konum & ulaşım": { borderColor: "border-l-blue-400" },
  "oda & temizlik": { borderColor: "border-l-cyan-400" },
  "personel & hizmet kalitesi": { borderColor: "border-l-violet-400" },
  "yeme & içme": { borderColor: "border-l-orange-400" },
  "havuz, plaj & tesisler": { borderColor: "border-l-indigo-400" },
  "fiyat/performans değerlendirmesi": { borderColor: "border-l-lime-400" },
  "sonuç & tavsiye": { borderColor: "border-l-fuchsia-400" },
};

const DEFAULT_STYLE = {
  borderColor: "border-l-slate-400",
};

function getStyleForSection(title: string) {
  const normalized = title.toLowerCase().trim();
  for (const [key, style] of Object.entries(SECTION_STYLES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return style;
    }
  }
  if (normalized.includes("fiyat") && !normalized.includes("performans"))
    return SECTION_STYLES["güncel fiyatlar"];
  if (normalized.includes("övgü") || normalized.includes("olumlu") || normalized.includes("beğen"))
    return SECTION_STYLES["en çok övgü alan konular"];
  if (normalized.includes("şikayet") || normalized.includes("olumsuz"))
    return SECTION_STYLES["en çok şikayet edilen konular"];
  if (normalized.includes("dikkat") || normalized.includes("uyarı"))
    return SECTION_STYLES["dikkat edilmesi gerekenler"];
  if (normalized.includes("konum") || normalized.includes("ulaşım"))
    return SECTION_STYLES["konum & ulaşım"];
  if (normalized.includes("oda") || normalized.includes("temizlik"))
    return SECTION_STYLES["oda & temizlik"];
  if (normalized.includes("personel") || normalized.includes("hizmet"))
    return SECTION_STYLES["personel & hizmet kalitesi"];
  if (normalized.includes("yeme") || normalized.includes("yemek") || normalized.includes("kahvaltı"))
    return SECTION_STYLES["yeme & içme"];
  if (normalized.includes("havuz") || normalized.includes("plaj") || normalized.includes("tesis"))
    return SECTION_STYLES["havuz, plaj & tesisler"];
  if (normalized.includes("fiyat") || normalized.includes("performans"))
    return SECTION_STYLES["fiyat/performans değerlendirmesi"];
  if (normalized.includes("sonuç") || normalized.includes("tavsiye"))
    return SECTION_STYLES["sonuç & tavsiye"];
  return DEFAULT_STYLE;
}

function parseSections(analysis: string): Section[] {
  const sections: Section[] = [];
  const lines = analysis.split("\n");
  let currentTitle = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentTitle) {
        const style = getStyleForSection(currentTitle);
        sections.push({ title: currentTitle, content: currentContent, ...style });
      }
      currentTitle = line.replace("## ", "").trim();
      currentContent = [];
    } else if (currentTitle) {
      currentContent.push(line);
    }
  }

  if (currentTitle) {
    const style = getStyleForSection(currentTitle);
    sections.push({ title: currentTitle, content: currentContent, ...style });
  }

  return sections;
}

function ContentRenderer({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (line.trim() === "") return null;

        if (line.startsWith("- ") || line.startsWith("* ")) {
          const text = line.slice(2);
          return (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
              <p className="leading-relaxed text-slate-200">
                <InlineFormatter text={text} />
              </p>
            </div>
          );
        }

        if (line.match(/^\d+\.\s/)) {
          return (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800/80 text-xs font-bold text-slate-200">
                {line.match(/^(\d+)/)?.[1]}
              </span>
              <p className="leading-relaxed text-slate-200">
                <InlineFormatter text={line.replace(/^\d+\.\s/, "")} />
              </p>
            </div>
          );
        }

        return (
          <p key={i} className="leading-relaxed text-slate-200">
            <InlineFormatter text={line} />
          </p>
        );
      })}
    </div>
  );
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
              className="rounded border border-amber-300/30 bg-amber-200/10 px-1.5 py-0.5 text-sm font-medium text-amber-200"
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

function ScoreExtractor({ content }: { content: string[] }) {
  const fullText = content.join(" ");
  const scoreMatch = fullText.match(/(\d+(?:[.,]\d)?)\s*(?:\/\s*10|üzerinden)/);
  if (!scoreMatch) return null;

  const score = parseFloat(scoreMatch[1].replace(",", "."));
  const percentage = (score / 10) * 100;

  let color = "from-rose-400 to-red-400";
  let textColor = "text-rose-300";
  if (score >= 8) {
    color = "from-emerald-400 to-teal-300";
    textColor = "text-emerald-300";
  } else if (score >= 6) {
    color = "from-amber-400 to-yellow-300";
    textColor = "text-amber-200";
  } else if (score >= 4) {
    color = "from-orange-400 to-amber-300";
    textColor = "text-orange-300";
  }

  return (
    <div className="mb-4 flex items-center gap-4 rounded-xl border border-cyan-200/25 bg-slate-900/50 p-4 backdrop-blur-xl">
      <div className={`text-4xl font-black ${textColor}`}>
        {score.toFixed(1)}
      </div>
      <div className="flex-1">
        <div className="mb-1.5 text-sm text-slate-300">Genel Puan (10 üzerinden)</div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800/80">
          <div
            className={`h-full bg-linear-to-r ${color} rounded-full transition-all duration-1000`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AnalysisCard({ hotelName, analysis, onClose }: AnalysisCardProps) {
  const sections = useMemo(() => parseSections(analysis), [analysis]);

  const lastSection = sections.length > 0 ? sections[sections.length - 1] : null;
  const showScore =
    lastSection &&
    (lastSection.title.toLowerCase().includes("sonuç") ||
      lastSection.title.toLowerCase().includes("tavsiye"));

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl animate-fadeIn">
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-cyan-200/25 bg-slate-900/50 p-6 backdrop-blur-xl md:p-8">
        <div className="absolute -right-6 top-2 h-28 w-28 rounded-full bg-sky-400/20 blur-2xl" />
        <div className="absolute -left-6 bottom-2 h-28 w-28 rounded-full bg-fuchsia-400/20 blur-2xl" />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/50 px-3 py-1.5 text-xs font-semibold text-cyan-100">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              AI Yorum Sonucu
            </div>
            <h1 className="text-2xl font-bold text-slate-50 md:text-3xl">{hotelName}</h1>
            <p className="mt-2 text-sm text-slate-300">
              {sections.length} başlıkta özetlendi, son 1 yıl verisi baz alındı.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-2 text-slate-100 transition hover:bg-slate-800"
            aria-label="Sonucu kapat"
          >
            <CircleX className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {sections.map((section, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-100 transition hover:border-sky-400/40 hover:bg-slate-800"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              {section.title}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {sections.map((section, i) => (
          <div
            key={i}
            id={`section-${i}`}
            className={`overflow-hidden rounded-2xl border border-cyan-200/25 bg-slate-900/50 backdrop-blur-xl transition duration-300 hover:border-cyan-300/40 border-l-4 ${section.borderColor}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="px-6 pb-3 pt-5">
              <h2 className="text-lg font-bold text-slate-50">{section.title}</h2>
            </div>

            {showScore && i === sections.length - 1 && (
              <div className="px-6">
                <ScoreExtractor content={section.content} />
              </div>
            )}

            <div className="px-6 pb-5">
              <ContentRenderer lines={section.content} />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 mt-8 text-center">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/80 px-6 py-3 font-medium text-slate-100 transition hover:border-sky-400/40 hover:bg-slate-800"
        >
          Yeni arama yap
        </button>
      </div>
    </div>
  );
}
