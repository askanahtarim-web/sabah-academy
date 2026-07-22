import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/ui/MotionProvider";

// latin-ext is required for Azerbaijani: ə Ə ş Ş ğ Ğ İ all live outside the
// basic latin subset and would otherwise fall back to a system font.
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabahacademy.az"),
  title: {
    default: "SABAH Educational Academy — Peşəkar Təhsil Mərkəzi",
    template: "%s | SABAH Educational Academy",
  },
  description:
    "Mühasibat, HR və Maliyyə sahələrində sertifikatlı peşəkar proqramlar. Azərbaycanda peşəkar təhsilin ünvanı.",
  keywords: [
    "mühasibat kursu",
    "HR kursu",
    "1C mühasibat",
    "ACCA hazırlıq",
    "Bakı təlim mərkəzi",
    "SABAH Academy",
  ],
  icons: {
    icon: "/mark.png",
    apple: "/mark.png",
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    siteName: "SABAH Educational Academy",
    title: "SABAH Educational Academy — Peşəkar Təhsil Mərkəzi",
    description:
      "Mühasibat, HR və Maliyyə sahələrində sertifikatlı peşəkar proqramlar.",
  },
};

export const viewport: Viewport = {
  themeColor: "#04090F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-deep font-sans text-main antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-glow focus:px-5 focus:py-2 focus:font-semibold focus:text-deep"
        >
          Əsas məzmuna keç
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
