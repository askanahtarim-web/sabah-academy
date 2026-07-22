"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const STATS = [
  { value: 2000, suffix: "+", label: "Xoşbəxt Tələbə" },
  { value: 50, suffix: "+", label: "Aktiv Kurs" },
  { value: 95, suffix: "%", label: "İşə Düzəlmə" },
  { value: 5, suffix: "+", label: "İl Təcrübə" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-glow/10 bg-[#050B14]">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,63,138,0.35),transparent_75%)]"
      />

      <motion.ul
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="shell relative grid grid-cols-2 gap-8 py-16 sm:py-20 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <motion.li
            key={stat.label}
            variants={fadeUp}
            className="flex flex-col items-center text-center"
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="text-gradient font-display text-4xl font-extrabold tabular-nums sm:text-5xl lg:text-6xl"
            />
            <p className="mt-3 text-sm font-medium text-muted sm:text-base">
              {stat.label}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
