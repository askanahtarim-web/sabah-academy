import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "2019-cu ildən Azərbaycanda peşəkar təhsil. SABAH Educational Academy-nin missiyası, vizyonu, tarixçəsi və dəyərləri.",
};

export default function AboutPage() {
  return <AboutContent />;
}
