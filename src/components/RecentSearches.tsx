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

  if (loading) return null;
  if (searches.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
        Son Aramalar
      </h2>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search.id}
            onClick={() => onSelect(search)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{search.hotel_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
