import Image from "next/image";
import { posterForVideo } from "@/lib/videos";

interface HeroVideoBackgroundProps {
  src: string;
}

export default function HeroVideoBackground({ src }: HeroVideoBackgroundProps) {
  const poster = posterForVideo(src);

  return (
    <>
      <link rel="preload" href={poster} as="image" />
      <link rel="preload" href={src} as="fetch" type="video/mp4" crossOrigin="anonymous" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-slate-900" aria-hidden>
        <div className="relative h-full w-full">
          <Image
            src={poster}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/28 via-sky-900/18 to-slate-900/50" />
      </div>
    </>
  );
}
