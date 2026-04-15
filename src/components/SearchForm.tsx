"use client";

import { useState } from "react";
import SearchComponent from "@/components/ui/animated-glowing-search-bar";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export default function SearchForm({
  onSearch,
  isLoading,
  placeholder = "Ara...",
}: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim().length >= 2) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <SearchComponent
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        placeholder={placeholder}
        isLoading={isLoading}
      />
    </div>
  );
}
