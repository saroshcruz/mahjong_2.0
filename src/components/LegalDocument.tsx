import Footer from "@/sections/Footer/Footer";
import Navbar from "@/sections/Navbar/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

type LegalSection = {
  title: string;
  body: string[];
  points?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  closingNote?: string;
};

export default function LegalDocument({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  closingNote,
}: LegalDocumentProps) {
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
              opacity: 0.58,
            }}
          />
          <div className="absolute left-[-9rem] top-[7%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(47,93,80,0.055),rgba(47,93,80,0)_62%)]" />
          <div className="absolute right-[-8rem] top-[16%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,31,45,0.055),rgba(124,31,45,0)_60%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#f5efe4,rgba(245,239,228,0))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#f5f0e8,rgba(245,240,232,0))]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-7 pb-12 pt-14 sm:px-8 lg:px-16 lg:pb-16 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-[0.66rem] uppercase tracking-[0.32em] text-[#7c1f2d] lg:mb-6 lg:text-[0.68rem] lg:tracking-[0.42em]">
              {eyebrow}
            </p>

            <h1 className="text-[2.65rem] leading-[1.02] text-[#2d2926] sm:text-[3.6rem] sm:leading-[0.96] lg:text-[4.8rem] lg:leading-[0.92]">
              {title}
            </h1>

            <div className="mt-6 flex items-center justify-center gap-3 lg:mt-8">
              <div className="h-px w-8 bg-[#c6a87a]/40" />
              <div className="h-[3px] w-[3px] rounded-full bg-[#c6a87a]" />
              <div className="h-px w-8 bg-[#c6a87a]/40" />
            </div>

            <p className="mx-auto mt-6 max-w-[48ch] text-[1.03rem] leading-[1.92] text-[#5d4d40] lg:mt-8 lg:text-[1.08rem]">
              {intro}
            </p>

            <p className="mt-6 text-[0.66rem] uppercase tracking-[0.26em] text-[#8a6a4a]">
              Last updated {updated}
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

        <div className="relative z-10 mx-auto max-w-4xl px-7 pb-20 pt-6 sm:px-8 lg:px-16 lg:pb-24 lg:pt-8">
          <article
            className="overflow-hidden rounded-[0.75rem] border border-[rgba(198,168,122,0.30)] bg-[linear-gradient(180deg,rgba(252,248,241,0.88),rgba(248,244,234,0.74))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42),0_4px_24px_rgba(110,79,47,0.08)]"
          >
            <div className="h-[3px] bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.82)_18%,rgba(198,168,122,0.82)_82%,rgba(198,168,122,0))]" />
            <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
              <div className="space-y-10 lg:space-y-12">
                {sections.map((section, index) => (
                  <section key={section.title}>
                    <div className="flex items-start gap-4">
                      <span className="mt-2 hidden h-px w-8 shrink-0 bg-[#c6a87a]/46 sm:block" />
                      <div>
                        <p className="mb-2 text-[0.62rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="text-[1.55rem] leading-tight text-[#2d2926] sm:text-[1.85rem]">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4 text-[1rem] leading-[1.88] text-[#4d3a2e] sm:text-[1.03rem]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {section.points && (
                      <ul className="mt-5 space-y-3 text-[0.98rem] leading-[1.82] text-[#4d3a2e] sm:text-[1.01rem]">
                        {section.points.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <span className="mt-[0.78em] h-px w-4 shrink-0 bg-[#c6a87a]/58" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {closingNote && (
                <div className="mt-12 border-t border-[#c6a87a]/22 pt-7">
                  <p className="text-[1rem] leading-[1.9] text-[#5d4d40] sm:text-[1.03rem]">
                    {closingNote}
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
