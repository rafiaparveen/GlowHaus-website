"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function SignupSuccess() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf8f5, #fde8ef, #f9d5e5)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem",
    }}>
      <div style={{ position: "fixed", top: "-10%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,130,155,0.2), transparent 70%)", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: 480, textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.92)",
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", borderRadius: 28, padding: "3rem 2.5rem", boxShadow: "0 8px 40px rgba(61,26,40,0.1)", border: "1px solid rgba(243,197,213,0.5)" }}>
          {/* Animated success icon */}
          <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 1.5rem" }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: "linear-gradient(135deg, #f9d5e5, #fde8ef)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 28px rgba(196,91,120,0.25)",
              animation: "pulse 2s infinite",
            }}>
              <span style={{ fontSize: "2.8rem" }}>🌸</span>
            </div>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
            <Sparkles size={16} color="#c45b78" />
            <span style={{ fontSize: "0.78rem", letterSpacing: "0.1em", color: "#c45b78", fontWeight: 500 }}>WELCOME TO GLOWHAUS</span>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 400, color: "#3d1a28", lineHeight: 1.2, marginBottom: "1rem" }}>
            Welcome to Our<br /><em style={{ color: "#c45b78" }}>Beauty Family!</em>
          </h1>

          <p style={{ color: "#6b2e47", lineHeight: 1.75, marginBottom: "0.75rem" }}>
            Your account has been created successfully.
          </p>
          <p style={{ color: "#8a5068", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            You now have access to exclusive offers, early launches, and your personal beauty collection. Log in to start exploring.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link href="/login" style={{
              textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              background: "linear-gradient(135deg, #c45b78, #a33658)", color: "#fff",
              padding: "0.85rem 2rem", borderRadius: "999px", fontWeight: 500, fontSize: "0.95rem",
              boxShadow: "0 4px 18px rgba(196,91,120,0.35)",
            }}>
              Continue to Login <ArrowRight size={17} />
            </Link>
            <Link href="/" style={{ textDecoration: "none", color: "#8a5068", fontSize: "0.85rem" }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 28px rgba(196,91,120,0.25); }
          50% { box-shadow: 0 8px 40px rgba(196,91,120,0.45); }
        }
      `}</style>
    </div>
  );
}
