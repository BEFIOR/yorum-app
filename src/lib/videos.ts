export const HERO_VIDEOS: Record<string, string> = {
  "/": "/homepageyorum.mp4",
  "/otel": "/otelyorum.mp4",
  "/otobus": "/otobusyorum.mp4",
  "/ucak": "/ucakyorum.mp4",
  "/restoran": "/restoranyorum.mp4",
};

const prefetchedRoutes = new Set<string>();
const prefetchedUrls = new Set<string>();

export function posterForVideo(src: string): string {
  const filename = src.replace(/^\//, "").replace(/\.mp4$/i, "");
  return `/posters/${filename}.jpg`;
}

export function prefetchHeroMedia(href: string): void {
  if (typeof window === "undefined") return;
  if (prefetchedRoutes.has(href)) return;

  const video = HERO_VIDEOS[href];
  if (!video) return;

  prefetchedRoutes.add(href);

  const poster = posterForVideo(video);
  for (const url of [poster, video]) {
    if (prefetchedUrls.has(url)) continue;
    prefetchedUrls.add(url);

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = url.endsWith(".jpg") ? "image" : "video";
    if (url.endsWith(".mp4")) link.type = "video/mp4";
    link.href = url;
    document.head.appendChild(link);
  }
}

export function prefetchAllHeroMedia(): void {
  Object.keys(HERO_VIDEOS).forEach(prefetchHeroMedia);
}
