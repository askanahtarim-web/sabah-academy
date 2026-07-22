"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { initialsOf, testimonials } from "@/lib/testimonials-data";
import { EASE, viewportOnce } from "@/lib/motion";

const ROTATE_MS = 4000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => go(index + 1, 1),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  const active = testimonials[index];

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="shell">
        <SectionHeading
          eyebrow="Rəylər"
          title={
            <>
              Məzunlarımız <span className="text-gradient">Nə Deyir</span>
            </>
          }
          subtitle="Karyera yolunu bizimlə quranların təcrübəsi."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="relative mx-auto mt-14 max-w-3xl"
        >
          <div className="relative min-h-[330px] sm:min-h-[290px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={active.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.42, ease: EASE }}
                className="glass absolute inset-0 flex flex-col rounded-2xl p-7 sm:p-10"
              >
                <Quote
                  className="h-9 w-9 shrink-0 text-glow/35"
                  aria-hidden="true"
                />

                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-main sm:text-lg">
                  “{active.text}”
                </blockquote>

                <div
                  className="mt-6 flex items-center gap-1"
                  aria-label={`${active.stars} ulduzdan 5`}
                >
                  {Array.from({ length: active.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <figcaption className="mt-5 flex items-center gap-4 border-t border-glow/10 pt-5">
                  <span
                    aria-hidden="true"
                    style={{ backgroundImage: active.avatar }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                  >
                    {initialsOf(active.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display font-bold text-main">
                      {active.name}
                    </span>
                    <span className="block truncate text-sm text-muted">
                      {active.role} — {active.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls: arrows on wider screens, dots everywhere. */}
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Əvvəlki rəy"
            className="absolute -left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-glow/25 bg-card/80 text-muted backdrop-blur transition-all hover:border-glow/60 hover:text-glow lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Növbəti rəy"
            className="absolute -right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-glow/25 bg-card/80 text-muted backdrop-blur transition-all hover:border-glow/60 hover:text-glow lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-7 flex items-center justify-center gap-2.5">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`${i + 1}-ci rəyə keç`}
                aria-current={i === index}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-glow shadow-glow"
                    : "w-2 bg-muted/40 hover:bg-muted",
                ].join(" ")}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
