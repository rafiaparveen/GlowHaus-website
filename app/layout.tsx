import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlowHaus — Premium Makeup & Cosmetics",
  description: "Discover luxury makeup and cosmetics that celebrate your natural beauty.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
