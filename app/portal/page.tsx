import type { Metadata } from "next";
import PortalShell from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: "Tələbə Portalı",
  description:
    "SABAH Educational Academy tələbə portalı — kurslarınıza, irəliləyişinizə və sertifikatlarınıza baxın.",
};

export default function PortalPage() {
  return <PortalShell />;
}
