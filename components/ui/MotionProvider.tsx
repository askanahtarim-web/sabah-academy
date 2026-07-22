"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes Framer Motion drop transform and layout
 * animations for anyone whose OS asks for reduced motion, so individual
 * components don't each have to branch on the media query.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
