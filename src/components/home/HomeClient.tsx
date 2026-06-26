"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock3,
  Compass,
  Hotel,
  Plane,
  ShieldCheck,
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
    title: "Canli Kaynak Tarama",
    description: "Google, TripAdvisor ve ilgili platformlardan guncel sinyalleri yakalar.",
    icon: <Compass className="h-5 w-5" />,
  },
  {
    title: "Hizli Karar Ozeti",
    description: "Yuzlerce yorumu tek ekranda arti-eksi odakli sade bir sonuca cevirir.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Guven Katmani",
    description: "Yalnizca son 1 yil verisine odaklanarak eski ve yaniltici yorumlari azaltir.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const seoContent = [
  {
    title: "Otel yorumu ararken nelere bakilmali?",
    text: "Otel yorum analizi yaparken son 1 yildaki yorumlara odaklanmak, temizlik, konum, personel ve fiyat/performans basliklarini birlikte degerlendirmek gerekir.",
  },
  {
    title: "Restoran yorumu nasil dogru okunur?",
    text: "Restoran seciminde tek bir puana degil; yemek kalitesi, hizmet hizi, hijyen ve gercek musteri yorumu dagilimina bakmak daha dogru sonuc verir.",
  },
  {
    title: "Otobus ve ucak yorumu karsilastirmasi",
    text: "Ulasim kategorilerinde rotar oranlari, koltuk konforu, bagaj ve musteri hizmetleri hakkindaki yorumlar karar surecinde kritik rol oynar.",
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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, prefersReducedMotion ? 1 : 0.75]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <motion.div
        style={{ scaleX: progressWidth }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-fuchsia-500 via-sky-400 to-emerald-400"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-20 top-16 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0], x: [0, 14, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -right-20 top-48 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 20, 0], x: [0, -12, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.9)] backdrop-blur-sm md:p-12"
        >
          <div className="absolute -left-10 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -right-10 top-8 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Yapay zeka destekli karar asistani
            </motion.div>

            <div className="mt-6 grid gap-9 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="text-balance text-4xl font-black tracking-tight text-white md:text-6xl"
                >
                  Yorumlari topla,
                  <span className="block bg-linear-to-r from-fuchsia-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                    en iyi secimi dakikalar icinde yap.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.6 }}
                  className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg"
                >
                  Otel, ucus, otobus ya da restoran fark etmeden son 12 ay yorumlarini
                  tarar; guclu ve zayif taraflari net sekilde sunar.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.55 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/otel"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      Analizi baslat
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href="#kategoriler"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    Kategorileri kesfet
                  </motion.a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-8 grid grid-cols-2 gap-3 text-sm"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-xl font-bold text-white">45K+</p>
                    <p className="text-slate-300">Analiz edilen yorum</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-xl font-bold text-white">4 kategori</p>
                    <p className="text-slate-300">Sektore ozel akis</p>
                  </motion.div>
                </motion.div>
              </div>
              <div className="grid gap-3">
                {featureCards.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + index * 0.12, duration: 0.45 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mb-3 inline-flex rounded-lg border border-white/15 bg-white/10 p-2 text-sky-300">
                      {item.icon}
                    </div>
                    <h2 className="font-semibold text-white">{item.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section id="kategoriler" className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Kategoriye gore yorum analizi
            </h2>
            <span className="hidden rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-slate-200 md:inline-flex">
              Tek tikla gecis
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <motion.div whileHover={{ y: -6 }} className="h-full">
                  <Link
                    href={cat.href}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-6 transition duration-300 hover:border-white/25 hover:shadow-[0_24px_40px_-30px_rgba(148,163,184,0.8)]"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-0 transition duration-300 group-hover:opacity-100`}
                    />
                    <div className="relative">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <motion.div
                          whileHover={{ scale: 1.12, rotate: -4 }}
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 transition duration-300"
                        >
                          <div className={cat.iconClass}>{cat.icon}</div>
                        </motion.div>
                        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                          {cat.metric}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {cat.description}
                      </p>
                      <p className="mt-4 text-xs text-slate-400">{cat.examples}</p>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition duration-300 group-hover:text-sky-300">
                        Analize git
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900 p-7 md:p-10">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Kullanimi cok kolay</h2>
          <p className="mt-2 text-slate-300">
            Kategori sec, firma/marka yaz ve tek tikla analiz al. Son aramalarla hizli tekrar arama yap.
          </p>
          <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">1) Kategori sec</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">2) Isim yaz veya ornek sec</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">3) Ozet sonuca gore karar ver</div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900 p-7 md:p-10">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Otel yorumu ve restoran yorumu aramalarinda one cikmak icin rehber
          </h2>
          <p className="mt-3 max-w-4xl text-slate-300">
            Bu bolum, otel yorumu, restoran yorumu, ucak yorumu ve otobus yorumu
            aramalarinda kullanicilarin ihtiyac duydugu bilgileri acik, dogru ve yapisal
            sekilde sunmak icin hazirlanmistir.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {seoContent.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900 p-7 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-300">YorumArat - AI destekli yeni arayuz</p>
            <Link
              href="/otel"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition duration-300 hover:bg-slate-200"
            >
              Ilk analizi baslat
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
