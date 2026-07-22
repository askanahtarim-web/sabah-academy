import type { Config } from "tailwindcss";

// Colour keys are named so the utility classes read exactly as the design system
// does: bg-deep, bg-card, text-main, text-muted, border-glow, text-gold.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "#04090F",
        card: "#0A1628",
        primary: "#003F8A",
        accent: "#2D7DD2",
        glow: "#4FA3FF",
        gold: "#F0B429",
        main: "#E8EDF5",
        muted: "#8899AA",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 7vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        section: ["clamp(1.875rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        shell: "1280px",
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(79,163,255,0.45)",
        "glow-lg": "0 0 48px -8px rgba(79,163,255,0.55)",
        card: "0 18px 40px -24px rgba(0,0,0,0.9)",
        "card-hover": "0 24px 60px -28px rgba(79,163,255,0.5)",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(120deg, #4FA3FF 0%, #2D7DD2 55%, #003F8A 100%)",
        "cta-gradient": "linear-gradient(120deg, #003F8A 0%, #10154a 55%, #1a0050 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(79,163,255,0.45)" },
          "70%": { boxShadow: "0 0 0 16px rgba(79,163,255,0)" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "pulse-glow": "pulse-glow 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        "scroll-dot": "scroll-dot 1.8s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
