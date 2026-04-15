"use client";

import React from "react";
import { Search, WandSparkles } from "lucide-react";

interface AnimatedGlowingSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export default function SearchComponent({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  isLoading = false,
}: AnimatedGlowingSearchBarProps) {
  const canSubmit = !isLoading && value.trim().length >= 2;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }}
      className="relative flex items-center justify-center"
    >
      <div className="absolute -z-10 min-h-screen w-full" />
      <div id="poda" className="relative flex items-center justify-center group">
        <div className="absolute -z-10 overflow-hidden h-full w-full max-h-[70px] max-w-[624px] rounded-xl blur-[3px] before:absolute before:content-[''] before:-z-20 before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[60deg] before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]" />
        <div className="absolute -z-10 overflow-hidden h-full w-full max-h-[65px] max-w-[620px] rounded-xl blur-[3px] before:absolute before:content-[''] before:-z-20 before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg] before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]" />
        <div className="absolute -z-10 overflow-hidden h-full w-full max-h-[63px] max-w-[614px] rounded-lg blur-[2px] before:absolute before:content-[''] before:-z-20 before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg] before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-140 before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]" />
        <div className="absolute -z-10 overflow-hidden h-full w-full max-h-[59px] max-w-[608px] rounded-xl blur-[0.5px] before:absolute before:content-[''] before:-z-20 before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[70deg] before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-130 before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]" />

        <div id="main" className="relative group">
          <input
            placeholder={placeholder}
            type="text"
            name="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
            className="bg-[#010201] border-none w-[606px] h-[56px] rounded-lg text-[#f8f8ff] px-[59px] pr-[140px] text-lg font-medium focus:outline-none placeholder:text-gray-300 disabled:opacity-80"
          />
          <div className="pointer-events-none w-[56px] h-[20px] absolute bg-gradient-to-r from-transparent to-black top-[18px] left-[70px] opacity-35 group-focus-within:hidden" />
          <div className="pointer-events-none w-[30px] h-[20px] absolute bg-[#cf30aa] top-[10px] left-[5px] blur-xl opacity-40 transition-all duration-[2000ms] group-hover:opacity-0" />
          <div className="pointer-events-none absolute top-2 right-2 h-10 min-w-[96px] rounded-lg overflow-hidden before:absolute before:content-[''] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-90 before:bg-[conic-gradient(rgba(0,0,0,0),#3d3a4f,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_50%,#3d3a4f,rgba(0,0,0,0)_100%)] before:brightness-135 before:animate-[spin_6s_linear_infinite]" />

          <button
            type="submit"
            disabled={!canSubmit}
            className="absolute top-2 right-2 flex items-center justify-center gap-1.5 z-[2] h-10 min-w-[96px] px-3 rounded-lg bg-gradient-to-b from-[#161329] via-black to-[#1d1b4b] border border-transparent text-[12px] font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 rounded-full border border-white border-t-transparent animate-spin" />
                Analiz
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <WandSparkles className="h-3.5 w-3.5" />
                Analiz Et
              </span>
            )}
          </button>

          <div className="absolute left-5 top-[15px] text-[#b6a9b7]">
            <Search className="h-6 w-6" />
          </div>
        </div>
      </div>
    </form>
  );
}
