"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Mail, ShoppingBag, Heart, Star, LogOut, Calendar, Crown } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user) { router.push("/login"); return; }
        setUser(d.user);
        setTimeout(() => setVisible(true), 100);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #fdf8f5, #fde8ef)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "3px solid #f3c5d5", borderTop: "3px solid #c45b78", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
          <p style={{ color: "#8a5068", fontSize: "0.875rem" }}>Loading your profile…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  const joinDate = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const cards = [
    { title: "My Profile", desc: "View and edit your personal details", Icon: User, color: "#c45b78", bg: "#fde8ef", emoji: "👤" },
    { title: "Beauty Collection", desc: "Your saved products and wishlist", Icon: Heart, color: "#a33658", bg: "#f9e8ef", emoji: "💄" },
    { title: "Account Status", desc: "Active — Beauty Member", Icon: Crown, color: "#6b2e47", bg: "#f5e8ef", emoji: "👑" },
    { title: "My Orders", desc: "Track and view your past orders", Icon: ShoppingBag, color: "#e8829b", bg: "#fff0f5", emoji: "🛍" },
    { title: "Favourites", desc: "Products you&apos;ve hearted", Icon: Star, color: "#c45b78", bg: "#fde8ef", emoji: "⭐" },
    { title: "Member Since", desc: `Joined ${joinDate}`, Icon: Calendar, color: "#a33658", bg: "#f9e8ef", emoji: "🌸" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fdf8f5, #fde8ef)" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #3d1a28, #6b2e47)", padding: "1.25rem 1.5rem", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 20px rgba(61,26,40,0.3)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Sparkles size={20} color="#e8829b" />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fdf8f5" }}>GlowHaus</span>
          </Link>
          <button
            onClick={handleLogout} disabled={loggingOut}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#f9e8ef", padding: "0.5rem 1.1rem", borderRadius: "999px",
              cursor: loggingOut ? "not-allowed" : "pointer", fontSize: "0.85rem", fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            <LogOut size={15} />
            {loggingOut ? "Logging out…" : "Logout"}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
        {/* Welcome banner */}
        <div style={{
          background: "linear-gradient(135deg, #c45b78, #a33658, #6b2e47)",
          borderRadius: 24, padding: "2.5rem", marginBottom: "2rem", color: "#fff",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-20%", right: "-5%", width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-30%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
          <p style={{ fontSize: "0.82rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>WELCOME BACK</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, marginBottom: "0.5rem" }}>
            Hello, <em>{user.name}</em> 💄
          </h1>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>You&apos;re logged in as a Beauty Member. Welcome to your personal dashboard.</p>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Mail size={15} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.85)" }}>{user.email}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Crown size={15} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.85)" }}>Beauty Member</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#3d1a28", marginBottom: "1.25rem" }}>Your Dashboard</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          {cards.map((card, i) => (
            <DashCard key={card.title} card={card} delay={i * 0.07} visible={visible} />
          ))}
        </div>

        {/* Quick links */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "1.75rem", border: "1px solid #f5ede6", boxShadow: "0 2px 12px rgba(61,26,40,0.06)" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500, color: "#3d1a28", marginBottom: "1rem" }}>Quick Actions</h3>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {[["Browse Products", "/products", "#c45b78"], ["About Us", "/about", "#6b2e47"], ["Contact", "/contact", "#a33658"]].map(([label, href, color]) => (
              <Link key={label} href={href} style={{
                textDecoration: "none", padding: "0.5rem 1.25rem", borderRadius: "999px",
                border: `1.5px solid ${color}`, color, fontSize: "0.875rem", fontWeight: 500,
                transition: "all 0.2s",
              }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function DashCard({ card, delay, visible }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff", borderRadius: 20, padding: "1.5rem", cursor: "pointer",
        boxShadow: hover ? "0 12px 32px rgba(196,91,120,0.15)" : "0 2px 12px rgba(61,26,40,0.06)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease", border: "1px solid #f5ede6",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 14, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", fontSize: "1.4rem" }}>
        {card.emoji}
      </div>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.3rem" }}>{card.title}</h4>
      <p style={{ fontSize: "0.82rem", color: "#8a5068", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: card.desc }} />
    </div>
  );
}
