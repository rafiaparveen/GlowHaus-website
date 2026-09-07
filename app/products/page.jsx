"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Filter, Sparkles } from "lucide-react";

const allProducts = [
  { name: "Velvet Lip Rouge", category: "Lips", price: "₨7,900", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85", color: "#c45b78", bg: "#fde8ef", desc: "Long-wearing satin finish in 24 shades. Transfer-proof and hydrating." },
  { name: "Berry Lip Gloss", category: "Lips", price: "₨5,100", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85", color: "#a33658", bg: "#f9e8ef", desc: "High-shine non-sticky gloss with plumping complex." },
  { name: "Skin Veil Foundation", category: "Face", price: "₨11,900", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85", color: "#e8829b", bg: "#fff0f5", desc: "Breathable, buildable second-skin coverage. SPF 20." },
  { name: "Petal Blush", category: "Face", price: "₨6,800", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85", color: "#c45b78", bg: "#fde8ef", desc: "Finely-milled powder blush. Buildable, natural flush." },
  { name: "Lash Drama Mascara", category: "Eyes", price: "₨6,200", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85", color: "#6b2e47", bg: "#f5e8ef", desc: "Volumising, lengthening formula. Clump-free all day." },
  { name: "Smoky Quad Palette", category: "Eyes", price: "₨10,700", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=900&q=85", color: "#a33658", bg: "#f9e8ef", desc: "Four curated shades for every occasion. Silky texture." },
  { name: "Glow Highlighter", category: "Face", price: "₨8,900", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85", color: "#e8829b", bg: "#fff0f5", desc: "Iridescent luminiser for a lit-from-within glow." },
  { name: "Hydro-Glow Serum", category: "Skincare", price: "₨13,500", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85", color: "#c45b78", bg: "#fde8ef", desc: "Hyaluronic acid + ceramide serum. 72-hour hydration." },
  { name: "Precision Liner", category: "Eyes", price: "₨5,400", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85", color: "#6b2e47", bg: "#f5e8ef", desc: "Ultra-fine tip for flawless wings. 24h wear." },
  { name: "Setting Powder", category: "Face", price: "₨7,300", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85", color: "#a33658", bg: "#f9e8ef", desc: "Translucent powder. Blurs pores, locks makeup." },
  { name: "Nude Lip Liner", category: "Lips", price: "₨4,200", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85", color: "#c45b78", bg: "#fde8ef", desc: "Long-wearing liner in 12 nude shades." },
  { name: "Rose Clay Mask", category: "Skincare", price: "₨9,500", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85", color: "#e8829b", bg: "#fff0f5", desc: "Deep cleansing mask with kaolin clay and rose extract." },
];

const categories = ["All", "Lips", "Face", "Eyes", "Skincare"];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `all 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProducts : allProducts.filter(p => p.category === active);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 68 }}>
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #3d1a28, #6b2e47)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
            <Sparkles size={14} color="#e8829b" />
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#e8829b" }}>GLOWHAUS COLLECTION</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#fdf8f5" }}>
            Our Products
          </h1>
          <p style={{ color: "#c49aaf", marginTop: "0.75rem", maxWidth: 500, margin: "0.75rem auto 0" }}>
            Cruelty-free cosmetics crafted for every skin tone and type.
          </p>
        </div>

        {/* Filters */}
        <div style={{ background: "#fdf8f5", padding: "1.5rem 1.5rem", borderBottom: "1px solid #e8d5c4" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Filter size={16} color="#8a5068" />
            <span style={{ fontSize: "0.82rem", color: "#8a5068", fontWeight: 500 }}>Filter:</span>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: "0.4rem 1.1rem", borderRadius: "999px", border: "1.5px solid",
                borderColor: active === cat ? "#c45b78" : "#e8d5c4",
                background: active === cat ? "linear-gradient(135deg, #c45b78, #a33658)" : "#fff",
                color: active === cat ? "#fff" : "#6b2e47",
                fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.06}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ProductCard({ product: p }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        boxShadow: hover ? "0 14px 36px rgba(196,91,120,0.16)" : "0 2px 14px rgba(61,26,40,0.07)",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.3s ease", border: "1px solid #f5ede6",
      }}
    >
      <div style={{ background: p.bg, height: 170, overflow: "hidden" }}>
        <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", transform: hover ? "scale(1.08)" : "scale(1)" }} />
      </div>
      <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: p.color, fontWeight: 500 }}>{p.category}</span>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 500, color: "#3d1a28", margin: "0.2rem 0 0.4rem" }}>{p.name}</h3>
        <p style={{ fontSize: "0.82rem", color: "#8a5068", lineHeight: 1.65, marginBottom: "1rem" }}>{p.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: "#3d1a28" }}>{p.price}</span>
          <Link href="/signup" style={{
            textDecoration: "none", fontSize: "0.8rem", fontWeight: 500,
            background: "linear-gradient(135deg, #c45b78, #a33658)", color: "#fff",
            padding: "0.4rem 0.9rem", borderRadius: "999px",
          }}>Add to Bag</Link>
        </div>
      </div>
    </div>
  );
}
