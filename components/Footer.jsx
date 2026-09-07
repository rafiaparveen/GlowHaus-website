import Link from "next/link";
import { Sparkles, Share2, Music, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#3d1a28", color: "#f9e8ef", padding: "3rem 1.5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Sparkles size={18} color="#e8829b" />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600 }}>GlowHaus</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#c49aaf", lineHeight: 1.7 }}>
              Premium cosmetics crafted for every skin tone. Beauty without compromise.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              {[Share2, Music, Camera].map((Icon, i) => (
                <Icon key={i} size={18} color="#e8829b" style={{ cursor: "pointer" }} />
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#e8829b", marginBottom: "1rem" }}>Shop</h4>
            {["Lipstick", "Foundation", "Mascara", "Eyeshadow", "Highlighter", "Blush"].map((item) => (
              <div key={item} style={{ marginBottom: "0.5rem" }}>
                <Link href="/products" style={{ color: "#c49aaf", textDecoration: "none", fontSize: "0.875rem" }}>{item}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#e8829b", marginBottom: "1rem" }}>Company</h4>
            {[["About", "/about"], ["Contact", "/contact"], ["Login", "/login"], ["Sign Up", "/signup"]].map(([label, href]) => (
              <div key={label} style={{ marginBottom: "0.5rem" }}>
                <Link href={href} style={{ color: "#c49aaf", textDecoration: "none", fontSize: "0.875rem" }}>{label}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#e8829b", marginBottom: "1rem" }}>Newsletter</h4>
            <p style={{ fontSize: "0.85rem", color: "#c49aaf", marginBottom: "0.75rem" }}>Get beauty tips and exclusive offers.</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input placeholder="Your email" style={{ flex: 1, padding: "0.5rem 0.75rem", borderRadius: "999px", border: "1px solid #6b2e47", background: "#4d2035", color: "#f9e8ef", fontSize: "0.85rem", outline: "none" }} />
              <button style={{ padding: "0.5rem 1rem", borderRadius: "999px", background: "#c45b78", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.85rem" }}>Join</button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #4d2035", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#8a5068" }}>© 2024 GlowHaus. All rights reserved.</p>
          <p style={{ fontSize: "0.8rem", color: "#8a5068" }}>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
