"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/prompts";

interface RecentSearch {
  id: string;
  hotel_name: string;
  hotel_address: string;
  hotel_rating: number | null;
  created_at: string;
}

interface RecentSearchesProps {
  onSelect: (search: RecentSearch) => void;
  refreshTrigger: number;
  category: Category;
}

export default function RecentSearches({ onSelect, refreshTrigger, category }: RecentSearchesProps) {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      setLoading(true);
      const { data, error } = await supabase
        .from("searches")
        .select("id, hotel_name, hotel_address, hotel_rating, created_at")
        .eq("category", category)
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setSearches(data);
      }
      setLoading(false);
    }

    fetchRecent();
  }, [refreshTrigger, category]);

  if (loading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-slate-200 backdrop-blur-xl">
        Son aramalar getiriliyor...
      </div>
    );
  }
  if (searches.length === 0) return null;

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-300">
        Son Aramalar
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {searches.map((search) => (
          <button
            key={search.id}
            onClick={() => onSelect(search)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-300/40 hover:bg-sky-400/15"
          >
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{search.hotel_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
