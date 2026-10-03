import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LogiCours — Théorie de la logistique",
  description: "Une bibliothèque claire et structurée pour apprendre la théorie de la logistique.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
