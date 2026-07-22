"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import CourseCard from "@/components/courses/CourseCard";
import {
  courses,
  LEVELS,
  PRICE_BOUNDS,
  type CourseCategory,
  type CourseLevel,
} from "@/lib/courses-data";
import { EASE } from "@/lib/motion";

const CATEGORY_OPTIONS: CourseCategory[] = ["Mühasibat", "HR", "Maliyyə"];

export default function CoursesExplorer() {
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<CourseCategory[]>([]);
  const [level, setLevel] = useState<CourseLevel | "Hamısı">("Hamısı");
  const [maxPrice, setMaxPrice] = useState(PRICE_BOUNDS.max);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCat = (c: CourseCategory) =>
    setCats((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const reset = () => {
    setQuery("");
    setCats([]);
    setLevel("Hamısı");
    setMaxPrice(PRICE_BOUNDS.max);
  };

  const dirty =
    query !== "" ||
    cats.length > 0 ||
    level !== "Hamısı" ||
    maxPrice !== PRICE_BOUNDS.max;

  const results = useMemo(() => {
    // Locale-aware lowercasing so "İ" and "I" match the way Azerbaijani expects.
    const q = query.trim().toLocaleLowerCase("az");
    return courses.filter((course) => {
      if (cats.length && !cats.includes(course.category)) return false;
      if (level !== "Hamısı" && course.level !== level) return false;
      if (course.price > maxPrice) return false;
      if (!q) return true;
      return [course.title, course.description, course.category, course.level]
        .join(" ")
        .toLocaleLowerCase("az")
        .includes(q);
    });
  }, [query, cats, level, maxPrice]);

  const filterPanel = (
    <div className="space-y-8">
      <fieldset>
        <legend className="font-display text-sm font-bold uppercase tracking-[0.14em] text-main">
          Kateqoriya
        </legend>
        <div className="mt-4 space-y-3">
          {CATEGORY_OPTIONS.map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-center gap-3 text-sm text-muted transition-colors hover:text-main"
            >
              <input
                type="checkbox"
                checked={cats.includes(c)}
                onChange={() => toggleCat(c)}
                className="h-4 w-4 cursor-pointer rounded border-glow/40 bg-transparent accent-glow"
              />
              {c}
              <span className="ml-auto text-xs text-muted/70">
                {courses.filter((x) => x.category === c).length}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="level"
          className="font-display text-sm font-bold uppercase tracking-[0.14em] text-main"
        >
          Səviyyə
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value as CourseLevel | "Hamısı")}
          className="mt-4 w-full cursor-pointer rounded-xl border border-glow/20 bg-card px-4 py-2.5 text-sm text-main outline-none transition-colors focus:border-glow/60"
        >
          <option value="Hamısı">Hamısı</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="price"
          className="flex items-baseline justify-between font-display text-sm font-bold uppercase tracking-[0.14em] text-main"
        >
          Qiymət
          <span className="font-sans text-sm font-semibold normal-case tracking-normal text-glow">
            ≤ {maxPrice} ₼
          </span>
        </label>
        <input
          id="price"
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-4 w-full cursor-pointer accent-glow"
        />
        <div className="mt-1.5 flex justify-between text-xs text-muted">
          <span>{PRICE_BOUNDS.min} ₼</span>
          <span>{PRICE_BOUNDS.max} ₼</span>
        </div>
      </div>

      {dirty && (
        <button
          type="button"
          onClick={reset}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-glow/20 px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-glow/50 hover:text-main"
        >
          <RotateCcw className="h-4 w-4" />
          Filtrləri sıfırla
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Search hero */}
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(0,63,138,0.45),transparent_70%)]"
        />
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-glow">
              Təlim Kataloqu
            </p>
            <h1 className="mt-3 font-display text-section font-extrabold text-main">
              Sizə Uyğun <span className="text-gradient">Proqramı</span> Tapın
            </h1>
            <p className="mt-4 text-base text-muted">
              {courses.length} peşəkar proqram arasından axtarın və filtrləyin.
            </p>

            <div className="relative mt-9">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kurs axtar — məsələn, mühasibat"
                aria-label="Kurs axtar"
                className="glass w-full rounded-full py-4 pl-14 pr-5 text-main placeholder:text-muted/70 outline-none transition-colors focus:border-glow/60"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="pb-24">
        <div className="shell grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            {/* Mobile disclosure */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="glass flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-main lg:hidden"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-glow" />
                Filtrlər
              </span>
              {filtersOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <span className="text-xs text-muted">{results.length} nəticə</span>
              )}
            </button>

            <AnimatePresence initial={false}>
              {filtersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="glass mt-3 rounded-2xl p-5">{filterPanel}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <div className="glass sticky top-24 hidden rounded-2xl p-6 lg:block">
              {filterPanel}
            </div>
          </aside>

          <div>
            <p className="mb-5 hidden text-sm text-muted lg:block">
              <span className="font-semibold text-main">{results.length}</span>{" "}
              proqram tapıldı
            </p>

            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass flex flex-col items-center rounded-2xl px-6 py-20 text-center"
              >
                <span className="text-4xl" aria-hidden="true">
                  🔍
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-main">
                  Nəticə tapılmadı
                </h2>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  Axtarış şərtlərinizi dəyişin və ya filtrləri sıfırlayın.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-glow/35 bg-glow/10 px-5 py-2.5 text-sm font-semibold text-glow transition-colors hover:bg-glow/20"
                >
                  <RotateCcw className="h-4 w-4" />
                  Filtrləri sıfırla
                </button>
              </motion.div>
            ) : (
              <ul className="grid gap-5 sm:grid-cols-2">
                <AnimatePresence>
                  {results.map((course, i) => (
                    <motion.li
                      key={course.id}
                      id={`kurs-${course.id}`}
                      layout
                      className="scroll-mt-28"
                      initial={{ opacity: 0, y: 24, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        // delay:0 stops the exit inheriting the stagger delay below.
                        transition: { duration: 0.2, delay: 0 },
                      }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
                    >
                      <CourseCard course={course} expandable />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
