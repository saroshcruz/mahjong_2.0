"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need prior Mahjong experience to join?",
    answer:
      "Not at all. The Indian Mahjong Association welcomes complete beginners as well as experienced players. Our trainers guide members through the rules, strategy, and traditions of the game in a supportive and social environment.",
  },
  {
    question: "What is included with an IMA membership?",
    answer:
      "Membership provides access to the Indian Mahjong Association community, exclusive events, training opportunities, member resources, and a structured pathway to learn and enjoy authentic Mahjong.",
  },
  {
    question: "How do Mahjong classes work?",
    answer:
      "Classes are conducted by experienced IMA trainers and are designed for players of all skill levels. Whether you are learning your first tile or refining advanced strategies, our trainers will guide you through the game step by step.",
  },
  {
    question: "Do I need to become a member to learn Mahjong?",
    answer:
      "Not at all. We warmly welcome people of all ages and genders to learn and enjoy the game of Mahjong. However, becoming an IMA member enhances your learning journey by providing access to exclusive events, community gatherings, member benefits, and a deeper connection to the Indian Mahjong Association.",
  },
  {
    question: "How can I contact the Indian Mahjong Association if I need help?",
    answer:
      "For any questions regarding memberships, classes, events, or payments, please reach out to us through the contact details provided on the website. Our team will be happy to assist you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#f5efe4]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/backgrounds/membership-watercolor-bg.webp')",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.58,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#f5f0e8,rgba(245,240,232,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,#f5efe4,rgba(245,239,228,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-7 pb-18 pt-14 sm:px-8 lg:px-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[0.71rem] uppercase tracking-[0.32em] text-[#7c1f2d] lg:text-[0.73rem] lg:tracking-[0.42em]">
            Member Guidance
          </p>

          <h2 className="text-[2.48rem] leading-[1.16] text-[#2d2926] sm:text-[3.08rem] sm:leading-[1.1] lg:text-[4.18rem] lg:leading-[1.04]">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-6 max-w-[52ch] text-[1.08rem] leading-[1.86] text-[#5d4d40] lg:mt-8 lg:text-[1.12rem] lg:leading-[1.86]">
            Everything you need to begin your Mahjong journey with the Indian Mahjong Association.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl lg:mt-14">
          <div className="border-y border-[#c6a87a]/26">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const contentId = `faq-panel-${index}`;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[#c6a87a]/22 last:border-b-0"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="group flex min-h-20 w-full items-center justify-between gap-5 py-5 text-left transition-colors duration-300 hover:text-[#7c1f2d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a87a]/48 sm:min-h-22 sm:py-6"
                  >
                    <span className="text-[1.16rem] leading-[1.34] text-[#2d2926] transition-colors duration-300 group-hover:text-[#7c1f2d] sm:text-[1.24rem] lg:text-[1.34rem]">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c6a87a]/34 bg-[#fffaf2]/44 text-[1.45rem] leading-none text-[#7c1f2d] transition-all duration-300 group-hover:border-[#7c1f2d]/32 group-hover:bg-[#7c1f2d]/6"
                    >
                      <span
                        className="block translate-y-[-1px] transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </span>
                  </button>

                  <div
                    id={contentId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[68ch] pb-6 text-[1.02rem] leading-[1.82] text-[#5d4d40] sm:text-[1.08rem] lg:pb-7 lg:text-[1.1rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
