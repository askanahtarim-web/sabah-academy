"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, Menu, X } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const LINKS = [
  { href: "/", label: "Ana Səhifə" },
  { href: "/courses", label: "Təlimlər" },
  { href: "/about", label: "Haqqımızda" },
  { href: "/contact", label: "Əlaqə" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll and allow Escape to dismiss while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-glow/20 bg-deep/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="shell flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="SABAH Educational Academy — ana səhifə">
          <Image
            src="/logo.png"
            alt="SABAH Educational Academy"
            width={912}
            height={240}
            priority
            className="h-9 w-auto [filter:brightness(0)_invert(1)]"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={[
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-main"
                    : "text-muted hover:text-main",
                ].join(" ")}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-glow shadow-glow"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/portal"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-glow"
          >
            <LogIn className="h-4 w-4" />
            Portal
          </Link>
          <GlowButton href="/contact" size="sm">
            Qeydiyyatdan Keç
          </GlowButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-glow/25 bg-card/60 text-main transition-colors hover:border-glow/60 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-drawer"
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-glow/10 bg-deep/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-4">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={[
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-glow/10 text-glow"
                        : "text-muted hover:bg-white/5 hover:text-main",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Link
                  href="/portal"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-main"
                >
                  <LogIn className="h-4 w-4" />
                  Tələbə Portalı
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="pt-2"
              >
                <GlowButton href="/contact" className="w-full">
                  Qeydiyyatdan Keç
                </GlowButton>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
