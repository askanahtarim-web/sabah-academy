"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import ConstellationCanvas from "@/components/home/ConstellationCanvas";
import GlowButton from "@/components/ui/GlowButton";
import { EASE, fadeUp, stagger } from "@/lib/motion";

const PILLS = ["2000+ Məzun", "50+ Kurs", "95% İşə Düzəlmə"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]">
      {/* Signature constellation field. */}
      <div className="absolute inset-0 -z-10">
        <ConstellationCanvas className="radial-fade opacity-90" />
      </div>

      {/* Depth: a warm-blue core glow plus a fade into the next section. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(0,63,138,0.42),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-deep"
      />

      <div className="shell relative w-full py-20 sm:py-24">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="eyebrow">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Azərbaycanda #1 Peşəkar Akademiya
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 font-display text-hero font-extrabold text-main"
          >
            Gələcəyinizi <span className="text-gradient">Bizimlə</span> İnşa Edin
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Mühasibat, HR və Maliyyə sahələrində sertifikatlı peşəkar proqramlar.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
          >
            <GlowButton href="/contact" size="lg" pulse className="w-full sm:w-auto">
              İndi Başla
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </GlowButton>
            <GlowButton
              href="/courses"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Təlimlərə Bax
            </GlowButton>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {PILLS.map((pill) => (
              <li
                key={pill}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-main sm:text-sm"
              >
                <span className="text-glow" aria-hidden="true">
                  ✓
                </span>
                {pill}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.a
        href="#niye-sabah"
        aria-label="Aşağı sürüşdür"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
        className="absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-2 text-muted transition-colors hover:text-glow"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Kəşf et</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-glow/40 p-1">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-glow" />
        </span>
      </motion.a>
    </section>
  );
}
