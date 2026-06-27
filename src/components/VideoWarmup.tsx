"use client";

import { useEffect } from "react";
import { prefetchAllHeroMedia } from "@/lib/videos";

export default function VideoWarmup() {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => prefetchAllHeroMedia());
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(() => prefetchAllHeroMedia(), 1500);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
