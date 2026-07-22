"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { courses } from "@/lib/courses-data";
import { EASE } from "@/lib/motion";

type Field = "name" | "email" | "phone" | "course" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  course: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-ZƏəÖöÜüŞşÇçĞğİı]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Ad və soyadınızı daxil edin";
  else if (name.length < 3) errors.name = "Ad ən azı 3 simvol olmalıdır";

  const email = values.email.trim();
  if (!email) errors.email = "E-poçt ünvanınızı daxil edin";
  else if (!EMAIL_RE.test(email))
    errors.email = "Düzgün e-poçt ünvanı daxil edin — məsələn, ad@numune.az";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Telefon nömrənizi daxil edin";
  else if (!/^994\d{9}$/.test(digits) && !/^0\d{9}$/.test(digits))
    errors.phone = "Düzgün nömrə daxil edin — məsələn, +994 50 123 45 67";

  if (!values.course) errors.course = "Bir kurs seçin";

  const message = values.message.trim();
  if (!message) errors.message = "Mesajınızı yazın";
  else if (message.length < 10)
    errors.message = "Mesaj ən azı 10 simvol olmalıdır";

  return errors;
}

const inputBase =
  "w-full rounded-xl border bg-card/70 px-4 py-3 text-main outline-none transition-colors placeholder:text-muted/60 focus:border-glow/70";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Pre-select the course when arriving from a course card's "Qoşul" link.
  useEffect(() => {
    const id = searchParams.get("kurs");
    if (!id) return;
    const match = courses.find((c) => String(c.id) === id);
    if (match) setValues((v) => ({ ...v, course: match.title }));
  }, [searchParams]);

  const setField = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Re-validate live only once a field has been interacted with.
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: value }));
    }
  };

  const blur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      course: true,
      message: true,
    });
    if (Object.keys(found).length > 0) {
      document
        .querySelector<HTMLElement>('[data-invalid="true"]')
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    // No backend is wired up — this stands in for the network round-trip.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSent(true);
  };

  const show = (field: Field) => touched[field] && errors[field];

  const fieldProps = (field: Field) => ({
    id: field,
    value: values[field],
    onBlur: () => blur(field),
    "aria-invalid": Boolean(show(field)),
    "aria-describedby": show(field) ? `${field}-error` : undefined,
    className: `${inputBase} ${
      show(field) ? "border-red-400/70" : "border-glow/20"
    }`,
  });

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex flex-col items-center py-14 text-center"
            role="status"
            aria-live="polite"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-glow/40 bg-glow/10"
            >
              <svg
                viewBox="0 0 52 52"
                className="h-10 w-10"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M14 27l8 8 16-17"
                  stroke="#4FA3FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                />
              </svg>
            </motion.span>

            <h3 className="mt-7 font-display text-xl font-bold text-main">
              Mesajınız göndərildi!
            </h3>
            <p className="mt-2 text-sm text-muted">
              Tezliklə əlaqə saxlayacağıq.
            </p>

            <button
              type="button"
              onClick={() => {
                setValues(EMPTY);
                setErrors({});
                setTouched({});
                setSent(false);
              }}
              className="mt-8 rounded-full border border-glow/30 px-5 py-2.5 text-sm font-semibold text-glow transition-colors hover:border-glow/60 hover:bg-glow/10"
            >
              Yeni mesaj göndər
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="space-y-5"
          >
            <div data-invalid={Boolean(show("name"))}>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-main">
                Ad Soyad <span className="text-glow">*</span>
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Aytən Həsənova"
                onChange={(e) => setField("name", e.target.value)}
                {...fieldProps("name")}
              />
              {show("name") && (
                <p id="name-error" className="mt-1.5 text-xs text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div data-invalid={Boolean(show("email"))}>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-main">
                E-poçt <span className="text-glow">*</span>
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="ad@numune.az"
                onChange={(e) => setField("email", e.target.value)}
                {...fieldProps("email")}
              />
              {show("email") && (
                <p id="email-error" className="mt-1.5 text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div data-invalid={Boolean(show("phone"))}>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-main">
                Telefon <span className="text-glow">*</span>
              </label>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="+994 50 123 45 67"
                onChange={(e) => setField("phone", e.target.value)}
                {...fieldProps("phone")}
              />
              {show("phone") && (
                <p id="phone-error" className="mt-1.5 text-xs text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            <div data-invalid={Boolean(show("course"))}>
              <label htmlFor="course" className="mb-2 block text-sm font-medium text-main">
                Kurs seçin <span className="text-glow">*</span>
              </label>
              <select
                onChange={(e) => setField("course", e.target.value)}
                {...fieldProps("course")}
                className={`${fieldProps("course").className} cursor-pointer`}
              >
                <option value="">— Kurs seçin —</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.title}>
                    {course.title} ({course.duration})
                  </option>
                ))}
              </select>
              {show("course") && (
                <p id="course-error" className="mt-1.5 text-xs text-red-400">
                  {errors.course}
                </p>
              )}
            </div>

            <div data-invalid={Boolean(show("message"))}>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-main">
                Mesaj <span className="text-glow">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Sizə necə kömək edə bilərik?"
                onChange={(e) => setField("message", e.target.value)}
                {...fieldProps("message")}
                className={`${fieldProps("message").className} resize-y`}
              />
              {show("message") && (
                <p id="message-error" className="mt-1.5 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-glow/40 bg-blue-gradient px-6 py-3.5 font-display font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Göndərilir...
                </>
              ) : (
                <>
                  Mesajı Göndər
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted">
              * ilə işarələnmiş sahələr mütləqdir
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
