"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Bus,
  CirclePlay,
  Compass,
  MessageSquareText,
  ShieldCheck,
  Hotel,
  Plane,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

const categories = [
  {
    slug: "otel",
    title: "Otel",
    description: "Kalmak istediğiniz otelin yorumlarını analiz edin",
    href: "/otel",
    gradient: "from-blue-600/20 via-indigo-500/15 to-cyan-500/20",
    iconClass: "text-blue-600",
    icon: <Hotel className="h-7 w-7" strokeWidth={1.9} />,
    metric: "12K+ yorum",
    examples: "Hilton, Rixos, Swissotel...",
  },
  {
    slug: "otobus",
    title: "Otobüs",
    description: "Otobüs firması yorumlarını analiz edin",
    href: "/otobus",
    gradient: "from-emerald-600/20 via-teal-500/15 to-cyan-500/20",
    iconClass: "text-emerald-600",
    icon: <Bus className="h-7 w-7" strokeWidth={1.9} />,
    metric: "8K+ yorum",
    examples: "Metro, Pamukkale, Kamil Koç...",
  },
  {
    slug: "ucak",
    title: "Uçak",
    description: "Havayolu şirketi yorumlarını analiz edin",
    href: "/ucak",
    gradient: "from-sky-600/20 via-blue-500/15 to-indigo-500/20",
    iconClass: "text-sky-600",
    icon: <Plane className="h-7 w-7" strokeWidth={1.9} />,
    metric: "10K+ yorum",
    examples: "THY, Pegasus, SunExpress...",
  },
  {
    slug: "restoran",
    title: "Restoran",
    description: "Restoran yorumlarını analiz edin",
    href: "/restoran",
    gradient: "from-orange-600/20 via-rose-500/15 to-red-500/20",
    iconClass: "text-orange-600",
    icon: <UtensilsCrossed className="h-7 w-7" strokeWidth={1.9} />,
    metric: "15K+ yorum",
    examples: "Nusr-Et, Big Chefs, Gunaydin...",
  },
];

const featureCards = [
  {
    title: "Guncel Yorum Havuzu",
    description: "Son 12 aydaki geri bildirimleri kaynak bazli toplar.",
    icon: <Compass className="h-5 w-5" />,
  },
  {
    title: "Net Arti-Eksi Ozeti",
    description: "Uzun yorumlari okunur ve karsilastirilabilir hale getirir.",
    icon: <MessageSquareText className="h-5 w-5" />,
  },
  {
    title: "Guven Skoru",
    description: "Eski veya tutarsiz yorum etkisini azaltan karar katmani sunar.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

export default function HomeClient() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressWidth = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 20,
    mass: 0.2,
  });

  return (
    <main className="min-h-screen bg-linear-to-b from-cyan-950/85 via-sky-950/75 to-slate-900 text-slate-100">
      <motion.div
        style={{ scaleX: progressWidth }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-sky-300 via-cyan-200 to-white"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-20 top-16 h-64 w-64 rounded-full bg-cyan-400/22 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0], x: [0, 14, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -right-20 top-48 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 20, 0], x: [0, -12, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <section className="relative z-10 h-screen w-full overflow-hidden">
          <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col items-start px-4 pt-40 md:px-6 md:pt-44">
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-50">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              <span className="leading-tight">
                <span className="block">Gercek yorumlarla</span>
                <span className="block">hizli karar</span>
              </span>
            </div>

            <div className="mt-5 max-w-3xl">
              <h1 className="text-balance text-4xl font-black tracking-tight text-white md:text-6xl">
                Yorum kalabalığını ayıkla,
                <span className="block bg-linear-to-r from-sky-200 via-cyan-100 to-white bg-clip-text text-transparent">
                  doğru seçimi netleştir.
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
                Otel, restoran, ucak ve otobus yorumlarini tek ekranda anlayip dakikalar
                icinde karar ver. Sade, hizli ve gercek kullanici odakli.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/otel"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-300 via-cyan-200 to-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
              >
                Analizi baslat
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#kategoriler"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/15"
              >
                <CirclePlay className="h-4 w-4" />
                Kategorileri gor
              </a>
            </div>
          </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-6">
        <section id="kategoriler" className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">Kategori sec ve devam et</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              >
                <Link
                  href={cat.href}
                  className="group block rounded-2xl border border-cyan-200/30 bg-cyan-100/8 p-5 backdrop-blur-xl transition hover:border-cyan-300/50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/10">
                      <span className={cat.iconClass}>{cat.icon}</span>
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
                      {cat.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{cat.description}</p>
                  <p className="mt-3 text-xs text-slate-400">{cat.examples}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                    Incele
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/20 bg-white/6 p-6 backdrop-blur-xl md:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Adim 1</p>
              <p className="mt-1 font-semibold text-white">Kategori sec</p>
              <p className="mt-1 text-sm text-slate-300">Otel, restoran, ucak veya otobus.</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Adim 2</p>
              <p className="mt-1 font-semibold text-white">Isletme adini yaz</p>
              <p className="mt-1 text-sm text-slate-300">Ornek sorgularla tek tikta dene.</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Adim 3</p>
              <p className="mt-1 font-semibold text-white">Ozeti karsilastir</p>
              <p className="mt-1 text-sm text-slate-300">Arti-eksi tablosu ile hizli karar ver.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-3 md:grid-cols-3">
          {featureCards.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.08 + index * 0.08, duration: 0.4 }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="rounded-2xl border border-white/20 bg-white/6 p-4 backdrop-blur-xl"
            >
              <div className="mb-3 inline-flex rounded-lg border border-cyan-200/30 bg-cyan-100/12 p-2 text-cyan-200">
                {item.icon}
              </div>
              <h2 className="font-semibold text-white">{item.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </motion.article>
          ))}
        </section>
        <section className="mt-10 rounded-3xl border border-white/20 bg-white/6 p-7 backdrop-blur-xl md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-300">YorumArat - AI destekli yeni arayuz</p>
            <Link
              href="/otel"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-sky-300 via-cyan-200 to-white px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:brightness-105"
            >
              Ilk analizi baslat
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
