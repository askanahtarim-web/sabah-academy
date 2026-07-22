export type Testimonial = {
  name: string;
  role: string;
  company: string;
  stars: number;
  text: string;
  /** Gradient for the initials avatar. */
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aytən Həsənova",
    role: "Baş Mühasib",
    company: "AzərGold",
    stars: 5,
    text: "SABAH Academy sayəsində 3 ayda mühasibatı sıfırdan öyrənib işə düzəldim. Müəllimlər inanılmaz peşəkardır.",
    avatar: "linear-gradient(135deg, #4FA3FF 0%, #003F8A 100%)",
  },
  {
    name: "Kamran Əliyev",
    role: "HR Menecer",
    company: "Kapital Bank",
    stars: 5,
    text: "HR proqramı çox praktikdir. Kurs zamanı real layihələr üzərində işlədik. İşəgötürənlər sertifikatı tanıyır.",
    avatar: "linear-gradient(135deg, #F0B429 0%, #B26B00 100%)",
  },
  {
    name: "Nigar Məmmədova",
    role: "Maliyyə Analitiki",
    company: "PASHA Holding",
    stars: 5,
    text: "Excel kursu karyeramı dəyişdirdi. İndi rəhbərliyim üçün mürəkkəb maliyyə hesabatları hazırlayıram.",
    avatar: "linear-gradient(135deg, #2D7DD2 0%, #1a0050 100%)",
  },
];

/** Initials are derived per-render; Azerbaijani uppercase needs the az locale
 *  so that i → İ rather than I. */
export function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toLocaleUpperCase("az"))
    .join("");
}
