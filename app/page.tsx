import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CourseShowcase from "@/components/home/CourseShowcase";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CourseShowcase />
      <Stats />
      <Testimonials />
      <Partners />
      <CTABanner />
    </>
  );
}
