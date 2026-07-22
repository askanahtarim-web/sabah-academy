"use client";

import { motion } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export default function CTABanner() {
  return (
    <section className="section-pad">
      <div className="shell">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl bg-cta-gradient px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          {/* Centre radial glow + a faint grid for texture. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_45%,rgba(79,163,255,0.4),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 dot-grid opacity-25"
          />

          <div className="relative mx-auto max-w-2xl">
            <motion.h2
              variants={fadeUp}
              className="font-display text-section font-extrabold text-white"
            >
              Peşəkar Karyeranıza Bu Gün Başlayın
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base text-white/75 sm:text-lg"
            >
              İlk dərsi pulsuz sınayın — heç bir öhdəlik yoxdur
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex justify-center">
              <GlowButton href="/contact" variant="white" size="lg">
                Qeydiyyatdan Keç
                <span aria-hidden="true">→</span>
              </GlowButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
