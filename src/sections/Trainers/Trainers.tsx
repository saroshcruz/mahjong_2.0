import Image from "next/image";

const featured = {
  name: "Vineeta Sahni",
  role: "Head Trainer",
  story:
    "Vineeta Sahni has been practicing authentic Chinese Mahjong for over two decades, training under IMA's founding circle. She brings together strategic depth and cultural warmth in every session, guiding students from their very first tile through to their first tournament.",
  specialisations: ["Beginner Mahjong", "Strategy & Scoring", "Tournament Preparation"],
};

const supporting = [
  {
    name: "Kavita Ranade",
    role: "Mahjong Trainer",
    image: "/assets/trainers/kavita.webp",
    imagePosition: "center 28%",
    description:
      "For over 14 years, Mahjong has been more than a game-it has been a passion. Today, I focus on teaching its rich strategy while helping grow a vibrant and connected Mahjong community.",
    specialty: "Player Development",
  },
  {
    name: "Alka Talwar",
    role: "Mahjong Trainer",
    image: "/assets/trainers/alka.webp",
    description:
      "For over 12 years, Mahjong has brought me friendships, community, and joy. I teach with patience and passion, helping students enjoy every stage of their learning journey in the comfort of their homes.",
    specialty: "PLAYER DEVELOPMENT",
  },
  {
    name: "Sonia Jaidka",
    role: "Mahjong Trainer",
    image: "/assets/trainers/Sonia.webp",
    description:
      "With over 12 years of Mahjong experience, I am a patient and dedicated trainer. I enjoy guiding beginners and experienced players alike, helping each student build confidence and skill at the table.",
    specialty: "Community Play",
  },
  {
    name: "Anu Nagpal",
    role: "Mahjong Trainer",
    image: "/assets/trainers/Anu-Nagpal.webp",
    imagePosition: "center 42%",
    description:
      "With over 20 years of Mahjong experience, I simplify the strategy, traditions, and mathematics of the game for every learner. My goal is to help beginners become confident players while preserving the rich heritage of Mahjong.",
    specialty: "Strategy Practice",
  },
  {
    name: "Anu Srivastav",
    role: "Mahjong Trainer",
    image: "/assets/trainers/Anu.webp",
    description:
      "Playing Mahjong since 1999 and teaching since 2016, I help learners of all ages build confidence through clear strategy and supportive guidance. I believe Mahjong creates both skilled players and lasting friendships.",
    specialty: "Heritage & Tradition",
  },
  {
    name: "Annu Mastan",
    role: "Mahjong Trainer",
    image: "/assets/trainers/Annu.jpg",
    description:
      "With 16 years of experience, I am dedicated to making Mahjong approachable and engaging for every learner. I enjoy guiding students from their first tile to confident mastery of the game.",
    specialty: "Guided Learning",
  },
  {
    name: "Rumpy Sidana",
    role: "Mahjong Trainer",
    image: "/assets/trainers/rumpy.webp",
    description:
      "My fascination with Mahjong began in 1994, and after learning the game in 2015, I fell in love with its strategy and tactile charm. Today, I share that knowledge and passion with others, helping grow the Mahjong community.",
    specialty: "Community Sessions",
  },
  {
    name: "Ritu Kapur",
    role: "Mahjong Trainer",
    image: "/assets/trainers/ritu.webp",
    description:
      "Mahjong came to me through the women before me-my mother and mother-in-law. What began as curiosity became a deep love for the game, and today I enjoy helping others discover its strategy, structure, and community.",
    specialty: "Table Practice",
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
        width,
        height: width,
        background: [
          "radial-gradient(circle at 50% 38%, rgba(138,106,74,0.18) 0%, rgba(138,106,74,0.08) 56%, rgba(198,168,122,0.10) 100%)",
        ].join(", "),
        borderRadius: "9999px",
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
  );
}

function TrainerPortrait({
  image,
  imagePosition,
  initial,
  name,
}: {
  image?: string;
  imagePosition?: string;
  initial: string;
  name: string;
}) {
  if (!image) {
    return <PortraitPlaceholder initial={initial} width={150} height={150} />;
  }

  return (
    <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full">
      <Image
        src={image}
        alt={name}
        fill
        sizes="150px"
        className="object-cover object-center"
        style={{ objectPosition: imagePosition ?? "center center" }}
      />
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
      <div className="relative mx-auto max-w-7xl px-7 pb-12 pt-8 sm:px-8 lg:px-16 lg:pb-16 lg:pt-10">
        <div className="max-w-3xl text-left">

          {/* Heading */}
          <h2 className="text-[2.48rem] leading-[1.05] text-[#2d2926] sm:text-[3.08rem] sm:leading-[0.98] lg:text-[4.18rem] lg:leading-[0.93]">
            Meet Our Trainers
          </h2>

          {/* Subtext */}
          <p className="mt-6 max-w-[48ch] text-[1.08rem] leading-[1.86] text-[#5d4d40] lg:mt-8 lg:text-[1.12rem] lg:leading-[1.86]">
            Learn from experienced Mahjong practitioners, teachers, and community builders
            rooted in authentic Chinese Mahjong culture.
          </p>
        </div>
      </div>

      {/* ── FEATURED TRAINER ── */}
      <div className="relative mx-auto max-w-7xl px-7 pb-16 sm:px-8 lg:px-16 lg:pb-20">
        <div className="flex flex-col items-start gap-10 lg:ml-auto lg:mr-[7%] lg:grid lg:w-fit lg:grid-cols-[auto_auto] lg:items-center lg:gap-20">

          {/* Portrait */}
          <div className="flex justify-start lg:justify-end">
            <div className="relative overflow-hidden rounded-full">
              <Image
                src="/assets/founder/Vineeta.jpeg"
                alt={featured.name}
                width={240}
                height={240}
                className="aspect-square w-[153px] object-cover object-[center_18%] sm:w-[185px] lg:w-[217px]"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-start text-left">

            {/* Name */}
            <h3 className="text-[2.08rem] leading-tight text-[#2d2926] lg:text-[2.64rem]">
              {featured.name}
            </h3>

            {/* Role */}
            <p className="mt-2 text-[0.75rem] uppercase leading-relaxed tracking-[0.24em] text-[#8a6a4a] lg:text-[0.73rem] lg:tracking-[0.28em]">
              {featured.role}
            </p>

            {/* Ornamental rule */}
            <div className="my-5 h-px w-10 bg-[#c6a87a]/40" />

            {/* Story */}
            <p className="max-w-[44ch] text-[1.08rem] leading-[1.88] text-[#5d4d40] lg:text-[1.05rem] lg:leading-[1.86]">
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
      <div className="relative mx-auto max-w-7xl px-7 pb-20 pt-14 sm:px-8 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
          {supporting.map((trainer) => (
            <div
              key={trainer.name}
              className="flex flex-col items-start text-left"
            >
              {/* Portrait */}
              <TrainerPortrait
                image={trainer.image}
                imagePosition={trainer.imagePosition}
                initial={trainer.name[0]}
                name={trainer.name}
              />

              {/* Name */}
              <h3 className="mt-5 text-[1.36rem] leading-snug text-[#2d2926]">
                {trainer.name}
              </h3>

              {/* Role */}
              <p className="mt-1.5 text-[0.69rem] uppercase leading-relaxed tracking-[0.21em] text-[#8a6a4a] lg:text-[0.67rem] lg:tracking-[0.24em]">
                {trainer.role}
              </p>

              {/* Ornamental rule */}
              <div className="my-4 h-px w-8 bg-[#c6a87a]/36" />

              {/* Description */}
              <p className="max-w-[38ch] text-left text-[1.04rem] leading-[1.84] text-[#5d4d40] lg:text-[0.98rem] lg:leading-[1.8]">
                {trainer.description}
              </p>

              {/* Specialty */}
              <p className="mt-4 text-[0.66rem] uppercase tracking-[0.24em] text-[#8a6a4a]/80 lg:text-[0.64rem] lg:tracking-[0.28em]">
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
