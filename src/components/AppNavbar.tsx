"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bus, ChevronRight, Hotel, Menu, Plane, UtensilsCrossed, X } from "lucide-react";
import { prefetchHeroMedia } from "@/lib/videos";

const navItems = [
  {
    href: "/otel",
    label: "Otel Yorumu",
    icon: Hotel,
  },
  {
    href: "/otobus",
    label: "Otobus Yorumu",
    icon: Bus,
  },
  {
    href: "/ucak",
    label: "Ucak Yorumu",
    icon: Plane,
  },
  {
    href: "/restoran",
    label: "Restoran Yorumu",
    icon: UtensilsCrossed,
  },
] as const;

export default function AppNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-6xl px-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:px-6 md:pt-6">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-200/35 bg-slate-950/92 backdrop-blur-md shadow-lg shadow-slate-950/40">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(14, 116, 144, 0.35) 0%, rgba(21, 94, 117, 0.28) 50%, rgba(15, 47, 61, 0.4) 100%)",
              }}
            />

            {/* Mobil: logo + menu butonu */}
            <div className="relative flex items-center justify-between gap-2 p-2 md:hidden">
              <Link
                href="/"
                onFocus={() => prefetchHeroMedia("/")}
                className="inline-flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-cyan-200/40 bg-slate-800/80 px-3 text-sm font-semibold text-cyan-50 transition hover:bg-slate-800"
              >
                <Image
                  src="/yorumarat.png"
                  alt="YorumArat Logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-lg object-cover"
                />
                <span className="truncate">YorumArat</span>
              </Link>
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={menuOpen ? "Menuyu kapat" : "Menuyu ac"}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-200/40 bg-slate-800/80 text-cyan-50 transition hover:bg-slate-800"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobil: acilir-kapanir menu */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
                menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <nav
                id="mobile-nav-menu"
                aria-hidden={!menuOpen}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1.5 border-t border-cyan-200/20 p-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        tabIndex={menuOpen ? 0 : -1}
                        onFocus={() => prefetchHeroMedia(item.href)}
                        className={`inline-flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                          active
                            ? "border-sky-400/50 bg-sky-950/80 text-sky-100"
                            : "border-slate-700/80 bg-slate-800/90 text-slate-100 hover:bg-slate-800"
                        }`}
                      >
                        <Icon className={`h-5 w-5 shrink-0 ${active ? "text-sky-300" : "text-cyan-300"}`} />
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* Masaustu */}
            <div className="relative hidden items-center justify-between gap-2 p-2 md:flex">
              <Link
                href="/"
                onMouseEnter={() => prefetchHeroMedia("/")}
                onFocus={() => prefetchHeroMedia("/")}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-200/40 bg-slate-800/80 px-4 text-sm font-semibold text-cyan-50 transition hover:bg-slate-800"
              >
                <Image
                  src="/yorumarat.png"
                  alt="YorumArat Logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-lg object-cover"
                />
                YorumArat
              </Link>
              <nav className="flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => prefetchHeroMedia(item.href)}
                      onFocus={() => prefetchHeroMedia(item.href)}
                      className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors duration-200 ${
                        active
                          ? "border-sky-400/50 bg-sky-950/80 text-sky-100"
                          : "border-slate-700/80 bg-slate-800/80 text-slate-100 hover:border-sky-400/40 hover:bg-slate-800 hover:text-sky-50"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${active ? "text-sky-300" : "text-cyan-300"}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
