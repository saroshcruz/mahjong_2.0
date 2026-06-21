"use client";

import { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const slides = [
  {
    id: "our-story",
    desktop: "/assets/our_story/ourstory-d.webp",
    mobile: "/assets/our_story/ourstory-m.webp",
  },
  {
    id: "kargil",
    desktop: "/assets/our_story/kargil-d.webp",
    mobile: "/assets/our_story/kargil-m.webp",
  },
  {
    id: "barter",
    desktop: "/assets/our_story/barter-d.webp",
    mobile: "/assets/our_story/barter-m.webp",
  },
  {
    id: "generations",
    desktop: "/assets/our_story/generations-d.webp",
    mobile: "/assets/our_story/generations-m.webp",
  },
  {
    id: "mahjong",
    desktop: "/assets/our_story/mahjong-d.webp",
    mobile: "/assets/our_story/mahjong-m.webp",
  },
];

const autoScrollDelay = 10000;

type StorySlide = (typeof slides)[number];

function StorySlideImage({ priority, slide }: { priority: boolean; slide: StorySlide }) {
  const common = {
    alt: "",
    sizes: "(min-width: 1500px) 1260px, (min-width: 768px) 86vw, 95vw",
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1600,
    height: 900,
    src: slide.desktop,
  });

  const {
    props: { srcSet: mobile, ...imageProps },
  } = getImageProps({
    ...common,
    width: 900,
    height: 1600,
    src: slide.mobile,
    loading: priority ? "eager" : "lazy",
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img
        {...imageProps}
        className="mx-auto aspect-[9/16] h-auto w-full max-w-none select-none md:aspect-[16/9] md:max-w-[1260px]"
        draggable={false}
      />
    </picture>
  );
}

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

      <div className="relative mx-auto max-w-[84rem] px-2 py-8 md:px-8 md:py-14 lg:px-10 lg:py-[4.5rem]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.15rem] leading-[1.05] text-[#2d2926] sm:text-[2.7rem] lg:text-[3.4rem]">
            Our Story
          </h2>
        </div>

        <div
          className="relative mx-auto mt-5 max-w-none px-0 md:mt-9 md:max-w-[1340px] md:px-14 lg:mt-10 lg:px-16"
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
              {slides.map((slide, index) => (
                <div key={slide.id} className="min-w-0 flex-[0_0_100%] px-0 md:px-2">
                  <StorySlideImage priority={index === 0} slide={slide} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous story slide"
            className="absolute left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c6a87a]/24 bg-[#fffaf2]/24 text-[1.45rem] leading-none text-[#7c1f2d]/76 transition duration-200 hover:border-[#7c1f2d]/36 hover:bg-[#fffaf2]/44 hover:text-[#7c1f2d]/92 md:flex md:left-2 lg:left-3"
          >
            ‹
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-transparent px-0 py-0 md:bottom-5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
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
            className="absolute right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c6a87a]/24 bg-[#fffaf2]/24 text-[1.45rem] leading-none text-[#7c1f2d]/76 transition duration-200 hover:border-[#7c1f2d]/36 hover:bg-[#fffaf2]/44 hover:text-[#7c1f2d]/92 md:flex md:right-2 lg:right-3"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
