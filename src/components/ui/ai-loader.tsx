"use client";

import * as React from "react";

interface LoaderProps {
  size?: number;
  text?: string;
}

export const Component: React.FC<LoaderProps> = ({ size = 180, text = "Generating" }) => {
  const letters = text.split("");

  return (
    <div className="w-full px-4 mt-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-10">
        <div
          className="relative mx-auto flex items-center justify-center select-none"
          style={{ width: size, height: size }}
        >
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="inline-block text-slate-700 opacity-40 animate-loaderLetter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}

          <div className="absolute inset-0 rounded-full animate-loaderCircle" />
        </div>
      </div>
    </div>
  );
};
