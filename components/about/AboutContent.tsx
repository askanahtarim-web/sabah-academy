"use client";

import { motion } from "framer-motion";
import { Compass, Target } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";

const TIMELINE = [
  {
    year: "2019",
    title: "Akademiya Yaradıldı",
    text: "SABAH Educational Academy Bakıda ilk auditoriyasını açdı və mühasibat üzrə ilk qrupunu qəbul etdi.",
  },
  {
    year: "2020",
    title: "İlk 100 Tələbə",
    text: "Bir il ərzində 100-dən çox tələbə proqramlarımızı tamamlayaraq sertifikat qazandı.",
  },
  {
    year: "2021",
    title: "Onlayn Keçid",
    text: "Tam funksional onlayn tədris platforması istifadəyə verildi — regionlardan da qoşulmaq mümkün oldu.",
  },
  {
    year: "2022",
    title: "500+ Məzun",
    text: "Məzunlarımızın sayı 500-ü keçdi, korporativ tərəfdaşlıq şəbəkəmiz genişləndi.",
  },
  {
    year: "2024",
    title: "Yeni Kampus",
    text: "Müasir texnologiya ilə təchiz olunmuş yeni kampusumuz qapılarını açdı.",
  },
];

const VALUES = [
  {
    icon: "🎓",
    title: "Keyfiyyət",
    text: "Hər proqram beynəlxalq metodikaya əsaslanır və mütəmadi yenilənir.",
  },
  {
    icon: "🛠️",
    title: "Praktiklik",
    text: "Dərslərin 70%-i real iş ssenariləri üzərində praktik tapşırıqlardır.",
  },
  {
    icon: "🤝",
    title: "Şəffaflıq",
    text: "Aydın qiymət siyasəti, gizli ödəniş yoxdur, nəticələr açıq paylaşılır.",
  },
  {
    icon: "📈",
    title: "Davamlı İnkişaf",
    text: "Məzunlarımız kurs bitdikdən sonra da icmamızın bir hissəsi olaraq qalır.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
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
              Haqqımızda
            </p>
            <h1 className="mt-3 font-display text-section font-extrabold text-main">
              Peşəkar Təhsilin <span className="text-gradient">Ünvanı</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted">
              2019-cu ildən bəri Azərbaycanda mühasibat, HR və maliyyə
              sahələrində praktik biliklər verən komandayıq.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="pb-8">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="shell grid gap-5 md:grid-cols-2"
        >
          <motion.article
            variants={fadeUp}
            className="glass glass-hover rounded-2xl p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-glow/20 bg-glow/5">
              <Target className="h-6 w-6 text-glow" aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold text-main">
              Missiyamız
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Peşəkar təhsili beynəlxalq standartlara uyğunlaşdırmaq və hər bir
              tələbəyə əmək bazarında real tələb olunan bacarıqları
              qazandırmaq. Biz nəzəriyyəni deyil, işə düzəlməyə aparan praktik
              bacarıqları öyrədirik.
            </p>
          </motion.article>

          <motion.article
            variants={fadeUp}
            className="glass glass-hover rounded-2xl p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/5">
              <Compass className="h-6 w-6 text-gold" aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold text-main">
              Vizyonumuz
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              2030-cu ilədək regionun aparıcı peşəkar təhsil mərkəzinə
              çevrilmək. Məzunlarımızın Azərbaycanın maliyyə və insan resursları
              sektorunda söz sahibi mütəxəssislər kimi tanınmasını istəyirik.
            </p>
          </motion.article>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Yolumuz"
            title={
              <>
                İllər üzrə <span className="text-gradient">İnkişafımız</span>
              </>
            }
          />

          <div className="relative mx-auto mt-16 max-w-4xl">
            {/* Spine: left-aligned on mobile, centred from md up. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-glow/35 to-transparent md:left-1/2 md:-translate-x-1/2"
            />

            <ol className="space-y-10">
              {TIMELINE.map((item, i) => {
                const right = i % 2 === 1;
                return (
                  <motion.li
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="relative pl-12 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
                  >
                    {/* Node */}
                    <span
                      aria-hidden="true"
                      className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-glow shadow-[0_0_0_4px_rgba(79,163,255,0.16)] md:left-1/2"
                    />

                    <div
                      className={
                        right
                          ? "md:col-start-2 md:pl-4"
                          : "md:col-start-1 md:row-start-1 md:pr-4 md:text-right"
                      }
                    >
                      <div className="glass glass-hover rounded-2xl p-6">
                        <span className="font-display text-sm font-bold tracking-[0.14em] text-gold">
                          {item.year}
                        </span>
                        <h3 className="mt-2 font-display text-lg font-bold text-main">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad pt-0">
        <div className="shell">
          <SectionHeading
            eyebrow="Dəyərlərimiz"
            title={
              <>
                Bizi <span className="text-gradient">Fərqləndirən</span> Nədir?
              </>
            }
          />

          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >
            {VALUES.map((value) => (
              <motion.li
                key={value.title}
                variants={fadeUp}
                className="glass glass-hover rounded-2xl p-5 sm:p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-glow/20 bg-glow/5 text-2xl">
                  <span aria-hidden="true">{value.icon}</span>
                </span>
                <h3 className="mt-5 font-display text-base font-bold text-main sm:text-lg">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {value.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
