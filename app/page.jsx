"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Star, Sparkles, Heart, Eye, Palette, Droplets } from "lucide-react";

const products = [
  { name: "Velvet Lip Rouge", category: "Lips", price: "₨7,900", desc: "Long-wearing satin finish in 24 shades", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85", color: "#c45b78", bg: "#fde8ef" },
  { name: "Skin Veil Foundation", category: "Face", price: "₨11,900", desc: "Breathable, buildable second-skin coverage", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85", color: "#a33658", bg: "#f9e8ef" },
  { name: "Petal Blush", category: "Face", price: "₨6,800", desc: "Finely-milled powder blush, natural flush", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85", color: "#e8829b", bg: "#fff0f5" },
  { name: "Lash Drama Mascara", category: "Eyes", price: "₨6,200", desc: "Volumising, lengthening, non-clump formula", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85", color: "#6b2e47", bg: "#f5e8ef" },
  { name: "Smoky Quad Palette", category: "Eyes", price: "₨10,700", desc: "Four curated shades for every occasion", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=900&q=85", color: "#c45b78", bg: "#fde8ef" },
  { name: "Glow Highlighter", category: "Face", price: "₨8,900", desc: "Iridescent luminiser for a lit-from-within glow", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85", color: "#a33658", bg: "#f9e8ef" },
];

const categories = [
  { name: "Lips", desc: "Lipsticks, glosses & liners", Icon: Heart, color: "#c45b78" },
  { name: "Face", desc: "Foundation, blush & bronzer", Icon: Sparkles, color: "#a33658" },
  { name: "Eyes", desc: "Shadows, liners & mascara", Icon: Eye, color: "#6b2e47" },
  { name: "Skincare", desc: "Serums, masks & more", Icon: Droplets, color: "#e8829b" },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, #fdf8f5 0%, #fde8ef 50%, #f9d5e5 100%)",
        paddingTop: 68, position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,130,155,0.25), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,91,120,0.18), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", width: "100%" }} className="hero-grid">
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateX(0)" : "translateX(-40px)", transition: "all 0.9s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fde8ef", border: "1px solid #f3c5d5", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "1.5rem" }}>
              <Sparkles size={13} color="#c45b78" />
              <span style={{ fontSize: "0.78rem", color: "#c45b78", fontWeight: 500, letterSpacing: "0.06em" }}>New Collection — Summer 2024</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 400, lineHeight: 1.15, color: "#3d1a28", marginBottom: "1.25rem" }}>
              Enhance Your<br /><em style={{ color: "#c45b78", fontStyle: "italic" }}>Natural Beauty</em>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#6b2e47", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 440 }}>
              Luxurious cosmetics formulated with skin-loving ingredients. From velvety lip colours to luminous foundations — beauty, redefined for every skin.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/products" style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, #c45b78, #a33658)", color: "#fff",
                padding: "0.8rem 1.75rem", borderRadius: "999px", fontWeight: 500, fontSize: "0.95rem",
                boxShadow: "0 4px 20px rgba(196,91,120,0.35)", transition: "transform 0.2s, box-shadow 0.2s",
              }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(196,91,120,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(196,91,120,0.35)"; }}>
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link href="/signup" style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "transparent", color: "#c45b78", border: "1.5px solid #c45b78",
                padding: "0.8rem 1.75rem", borderRadius: "999px", fontWeight: 500, fontSize: "0.95rem",
                transition: "all 0.2s",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#fde8ef"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                Create Account
              </Link>
            </div>
            <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem" }}>
              {[["200+", "Shades"], ["4.9★", "Rating"], ["50k+", "Customers"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "#3d1a28" }}>{n}</div>
                  <div style={{ fontSize: "0.78rem", color: "#8a5068", letterSpacing: "0.05em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateX(0)" : "translateX(40px)", transition: "all 0.9s ease 0.2s", display: "flex", justifyContent: "center" }} className="hero-visual">
            <div style={{ position: "relative", width: 380, height: 440 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "60% 40% 55% 45%", background: "linear-gradient(140deg, #f9d5e5, #fde8ef, #f3c5d5)", boxShadow: "0 20px 60px rgba(196,91,120,0.2)" }} />
              <div style={{ position: "absolute", inset: "15%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
                <div style={{ fontSize: "5rem" }}>💄</div>
                <div style={{ fontSize: "3.5rem", marginLeft: "3rem" }}>✨</div>
                <div style={{ fontSize: "4rem", marginRight: "2rem" }}>🌸</div>
                <div style={{ position: "absolute", top: "5%", right: "5%", background: "#fff", borderRadius: 12, padding: "0.5rem 0.75rem", boxShadow: "0 4px 16px rgba(196,91,120,0.2)", fontSize: "0.75rem", color: "#c45b78", fontWeight: 600 }}>✨ Cruelty-Free</div>
                <div style={{ position: "absolute", bottom: "10%", left: "0%", background: "#fff", borderRadius: 12, padding: "0.5rem 0.75rem", boxShadow: "0 4px 16px rgba(196,91,120,0.2)", fontSize: "0.75rem", color: "#c45b78", fontWeight: 600 }}>🌿 Vegan Formula</div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-visual { display: none !important; }
          }
        `}</style>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: "5rem 1.5rem", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.78rem", letterSpacing: "0.12em", color: "#c45b78", marginBottom: "0.5rem" }}>CURATED FOR YOU</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#3d1a28" }}>
                Bestselling Products
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {products.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "5rem 1.5rem", background: "linear-gradient(135deg, #fdf8f5, #fde8ef)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.78rem", letterSpacing: "0.12em", color: "#c45b78", marginBottom: "0.5rem" }}>EXPLORE</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#3d1a28" }}>Shop by Category</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {categories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.1}>
                <Link href="/products" style={{ textDecoration: "none" }}>
                  <CategoryCard cat={cat} />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ padding: "5rem 1.5rem", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontSize: "0.78rem", letterSpacing: "0.12em", color: "#c45b78", marginBottom: "0.5rem" }}>OUR STORY</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#3d1a28", marginBottom: "1.25rem" }}>
              Beauty That Honours Every Skin
            </h2>
            <p style={{ color: "#6b2e47", lineHeight: 1.85, fontSize: "1rem", maxWidth: 620, margin: "0 auto 2rem" }}>
              GlowHaus was founded on the belief that cosmetics should celebrate, not conceal. Every formula is dermatologist-tested, cruelty-free, and crafted in shades that work across the full spectrum of human skin.
            </p>
            <Link href="/about" style={{
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
              color: "#c45b78", fontWeight: 500, borderBottom: "1.5px solid #c45b78", paddingBottom: "2px",
            }}>
              Read our full story <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", background: "linear-gradient(135deg, #3d1a28, #6b2e47)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <Sparkles size={32} color="#f3c5d5" style={{ marginBottom: "1rem" }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, color: "#fdf8f5", marginBottom: "1rem" }}>
              Ready to Glow?
            </h2>
            <p style={{ color: "#c49aaf", marginBottom: "2rem", lineHeight: 1.75 }}>
              Join 50,000+ beauty lovers. Create your free account and get 15% off your first order.
            </p>
            <Link href="/signup" style={{
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "linear-gradient(135deg, #e8829b, #c45b78)", color: "#fff",
              padding: "0.9rem 2rem", borderRadius: "999px", fontWeight: 500, fontSize: "1rem",
              boxShadow: "0 4px 24px rgba(232,130,155,0.4)",
            }}>
              Create Your Account <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ProductCard({ product }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        boxShadow: hover ? "0 16px 40px rgba(196,91,120,0.18)" : "0 2px 16px rgba(61,26,40,0.07)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease", border: "1px solid #f5ede6",
      }}
    >
      <div style={{ background: product.bg, height: 180, overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", transform: hover ? "scale(1.05)" : "scale(1)" }} />
      </div>
      <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: product.color, fontWeight: 500 }}>{product.category}</span>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 500, color: "#3d1a28", margin: "0.25rem 0 0.4rem" }}>{product.name}</h3>
        <p style={{ fontSize: "0.85rem", color: "#8a5068", lineHeight: 1.6, marginBottom: "1rem" }}>{product.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#3d1a28" }}>{product.price}</span>
          <Link href="/products" style={{
            textDecoration: "none", fontSize: "0.82rem", fontWeight: 500,
            background: "linear-gradient(135deg, #c45b78, #a33658)", color: "#fff",
            padding: "0.4rem 1rem", borderRadius: "999px",
          }}>Shop</Link>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ cat }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff", borderRadius: 20, padding: "2rem 1.5rem",
        textAlign: "center", cursor: "pointer",
        boxShadow: hover ? "0 12px 32px rgba(196,91,120,0.18)" : "0 2px 12px rgba(61,26,40,0.06)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease", border: "1px solid #f5ede6",
      }}
    >
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${cat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
        <cat.Icon size={24} color={cat.color} />
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.4rem" }}>{cat.name}</h3>
      <p style={{ fontSize: "0.82rem", color: "#8a5068" }}>{cat.desc}</p>
    </div>
  );
}
