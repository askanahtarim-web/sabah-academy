import type { Metadata } from "next";
import CoursesExplorer from "@/components/courses/CoursesExplorer";

export const metadata: Metadata = {
  title: "Təlimlər",
  description:
    "Mühasibat, HR və Maliyyə üzrə sertifikatlı təlim proqramları. Axtarın, filtrləyin və sizə uyğun kursu seçin.",
};

export default function CoursesPage() {
  return <CoursesExplorer />;
}
