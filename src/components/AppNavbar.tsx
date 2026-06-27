"use client";

import Image from "next/image";
import Link from "next/link";
import { Bus, Hotel, Plane, UtensilsCrossed } from "lucide-react";

const navItems = [
  { href: "/otel", label: "Otel Yorumu", icon: <Hotel className="h-4 w-4" /> },
  { href: "/otobus", label: "Otobus Yorumu", icon: <Bus className="h-4 w-4" /> },
  { href: "/ucak", label: "Ucak Yorumu", icon: <Plane className="h-4 w-4" /> },
  { href: "/restoran", label: "Restoran Yorumu", icon: <UtensilsCrossed className="h-4 w-4" /> },
];

export default function AppNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4 md:px-6 md:pt-6">
        <div className="relative overflow-hidden rounded-2xl border border-cyan-200/35 bg-slate-900/75 backdrop-blur-md">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(14, 116, 144, 0.35) 0%, rgba(21, 94, 117, 0.28) 50%, rgba(15, 47, 61, 0.4) 100%)",
            }}
          />
          <div className="relative flex flex-col gap-2 p-2 md:flex-row md:items-center md:justify-between">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-100/12 px-4 text-sm font-semibold text-slate-50 transition hover:bg-cyan-100/22"
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
            <nav className="flex items-center gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-cyan-200/35 bg-cyan-100/12 px-4 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:border-sky-100/80 hover:bg-linear-to-r hover:from-sky-200/24 hover:via-cyan-200/20 hover:to-white/22 hover:text-white"
                >
                  <span className="text-cyan-200">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
