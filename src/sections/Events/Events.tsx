"use client";

import { useMemo, useRef, useState } from "react";

// ── TYPES ─────────────────────────────────────────────────────────────────────

type Accent = "burgundy" | "jade" | "gold";

type EventItem = {
  id: string;
  day: number;
  month: number; // 0-indexed
  year: number;
  title: string;
  description: string;
  venue: string;
  time: string;
  eligibility: string;
  seats: number;
  tag: string;
  accent: Accent;
};

// ── EVENT DATA ─────────────────────────────────────────────────────────────────

const EVENTS: EventItem[] = [
  // ── August 2026
  {
    id: "aug-3",
    day: 3, month: 7, year: 2026,
    title: "Bangalore Mahjong Social",
    description: "A private members gathering for strategic play, fine tea and community. Hosted at one of Bangalore's most distinguished clubs.",
    venue: "Bangalore Club, MG Road",
    time: "6:30 PM",
    eligibility: "Members Only",
    seats: 18,
    tag: "Social",
    accent: "jade",
  },
  {
    id: "aug-10",
    day: 10, month: 7, year: 2026,
    title: "Tournament Qualifier — South India",
    description: "The first qualifier round for IMA's annual championship circuit. Compete for a coveted place at the national table.",
    venue: "ITC Windsor Ballroom, Bangalore",
    time: "10:00 AM",
    eligibility: "Ruby & Jade Members",
    seats: 24,
    tag: "Tournament",
    accent: "burgundy",
  },
  {
    id: "aug-16",
    day: 16, month: 7, year: 2026,
    title: "Beginner Mahjong Workshop",
    description: "An immersive introduction to authentic Chinese Mahjong. Guided by IMA's head trainer, Anita Kapoor, from first tile to final hand.",
    venue: "IMA Training Studio, Indiranagar",
    time: "3:00 PM",
    eligibility: "Open to All",
    seats: 12,
    tag: "Workshop",
    accent: "gold",
  },
  {
    id: "aug-21",
    day: 21, month: 7, year: 2026,
    title: "Open Social Night",
    description: "An open evening of casual play and community connection. New and experienced players welcome at the same table.",
    venue: "The Gymkhana Club, New Delhi",
    time: "7:00 PM",
    eligibility: "Open to All",
    seats: 30,
    tag: "Social",
    accent: "gold",
  },
  {
    id: "aug-28",
    day: 28, month: 7, year: 2026,
    title: "Championship Circuit — Round I",
    description: "The opening round of IMA's national championship circuit. A refined and intimate competitive gathering for the association's most senior members.",
    venue: "Oberoi Grand, Kolkata",
    time: "11:00 AM",
    eligibility: "Jade Members Only",
    seats: 8,
    tag: "Tournament",
    accent: "burgundy",
  },
  // ── September 2026
  {
    id: "sep-5",
    day: 5, month: 8, year: 2026,
    title: "Private Member Evening — Mumbai",
    description: "An exclusive gathering for founding circle members. An evening of play, conversation and cultural reflection at one of India's most storied venues.",
    venue: "Taj Mahal Palace, Apollo Bunder",
    time: "7:30 PM",
    eligibility: "Jade Members Only",
    seats: 10,
    tag: "Private",
    accent: "jade",
  },
  {
    id: "sep-12",
    day: 12, month: 8, year: 2026,
    title: "Strategy Masterclass",
    description: "An advanced session covering tile reading, probability and elegant defensive play. Led by Rajesh Mehta, IMA's foremost strategy instructor.",
    venue: "IMA Training Centre, Mumbai",
    time: "4:00 PM",
    eligibility: "Ruby & Jade Members",
    seats: 16,
    tag: "Workshop",
    accent: "burgundy",
  },
  {
    id: "sep-20",
    day: 20, month: 8, year: 2026,
    title: "Heritage Cultural Evening",
    description: "A curated evening celebrating the cultural roots of Mahjong across the Chinese diaspora, with cultural presentation and social play.",
    venue: "Mumbai Club, Churchgate",
    time: "6:00 PM",
    eligibility: "Members Only",
    seats: 22,
    tag: "Cultural",
    accent: "jade",
  },
  {
    id: "sep-27",
    day: 27, month: 8, year: 2026,
    title: "Junior League Invitational",
    description: "IMA's youth outreach event, designed to welcome the next generation to the discipline and artistry of authentic Mahjong.",
    venue: "IMA Studio, Ahmedabad",
    time: "9:00 AM",
    eligibility: "Open to All (Under 25)",
    seats: 40,
    tag: "Youth",
    accent: "gold",
  },
];

// ── CONSTANTS ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const ACCENT: Record<Accent, { hex: string; rgb: string }> = {
  burgundy: { hex: "#7c1f2d", rgb: "124,31,45" },
  jade:     { hex: "#2f5d50", rgb: "47,93,80" },
  gold:     { hex: "#c6a87a", rgb: "198,168,122" },
};

// ── HELPERS ────────────────────────────────────────────────────────────────────

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

function formatEventDate(e: EventItem) {
  return new Date(e.year, e.month, e.day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── COMPONENT ──────────────────────────────────────────────────────────────────

export default function Events() {
  const [viewYear, setViewYear]         = useState(2026);
  const [viewMonth, setViewMonth]       = useState(7); // August
  const [selected, setSelected]         = useState<EventItem | null>(null);
  const [panelVisible, setPanelVisible] = useState(true);
  const detailPanelRef                  = useRef<HTMLDivElement>(null);

  const cells = useMemo(
    () => buildCalendarCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const eventsByDay = useMemo(() => {
    const map = new Map<number, EventItem>();
    EVENTS
      .filter(e => e.year === viewYear && e.month === viewMonth)
      .forEach(e => map.set(e.day, e));
    return map;
  }, [viewYear, viewMonth]);

  const navigateMonth = (dir: -1 | 1) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0)  { m = 11; y -= 1; }
    if (m > 11) { m = 0;  y += 1; }
    setViewMonth(m);
    setViewYear(y);
    // Fade out panel then clear selection
    setPanelVisible(false);
    setTimeout(() => {
      setSelected(null);
      setPanelVisible(true);
    }, 200);
  };

  const handleDayClick = (event: EventItem) => {
    if (event.id === selected?.id) return;
    setPanelVisible(false);
    setTimeout(() => {
      setSelected(event);
      setPanelVisible(true);
      // Mobile only: smooth scroll to detail panel after content loads
      if (window.innerWidth < 1024 && detailPanelRef.current) {
        const top = detailPanelRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <section id="events" className="relative overflow-hidden bg-[#f5f0e8]">

      {/* ── WATERCOLOR BACKGROUND TREATMENT ── z-0, fully isolated from content ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* Layer 1 — watercolor texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/assets/backgrounds/membership-watercolor-bg.png')",
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
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-12 sm:px-8 lg:px-16 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-2xl text-center">

          {/* Eyebrow */}
          <p className="mb-4 text-[0.65rem] uppercase tracking-[0.38em] text-[#7c1f2d] lg:text-[0.68rem] lg:tracking-[0.42em]">
            Community Gatherings
          </p>

          {/* Heading */}
          <h2 className="text-[2.2rem] leading-[1.05] text-[#2d2926] sm:text-[2.8rem] sm:leading-[1.0] lg:text-[3.8rem] lg:leading-[0.95]">
            Events &amp; Gatherings
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-[48ch] text-[0.96rem] leading-[1.88] text-[#5d4d40] lg:mt-8 lg:text-[1.04rem] lg:leading-[1.92]">
            Curated Mahjong socials, tournaments, workshops and private member experiences across India.
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
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-[#c6a87a]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a87a]/40"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M9.5 11.5L5.5 7.5l4-4" stroke="#8a6a4a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p
                className="text-[0.72rem] uppercase tracking-[0.36em] text-[#2d2926]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </p>

              <button
                onClick={() => navigateMonth(1)}
                aria-label="Next month"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-[#c6a87a]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a87a]/40"
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
                  className="py-2 text-center text-[0.56rem] uppercase tracking-[0.2em] text-[#8a6a4a]/55"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-1.5 px-3 pb-5 lg:px-7 lg:pb-9">
              {cells.map((cell, idx) => {
                const event      = cell.current ? eventsByDay.get(cell.day) : undefined;
                const isSelected = !!event && selected?.id === event.id;
                const accent     = event ? ACCENT[event.accent] : null;

                // Hidden: other-month filler days
                if (!cell.current) {
                  return <div key={idx} aria-hidden="true" className="h-10 w-full" />;
                }

                // Non-event current-month day
                if (!event) {
                  return (
                    <div key={idx} className="flex justify-center">
                      <div className="flex h-10 w-10 items-center justify-center">
                        <span
                          className="text-[0.82rem] leading-none text-[#2d2926]/35"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {cell.day}
                        </span>
                      </div>
                    </div>
                  );
                }

                // Event day
                return (
                  <div key={idx} className="flex justify-center">
                    <button
                      onClick={() => handleDayClick(event)}
                      aria-label={`${cell.day} ${MONTH_NAMES[viewMonth]}: ${event.title}`}
                      aria-pressed={isSelected}
                      className="group relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a87a]/40"
                      style={
                        isSelected
                          ? {
                              background: "#7c1f2d",
                              boxShadow: "0 2px 14px rgba(124,31,45,0.24)",
                            }
                          : undefined
                      }
                    >
                      {/* Gold hover ring — shows on hover unless selected */}
                      {!isSelected && (
                        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ background: "rgba(198,168,122,0.12)" }} />
                      )}

                      <span
                        className="relative text-[0.82rem] leading-none"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: isSelected ? "#f5efe4" : "#2d2926",
                          fontWeight: isSelected ? 500 : 400,
                        }}
                      >
                        {cell.day}
                      </span>

                      {/* Accent dot — hidden when selected */}
                      {!isSelected && (
                        <span
                          className="absolute bottom-[5px] h-[3px] w-[3px] rounded-full"
                          style={{ background: accent!.hex }}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Calendar footer legend */}
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 lg:gap-x-5 lg:px-9 lg:py-4"
              style={{ borderTop: "1px solid rgba(198,168,122,0.18)" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#2f5d50]" />
                <span className="text-[0.54rem] uppercase tracking-[0.18em] text-[#8a6a4a]/60">
                  Social
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#7c1f2d]" />
                <span className="text-[0.54rem] uppercase tracking-[0.18em] text-[#8a6a4a]/60">
                  Tournament
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#c6a87a]" />
                <span className="text-[0.54rem] uppercase tracking-[0.18em] text-[#8a6a4a]/60">
                  Workshop
                </span>
              </div>
              <p className="ml-auto shrink-0 text-[0.54rem] uppercase tracking-[0.18em] text-[#8a6a4a]/45">
                {eventsByDay.size} {eventsByDay.size === 1 ? "event" : "events"}
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              EVENT DETAIL PANEL
          ══════════════════════════════════════════ */}
          <div
            ref={detailPanelRef}
            className="rounded-[1.25rem] overflow-hidden"
            style={{
              background: "linear-gradient(155deg,rgba(255,253,248,0.95) 0%,rgba(248,242,232,0.91) 100%)",
              border: "1px solid rgba(198,168,122,0.22)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.48), 0 8px 40px rgba(110,79,47,0.07), 0 2px 12px rgba(110,79,47,0.04)",
              minHeight: "460px",
            }}
          >
            <div
              className="flex h-full flex-col p-8 lg:p-10"
              style={{
                opacity: panelVisible ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >

              {/* ── Empty state ── */}
              {!selected && (
                <div className="flex flex-1 flex-col items-center justify-center gap-7 text-center">
                  <div
                    className="select-none text-[4.5rem] leading-none"
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "rgba(198,168,122,0.16)",
                    }}
                  >
                    雀
                  </div>
                  <div>
                    <p
                      className="text-[1.08rem] leading-snug text-[#2d2926]/45"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Select an event date
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-relaxed text-[#8a6a4a]/50">
                      to explore details
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-[rgba(198,168,122,0.28)]" />
                    <div className="h-[3px] w-[3px] rounded-full bg-[#c6a87a]/40" />
                    <div className="h-px w-8 bg-[rgba(198,168,122,0.28)]" />
                  </div>
                </div>
              )}

              {/* ── Event detail ── */}
              {selected && (
                <div className="flex h-full flex-col">

                  {/* Tag + Date row */}
                  <div className="mb-7 flex items-center justify-between">
                    <span
                      className="text-[0.58rem] uppercase tracking-[0.34em]"
                      style={{ color: ACCENT[selected.accent].hex }}
                    >
                      {selected.tag}
                    </span>
                    <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[#8a6a4a]/55">
                      {formatEventDate(selected)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[1.6rem] leading-[1.15] text-[#2d2926] lg:text-[1.8rem]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {selected.title}
                  </h3>

                  {/* Ornamental rule */}
                  <div
                    className="my-5 h-px w-10"
                    style={{ background: `rgba(${ACCENT[selected.accent].rgb},0.36)` }}
                  />

                  {/* Description */}
                  <p className="max-w-[44ch] text-[0.93rem] leading-[1.9] text-[#5d4d40]">
                    {selected.description}
                  </p>

                  {/* Details grid */}
                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* Venue — full width */}
                    <div className="sm:col-span-2">
                      <p className="mb-1 text-[0.54rem] uppercase tracking-[0.28em] text-[#8a6a4a]/55">
                        Venue
                      </p>
                      <p className="text-[0.88rem] leading-snug text-[#2d2926]">
                        {selected.venue}
                      </p>
                    </div>

                    {/* Time */}
                    <div>
                      <p className="mb-1 text-[0.54rem] uppercase tracking-[0.28em] text-[#8a6a4a]/55">
                        Time
                      </p>
                      <p className="text-[0.88rem] leading-snug text-[#2d2926]">
                        {selected.time}
                      </p>
                    </div>

                    {/* Eligibility */}
                    <div>
                      <p className="mb-1 text-[0.54rem] uppercase tracking-[0.28em] text-[#8a6a4a]/55">
                        Eligibility
                      </p>
                      <p className="text-[0.88rem] leading-snug text-[#2d2926]">
                        Inclusive with Any Membership
                      </p>
                    </div>

                    {/* Seats */}
                    <div>
                      <p className="mb-1 text-[0.54rem] uppercase tracking-[0.28em] text-[#8a6a4a]/55">
                        Availability
                      </p>
                      <p
                        className="text-[0.88rem] leading-snug"
                        style={{ color: selected.seats <= 10 ? "#7c1f2d" : "#2d2926" }}
                      >
                        {selected.seats} {selected.seats === 1 ? "seat" : "seats"} remaining
                        {selected.seats <= 10 && (
                          <span className="ml-2 text-[0.54rem] uppercase tracking-[0.18em] text-[#7c1f2d]/70">
                            · Limited
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mt-8 h-px bg-[rgba(198,168,122,0.16)]" />

                  {/* CTA */}
                  <div className="mt-7">
                    <a
                      href="#contact"
                      className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#7c1f2d] bg-[linear-gradient(180deg,#8b2736,#6d1b28)] px-7 py-3 text-[0.70rem] uppercase tracking-[0.22em] text-[#f5efe4] shadow-[0_6px_18px_rgba(124,31,45,0.18)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(124,31,45,0.26)]"
                    >
                      Reserve Seat
                      <svg
                        width="13"
                        height="9"
                        viewBox="0 0 13 9"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M1 4.5h11M8 1l3.5 3.5L8 8"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

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
