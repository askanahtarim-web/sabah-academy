import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Əlaqə",
  description:
    "SABAH Educational Academy ilə əlaqə saxlayın. Bakı, Azərbaycan. Kurslar barədə ətraflı məlumat üçün formu doldurun.",
};

const INFO = [
  {
    Icon: MapPin,
    title: "Ünvan",
    lines: ["Bakı, Azərbaycan"],
  },
  {
    Icon: Phone,
    title: "Telefon",
    lines: ["+994 XX XXX XX XX"],
    href: "tel:+994000000000",
  },
  {
    Icon: Mail,
    title: "E-poçt",
    lines: ["info@sabahacademy.az"],
    href: "mailto:info@sabahacademy.az",
  },
  {
    Icon: Clock,
    title: "İş Saatları",
    lines: ["B.e — Cümə: 09:00 – 19:00", "Şənbə: 10:00 – 16:00", "Bazar: Bağlıdır"],
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(0,63,138,0.45),transparent_70%)]"
        />
        <div className="shell mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-glow">
            Əlaqə
          </p>
          <h1 className="mt-3 font-display text-section font-extrabold text-main">
            Bizimlə <span className="text-gradient">Əlaqə Saxlayın</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Sualınız var? Formu doldurun, komandamız bir iş günü ərzində geri
            dönüş etsin.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Suspense
            fallback={
              <div className="glass min-h-[560px] animate-pulse rounded-2xl" />
            }
          >
            <ContactForm />
          </Suspense>

          <div className="space-y-4">
            {INFO.map(({ Icon, title, lines, href }) => (
              <div
                key={title}
                className="glass glass-hover flex gap-4 rounded-2xl p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-glow/20 bg-glow/5">
                  <Icon className="h-5 w-5 text-glow" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-main">
                    {title}
                  </h2>
                  <div className="mt-2 space-y-1 text-sm text-muted">
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          className="block break-all transition-colors hover:text-glow"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line}>{line}</p>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="glass overflow-hidden rounded-2xl">
              <div className="relative flex h-52 items-center justify-center bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,63,138,0.5),transparent_70%)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 dot-grid opacity-50"
                />
                <div className="relative flex flex-col items-center text-center">
                  <MapPin className="h-8 w-8 text-glow" aria-hidden="true" />
                  <p className="mt-3 font-display font-bold text-main">
                    Bakı, Azərbaycan
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Kampusumuza baş çəkin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
