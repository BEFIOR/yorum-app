"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Search, X } from "lucide-react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  placeholder?: string;
  sampleQueries?: string[];
}

export default function SearchForm({
  onSearch,
  isLoading,
  placeholder = "Ara...",
  sampleQueries = [],
}: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim().length >= 2) {
      setShowValidation(false);
      onSearch(query.trim());
      return;
    }
    setShowValidation(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col gap-3 rounded-2xl border border-cyan-200/25 bg-slate-900/50 p-3 backdrop-blur-lg sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (showValidation && event.target.value.trim().length >= 2) {
                setShowValidation(false);
              }
            }}
            placeholder={placeholder}
            className="h-12 w-full rounded-xl border border-slate-700/60 bg-slate-800/80 pl-10 pr-4 text-sm text-slate-50 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
            disabled={isLoading}
            aria-label="Arama sorgusu"
          />
          {query.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setShowValidation(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-700/60 hover:text-slate-200"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || query.trim().length < 2}
          className="inline-flex h-12 min-w-36 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-300 via-cyan-200 to-white px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:from-slate-600 disabled:via-slate-600 disabled:to-slate-600 disabled:text-slate-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analiz ediliyor
            </>
          ) : (
            "Analiz et"
          )}
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 px-1 text-xs">
        <p className="text-slate-400">Ipucu: Enter tusu ile hizli arama yapabilirsin.</p>
        {showValidation && (
          <p className="text-rose-300">En az 2 karakter girmen gerekiyor.</p>
        )}
      </div>

      {sampleQueries.length > 0 && !isLoading && (
        <div className="mt-3 flex flex-wrap gap-2">
          {sampleQueries.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setQuery(sample);
                setShowValidation(false);
                onSearch(sample);
              }}
              className="inline-flex min-h-10 items-center rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 text-sm text-slate-100 transition hover:border-sky-400/40 hover:bg-slate-800"
            >
              {sample}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
