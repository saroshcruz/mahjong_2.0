import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/sections/Navbar/Navbar";
import Footer from "@/sections/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MembershipRegistrationForm from "@/components/membership/MembershipRegistrationForm";
import {
  isMembershipTierId,
  membershipTiers,
} from "@/lib/membership/tiers";

type MembershipPageProps = {
  params: Promise<{ tier: string }>;
};

function getTierOrNotFound(tierId: string) {
  if (!isMembershipTierId(tierId)) notFound();
  return membershipTiers[tierId];
}

export function generateStaticParams() {
  return Object.keys(membershipTiers).map((tier) => ({ tier }));
}

export async function generateMetadata({
  params,
}: MembershipPageProps): Promise<Metadata> {
  const { tier: tierId } = await params;
  if (!isMembershipTierId(tierId)) {
    return {
      title: "Membership | Indian Mahjong Association",
    };
  }

  return {
    title: `${membershipTiers[tierId].name} Registration | Indian Mahjong Association`,
    description: `Register for ${membershipTiers[tierId].name} with the Indian Mahjong Association.`,
  };
}

export default async function MembershipTierPage({ params }: MembershipPageProps) {
  const { tier: tierId } = await params;
  const tier = getTierOrNotFound(tierId);

  return (
    <main id="top" className="min-h-screen bg-[#f5efe4]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f5efe4]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/backgrounds/membership-watercolor-bg.png')",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              opacity: 0.64,
            }}
          />
          <div className="absolute left-[-9rem] top-[7%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(47,93,80,0.055),rgba(47,93,80,0)_62%)]" />
          <div className="absolute right-[-8rem] top-[16%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,31,45,0.055),rgba(124,31,45,0)_60%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#f5efe4,rgba(245,239,228,0))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#f5f0e8,rgba(245,240,232,0))]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-7 pb-12 pt-14 sm:px-8 lg:px-16 lg:pb-16 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="mb-5 text-[0.66rem] uppercase tracking-[0.32em] lg:mb-6 lg:text-[0.68rem] lg:tracking-[0.42em]"
              style={{ color: `rgba(${tier.accentRgb},0.94)` }}
            >
              Membership Registration
            </p>

            <h1 className="text-[2.55rem] leading-[1.02] text-[#2d2926] sm:text-[3.45rem] sm:leading-[0.98] lg:text-[4.55rem] lg:leading-[0.94]">
              {tier.displayName}
            </h1>

            <div className="mt-6 flex items-center justify-center gap-3 lg:mt-8">
              <div className="h-px w-8 bg-[#c6a87a]/40" />
              <div className="h-[3px] w-[3px] rounded-full bg-[#c6a87a]" />
              <div className="h-px w-8 bg-[#c6a87a]/40" />
            </div>

            <p className="mx-auto mt-6 max-w-[48ch] text-[1.03rem] leading-[1.92] text-[#5d4d40] lg:mt-8 lg:text-[1.08rem]">
              Share your details to begin the membership process. Payment will follow after registration in the next step.
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative z-10 pb-8 pt-2 lg:pb-10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
            <div className="h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.44)_22%,rgba(198,168,122,0.44)_78%,rgba(198,168,122,0))]" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5f0e8]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10rem] top-[12%] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(47,93,80,0.04),rgba(47,93,80,0)_62%)]" />
          <div className="absolute right-[-7rem] top-[42%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(124,31,45,0.045),rgba(124,31,45,0)_60%)]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-7 pb-20 pt-6 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-16 lg:pb-24 lg:pt-8">
          <aside
            className="h-fit overflow-hidden rounded-[0.75rem] border bg-[linear-gradient(180deg,rgba(252,248,241,0.88),rgba(248,244,234,0.74))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42),0_4px_24px_rgba(110,79,47,0.08)]"
            style={{ borderColor: `rgba(${tier.accentRgb},0.30)` }}
          >
            <div
              className="h-[3px]"
              style={{
                background: `linear-gradient(90deg,rgba(${tier.accentRgb},0),rgba(${tier.accentRgb},0.82)_18%,rgba(${tier.accentRgb},0.82)_82%,rgba(${tier.accentRgb},0))`,
              }}
            />
            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <p
                className="text-[0.62rem] uppercase tracking-[0.28em]"
                style={{ color: `rgba(${tier.accentRgb},0.92)` }}
              >
                Selected Tier
              </p>
              <h2 className="mt-4 text-[2rem] leading-tight text-[#2d2926]">
                {tier.name}
              </h2>
              <div className="my-5 h-px w-10 bg-[#c6a87a]/40" />
              <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
                {tier.duration}
              </p>
              <p className="mt-2 text-[2rem] leading-tight text-[#2d2926]">
                {tier.price}
              </p>
              <p className="mt-5 text-[1rem] leading-[1.86] text-[#5d4d40]">
                {tier.summary}
              </p>
              <a
                href="/#membership"
                className="mt-7 inline-flex text-[0.66rem] uppercase tracking-[0.22em] text-[#8a6a4a] transition duration-200 hover:text-[#7c1f2d]"
              >
                Change tier
              </a>
            </div>
          </aside>

          <article className="overflow-hidden rounded-[0.75rem] border border-[rgba(198,168,122,0.30)] bg-[linear-gradient(180deg,rgba(252,248,241,0.88),rgba(248,244,234,0.74))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42),0_4px_24px_rgba(110,79,47,0.08)]">
            <div className="h-[3px] bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.82)_18%,rgba(198,168,122,0.82)_82%,rgba(198,168,122,0))]" />
            <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#8a6a4a]">
                Member Details
              </p>
              <h2 className="mt-4 text-[2rem] leading-tight text-[#2d2926] sm:text-[2.35rem]">
                Tell us where your table begins.
              </h2>
              <p className="mt-4 max-w-[48ch] text-[1rem] leading-[1.86] text-[#5d4d40]">
                These details help IMA prepare your membership record and guide you toward the right training, events and community tables.
              </p>

              <div className="mt-8">
                <MembershipRegistrationForm />
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
