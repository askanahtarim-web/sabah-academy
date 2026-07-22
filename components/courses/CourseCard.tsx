"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Check, ChevronDown, Clock } from "lucide-react";
import type { Course } from "@/lib/courses-data";
import { EASE } from "@/lib/motion";

type Props = {
  course: Course;
  /** Adds the "Ətraflı" syllabus accordion used on the /courses page. */
  expandable?: boolean;
};

export default function CourseCard({ course, expandable = false }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <header className="flex items-start justify-between gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-glow/20 bg-glow/5 text-2xl">
          <span aria-hidden="true">{course.icon}</span>
        </span>
        {course.badge && (
          <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold ring-1 ring-inset ring-gold/35">
            {course.badge}
          </span>
        )}
      </header>

      <h3 className="mt-5 font-display text-lg font-bold text-main">
        {course.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {course.description}
      </p>

      <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-glow" aria-hidden="true" />
          <dt className="sr-only">Müddət</dt>
          <dd>{course.duration}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <BarChart3 className="h-3.5 w-3.5 text-glow" aria-hidden="true" />
          <dt className="sr-only">Səviyyə</dt>
          <dd>{course.level}</dd>
        </div>
      </dl>

      {expandable && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-5 flex w-full items-center justify-between rounded-xl border border-glow/20 bg-glow/5 px-4 py-2.5 text-sm font-semibold text-main transition-colors hover:border-glow/50 hover:bg-glow/10"
          >
            Ətraflı
            <ChevronDown
              className={`h-4 w-4 text-glow transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-glow">
                    Tədris Proqramı
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {course.syllabus.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-muted">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-glow"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-glow/10 pt-5">
        <p className="font-display text-2xl font-extrabold text-main">
          {course.price}
          <span className="ml-1 text-base font-semibold text-muted">₼</span>
        </p>
        <Link
          href={`/contact?kurs=${course.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-glow/35 bg-glow/10 px-4 py-2 text-sm font-semibold text-glow transition-all duration-300 hover:scale-[1.03] hover:border-glow/70 hover:bg-glow/20"
        >
          Qoşul
          <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}
