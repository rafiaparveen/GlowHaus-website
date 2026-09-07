"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, Leaf, Heart, Globe, ArrowRight } from "lucide-react";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `all 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const values = [
  { Icon: Leaf, title: "100% Cruelty-Free", desc: "Every product is certified cruelty-free. No animal testing, ever.", color: "#c45b78", bg: "#fde8ef" },
  { Icon: Heart, title: "Skin-Kind Formulas", desc: "Dermatologist tested. Free from parabens, sulphates, and synthetic fragrances.", color: "#a33658", bg: "#f9e8ef" },
  { Icon: Globe, title: "Sustainably Sourced", desc: "Packaging is recyclable. Ingredients are ethically and sustainably sourced.", color: "#6b2e47", bg: "#f5e8ef" },
  { Icon: Sparkles, title: "Inclusive Shade Ranges", desc: "Every product ships in shades designed to complement the full spectrum of human skin.", color: "#e8829b", bg: "#fff0f5" },
];

export default function About() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 68 }}>
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #fdf8f5, #fde8ef)", padding: "5rem 1.5rem", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#c45b78", marginBottom: "0.75rem" }}>OUR STORY</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 400, color: "#3d1a28", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              Beauty That Honours<br /><em style={{ color: "#c45b78" }}>Every Skin</em>
            </h1>
            <p style={{ color: "#6b2e47", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontSize: "1.05rem" }}>
              GlowHaus was born from a simple belief: cosmetics should be an act of celebration, not correction.
            </p>
          </FadeIn>
        </div>

        {/* Story section */}
        <section style={{ padding: "5rem 1.5rem", background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="about-grid">
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 400, color: "#3d1a28", marginBottom: "1.25rem" }}>How We Started</h2>
                  <p style={{ color: "#6b2e47", lineHeight: 1.85, marginBottom: "1rem" }}>
                    Founded in 2019, GlowHaus grew out of a frustration shared by millions — the makeup industry&apos;s persistent failure to offer inclusive shade ranges and truly skin-safe formulas.
                  </p>
                  <p style={{ color: "#6b2e47", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                    We spent two years in development, partnering with cosmetic chemists and dermatologists across three continents to build formulas that perform beautifully on every skin type and tone.
                  </p>
                  <Link href="/products" style={{
                    textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    color: "#c45b78", fontWeight: 500, borderBottom: "1.5px solid #c45b78", paddingBottom: "2px",
                  }}>
                    See our collection <ArrowRight size={15} />
                  </Link>
                </div>
                <div style={{ background: "linear-gradient(135deg, #fde8ef, #f9d5e5)", borderRadius: 24, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>💄✨</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#c45b78", fontStyle: "italic" }}>Beauty, redefined</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "5rem 1.5rem", background: "linear-gradient(135deg, #fdf8f5, #fde8ef)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#c45b78", marginBottom: "0.5rem" }}>WHAT WE STAND FOR</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400, color: "#3d1a28" }}>Our Values</h2>
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {values.map((v, i) => (
                <FadeIn key={v.title} delay={i * 0.1}>
                  <div style={{ background: "#fff", borderRadius: 20, padding: "2rem 1.5rem", border: "1px solid #f5ede6", boxShadow: "0 2px 12px rgba(61,26,40,0.06)" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                      <v.Icon size={22} color={v.color} />
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.5rem" }}>{v.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#8a5068", lineHeight: 1.7 }}>{v.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: "linear-gradient(135deg, #3d1a28, #6b2e47)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", textAlign: "center" }}>
                {[["50k+", "Happy Customers"], ["200+", "Shades Available"], ["4.9★", "Average Rating"], ["30+", "Countries Served"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#f9e8ef" }}>{n}</div>
                    <div style={{ fontSize: "0.82rem", color: "#c49aaf", marginTop: "0.25rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
      <Footer />
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
