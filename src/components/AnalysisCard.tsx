"use client";

import { useMemo } from "react";

interface AnalysisCardProps {
  hotelName: string;
  analysis: string;
  onClose: () => void;
}

interface Section {
  title: string;
  content: string[];
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  borderColor: string;
}

const SECTION_STYLES: Record<
  string,
  { icon: React.ReactNode; gradient: string; iconBg: string; borderColor: string }
> = {
  "genel değerlendirme": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-100 text-violet-600",
    borderColor: "border-l-violet-500",
  },
  "güncel fiyatlar": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    gradient: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-100 text-teal-600",
    borderColor: "border-l-teal-500",
  },
  "en çok övgü alan konular": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    gradient: "from-emerald-500 to-green-600",
    iconBg: "bg-emerald-100 text-emerald-600",
    borderColor: "border-l-emerald-500",
  },
  "en çok şikayet edilen konular": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
      </svg>
    ),
    gradient: "from-red-500 to-rose-600",
    iconBg: "bg-red-100 text-red-600",
    borderColor: "border-l-red-500",
  },
  "dikkat edilmesi gerekenler": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-100 text-amber-600",
    borderColor: "border-l-amber-500",
  },
  "konum & ulaşım": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-600",
    iconBg: "bg-blue-100 text-blue-600",
    borderColor: "border-l-blue-500",
  },
  "oda & temizlik": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    gradient: "from-sky-500 to-blue-600",
    iconBg: "bg-sky-100 text-sky-600",
    borderColor: "border-l-sky-500",
  },
  "personel & hizmet kalitesi": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-indigo-500 to-violet-600",
    iconBg: "bg-indigo-100 text-indigo-600",
    borderColor: "border-l-indigo-500",
  },
  "yeme & içme": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500",
    iconBg: "bg-orange-100 text-orange-600",
    borderColor: "border-l-orange-500",
  },
  "havuz, plaj & tesisler": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-600",
    iconBg: "bg-cyan-100 text-cyan-600",
    borderColor: "border-l-cyan-500",
  },
  "fiyat/performans değerlendirmesi": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-600",
    iconBg: "bg-green-100 text-green-600",
    borderColor: "border-l-green-500",
  },
  "sonuç & tavsiye": {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    gradient: "from-fuchsia-500 to-pink-600",
    iconBg: "bg-fuchsia-100 text-fuchsia-600",
    borderColor: "border-l-fuchsia-500",
  },
};

const DEFAULT_STYLE = {
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  gradient: "from-gray-500 to-slate-600",
  iconBg: "bg-gray-100 text-gray-600",
  borderColor: "border-l-gray-400",
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
          const isQuote = text.includes('"') || text.includes('"') || text.includes('"');
          return (
            <div key={i} className="flex items-start gap-2.5 group">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
              <p className={`text-gray-700 leading-relaxed ${isQuote ? "italic" : ""}`}>
                <InlineFormatter text={text} />
              </p>
            </div>
          );
        }

        if (line.match(/^\d+\.\s/)) {
          return (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {line.match(/^(\d+)/)?.[1]}
              </span>
              <p className="text-gray-700 leading-relaxed">
                <InlineFormatter text={line.replace(/^\d+\.\s/, "")} />
              </p>
            </div>
          );
        }

        return (
          <p key={i} className="text-gray-700 leading-relaxed">
            <InlineFormatter text={line} />
          </p>
        );
      })}
    </div>
  );
}

function InlineFormatter({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|"[^"]+"|"[^"]+"|「[^」]+」)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-gray-900">
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
              className="bg-yellow-50 text-yellow-800 px-1.5 py-0.5 rounded text-sm font-medium border border-yellow-200"
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

  let color = "from-red-500 to-red-400";
  let textColor = "text-red-600";
  if (score >= 8) {
    color = "from-emerald-500 to-green-400";
    textColor = "text-emerald-600";
  } else if (score >= 6) {
    color = "from-amber-500 to-yellow-400";
    textColor = "text-amber-600";
  } else if (score >= 4) {
    color = "from-orange-500 to-orange-400";
    textColor = "text-orange-600";
  }

  return (
    <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
      <div className={`text-4xl font-black ${textColor}`}>
        {score.toFixed(1)}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1.5">Genel Puan (10 üzerinden)</div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
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
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fadeIn">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 shadow-2xl mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white" />
        </div>
        <div className="relative flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-blue-100 text-sm mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Yorum Analizi
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{hotelName}</h1>
            <p className="text-blue-200 text-sm">
              Son 1 yılın yorumları analiz edildi &bull; {sections.length} kategori incelendi
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl p-2 transition-all"
            aria-label="Kapat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick nav pills */}
        <div className="relative flex flex-wrap gap-2 mt-6">
          {sections.map((section, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg transition-all"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections Grid */}
      <div className="space-y-5">
        {sections.map((section, i) => (
          <div
            key={i}
            id={`section-${i}`}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-l-4 ${section.borderColor}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Section Header */}
            <div className="px-6 pt-5 pb-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${section.iconBg} flex items-center justify-center flex-shrink-0`}>
                {section.icon}
              </div>
              <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
            </div>

            {/* Score bar for final section */}
            {showScore && i === sections.length - 1 && (
              <div className="px-6">
                <ScoreExtractor content={section.content} />
              </div>
            )}

            {/* Section Content */}
            <div className="px-6 pb-5 pl-[4.25rem]">
              <ContentRenderer lines={section.content} />
            </div>
          </div>
        ))}
      </div>

      {/* Back to top */}
      <div className="text-center mt-8 mb-4">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Yeni Otel Ara
        </button>
      </div>
    </div>
  );
}
