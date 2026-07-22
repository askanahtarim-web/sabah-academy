"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Info, Loader2, Lock, Mail } from "lucide-react";
import { EASE } from "@/lib/motion";

type Props = { onLogin: (email: string) => void };

export default function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Demo portal: any credentials are accepted, only presence is enforced.
    const found: typeof errors = {};
    if (!email.trim()) found.email = "E-poçt ünvanınızı daxil edin";
    if (!password) found.password = "Şifrənizi daxil edin";
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    onLogin(email.trim());
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_55%_at_50%_40%,rgba(0,63,138,0.5),transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 dot-grid opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass w-full max-w-md rounded-2xl p-7 sm:p-9"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="SABAH Educational Academy"
            width={912}
            height={240}
            className="h-9 w-auto [filter:brightness(0)_invert(1)]"
          />
          <h1 className="mt-7 font-display text-2xl font-bold text-main">
            Tələbə Portalı
          </h1>
          <p className="mt-2 text-sm text-muted">
            Davam etmək üçün hesabınıza daxil olun
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="portal-email"
              className="mb-2 block text-sm font-medium text-main"
            >
              E-poçt
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="portal-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((x) => ({ ...x, email: undefined }));
                }}
                placeholder="ad@numune.az"
                aria-invalid={Boolean(errors.email)}
                className={`w-full rounded-xl border bg-card/70 py-3 pl-11 pr-4 text-main outline-none transition-colors placeholder:text-muted/60 focus:border-glow/70 ${
                  errors.email ? "border-red-400/70" : "border-glow/20"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="portal-password"
              className="mb-2 block text-sm font-medium text-main"
            >
              Şifrə
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="portal-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((x) => ({ ...x, password: undefined }));
                }}
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                className={`w-full rounded-xl border bg-card/70 py-3 pl-11 pr-12 text-main outline-none transition-colors placeholder:text-muted/60 focus:border-glow/70 ${
                  errors.password ? "border-red-400/70" : "border-glow/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted transition-colors hover:text-glow"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                setToast("Demo məqsədli, şifrə sıfırlama aktiv deyil")
              }
              className="text-sm font-medium text-muted transition-colors hover:text-glow"
            >
              Şifrəni unutmuşam
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-glow/40 bg-blue-gradient px-6 py-3.5 font-display font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Daxil olunur...
              </>
            ) : (
              "Daxil ol"
            )}
          </button>
        </form>

        <p className="mt-6 flex items-start gap-2 rounded-xl border border-glow/15 bg-glow/5 p-3 text-xs leading-relaxed text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-glow" aria-hidden="true" />
          Nümayiş rejimi — istənilən e-poçt və şifrə ilə daxil ola bilərsiniz.
        </p>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="fixed inset-x-5 bottom-8 z-50 mx-auto w-fit max-w-[92vw]"
          >
            <div className="flex items-center gap-3 rounded-full border border-gold/35 bg-card/95 px-5 py-3 text-sm font-medium text-main shadow-card backdrop-blur">
              <Info className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
