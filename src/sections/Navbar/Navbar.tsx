"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#story", label: "Our Story" },
  { href: "#membership", label: "Membership" },
  { href: "#trainers", label: "Trainers" },
  { href: "#events", label: "Events" },
];



export default function Navbar() {
  const [open, setOpen] = useState(false);

  // A's working scroll-lock logic (inline styles, reliably restores scroll position)
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50">

        {/* ── DESKTOP ── */}
        <div className="hidden lg:block">
          <div
            className="relative w-full overflow-hidden backdrop-blur-xl"
            style={{
              background: "linear-gradient(180deg,rgba(238,228,212,0.99) 0%,rgba(230,218,198,0.98) 100%)",
              boxShadow: "0 1px 0 rgba(198,168,122,0.28), 0 4px 24px rgba(110,79,47,0.07)",
            }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(124,31,45,0.06),rgba(124,31,45,0)_28%)]" />
            <div className="relative mx-auto flex max-w-7xl items-center px-8 py-4">
              <a href="#top" className="group shrink-0">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-2xl border border-[#c6a87a]/65 shadow-[0_3px_10px_rgba(110,79,47,0.12)]">
                    <Image src="/assets/logos/logo.jpeg" alt="Indian Mahjong Association" fill sizes="72px" className="object-cover" priority />
                  </div>
                  <span className="text-[0.75rem] uppercase tracking-[0.26em] text-[#7c1f2d]">
                    Indian Mahjong Association
                  </span>
                </div>
              </a>
              <nav className="flex flex-1 items-center justify-end gap-x-9 text-[0.74rem] font-medium uppercase tracking-[0.22em] text-[#55463d]">
                {navLinks.map((item) => (
                  <a key={item.href} href={item.href} className="group relative px-1 py-1 transition duration-300 hover:text-[#7c1f2d]">
                    <span className="absolute inset-x-1 bottom-0 h-px origin-center scale-x-0 bg-[linear-gradient(90deg,rgba(124,31,45,0),rgba(124,31,45,0.75),rgba(124,31,45,0))] transition duration-300 group-hover:scale-x-100" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div aria-hidden="true" style={{ height: 2, background: "linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.60) 18%,rgba(198,168,122,0.60) 82%,rgba(198,168,122,0))" }} />
          </div>
        </div>

        {/* ── MOBILE bar — B's UI: grid layout with centered title ── */}
        <div
          className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center px-5 py-3 lg:hidden"
          style={{
            background: "rgba(234,224,208,0.99)",
            borderBottom: "2px solid rgba(198,168,122,0.60)",
            boxShadow: "0 2px 14px rgba(110,79,47,0.07)",
          }}
        >
          <a href="#top" className="flex items-center justify-start">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-[#c6a87a]/65 shadow-[0_3px_10px_rgba(110,79,47,0.10)]">
              <Image src="/assets/logos/logo.jpeg" alt="Indian Mahjong Association" fill sizes="44px" className="object-cover" priority />
            </div>
          </a>

          <span className="text-center text-[0.55rem] font-semibold uppercase leading-tight tracking-[0.14em] text-[#7c1f2d]">
            Indian Mahjong Association
          </span>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#cbb18b]/50 bg-[#fbf7ef] text-[#5d4534]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── MOBILE drawer — only in DOM when open (A's pattern: no hidden overlay eating touches) ── */}
      {open && (
        <>
          <div aria-hidden="true" onClick={() => setOpen(false)} className="fixed inset-0 z-[58] bg-black/40 lg:hidden" />
          <div className="fixed right-0 top-0 z-[59] flex h-[100dvh] w-[min(300px,85vw)] flex-col overflow-y-auto overscroll-contain bg-[#fbf6ee] shadow-[-8px_0_40px_rgba(110,79,47,0.18)] lg:hidden">
            <div className="flex shrink-0 items-center justify-end border-b border-[#e8d8b8]/60 px-5 py-4">
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e8d8b8]/60 bg-[#f5ece0]/60 text-[#8a6a4a]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col px-4 pt-2" aria-label="Mobile navigation">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 border-b border-[#e8d8b8]/40 py-4 text-[0.82rem] uppercase tracking-[0.32em] text-[#4d3a2e] transition-colors duration-200 hover:text-[#7c1f2d]">
                  <span className="h-px w-4 shrink-0 bg-[#c6a87a]/60" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
