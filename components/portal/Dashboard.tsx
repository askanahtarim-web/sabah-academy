"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  LayoutDashboard,
  Lock,
  LogOut,
  Settings,
  TrendingUp,
} from "lucide-react";
import { courses } from "@/lib/courses-data";
import { EASE, fadeUp, stagger } from "@/lib/motion";

type View = "icmal" | "kurslarim" | "sertifikatlar" | "ayarlar";

const NAV: { id: View; label: string; Icon: typeof LayoutDashboard }[] = [
  { id: "icmal", label: "İcmal", Icon: LayoutDashboard },
  { id: "kurslarim", label: "Kurslarım", Icon: BookOpen },
  { id: "sertifikatlar", label: "Sertifikatlar", Icon: Award },
  { id: "ayarlar", label: "Ayarlar", Icon: Settings },
];

// Enrolled courses carry a progress figure; the 65/25 split averages to 45%.
const ENROLLED = [
  { id: 1, progress: 65, nextLesson: "Modul 5 — Pul vəsaitlərinin hərəkəti" },
  { id: 3, progress: 25, nextLesson: "Modul 2 — İşə qəbul prosesi" },
];
const RECOMMENDED = [5, 2];

const byId = (id: number) => courses.find((c) => c.id === id)!;

const averageProgress = Math.round(
  ENROLLED.reduce((sum, e) => sum + e.progress, 0) / ENROLLED.length,
);

export default function Dashboard({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  const [view, setView] = useState<View>("icmal");

  const STATS = [
    { Icon: BookOpen, value: `${ENROLLED.length}`, label: "Aktiv kurs" },
    {
      Icon: TrendingUp,
      value: `${averageProgress}%`,
      label: "Ortalama irəliləyiş",
    },
    { Icon: Award, value: "0", label: "Sertifikat" },
  ];

  const sidebar = (
    <nav className="flex gap-1 lg:flex-col">
      {NAV.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => setView(id)}
          aria-current={view === id ? "page" : undefined}
          className={[
            "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors lg:w-full",
            view === id
              ? "bg-glow/10 text-glow ring-1 ring-inset ring-glow/30"
              : "text-muted hover:bg-white/5 hover:text-main",
          ].join(" ")}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {label}
        </button>
      ))}
      <button
        type="button"
        onClick={onLogout}
        className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-red-500/10 hover:text-red-300 lg:mt-2 lg:w-full lg:border-t lg:border-glow/10 lg:pt-4"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
        Çıxış
      </button>
    </nav>
  );

  return (
    <div className="relative min-h-[100svh] pb-20 pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(0,63,138,0.35),transparent_70%)]"
      />

      <div className="shell grid gap-6 lg:grid-cols-[236px_1fr]">
        <aside>
          <div className="glass rounded-2xl p-4 lg:sticky lg:top-24">
            <div className="mb-4 hidden px-2 lg:block">
              <Image
                src="/logo.png"
                alt="SABAH Educational Academy"
                width={912}
                height={240}
                className="h-7 w-auto [filter:brightness(0)_invert(1)]"
              />
            </div>
            <div className="-mx-1 overflow-x-auto px-1 lg:overflow-visible">
              {sidebar}
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <h1 className="font-display text-2xl font-extrabold text-main sm:text-3xl">
                Xoş gəldiniz! <span aria-hidden="true">👋</span>
              </h1>
              <p className="mt-1.5 truncate text-sm text-muted">{email}</p>
            </div>
            <span className="rounded-full border border-glow/25 bg-glow/5 px-3 py-1.5 text-xs font-semibold text-glow">
              Tələbə hesabı
            </span>
          </motion.header>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {view === "icmal" && (
                <>
                  <motion.ul
                    variants={stagger(0.08)}
                    initial="hidden"
                    animate="show"
                    className="mt-8 grid gap-4 sm:grid-cols-3"
                  >
                    {STATS.map(({ Icon, value, label }) => (
                      <motion.li
                        key={label}
                        variants={fadeUp}
                        className="glass rounded-2xl p-5"
                      >
                        <Icon className="h-5 w-5 text-glow" aria-hidden="true" />
                        <p className="text-gradient mt-4 font-display text-3xl font-extrabold">
                          {value}
                        </p>
                        <p className="mt-1 text-sm text-muted">{label}</p>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <ActiveCourses />
                  <Recommended />
                </>
              )}

              {view === "kurslarim" && (
                <div className="mt-8">
                  <ActiveCourses bare />
                </div>
              )}

              {view === "sertifikatlar" && (
                <div className="glass mt-8 flex flex-col items-center rounded-2xl px-6 py-20 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-glow/20 bg-glow/5">
                    <Award className="h-7 w-7 text-glow" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-display text-lg font-bold text-main">
                    Hələ sertifikatınız yoxdur
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    Aktiv kursunuzu 100% tamamladıqdan sonra sertifikatınız
                    avtomatik olaraq burada görünəcək.
                  </p>
                  <button
                    type="button"
                    onClick={() => setView("kurslarim")}
                    className="mt-7 rounded-full border border-glow/35 bg-glow/10 px-5 py-2.5 text-sm font-semibold text-glow transition-colors hover:bg-glow/20"
                  >
                    Kurslarıma keç
                  </button>
                </div>
              )}

              {view === "ayarlar" && <SettingsPanel email={email} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ActiveCourses({ bare = false }: { bare?: boolean }) {
  return (
    <section className={bare ? "" : "mt-10"}>
      <h2 className="font-display text-lg font-bold text-main">
        Aktiv Kurslarım
      </h2>
      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        animate="show"
        className="mt-4 grid gap-4 sm:grid-cols-2"
      >
        {ENROLLED.map(({ id, progress, nextLesson }) => {
          const course = byId(id);
          return (
            <motion.li
              key={id}
              variants={fadeUp}
              className="glass glass-hover flex flex-col rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-glow/20 bg-glow/5 text-xl">
                  <span aria-hidden="true">{course.icon}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-main">
                    {course.title}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {nextLesson}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">İrəliləyiş</span>
                  <span className="font-semibold text-glow">{progress}%</span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-white/5"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${course.title} irəliləyişi`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                    className="h-full rounded-full bg-blue-gradient shadow-glow"
                  />
                </div>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-glow/35 bg-glow/10 px-4 py-2 text-sm font-semibold text-glow transition-all duration-300 hover:scale-[1.03] hover:bg-glow/20"
              >
                Davam et
                <span aria-hidden="true">→</span>
              </button>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}

function Recommended() {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg font-bold text-main">
        Tövsiyə Edilən
      </h2>
      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        animate="show"
        className="mt-4 grid gap-4 sm:grid-cols-2"
      >
        {RECOMMENDED.map((id) => {
          const course = byId(id);
          return (
            <motion.li
              key={id}
              variants={fadeUp}
              className="glass glass-hover relative flex flex-col overflow-hidden rounded-2xl p-5"
            >
              <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-glow/20 bg-card/80">
                <Lock className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              </span>

              <div className="flex items-start gap-3 pr-10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-glow/20 bg-glow/5 text-xl opacity-70">
                  <span aria-hidden="true">{course.icon}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-main">
                    {course.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {course.duration} · {course.level}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {course.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="font-display text-xl font-extrabold text-main">
                  {course.price}
                  <span className="ml-1 text-sm font-semibold text-muted">₼</span>
                </p>
                <Link
                  href={`/contact?kurs=${course.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.03]"
                >
                  Satın Al
                </Link>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}

function SettingsPanel({ email }: { email: string }) {
  const rows = [
    { label: "E-poçt", value: email },
    { label: "Hesab tipi", value: "Tələbə" },
    { label: "Dil", value: "Azərbaycan dili" },
    { label: "Bildirişlər", value: "E-poçt ilə aktiv" },
  ];

  return (
    <div className="glass mt-8 rounded-2xl p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-main">Hesab Ayarları</h2>
      <dl className="mt-6 divide-y divide-glow/10">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-wrap items-center justify-between gap-2 py-4"
          >
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-sm font-medium text-main">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 rounded-xl border border-glow/15 bg-glow/5 p-3 text-xs leading-relaxed text-muted">
        Nümayiş rejimində ayarların dəyişdirilməsi deaktivdir.
      </p>
    </div>
  );
}
