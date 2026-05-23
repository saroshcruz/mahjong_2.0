"use client";

import { useCallback, useEffect, useRef, useState, ReactNode } from "react";

// ── TYPES ──────────────────────────────────────────────────────────────────────

type SceneId = "beginning" | "community" | "craft" | "gatherings" | "culture" | "future";

type Chapter = {
  index: number;
  id: string;
  title: string;
  scene: SceneId;
  body: string;
  imageStyle: "portrait" | "landscape";
};

// ── CHAPTER DATA ───────────────────────────────────────────────────────────────

const CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "01",
    title: "The Beginning",
    scene: "beginning",
    body: "Mahjong found quiet but passionate communities across India — bringing together strategy, patience and meaningful social connection at tables that felt like home.",
    imageStyle: "portrait",
  },
  {
    index: 1,
    id: "02",
    title: "The Community",
    scene: "community",
    body: "Across homes, clubs and private circles, Mahjong evolved into something deeper — a shared ritual of learning, gathering and connection.",
    imageStyle: "landscape",
  },
  {
    index: 2,
    id: "03",
    title: "The Craft",
    scene: "craft",
    body: "Learning Mahjong is a journey of patience and mastery. Through mentorship and structured learning, players deepen strategy and appreciation for the game.",
    imageStyle: "portrait",
  },
  {
    index: 3,
    id: "04",
    title: "The Gatherings",
    scene: "gatherings",
    body: "Tournaments, socials and curated gatherings create spaces for players to connect, compete and celebrate Mahjong together.",
    imageStyle: "landscape",
  },
  {
    index: 4,
    id: "05",
    title: "The Culture",
    scene: "culture",
    body: "Mahjong is more than a game — it is memory, conversation, patience and meaningful human connection.",
    imageStyle: "portrait",
  },
  {
    index: 5,
    id: "06",
    title: "The Future",
    scene: "future",
    body: "The Indian Mahjong Association exists to preserve tradition while building a modern, welcoming and elevated home for Mahjong in India.",
    imageStyle: "landscape",
  },
];

// ── SCENE PALETTES ─────────────────────────────────────────────────────────────

const SCENE_CONFIG: Record<SceneId, { gradient: string; symbol: string; symbolColor: string; capColor: string }> = {
  beginning:  { gradient: "linear-gradient(145deg,rgba(252,247,238,0.97) 0%,rgba(198,168,122,0.14) 50%,rgba(47,93,80,0.07) 100%)",   symbol: "牌", symbolColor: "rgba(198,168,122,0.13)", capColor: "rgba(198,168,122,0.55)" },
  community:  { gradient: "linear-gradient(145deg,rgba(248,252,250,0.96) 0%,rgba(47,93,80,0.12) 45%,rgba(198,168,122,0.09) 100%)",   symbol: "聚", symbolColor: "rgba(47,93,80,0.11)",   capColor: "rgba(47,93,80,0.45)"  },
  craft:      { gradient: "linear-gradient(145deg,rgba(252,248,245,0.97) 0%,rgba(124,31,45,0.07) 42%,rgba(198,168,122,0.12) 100%)",  symbol: "雀", symbolColor: "rgba(124,31,45,0.09)",  capColor: "rgba(124,31,45,0.40)" },
  gatherings: { gradient: "linear-gradient(145deg,rgba(250,247,240,0.96) 0%,rgba(198,168,122,0.16) 40%,rgba(47,93,80,0.08) 100%)",   symbol: "会", symbolColor: "rgba(198,168,122,0.12)", capColor: "rgba(198,168,122,0.50)" },
  culture:    { gradient: "linear-gradient(145deg,rgba(248,250,252,0.96) 0%,rgba(47,93,80,0.10) 42%,rgba(198,168,122,0.10) 100%)",   symbol: "道", symbolColor: "rgba(47,93,80,0.10)",   capColor: "rgba(47,93,80,0.42)"  },
  future:     { gradient: "linear-gradient(145deg,rgba(248,252,250,0.95) 0%,rgba(47,93,80,0.12) 38%,rgba(198,168,122,0.15) 100%)",   symbol: "發", symbolColor: "rgba(47,93,80,0.11)",   capColor: "rgba(47,93,80,0.48)"  },
};

// ── CATMULL-ROM PATH BUILDER ───────────────────────────────────────────────────

function buildCatmullRom(pts: { x: number; y: number }[], alpha = 0.45): string {
  if (pts.length < 2) return "";
  const ext = [
    { x: pts[0].x * 2 - pts[1].x, y: pts[0].y * 2 - pts[1].y },
    ...pts,
    { x: pts[pts.length - 1].x * 2 - pts[pts.length - 2].x, y: pts[pts.length - 1].y * 2 - pts[pts.length - 2].y },
  ];
  const f = (n: number) => (Math.round(n * 10) / 10).toFixed(1);
  let d = `M ${f(pts[0].x)},${f(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = ext[i], p1 = ext[i + 1], p2 = ext[i + 2], p3 = ext[i + 3];
    const cp1x = p1.x + (p2.x - p0.x) * alpha / 3;
    const cp1y = p1.y + (p2.y - p0.y) * alpha / 3;
    const cp2x = p2.x - (p3.x - p1.x) * alpha / 3;
    const cp2y = p2.y - (p3.y - p1.y) * alpha / 3;
    d += ` C ${f(cp1x)},${f(cp1y)} ${f(cp2x)},${f(cp2y)} ${f(p2.x)},${f(p2.y)}`;
  }
  return d;
}

// ── SCROLL REVEAL ──────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: visible ? `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` : "none",
      }}
    >
      {children}
    </div>
  );
}

// ── SCENE PLACEHOLDER ──────────────────────────────────────────────────────────

function ScenePlaceholder({ scene, style }: { scene: SceneId; style: "portrait" | "landscape" }) {
  const cfg = SCENE_CONFIG[scene];
  const dims = style === "portrait"
    ? "w-[148px] aspect-[3/4]"
    : "w-[188px] aspect-[4/3]";

  return (
    <div
      className={`relative overflow-hidden rounded-[0.5rem] shrink-0 ${dims}`}
      style={{
        background: cfg.gradient,
        border: "1px solid rgba(198,168,122,0.20)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.46), 0 8px 32px rgba(110,79,47,0.08), 0 2px 10px rgba(110,79,47,0.04)",
      }}
    >
      {/* Paper grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(138,106,74,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(138,106,74,0.04) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Accent cap */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1.5px]" style={{ background: `linear-gradient(90deg,transparent,${cfg.capColor},transparent)` }} />
      {/* Ghost character */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: style === "portrait" ? "4.5rem" : "4rem",
          lineHeight: 1,
          color: cfg.symbolColor,
          bottom: "-0.1em",
          right: "-0.05em",
        }}
      >
        {cfg.symbol}
      </span>
      {/* Bottom fade */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(0deg,rgba(245,239,228,0.30),transparent)" }} />
    </div>
  );
}

// ── CHAPTER NODE ───────────────────────────────────────────────────────────────

function ChapterNode({
  chapter,
  anchorRef,
  offset = false,
  imageFirst = true,
}: {
  chapter: Chapter;
  anchorRef: (el: HTMLDivElement | null) => void;
  offset?: boolean;
  imageFirst?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-5 ${offset ? "lg:pt-12" : ""}`}>

      {/* Anchor dot row — stable position, no reveal animation */}
      <div className="flex items-center gap-3">
        <div
          ref={anchorRef}
          className="h-2 w-2 shrink-0 rounded-full"
          style={{
            background: "rgba(47,93,80,0.5)",
            boxShadow: "0 0 0 3px rgba(47,93,80,0.12)",
          }}
        />
        <span className="text-[0.52rem] uppercase tracking-[0.34em] text-[#8a6a4a]/50">
          {chapter.id}
        </span>
        <div className="h-px flex-1 bg-[rgba(198,168,122,0.28)]" />
      </div>

      {/* Image — above or below text depending on imageFirst */}
      {imageFirst && (
        <Reveal delay={80}>
          <ScenePlaceholder scene={chapter.scene} style={chapter.imageStyle} />
        </Reveal>
      )}

      {/* Text content */}
      <Reveal delay={imageFirst ? 160 : 80}>
        <div>
          <h3
            className="mb-3 text-[1.18rem] leading-[1.25] text-[#2d2926] lg:text-[1.28rem]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {chapter.title}
          </h3>
          <div className="mb-3.5 h-px w-7" style={{ background: `linear-gradient(90deg,${SCENE_CONFIG[chapter.scene].capColor.replace(/,[^,)]+\)/, ",0.55)")},transparent)` }} />
          <p className="text-[0.88rem] leading-[1.88] text-[#5d4d40]">{chapter.body}</p>
        </div>
      </Reveal>

      {!imageFirst && (
        <Reveal delay={200}>
          <ScenePlaceholder scene={chapter.scene} style={chapter.imageStyle} />
        </Reveal>
      )}
    </div>
  );
}

// ── MAIN SECTION ───────────────────────────────────────────────────────────────

export default function Story() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const nodeRefs      = useRef<Array<HTMLDivElement | null>>(Array(6).fill(null));
  const [pathD, setPathD]     = useState("");
  const [svgBox, setSvgBox]   = useState({ w: 0, h: 0 });

  // The serpentine journey order for path calculation:
  // nodeRefs[0]=ch01(left,row1) → [1]=ch02(center,row1) → [2]=ch03(right,row1)
  //           → [3]=ch04(right,row2) → [4]=ch05(center,row2) → [5]=ch06(left,row2)
  // Row 2 is rendered as [ch06, ch05, ch04] (flex-row-reverse visual order)

  const buildPath = useCallback(() => {
    const container = containerRef.current;
    const nodes = nodeRefs.current;
    if (!container || nodes.some(n => !n)) return;

    const { left: cL, top: cT, width: cW, height: cH } = container.getBoundingClientRect();
    const pts = nodes.map(n => {
      const r = n!.getBoundingClientRect();
      return { x: r.left + r.width / 2 - cL, y: r.top + r.height / 2 - cT };
    });

    setPathD(buildCatmullRom(pts, 0.45));
    setSvgBox({ w: cW, h: cH });
  }, []);

  useEffect(() => {
    const id = setTimeout(buildPath, 150);
    const onResize = () => { clearTimeout(id); buildPath(); };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(id); window.removeEventListener("resize", onResize); };
  }, [buildPath]);

  return (
    <section id="story" className="relative overflow-hidden bg-[#f5efe4]">

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[12%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(47,93,80,0.04),rgba(47,93,80,0)_62%)]" />
        <div className="absolute right-[-8rem] bottom-[8%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(124,31,45,0.04),rgba(124,31,45,0)_60%)]" />
        <div className="absolute left-[40%] top-[40%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(198,168,122,0.05),rgba(198,168,122,0)_64%)]" />
      </div>

      {/* ── SECTION INTRO ── */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-8 lg:px-16 lg:pb-20 lg:pt-16">
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-8 lg:mb-10">
              <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.44)_22%,rgba(198,168,122,0.44)_78%,rgba(198,168,122,0))]" />
            </div>
            <p className="mb-4 text-[0.65rem] uppercase tracking-[0.38em] text-[#7c1f2d] lg:text-[0.68rem] lg:tracking-[0.42em]">
              The Journey
            </p>
            <h2 className="text-[2.2rem] leading-[1.05] text-[#2d2926] sm:text-[2.8rem] sm:leading-[1.0] lg:text-[3.8rem] lg:leading-[0.95]">
              A Modern Home for<br className="hidden lg:block" /> Mahjong in India
            </h2>
            <p className="mt-6 max-w-[46ch] text-[0.96rem] leading-[1.88] text-[#5d4d40] lg:mt-8 lg:text-[1.04rem] lg:leading-[1.92]">
              Preserving tradition, cultivating community and shaping the future of Mahjong across India.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── CHAPTER AREA ── */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-16 lg:pb-28">

        {/* ─── DESKTOP: SERPENTINE GRID ─── */}
        <div ref={containerRef} className="relative hidden lg:block">

          {/* SVG connecting path — sits behind the nodes */}
          {pathD && (
            <svg
              className="pointer-events-none absolute inset-0 overflow-visible"
              width={svgBox.w}
              height={svgBox.h}
              aria-hidden="true"
            >
              {/* Soft glow layer */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(47,93,80,0.12)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Main path */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(47,93,80,0.32)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Node junction circles */}
              {nodeRefs.current.map((n, i) => {
                if (!n || !containerRef.current) return null;
                const cRect = containerRef.current.getBoundingClientRect();
                const nRect = n.getBoundingClientRect();
                const cx = nRect.left + nRect.width / 2 - cRect.left;
                const cy = nRect.top + nRect.height / 2 - cRect.top;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="rgba(47,93,80,0.55)"
                    stroke="rgba(245,239,228,0.9)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          )}

          {/* Row 1: ch01 | ch02 | ch03 — left to right */}
          <div className="mb-20 grid grid-cols-3 gap-10 xl:gap-14">
            <ChapterNode chapter={CHAPTERS[0]} anchorRef={el => { nodeRefs.current[0] = el; }} offset={false} imageFirst={true}  />
            <ChapterNode chapter={CHAPTERS[1]} anchorRef={el => { nodeRefs.current[1] = el; }} offset={true}  imageFirst={false} />
            <ChapterNode chapter={CHAPTERS[2]} anchorRef={el => { nodeRefs.current[2] = el; }} offset={false} imageFirst={true}  />
          </div>

          {/* Row 2: ch06 | ch05 | ch04 — reversed visually so journey continues right→left */}
          <div className="grid grid-cols-3 gap-10 xl:gap-14">
            {/* Column 1 (left): ch06 — nodeRefs[5] */}
            <ChapterNode chapter={CHAPTERS[5]} anchorRef={el => { nodeRefs.current[5] = el; }} offset={true}  imageFirst={false} />
            {/* Column 2 (center): ch05 — nodeRefs[4] */}
            <ChapterNode chapter={CHAPTERS[4]} anchorRef={el => { nodeRefs.current[4] = el; }} offset={false} imageFirst={true}  />
            {/* Column 3 (right): ch04 — nodeRefs[3] */}
            <ChapterNode chapter={CHAPTERS[3]} anchorRef={el => { nodeRefs.current[3] = el; }} offset={true}  imageFirst={false} />
          </div>

        </div>

        {/* ─── MOBILE: VERTICAL STACK WITH LEFT CONNECTOR ─── */}
        <div className="relative lg:hidden">

          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            className="absolute left-[0.4375rem] top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(180deg,rgba(47,93,80,0) 0%,rgba(47,93,80,0.30) 8%,rgba(47,93,80,0.30) 92%,rgba(47,93,80,0) 100%)" }}
          />

          <div className="flex flex-col gap-12">
            {CHAPTERS.map((ch, i) => (
              <Reveal key={ch.id} delay={0}>
                <div className="flex gap-5">

                  {/* Left: dot on the vertical line */}
                  <div className="flex flex-col items-center pt-1 shrink-0">
                    <div
                      className="h-[0.875rem] w-[0.875rem] rounded-full shrink-0 z-10 relative"
                      style={{
                        background: "rgba(47,93,80,0.48)",
                        boxShadow: "0 0 0 3px rgba(245,239,228,1), 0 0 0 5px rgba(47,93,80,0.15)",
                      }}
                    />
                  </div>

                  {/* Right: chapter content */}
                  <div className="flex flex-col gap-4 pb-2 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[0.52rem] uppercase tracking-[0.32em] text-[#8a6a4a]/55">
                        {ch.id}
                      </span>
                      <div className="h-px w-6 bg-[rgba(198,168,122,0.35)]" />
                    </div>

                    {i % 2 === 0 && <ScenePlaceholder scene={ch.scene} style={ch.imageStyle} />}

                    <div>
                      <h3
                        className="mb-2.5 text-[1.15rem] leading-snug text-[#2d2926]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {ch.title}
                      </h3>
                      <div className="mb-3 h-px w-6 bg-[rgba(198,168,122,0.44)]" />
                      <p className="text-[0.88rem] leading-[1.88] text-[#5d4d40]">{ch.body}</p>
                    </div>

                    {i % 2 !== 0 && <ScenePlaceholder scene={ch.scene} style={ch.imageStyle} />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>

      {/* ── BOTTOM TRANSITION ── */}
      <div aria-hidden="true" className="pointer-events-none pb-8 pt-2 lg:pb-10">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
          <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.44)_22%,rgba(198,168,122,0.44)_78%,rgba(198,168,122,0))]" />
        </div>
      </div>

    </section>
  );
}
