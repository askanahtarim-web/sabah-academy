"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";

const PARTNERS = [
  "PASHA Bank",
  "Kapital Bank",
  "AzərGold",
  "BP Azerbaijan",
  "Bakcell",
  "SOCAR",
  "Silk Way",
  "Mərkəzi Bank",
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-4 pr-4"
    >
      {PARTNERS.map((name) => (
        <li
          key={name}
          className="glass whitespace-nowrap rounded-full px-6 py-3 font-display text-sm font-semibold text-muted transition-colors duration-300 hover:border-glow/50 hover:text-main sm:text-base"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section className="section-pad overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
        className="shell text-center font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted"
      >
        Məzunlarımız Bu Şirkətlərdə İşləyir
      </motion.p>

      <div className="marquee-mask pause-on-hover relative mt-10 flex overflow-hidden">
        {/* The track is duplicated so translating it -50% loops seamlessly. */}
        <div className="flex w-max animate-marquee items-center">
          <Row />
          <Row ariaHidden />
        </div>
      </div>
    </section>
  );
}
