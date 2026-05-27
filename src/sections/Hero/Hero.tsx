const heroLinks = [
  { href: "#membership", label: "Membership" },
  { href: "#trainers", label: "Trainers" },
  { href: "#events", label: "Events" },
];

function HeroButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap">
      {heroLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="inline-flex min-h-12 min-w-[11rem] items-center justify-center rounded-full border px-7 py-3 text-[0.72rem] uppercase tracking-[0.20em] transition-all duration-300 hover:-translate-y-px hover:bg-[rgba(138,106,74,0.26)] hover:text-[#2d2926] lg:min-h-0 lg:min-w-[10.5rem] lg:px-6 lg:text-[0.70rem] lg:tracking-[0.22em]"
          style={{
            borderColor: "rgba(198,168,122,0.46)",
            background:
              "linear-gradient(180deg,rgba(138,106,74,0.20) 0%,rgba(138,106,74,0.14) 100%)",
            color: "#4d3a2e",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.28), 0 4px 18px rgba(110,79,47,0.06)",
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f5efe4]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/backgrounds/membership-watercolor-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            opacity: 0.42,
          }}
        />
        <div className="absolute left-[-8rem] top-[4%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(47,93,80,0.05),rgba(47,93,80,0)_62%)]" />
        <div className="absolute right-[-6rem] top-[12%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(124,31,45,0.05),rgba(124,31,45,0)_60%)]" />
        <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,#f5efe4,rgba(245,239,228,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,#f5efe4,rgba(245,239,228,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-7 pb-18 pt-14 text-center sm:px-8 lg:px-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-[0.66rem] uppercase tracking-[0.32em] text-[#7c1f2d] lg:mb-6 lg:text-[0.68rem] lg:tracking-[0.42em]">
            Preserving Tradition
          </p>

          <h1 className="text-[2.75rem] leading-[1.0] text-[#2d2926] sm:text-[3.8rem] sm:leading-[0.94] lg:text-[5.4rem] lg:leading-[0.9]">
            INDIAN MAHJONG
            <br />
            ASSOCIATION
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3 lg:mt-8">
            <div className="h-px w-8 bg-[#c6a87a]/40" />
            <div className="h-[3px] w-[3px] rounded-full bg-[#c6a87a]" />
            <div className="h-px w-8 bg-[#c6a87a]/40" />
          </div>

          <p className="mx-auto mt-6 max-w-[44ch] text-[1rem] leading-[1.94] text-[#5d4d40] lg:mt-8 lg:text-[1.04rem] lg:leading-[1.92]">
            A modern home for Mahjong in India, cultivating community, learning
            and meaningful play.
          </p>

          <div className="mt-8 lg:mt-10">
            <HeroButtons />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none pb-8 pt-2 lg:pb-10">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
          <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.44)_22%,rgba(198,168,122,0.44)_78%,rgba(198,168,122,0))]" />
        </div>
      </div>
    </section>
  );
}
