"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const tiers = [
  {
    id: "pearl",
    eyebrow: "Pearl Membership",
    tagline: "Every player begins with a table.",
    duration: "1 Year Membership",
    price: "₹1,000",
    benefits: [
      "Weekly training sessions",
      "IMA membership certificate",
      "Community events and gatherings",
      "Beginner curriculum access",
    ],
    cta: "Buy This Tier",
    accentRgb: "198,168,122",
    panelBorder: "rgba(198,168,122,0.38)",
    tileImage: "/assets/membership/pearl-tile.png",
    dragon: { symbol: "白", label: "White Dragon" },
    tileTheme: {
      bg: "rgba(255,253,248,0.97)",
      border: "rgba(198,168,122,0.55)",
      text: "rgba(138,106,74,0.88)",
      shadow: "rgba(110,79,47,0.10)",
    },
  },
  {
    id: "ruby",
    eyebrow: "Ruby Membership",
    tagline: "For those who return to the table.",
    duration: "5 Year Membership",
    price: "₹4,000",
    benefits: [
      "All Pearl benefits",
      "Priority event registration",
      "Tournament participation rights",
      "Strategy workshops and masterclasses",
      "Ruby member recognition",
    ],
    cta: "Buy This Tier",
    accentRgb: "124,31,45",
    panelBorder: "rgba(124,31,45,0.26)",
    tileImage: "/assets/membership/ruby-tile.png",
    dragon: { symbol: "中", label: "Red Dragon" },
    tileTheme: {
      bg: "rgba(253,248,246,0.97)",
      border: "rgba(124,31,45,0.38)",
      text: "rgba(124,31,45,0.82)",
      shadow: "rgba(124,31,45,0.08)",
    },
  },
  {
    id: "jade",
    eyebrow: "Jade Membership",
    tagline: "For those helping shape the culture.",
    duration: "Lifetime Membership",
    price: "₹10,000",
    benefits: [
      "All Ruby benefits",
      "Lifetime IMA recognition",
      "Cultural heritage committee access",
      "Invitations to founding circle events",
      "Legacy member status",
    ],
    cta: "Buy This Tier",
    accentRgb: "47,93,80",
    panelBorder: "rgba(47,93,80,0.26)",
    tileImage: "/assets/membership/jade-tile.png",
    dragon: { symbol: "發", label: "Green Dragon" },
    tileTheme: {
      bg: "rgba(247,252,250,0.97)",
      border: "rgba(47,93,80,0.38)",
      text: "rgba(47,93,80,0.82)",
      shadow: "rgba(47,93,80,0.08)",
    },
  },
];

type Tier = typeof tiers[number];

function TierPanel({ tier }: { tier: Tier }) {
  return (
    <div
      className="h-full overflow-hidden rounded-[0.75rem] flex flex-col"
      style={{
        border: `1px solid ${tier.panelBorder}`,
        background:
          "linear-gradient(180deg,rgba(252,248,241,0.88) 0%,rgba(248,244,234,0.72) 100%)",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.42), 0 4px 24px rgba(110,79,47,0.08)",
      }}
    >
      {/* Tier accent cap */}
      <div
        style={{
          height: 3,
          flexShrink: 0,
          background: `linear-gradient(90deg,rgba(${tier.accentRgb},0) 0%,rgba(${tier.accentRgb},0.82) 18%,rgba(${tier.accentRgb},0.82) 82%,rgba(${tier.accentRgb},0) 100%)`,
        }}
      />

      <div className="flex flex-col flex-1 items-center px-3 pb-4 pt-3 text-center lg:px-5 lg:pb-5 lg:pt-7">

        {/* PNG tile — 20% larger for more visual presence */}
        <div className="mb-4 relative w-[82px] h-[108px] lg:mb-7">
          <Image
            src={tier.tileImage}
            alt={tier.dragon.label}
            fill
            sizes="82px"
            className="object-contain"
          />
        </div>

        {/* Tier name — increased weight and opacity for legibility */}
        <p
          className="font-medium text-[0.60rem] uppercase tracking-[0.34em]"
          style={{ color: `rgba(${tier.accentRgb},0.92)` }}
        >
          {tier.eyebrow}
        </p>

        {/* Tagline */}
        <p
          className="mt-3 max-w-[22ch] text-[0.98rem] leading-[1.60] text-[#2d2926]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {tier.tagline}
        </p>

        {/* Divider */}
        <div
          className="my-5 h-px w-8"
          style={{ background: `rgba(${tier.accentRgb},0.24)` }}
        />

        {/* Duration */}
        <p className="text-[0.58rem] uppercase tracking-[0.28em] text-[#8a6a4a]">
          {tier.duration}
        </p>

        {/* Price */}
        <p
          className="mt-1.5 text-[1.85rem] leading-tight text-[#2d2926]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {tier.price}
        </p>

        {/* Full-width rule before benefits */}
        <div className="my-5 h-px w-full bg-[rgba(198,168,122,0.14)]" />

        {/* Benefits */}
        <ul className="flex w-full flex-col gap-2.5 text-left">
          {tier.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2.5 text-[0.79rem] leading-[1.55] text-[#4d3a2e]"
            >
              <span
                className="mt-[0.44em] h-px w-3.5 shrink-0"
                style={{ background: `rgba(${tier.accentRgb},0.40)` }}
              />
              {benefit}
            </li>
          ))}
        </ul>

        {/* CTA — wrapper absorbs remaining space via mt-auto; pt-5 gives consistent
            gap above the button without affecting button dimensions */}
        <div className="mt-auto w-full flex justify-center pt-3 lg:pt-5">
          <a
            href="#contact"
            className="flex w-auto items-center justify-center rounded-full border border-[#7c1f2d] bg-[linear-gradient(180deg,#8b2736,#6d1b28)] px-8 py-3 text-[0.70rem] uppercase tracking-[0.22em] text-[#f5efe4] shadow-[0_6px_18px_rgba(124,31,45,0.18)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(124,31,45,0.24)]"
          >
            {tier.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Membership() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const snapPositions = useRef<number[]>([]);
  const isProgrammatic = useRef(false);
  const programmaticTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureSnapPositions = () => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll("[data-card]")) as HTMLElement[];
    const paddingLeft = parseFloat(window.getComputedStyle(container).paddingLeft) || 0;
    snapPositions.current = cards.map((c) => c.offsetLeft - paddingLeft);
  };

  const updateActiveCard = () => {
    const container = carouselRef.current;
    if (!container || !snapPositions.current.length) return;
    const scrollLeft = container.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;
    snapPositions.current.forEach((position, index) => {
      const distance = Math.abs(scrollLeft - position);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    // Re-measure if positions weren't ready at mount (can happen on slow mobile paint)
    if (!snapPositions.current.length) measureSnapPositions();
    if (!snapPositions.current.length) return;
    isProgrammatic.current = true;
    if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
    container.scrollTo({ left: snapPositions.current[index], behavior: "smooth" });
    setActiveIndex(index);
    programmaticTimer.current = setTimeout(() => {
      isProgrammatic.current = false;
      updateActiveCard();
    }, 700);
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    // Defer measurement by one rAF to guarantee layout is complete on mobile
    requestAnimationFrame(measureSnapPositions);

    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (!isProgrammatic.current) updateActiveCard();
      }, 80);
    };

    const onScrollEnd = () => updateActiveCard();

    const onResize = () => {
      measureSnapPositions();
      updateActiveCard();
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(scrollTimer);
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="membership" className="relative overflow-hidden bg-[#f5f0e8]">

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
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-8 sm:px-8 lg:px-16 lg:pb-16 lg:pt-10">
        <div className="mx-auto max-w-2xl text-center">

          {/* Heading — single line on desktop */}
          <h2 className="text-[2.2rem] leading-[1.05] text-[#2d2926] sm:text-[2.8rem] sm:leading-[1.0] lg:whitespace-nowrap lg:text-[3.4rem] lg:leading-[0.95]">
            Choose Your Membership
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-[48ch] text-[0.96rem] leading-[1.88] text-[#5d4d40] lg:mt-8 lg:text-[1.04rem] lg:leading-[1.92]">
            Three ways to gather, learn and belong within the Indian Mahjong Association.
          </p>
        </div>
      </div>

      {/* ── MOBILE: SNAP CAROUSEL ── */}
      <div className="relative z-10 lg:hidden pb-8 pt-2">
        <p className="mb-5 text-center text-[0.58rem] uppercase tracking-[0.28em] text-[#8a6a4a]/50">
          Swipe to explore
        </p>

        {/* items-stretch (flex default) makes all card wrappers the same height as the tallest */}
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory overflow-x-auto gap-4 px-6 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", overflowY: "hidden", touchAction: "pan-x pan-y", WebkitOverflowScrolling: "touch" as any }}
          role="region"
          aria-label="Membership tiers carousel"
        >
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              data-card=""
              data-index={i}
              className="flex-none w-[76vw] snap-start sm:w-[62vw] flex flex-col"
            >
              <TierPanel tier={tier} />
            </div>
          ))}
        </div>

        {/* Arrow navigation — z-50 + pointer-events:auto ensures it sits above all decorative layers */}
        <div
          className="relative mt-6 flex items-center justify-center gap-5"
          style={{ zIndex: 50, pointerEvents: "auto" }}
        >
          <button
            type="button"
            onClick={() => { console.log("LEFT CLICK"); scrollToCard(activeIndex - 1); }}
            onTouchEnd={(e) => { e.preventDefault(); console.log("LEFT TOUCH"); scrollToCard(activeIndex - 1); }}
            disabled={activeIndex === 0}
            aria-label="Previous membership tier"
            style={{ touchAction: "manipulation", pointerEvents: "auto" }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c6a87a]/45 bg-[#fbf7ef]/90 text-[#8a6a4a] shadow-[0_2px_8px_rgba(110,79,47,0.08)] transition-all duration-200 hover:border-[#c6a87a]/80 hover:text-[#5d4534] disabled:opacity-25"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M7 1.5L3 5.5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <span className="text-[0.58rem] uppercase tracking-[0.32em] text-[#8a6a4a]/60">
            {activeIndex + 1} / {tiers.length}
          </span>

          <button
            type="button"
            onClick={() => { console.log("RIGHT CLICK"); scrollToCard(activeIndex + 1); }}
            onTouchEnd={(e) => { e.preventDefault(); console.log("RIGHT TOUCH"); scrollToCard(activeIndex + 1); }}
            disabled={activeIndex === tiers.length - 1}
            aria-label="Next membership tier"
            style={{ touchAction: "manipulation", pointerEvents: "auto" }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c6a87a]/45 bg-[#fbf7ef]/90 text-[#8a6a4a] shadow-[0_2px_8px_rgba(110,79,47,0.08)] transition-all duration-200 hover:border-[#c6a87a]/80 hover:text-[#5d4534] disabled:opacity-25"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M4 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── DESKTOP: THREE PANEL GRID ── */}
      <div className="relative z-10 hidden lg:block">
        <div className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-16">
          {/* CSS Grid stretches all items to the same row height by default */}
          <div className="grid grid-cols-3 gap-8 xl:gap-10 items-stretch">
            {tiers.map((tier) => (
              <TierPanel key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
