"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => { if (d.user) setUser(d.user); })
      .catch(() => {});
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: scrolled ? "rgba(253,248,245,0.96)" : "rgba(253,248,245,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #e8d5c4" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <Sparkles size={22} color="#c45b78" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "#3d1a28", letterSpacing: "0.04em" }}>
            GlowHaus
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: isActive(l.href) ? "#c45b78" : "#6b2e47",
              borderBottom: isActive(l.href) ? "2px solid #c45b78" : "2px solid transparent",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}>
              {l.label}
            </Link>
          ))}

          {user ? (
            <Link href="/dashboard" style={{
              textDecoration: "none", fontSize: "0.875rem", fontWeight: 500,
              background: "linear-gradient(135deg, #c45b78, #a33658)",
              color: "#fff", padding: "0.45rem 1.1rem", borderRadius: "999px",
              transition: "opacity 0.2s",
            }}>
              My Account
            </Link>
          ) : (
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/login" style={{
                textDecoration: "none", fontSize: "0.875rem", fontWeight: 500,
                color: "#c45b78", border: "1.5px solid #c45b78",
                padding: "0.4rem 1rem", borderRadius: "999px", transition: "all 0.2s",
              }}>
                Login
              </Link>
              <Link href="/signup" style={{
                textDecoration: "none", fontSize: "0.875rem", fontWeight: 500,
                background: "linear-gradient(135deg, #c45b78, #a33658)",
                color: "#fff", padding: "0.45rem 1.1rem", borderRadius: "999px",
                transition: "opacity 0.2s",
              }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#3d1a28" }}
          className="hamburger-btn"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#fdf8f5", borderTop: "1px solid #e8d5c4",
          padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem",
        }} className="mobile-menu">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              textDecoration: "none", fontSize: "1rem", fontWeight: 500,
              color: isActive(l.href) ? "#c45b78" : "#3d1a28",
            }}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <Link href="/dashboard" onClick={() => setOpen(false)} style={{ textDecoration: "none", color: "#c45b78", fontWeight: 500 }}>
              My Account
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} style={{ textDecoration: "none", color: "#c45b78", fontWeight: 500 }}>Login</Link>
              <Link href="/signup" onClick={() => setOpen(false)} style={{ textDecoration: "none", color: "#c45b78", fontWeight: 600 }}>Sign Up</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
