import Image from "next/image";

const featured = {
  name: "Anita Kapoor",
  role: "Head Trainer",
  location: "New Delhi",
  story:
    "Anita has been practicing authentic Chinese Mahjong for over two decades, training under IMA's founding circle. She brings together strategic depth and cultural warmth in every session, guiding students from their very first tile through to their first tournament.",
  specialisations: ["Beginner Mahjong", "Strategy & Scoring", "Tournament Preparation"],
};

const supporting = [
  {
    name: "Rajesh Mehta",
    role: "Strategy Instructor",
    location: "Mumbai",
    description:
      "A competitive player turned educator, Rajesh specialises in the strategic dimensions of the game: tile reading, probability, and elegant defensive play.",
    specialty: "Advanced Strategy",
  },
  {
    name: "Priya Singh",
    role: "Beginner Programme Lead",
    location: "Bengaluru",
    description:
      "Priya runs IMA's beginner curriculum with patience and precision. Her sessions make the game feel immediately welcoming to newcomers of all ages.",
    specialty: "Beginner Mahjong",
  },
  {
    name: "Kavita Sharma",
    role: "Community Trainer",
    location: "Chennai",
    description:
      "Kavita brings the spirit of companionship to every table. She leads community sessions that honour the social and cultural roots of the game.",
    specialty: "Cultural Mahjong",
  },
  {
    name: "Deepak Bose",
    role: "Cultural Heritage Instructor",
    location: "Kolkata",
    description:
      "Drawing on Kolkata's historic connection to Chinese culture, Deepak teaches Mahjong within its authentic historical and cultural context.",
    specialty: "Heritage & Tradition",
  },
  {
    name: "Meera Nair",
    role: "Tournament Coach",
    location: "Kochi",
    description:
      "A seasoned tournament player with multiple regional titles, Meera prepares students for competitive play through rigorous pattern recognition and mental endurance training.",
    specialty: "Competitive Play",
  },
  {
    name: "Arjun Patel",
    role: "Youth Programme Instructor",
    location: "Ahmedabad",
    description:
      "Arjun has pioneered IMA's youth outreach initiative, designing age-appropriate curricula that introduce the next generation to the art and discipline of authentic Mahjong.",
    specialty: "Youth Education",
  },
];

function PortraitPlaceholder({
  initial,
  width,
  height,
}: {
  initial: string;
  width: number;
  height: number;
}) {
  return (
    <div
      style={{
        filter:
          "drop-shadow(0 20px 44px rgba(60,40,18,0.09)) drop-shadow(0 4px 12px rgba(60,40,18,0.05))",
      }}
    >
      <div
        style={{
          width,
          height,
          background: [
            "radial-gradient(ellipse 42% 34% at 50% 26%, rgba(138,106,74,0.22) 0%, transparent 62%)",
            "radial-gradient(ellipse 52% 58% at 50% 63%, rgba(138,106,74,0.13) 0%, transparent 66%)",
            "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(198,168,122,0.10) 0%, rgba(245,239,228,0) 76%)",
          ].join(", "),
          maskImage:
            "radial-gradient(ellipse 82% 88% at 50% 38%, black 16%, rgba(0,0,0,0.62) 44%, rgba(0,0,0,0.18) 64%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 82% 88% at 50% 38%, black 16%, rgba(0,0,0,0.62) 44%, rgba(0,0,0,0.18) 64%, transparent 82%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: Math.round(height * 0.28),
            lineHeight: 1,
            color: "rgba(124,31,45,0.14)",
            userSelect: "none",
          }}
        >
          {initial}
        </span>
      </div>
    </div>
  );
}

export default function Trainers() {
  return (
    <section id="trainers" className="relative overflow-hidden bg-[#f5efe4]">

      {/* Ambient atmosphere — jade wash from left, burgundy glow from right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[6%] h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(47,93,80,0.05),rgba(47,93,80,0)_62%)]" />
        <div className="absolute right-[-6rem] top-[20%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(124,31,45,0.05),rgba(124,31,45,0)_60%)]" />
      </div>

      {/* ── SECTION INTRO ── */}
      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-16 sm:px-8 lg:px-16 lg:pb-16 lg:pt-20">
        <div className="mx-auto max-w-2xl text-center">

          {/* Divider */}
          <div className="mb-8 lg:mb-10">
            <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.44)_22%,rgba(198,168,122,0.44)_78%,rgba(198,168,122,0))]" />
          </div>

          {/* Heading */}
          <h2 className="text-[2.2rem] leading-[1.05] text-[#2d2926] sm:text-[2.8rem] sm:leading-[1.0] lg:text-[3.8rem] lg:leading-[0.95]">
            Meet Our Trainers
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-[48ch] text-[0.96rem] leading-[1.88] text-[#5d4d40] lg:mt-8 lg:text-[1.04rem] lg:leading-[1.92]">
            Learn from experienced Mahjong practitioners, teachers, and community builders
            rooted in authentic Chinese Mahjong culture.
          </p>
        </div>
      </div>

      {/* ── FEATURED TRAINER ── */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-16 lg:pb-20">
        <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">

          {/* Portrait — Vineeta image used temporarily for visual direction test */}
          <div className="flex justify-center lg:justify-end">
            <div
              style={{
                filter:
                  "drop-shadow(0 20px 44px rgba(60,40,18,0.11)) drop-shadow(0 6px 14px rgba(60,40,18,0.06))",
              }}
            >
              <div
                className="relative"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 78% 86% at 52% 42%, black 22%, rgba(0,0,0,0.75) 46%, rgba(0,0,0,0.28) 66%, transparent 82%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 78% 86% at 52% 42%, black 22%, rgba(0,0,0,0.75) 46%, rgba(0,0,0,0.28) 66%, transparent 82%)",
                }}
              >
                <Image
                  src="/assets/founder/Vineeta.jpeg"
                  alt={featured.name}
                  width={196}
                  height={261}
                  className="h-auto w-[133px] object-cover object-[center_18%] sm:w-[161px] lg:w-[189px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,rgba(248,238,218,0.10),rgba(248,238,218,0.04)_60%,transparent_82%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-[linear-gradient(0deg,rgba(245,239,228,0.72),rgba(245,239,228,0.18)_55%,transparent)]"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Name */}
            <h3 className="text-[1.9rem] leading-tight text-[#2d2926] lg:text-[2.4rem]">
              {featured.name}
            </h3>

            {/* Role · Location */}
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#8a6a4a]">
              {featured.role}&ensp;·&ensp;{featured.location}
            </p>

            {/* Ornamental rule */}
            <div className="my-5 h-px w-10 bg-[#c6a87a]/40" />

            {/* Story */}
            <p className="max-w-[44ch] text-[0.97rem] leading-[1.92] text-[#5d4d40]">
              {featured.story}
            </p>

          </div>
        </div>
      </div>

      {/* ── DIVIDER BETWEEN FEATURED AND SUPPORTING ── */}
      <div aria-hidden="true" className="pointer-events-none mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
        <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.32)_28%,rgba(198,168,122,0.32)_72%,rgba(198,168,122,0))]" />
      </div>

      {/* ── SUPPORTING TRAINERS ── */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 sm:px-8 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
          {supporting.map((trainer) => (
            <div
              key={trainer.name}
              className="flex flex-col items-start text-left"
            >
              {/* Portrait */}
              <PortraitPlaceholder initial={trainer.name[0]} width={150} height={192} />

              {/* Name */}
              <h3 className="mt-5 text-[1.25rem] leading-snug text-[#2d2926]">
                {trainer.name}
              </h3>

              {/* Role · Location */}
              <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
                {trainer.role}&ensp;·&ensp;{trainer.location}
              </p>

              {/* Ornamental rule */}
              <div className="my-4 h-px w-8 bg-[#c6a87a]/36" />

              {/* Description */}
              <p className="max-w-[38ch] text-justify text-[0.91rem] leading-[1.86] text-[#5d4d40]">
                {trainer.description}
              </p>

              {/* Specialty */}
              <p className="mt-4 text-[0.6rem] uppercase tracking-[0.28em] text-[#8a6a4a]/80">
                {trainer.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION BOTTOM TRANSITION ── */}
      <div aria-hidden="true" className="pointer-events-none pb-8 pt-2 lg:pb-10">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
          <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.44)_22%,rgba(198,168,122,0.44)_78%,rgba(198,168,122,0))]" />
        </div>
      </div>

    </section>
  );
}
