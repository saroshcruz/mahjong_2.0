"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const slides = [
  "/assets/our_story/Our-story.png",
  "/assets/our_story/kargil.png",
  "/assets/our_story/Bater-system.png",
];

const autoScrollDelay = 15000;

export default function OurStory() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (!emblaApi) return;

    timerRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, autoScrollDelay);
  }, [clearTimer, emblaApi]);

  const resetTimer = useCallback(() => {
    clearTimer();
    startTimer();
  }, [clearTimer, startTimer]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    resetTimer();
  }, [emblaApi, resetTimer]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    resetTimer();
  }, [emblaApi, resetTimer]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      resetTimer();
    },
    [emblaApi, resetTimer]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    const onPointerDown = () => {
      clearTimer();
    };
    const onSettle = () => {
      startTimer();
    };

    onSelect();
    startTimer();

    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("settle", onSettle);

    return () => {
      clearTimer();
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("settle", onSettle);
    };
  }, [clearTimer, emblaApi, startTimer]);

  return (
    <section id="our-story" className="relative scroll-mt-28 overflow-hidden bg-[#f5efe4]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.38),rgba(198,168,122,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,rgba(198,168,122,0),rgba(198,168,122,0.28),rgba(198,168,122,0))]" />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-2 py-9 sm:px-8 sm:py-14 lg:px-10 lg:py-[4.5rem]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.15rem] leading-[1.05] text-[#2d2926] sm:text-[2.7rem] lg:text-[3.4rem]">
            Our Story
          </h2>
          <p className="mx-auto mt-4 max-w-[31ch] text-[0.96rem] leading-[1.82] text-[#5d4d40] sm:max-w-[52ch] sm:text-[1rem]">
            A journey shaped by community, cultural exchange and a shared love for the game.
          </p>
        </div>

        <div
          className="relative mx-auto mt-6 max-w-none px-0 sm:mt-9 sm:max-w-[1340px] sm:px-14 lg:mt-10 lg:px-16"
          onMouseEnter={clearTimer}
          onMouseLeave={startTimer}
          onFocus={clearTimer}
          onBlur={startTimer}
        >
          <div
            ref={emblaRef}
            className="relative overflow-hidden"
          >
            <div className="flex touch-pan-y">
              {slides.map((src) => (
                <div key={src} className="min-w-0 flex-[0_0_100%] px-0 sm:px-2">
                  <Image
                    src={src}
                    alt=""
                    width={1600}
                    height={900}
                    priority={src === slides[0]}
                    sizes="(min-width: 1500px) 1260px, (min-width: 768px) 86vw, 95vw"
                    className="mx-auto h-auto w-full max-w-none select-none sm:max-w-[1260px]"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous story slide"
            className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c6a87a]/24 bg-[#fffaf2]/24 text-[1.45rem] leading-none text-[#7c1f2d]/76 transition duration-200 hover:border-[#7c1f2d]/36 hover:bg-[#fffaf2]/44 hover:text-[#7c1f2d]/92 sm:left-2 lg:left-3"
          >
            ‹
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-transparent px-0 py-0 sm:bottom-5">
            {slides.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to story slide ${index + 1}`}
                aria-current={selectedIndex === index}
                className="flex h-7 w-7 items-center justify-center"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    height: selectedIndex === index ? 6 : 7,
                    width: selectedIndex === index ? 24 : 7,
                    background:
                      selectedIndex === index
                        ? "#7c1f2d"
                        : "rgba(255,250,242,0.92)",
                    border: "0 solid transparent",
                  }}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next story slide"
            className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c6a87a]/24 bg-[#fffaf2]/24 text-[1.45rem] leading-none text-[#7c1f2d]/76 transition duration-200 hover:border-[#7c1f2d]/36 hover:bg-[#fffaf2]/44 hover:text-[#7c1f2d]/92 sm:right-2 lg:right-3"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
