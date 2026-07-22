"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={[
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-glow"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="mt-3 font-display text-section font-extrabold text-main"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base leading-relaxed text-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
