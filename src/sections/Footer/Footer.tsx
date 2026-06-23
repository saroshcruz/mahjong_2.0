import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#1b2f25] text-[#f0e6d6]"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <Image
              src="/assets/footer/footer-landscape.webp"
          alt=""
          fill
          className="object-cover object-[center_bottom]"
          style={{ opacity: 0.7 }}
        />
        <div className="absolute inset-0 bg-[rgba(27,47,37,0.38)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_60%,transparent_20%,rgba(27,47,37,0.32)_68%,rgba(27,47,37,0.72)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,#1b2f25,transparent)]" />
      </div>

      <div
        className="relative z-10 mx-auto max-w-7xl px-8 pt-14 pb-6 lg:px-14 lg:pt-16 lg:pb-8"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.28)" }}
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-12 xl:gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logos/logo.jpeg"
                alt="IMA"
                width={34}
                height={34}
                className="rounded-lg opacity-[0.88]"
              />
              <span className="text-[0.8rem] uppercase tracking-[0.26em] text-[#b8975a]">
                Indian Mahjong Association
              </span>
            </div>
            <p className="max-w-[32ch] text-[0.98rem] leading-[1.78] text-[#b8975a]">
              Preserving the authentic Chinese game of Mahjong in India through
              culture, companionship, and strategy.
            </p>
            <a
              href="https://www.instagram.com/indianmahjongassociation_/?hl=en"
              className="flex w-fit items-center gap-2 text-[0.89rem] text-[#9e968c] transition duration-200 hover:text-[#c6a87a]"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              indianmahjongassociation
            </a>
          </div>

          <div>
            <p className="text-[0.64rem] uppercase tracking-[0.44em] text-[#b8975a]">
              Explore
            </p>
            <nav className="mt-5 flex flex-wrap items-center gap-y-1 sm:flex-col sm:items-start sm:gap-2.5" aria-label="Explore">
              <a href="/#membership" className="text-[1rem] text-[#b0a8a0] transition duration-200 hover:text-[#f0e6d6]">
                Membership
              </a>
              <span className="mx-2 text-[1.02rem] text-[#8a8278]/46 sm:hidden" aria-hidden="true">·</span>
              <a href="/#events" className="text-[1rem] text-[#b0a8a0] transition duration-200 hover:text-[#f0e6d6]">
                Events
              </a>
            </nav>
          </div>

          <div>
            <p className="text-[0.64rem] uppercase tracking-[0.44em] text-[#b8975a]">
              Learn
            </p>
            <nav className="mt-5 flex flex-wrap items-center gap-y-1 sm:flex-col sm:items-start sm:gap-2.5" aria-label="Learn">
              <a href="/#trainers" className="text-[1rem] text-[#b0a8a0] transition duration-200 hover:text-[#f0e6d6]">
                Trainers
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 lg:mt-14">
          <div className="mb-5 h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.18)_28%,rgba(198,168,122,0.18)_72%,rgba(198,168,122,0))]" />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.67rem] tracking-[0.28em] text-[#b8975a]">
              Payments secured by Razorpay
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href="/privacy"
                className="text-[0.83rem] text-[#7e7a74] transition duration-200 hover:text-[#b0a8a0]"
              >
                Privacy Policy
              </a>
              <a
                href="/refund-policy"
                className="text-[0.83rem] text-[#7e7a74] transition duration-200 hover:text-[#b0a8a0]"
              >
                Refund Policy
              </a>
              <a
                href="https://www.instagram.com/casselle.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.83rem] text-[#7e7a74] transition duration-200 hover:text-[#b0a8a0]"
              >
                Site by Caselle &amp; Co.
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mx-auto mb-5 h-px w-24 bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.22)_50%,rgba(198,168,122,0))]" />
          <p className="text-center text-[0.83rem] text-[#7e7a74]">
            © 2026 Indian Mahjong Association
          </p>
        </div>
      </div>
    </footer>
  );
}
