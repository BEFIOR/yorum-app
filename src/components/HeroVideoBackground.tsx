interface HeroVideoBackgroundProps {
  src: string;
}

export default function HeroVideoBackground({ src }: HeroVideoBackgroundProps) {
  return (
    <>
      <link rel="preload" href={src} as="video" type="video/mp4" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-slate-900" aria-hidden>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/28 via-sky-900/18 to-slate-900/50" />
      </div>
    </>
  );
}
