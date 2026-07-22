import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "white" | "gold";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-blue-gradient text-white shadow-glow hover:shadow-glow-lg border border-glow/40",
  outline:
    "border border-glow/35 bg-glow/5 text-main hover:border-glow/70 hover:bg-glow/10",
  white: "bg-white text-deep font-bold hover:bg-main shadow-lg",
  gold: "bg-gold text-deep font-bold hover:brightness-110 shadow-[0_0_24px_-6px_rgba(240,180,41,0.7)]",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold font-display tracking-tight " +
  "transition-[transform,box-shadow,background-color,border-color] duration-300 will-change-transform " +
  "hover:scale-[1.03] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Adds the expanding halo used by the hero's primary call to action. */
  pulse?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    keyof CommonProps | "href"
  >;
type ButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof CommonProps
  >;

export default function GlowButton(props: AnchorProps | ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    pulse = false,
    className = "",
    children,
    ...rest
  } = props;

  const classes = [
    BASE,
    VARIANTS[variant],
    SIZES[size],
    pulse ? "animate-pulse-glow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
