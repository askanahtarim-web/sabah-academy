import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { courses } from "@/lib/courses-data";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";

const QUICK_LINKS = [
  { href: "/", label: "Ana Səhifə" },
  { href: "/courses", label: "Təlimlər" },
  { href: "/about", label: "Haqqımızda" },
  { href: "/contact", label: "Əlaqə" },
  { href: "/portal", label: "Tələbə Portalı" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com", Icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-deep">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:pr-6">
          <Image
            src="/logo.png"
            alt="SABAH Educational Academy"
            width={912}
            height={240}
            className="h-9 w-auto [filter:brightness(0)_invert(1)]"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Azərbaycanda peşəkar təhsilin ünvanı
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-glow/20 bg-card/70 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-glow/60 hover:text-glow"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-main">
            Sürətli Keçidlər
          </h3>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-glow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-main">
            Proqramlar
          </h3>
          <ul className="mt-5 space-y-3">
            {courses.map((course) => (
              <li key={course.id}>
                <Link
                  href={`/courses#kurs-${course.id}`}
                  className="text-sm text-muted transition-colors hover:text-glow"
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-main">
            Əlaqə
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
              <span>Bakı, Azərbaycan</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
              <a href="tel:+994000000000" className="transition-colors hover:text-glow">
                +994 XX XXX XX XX
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
              <a
                href="mailto:info@sabahacademy.az"
                className="break-all transition-colors hover:text-glow"
              >
                info@sabahacademy.az
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-glow/20">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} SABAH Educational Academy. Bütün hüquqlar
            qorunur.
          </p>
          <p>Bakı, Azərbaycan</p>
        </div>
      </div>
    </footer>
  );
}
