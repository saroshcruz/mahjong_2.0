"use client";

import { useMemo, useRef, useState } from "react";

type SelectedDate = {
  day: number;
  month: number;
  year: number;
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function buildCalendarCells(year: number, month: number) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  const cells: Array<{ day: number; current: boolean }> = [];

  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, current: false });

  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, current: true });

  const trailing = 42 - cells.length;
  for (let d = 1; d <= trailing; d++)
    cells.push({ day: d, current: false });

  return cells;
}

export default function Events() {
  const [viewYear, setViewYear]         = useState(2026);
  const [viewMonth, setViewMonth]       = useState(7);
  const [selected, setSelected]         = useState<SelectedDate | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const detailPanelRef                  = useRef<HTMLDivElement>(null);

  const cells = useMemo(
    () => buildCalendarCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const navigateMonth = (dir: -1 | 1) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0)  { m = 11; y -= 1; }
    if (m > 11) { m = 0;  y += 1; }
    setViewMonth(m);
    setViewYear(y);

    if (!selected) return;

    setPanelVisible(false);
    window.setTimeout(() => {
      setSelected(null);
    }, 240);
  };

  const handleDayClick = (day: number) => {
    const nextSelected = { day, month: viewMonth, year: viewYear };
    const isSameSelection =
      selected?.day === day &&
      selected.month === viewMonth &&
      selected.year === viewYear;

    if (isSameSelection) return;

    const revealSelectedDate = () => {
      setSelected(nextSelected);
      window.setTimeout(() => {
        setPanelVisible(true);
      }, 20);

      if (window.innerWidth < 1024) {
        window.setTimeout(() => {
          if (!detailPanelRef.current) return;
          const top = detailPanelRef.current.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo({ top, behavior: "smooth" });
        }, 120);
      }
    };

    if (!selected) {
      setPanelVisible(false);
      revealSelectedDate();
      return;
    }

    setPanelVisible(false);
    window.setTimeout(revealSelectedDate, 220);
  };

  return (
    <section id="events" className="relative overflow-hidden bg-[#f5f0e8]">

      {/* ── WATERCOLOR BACKGROUND TREATMENT ── z-0, fully isolated from content ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* Layer 1 — watercolor texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/assets/backgrounds/membership-watercolor-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            opacity: 0.9,
          }}
        />

        {/* Layer 2 — top edge fade */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(180deg,#f5efe4 0%,rgba(245,239,228,0) 100%)" }}
        />

        {/* Layer 3 — bottom edge fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(0deg,#f5f0e8 0%,rgba(245,240,232,0) 100%)" }}
        />
      </div>

      {/* ── SECTION INTRO ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-7 pb-12 pt-12 sm:px-8 lg:px-16 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-2xl text-center">

          {/* Eyebrow */}
          <p className="mb-4 text-[0.71rem] uppercase tracking-[0.32em] text-[#7c1f2d] lg:text-[0.73rem] lg:tracking-[0.42em]">
            Events &amp; Gatherings
          </p>

          {/* Heading */}
          <h2 className="text-[2.48rem] leading-[1.05] text-[#2d2926] sm:text-[3.08rem] sm:leading-[0.98] lg:text-[4.18rem] lg:leading-[0.93]">
            Events &amp; Gatherings
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-[48ch] text-[1.08rem] leading-[1.86] text-[#5d4d40] lg:mt-8 lg:text-[1.12rem] lg:leading-[1.86]">
            Our event calendar and gathering schedule will be announced shortly.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">

          {/* ══════════════════════════════════════════
              CALENDAR CARD
          ══════════════════════════════════════════ */}
          <div
            className="rounded-[1.25rem] overflow-hidden"
            style={{
              background: "linear-gradient(180deg,rgba(255,253,248,0.97) 0%,rgba(250,245,236,0.93) 100%)",
              border: "1px solid rgba(198,168,122,0.26)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.52), 0 8px 40px rgba(110,79,47,0.09), 0 2px 12px rgba(110,79,47,0.05)",
            }}
          >

            {/* Month navigation */}
            <div className="flex items-center justify-between px-4 pb-4 pt-5 lg:px-9 lg:pt-9 lg:pb-5">
              <button
                onClick={() => navigateMonth(-1)}
                aria-label="Previous month"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-[#c6a87a]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a87a]/40 lg:h-9 lg:w-9"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M9.5 11.5L5.5 7.5l4-4" stroke="#8a6a4a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p
                className="text-[0.82rem] uppercase tracking-[0.28em] text-[#2d2926] lg:text-[0.78rem] lg:tracking-[0.36em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </p>

              <button
                onClick={() => navigateMonth(1)}
                aria-label="Next month"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-[#c6a87a]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a87a]/40 lg:h-9 lg:w-9"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M5.5 3.5l4 4-4 4" stroke="#8a6a4a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Day-of-week labels */}
            <div className="grid grid-cols-7 px-3 pb-2 lg:px-7">
              {DAY_LABELS.map(d => (
                <div
                  key={d}
                  className="py-2 text-center text-[0.62rem] uppercase tracking-[0.18em] text-[#8a6a4a]/60 lg:text-[0.6rem] lg:tracking-[0.2em]"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-1.5 px-3 pb-5 lg:px-7 lg:pb-9">
              {cells.map((cell, idx) => {
                const isSelected =
                  cell.current &&
                  selected?.day === cell.day &&
                  selected.month === viewMonth &&
                  selected.year === viewYear;

                if (!cell.current) {
                  return <div key={idx} aria-hidden="true" className="h-11 w-full lg:h-10" />;
                }

                return (
                  <div key={idx} className="flex justify-center">
                    <button
                      onClick={() => handleDayClick(cell.day)}
                      aria-label={`Select ${cell.day} ${MONTH_NAMES[viewMonth]}`}
                      aria-pressed={isSelected}
                      className="group relative flex h-11 w-11 cursor-pointer flex-col items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a87a]/40 lg:h-10 lg:w-10"
                      style={
                        isSelected
                          ? {
                              background: "#7c1f2d",
                              boxShadow: "0 2px 14px rgba(124,31,45,0.24)",
                            }
                          : undefined
                      }
                    >
                      {!isSelected && (
                        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ background: "rgba(198,168,122,0.12)" }} />
                      )}

                      <span
                        className="relative text-[0.95rem] leading-none lg:text-[0.89rem]"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: isSelected ? "#f5efe4" : "#2d2926",
                          fontWeight: isSelected ? 500 : 400,
                        }}
                      >
                        {cell.day}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Calendar footer */}
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 lg:gap-x-5 lg:px-9 lg:py-4"
              style={{ borderTop: "1px solid rgba(198,168,122,0.18)" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#c6a87a]" />
                <span className="text-[0.62rem] uppercase tracking-[0.16em] text-[#8a6a4a]/65 lg:text-[0.58rem] lg:tracking-[0.18em]">
                  Calendar in preparation
                </span>
              </div>
              <p className="ml-auto shrink-0 text-[0.62rem] uppercase tracking-[0.16em] text-[#8a6a4a]/50 lg:text-[0.58rem] lg:tracking-[0.18em]">
                Schedule pending
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              EVENT DETAIL PANEL
          ══════════════════════════════════════════ */}
          {selected && (
            <div
              ref={detailPanelRef}
              className="overflow-hidden rounded-[1.25rem]"
              style={{
                background: "linear-gradient(155deg,rgba(255,253,248,0.96) 0%,rgba(248,242,232,0.92) 100%)",
                border: "1px solid rgba(198,168,122,0.24)",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.50), 0 10px 44px rgba(110,79,47,0.08), 0 2px 12px rgba(110,79,47,0.04)",
                opacity: panelVisible ? 1 : 0,
                transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 280ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  height: 3,
                  background:
                    "linear-gradient(90deg,rgba(198,168,122,0) 0%,rgba(198,168,122,0.72) 18%,rgba(198,168,122,0.72) 82%,rgba(198,168,122,0) 100%)",
                }}
              />
              <div className="flex h-full flex-col p-7 lg:p-10">
                <div className="flex h-full flex-col">

                  {/* Label */}
                  <div className="mb-7 flex items-center justify-between gap-5">
                    <span className="text-[0.62rem] uppercase tracking-[0.34em] text-[#7c1f2d]">
                      Calendar In Preparation
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[1.85rem] leading-[1.15] text-[#2d2926] lg:text-[1.98rem] lg:leading-[1.12]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Coming Soon
                  </h3>

                  {/* Ornamental rule */}
                  <div className="my-5 h-px w-10 bg-[#c6a87a]/40" />

                  {/* Description */}
                  <p className="max-w-[44ch] text-[1.06rem] leading-[1.88] text-[#5d4d40] lg:text-[1rem] lg:leading-[1.84]">
                    Our event calendar and gathering schedule will be announced shortly.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── SECTION BOTTOM TRANSITION ── */}
      <div aria-hidden="true" className="pointer-events-none relative z-10 pb-8 pt-2 lg:pb-10">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
          <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.44)_22%,rgba(198,168,122,0.44)_78%,rgba(198,168,122,0))]" />
        </div>
      </div>

    </section>
  );
}
