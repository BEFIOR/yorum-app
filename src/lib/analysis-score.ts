function clampScore(score: number): number {
  return Math.min(10, Math.max(0, score));
}

function parseNumber(value: string): number {
  return parseFloat(value.replace(",", "."));
}

function getVerdictSection(analysis: string): string {
  const match = analysis.match(/## Sonuç & Tavsiye([\s\S]*?)(?=## |$)/i);
  return match ? match[1] : analysis;
}

function getGeneralSection(analysis: string): string {
  const match = analysis.match(/## Genel Değerlendirme([\s\S]*?)(?=## |$)/i);
  return match ? match[1] : analysis;
}

/** YorumArat puanını yalnızca Sonuç bölümünden, sabit formattan okur. */
export function extractAnalysisScore(analysis: string): number | null {
  const verdict = getVerdictSection(analysis);

  const branded = verdict.match(/YorumArat genel puan[ıi]?\s*:\s*(\d+(?:[.,]\d)?)\s*\/\s*10/i);
  if (branded) return clampScore(parseNumber(branded[1]));

  const general = verdict.match(/Genel puan\s*:\s*(\d+(?:[.,]\d)?)\s*\/\s*10/i);
  if (general) return clampScore(parseNumber(general[1]));

  const slashMatches = [...verdict.matchAll(/(\d+(?:[.,]\d)?)\s*\/\s*10/g)];
  if (slashMatches.length > 0) {
    const last = slashMatches[slashMatches.length - 1];
    return clampScore(parseNumber(last[1]));
  }

  return null;
}

/** Google Maps puanını Genel Değerlendirme bölümünden okur (5 üzerinden). */
export function extractGoogleMapsScore(analysis: string): number | null {
  const general = getGeneralSection(analysis);

  const branded = general.match(/Google Maps puan[ıi]?\s*:\s*(\d+(?:[.,]\d)?)\s*\/\s*5/i);
  if (branded) return clampScore(parseNumber(branded[1]) * 2);

  const googleSlash = general.match(/Google[^.\n]{0,40}?(\d+(?:[.,]\d)?)\s*\/\s*5/i);
  if (googleSlash) return clampScore(parseNumber(googleSlash[1]) * 2);

  const fiveScale = general.match(/5\s*üzerinden\s*(\d+(?:[.,]\d)?)/i);
  if (fiveScale) return clampScore(parseNumber(fiveScale[1]) * 2);

  return null;
}

/** Google ile çelişen abartılı AI puanlarını düzeltir. */
export function getDisplayScore(analysis: string): number | null {
  const analysisScore = extractAnalysisScore(analysis);
  const googleOnTen = extractGoogleMapsScore(analysis);

  if (analysisScore === null) {
    return googleOnTen;
  }

  if (googleOnTen === null) {
    return analysisScore;
  }

  const maxAllowed = clampScore(googleOnTen + 1.5);
  if (analysisScore > maxAllowed) {
    return clampScore(googleOnTen);
  }

  return analysisScore;
}

export function googleScoreLabel(analysis: string): string | null {
  const general = getGeneralSection(analysis);

  const branded = general.match(/Google Maps puan[ıi]?\s*:\s*(\d+(?:[.,]\d)?)\s*\/\s*5/i);
  if (branded) return `${parseNumber(branded[1]).toFixed(1)}/5`;

  const googleSlash = general.match(/Google[^.\n]{0,40}?(\d+(?:[.,]\d)?)\s*\/\s*5/i);
  if (googleSlash) return `${parseNumber(googleSlash[1]).toFixed(1)}/5`;

  const fiveScale = general.match(/5\s*üzerinden\s*(\d+(?:[.,]\d)?)/i);
  if (fiveScale) return `${parseNumber(fiveScale[1]).toFixed(1)}/5`;

  return null;
}
