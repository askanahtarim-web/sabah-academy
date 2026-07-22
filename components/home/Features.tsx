"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const FEATURES = [
  {
    icon: "🎯",
    title: "Sertifikatlı Proqramlar",
    text: "Beynəlxalq standartlara uyğun sertifikatlar",
  },
  {
    icon: "👨‍🏫",
    title: "Peşəkar Müəllimlər",
    text: "10+ illik təcrübəyə sahib ekspertlər",
  },
  {
    icon: "💻",
    title: "Onlayn & Oflayn",
    text: "Öz tempinizlə, istədiyiniz yerdən öyrənin",
  },
  {
    icon: "🚀",
    title: "Karyera Dəstəyi",
    text: "Məzunlara iş tapma prosesində dəstək",
  },
];

export default function Features() {
  return (
    <section id="niye-sabah" className="section-pad relative scroll-mt-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Üstünlüklərimiz"
          title={
            <>
              Niyə <span className="text-gradient">SABAH Academy</span>?
            </>
          }
          subtitle="Təhsildən karyeraya qədər hər addımda yanınızdayıq."
        />

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => (
            <motion.li
              key={feature.title}
              variants={fadeUp}
              className="glass glass-hover group relative overflow-hidden rounded-2xl p-5 sm:p-6"
            >
              {/* Corner bloom that warms up on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-glow/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-glow/20 bg-glow/5 text-2xl">
                <span aria-hidden="true">{feature.icon}</span>
              </span>
              <h3 className="mt-5 font-display text-base font-bold text-main sm:text-lg">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {feature.text}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
