"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 68 }}>
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #fdf8f5, #fde8ef)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "#c45b78", marginBottom: "0.5rem" }}>GET IN TOUCH</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#3d1a28" }}>Contact Us</h1>
          <p style={{ color: "#6b2e47", marginTop: "0.75rem", maxWidth: 460, margin: "0.75rem auto 0", fontSize: "1rem" }}>
            Questions, feedback, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "4rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem", alignItems: "start" }} className="contact-grid">
            {/* Info */}
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400, color: "#3d1a28", marginBottom: "0.75rem" }}>We&apos;re Here For You</h2>
              <p style={{ color: "#6b2e47", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.9rem" }}>
                Our beauty team is available Monday–Saturday, 9am–6pm PKT. We typically respond within 24 hours.
              </p>

              {[
                { Icon: Mail, label: "Email", value: "hello@glowhaus.com", color: "#c45b78" },
                { Icon: Phone, label: "Phone", value: "+92 21 1234 5678", color: "#a33658" },
                { Icon: MapPin, label: "Studio", value: "Karachi, Pakistan", color: "#6b2e47" },
                { Icon: MessageCircle, label: "Live Chat", value: "Available on weekdays", color: "#e8829b" },
              ].map(({ Icon, label, value, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#8a5068", marginBottom: "0.15rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
                    <div style={{ fontSize: "0.9rem", color: "#3d1a28", fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background: "#fff", borderRadius: 24, padding: "2.5rem", border: "1px solid #f5ede6", boxShadow: "0 4px 24px rgba(61,26,40,0.07)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🌸</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#3d1a28", marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ color: "#6b2e47", lineHeight: 1.7 }}>Thank you for reaching out. We&apos;ll reply within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", borderRadius: "999px", background: "linear-gradient(135deg, #c45b78, #a33658)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 500 }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    <Sparkles size={18} color="#c45b78" />
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#3d1a28", fontWeight: 500 }}>Send a Message</h3>
                  </div>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.35rem" }}>Name</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Jane Smith"
                          style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: 10, border: "1.5px solid #e8d5c4", background: "#fdf8f5", color: "#3d1a28", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.35rem" }}>Email</label>
                        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="jane@email.com"
                          style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: 10, border: "1.5px solid #e8d5c4", background: "#fdf8f5", color: "#3d1a28", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.35rem" }}>Subject</label>
                      <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required placeholder="Order question, shade advice…"
                        style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: 10, border: "1.5px solid #e8d5c4", background: "#fdf8f5", color: "#3d1a28", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.35rem" }}>Message</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="Tell us how we can help…" rows={5}
                        style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: 10, border: "1.5px solid #e8d5c4", background: "#fdf8f5", color: "#3d1a28", fontSize: "0.875rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                    </div>
                    <button type="submit" style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      padding: "0.8rem", borderRadius: "999px", background: "linear-gradient(135deg, #c45b78, #a33658)",
                      color: "#fff", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "0.9rem",
                      boxShadow: "0 4px 16px rgba(196,91,120,0.3)",
                    }}>
                      <Send size={15} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
