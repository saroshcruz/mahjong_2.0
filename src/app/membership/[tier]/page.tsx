import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/sections/Navbar/Navbar";
import Footer from "@/sections/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MembershipRegistrationForm from "@/components/membership/MembershipRegistrationForm";
import {
  getVisibleMembershipTierIds,
  isMembershipTierId,
  membershipTiers,
} from "@/lib/membership/tiers";

type MembershipPageProps = {
  params: Promise<{ tier: string }>;
};

export function generateStaticParams() {
  return getVisibleMembershipTierIds().map((tier) => ({ tier }));
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
  if (!isMembershipTierId(tierId)) notFound();
  const tier = membershipTiers[tierId];

  return (
    <main id="top" className="min-h-screen bg-[#f5efe4]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f5f0e8]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/backgrounds/membership-watercolor-bg.webp')",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              opacity: 0.72,
            }}
          />
          <div className="absolute left-[-10rem] top-[12%] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(47,93,80,0.04),rgba(47,93,80,0)_62%)]" />
          <div className="absolute right-[-7rem] top-[42%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(124,31,45,0.045),rgba(124,31,45,0)_60%)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#f5efe4,rgba(245,239,228,0))]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,#1b2f25,rgba(27,47,37,0))] opacity-[0.08]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[72rem] gap-6 px-7 pb-16 pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 lg:px-16 lg:pb-24 lg:pt-12 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-14">
          <div className="flex flex-col gap-3">
            <a
              href="/#membership"
              className="inline-flex min-h-11 items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#8a6a4a] transition duration-200 hover:text-[#7c1f2d]"
            >
              <span aria-hidden="true" className="text-[0.95rem] leading-none">
                ←
              </span>
              Back to Membership
            </a>

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
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <p
                  className="text-[0.62rem] uppercase tracking-[0.28em]"
                  style={{ color: `rgba(${tier.accentRgb},0.92)` }}
                >
                  Membership Registration
                </p>
                <h1 className="mt-3 text-[2rem] leading-tight text-[#2d2926] sm:text-[2.2rem]">
                  {tier.name}
                </h1>
                <div className="my-4 h-px w-10 bg-[#c6a87a]/40" />
                <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                  <p className="text-[2rem] leading-none text-[#2d2926]">
                    {tier.price}
                  </p>
                  <p className="pb-1 text-[0.64rem] uppercase tracking-[0.22em] text-[#8a6a4a]">
                    {tier.duration}
                  </p>
                </div>
                <p className="mt-4 text-[0.94rem] leading-[1.72] text-[#5d4d40]">
                  Complete your details below to begin your membership.
                </p>
                <a
                  href="/#membership"
                  className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full border border-[#c6a87a]/42 bg-[#fffaf2]/54 px-5 text-[0.66rem] uppercase tracking-[0.20em] text-[#6f5848] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.34)] transition-all duration-300 hover:-translate-y-px hover:border-[#7c1f2d]/42 hover:text-[#7c1f2d] hover:shadow-[0_6px_18px_rgba(110,79,47,0.08)]"
                >
                  <span aria-hidden="true" className="mr-2 text-[0.88rem] leading-none">
                    ←
                  </span>
                  Change Tier
                </a>
              </div>
            </aside>
          </div>

          <article className="overflow-hidden rounded-[0.75rem] border border-[rgba(198,168,122,0.30)] bg-[linear-gradient(180deg,rgba(252,248,241,0.88),rgba(248,244,234,0.74))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42),0_4px_24px_rgba(110,79,47,0.08)]">
            <div className="h-[3px] bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.82)_18%,rgba(198,168,122,0.82)_82%,rgba(198,168,122,0))]" />
            <div className="px-6 py-7 sm:px-9 sm:py-9 lg:px-12 lg:py-10">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#8a6a4a]">
                Member Details
              </p>
              <h2 className="mt-3 text-[1.75rem] leading-tight text-[#2d2926] sm:text-[2.15rem]">
                Tell us where your table begins.
              </h2>
              <p className="mt-3 max-w-[48ch] text-[1rem] leading-[1.78] text-[#5d4d40]">
                These details help IMA prepare your membership record and guide you toward the right training, events and community tables.
              </p>

              <div className="mt-6">
                <MembershipRegistrationForm tierId={tierId} />
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
