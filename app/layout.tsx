import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "The Perspective Engine — Recurse Theory of Consciousness",
  description:
    "An interactive exploration of the Recurse Theory of Consciousness. Consciousness is not a thing inside the brain. It is a recursively stabilized perspective.",
  authors: [{ name: "Ryan Erbe" }],
  openGraph: {
    title: "The Perspective Engine",
    description:
      "An interactive model of the Recurse Theory of Consciousness — bounded recursion, salience, continuity, and the architecture of perspective.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main style={{ paddingTop: 56 }}>{children}</main>
      </body>
    </html>
  );
}
