"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CourseCard from "@/components/courses/CourseCard";
import CourseFilter from "@/components/courses/CourseFilter";
import GlowButton from "@/components/ui/GlowButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { courses, type CategoryFilter } from "@/lib/courses-data";
import { EASE, viewportOnce } from "@/lib/motion";

export default function CourseShowcase() {
  const [active, setActive] = useState<CategoryFilter>("Hamısı");

  const visible = useMemo(
    () =>
      active === "Hamısı"
        ? courses
        : courses.filter((course) => course.category === active),
    [active],
  );

  return (
    <section id="proqramlar" className="section-pad relative scroll-mt-20">
      {/* Soft blue wash so the grid doesn't sit on flat black. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-96 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,63,138,0.28),transparent_70%)]"
      />
      <div className="shell">
        <SectionHeading
          eyebrow="Təlimlər"
          title={<>Proqramlarımız</>}
          subtitle="Karyeranıza uyğun ixtisaslaşmış təlim proqramını seçin."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-10"
        >
          <CourseFilter active={active} onChange={setActive} />
        </motion.div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visible.map((course, i) => (
              <motion.li
                key={course.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  // delay:0 stops the exit inheriting the stagger delay below.
                  transition: { duration: 0.2, delay: 0 },
                }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              >
                <CourseCard course={course} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-12 flex justify-center">
          <GlowButton href="/courses" variant="outline" size="lg">
            Bütün Təlimlərə Bax
            <span aria-hidden="true">→</span>
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
