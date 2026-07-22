"use client";

import { motion } from "framer-motion";
import { CATEGORIES, type CategoryFilter } from "@/lib/courses-data";

type Props = {
  active: CategoryFilter;
  onChange: (next: CategoryFilter) => void;
  /** Distinguishes the shared `layoutId` when two tab bars exist on one page. */
  layoutId?: string;
  className?: string;
};

export default function CourseFilter({
  active,
  onChange,
  layoutId = "course-tab",
  className = "",
}: Props) {
  return (
    <div
      role="tablist"
      aria-label="Kurs kateqoriyaları"
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      {CATEGORIES.map((category) => {
        const selected = active === category;
        return (
          <button
            key={category}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(category)}
            className={[
              "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
              selected
                ? "text-white"
                : "border border-glow/20 bg-card/60 text-muted hover:border-glow/45 hover:text-main",
            ].join(" ")}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-blue-gradient shadow-glow"
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
