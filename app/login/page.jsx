"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setServerError("");
    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setServerError(data.error || "Login failed."); return; }
      router.push("/dashboard");
    } catch (error) {
      setServerError(error.name === "AbortError" ? "Database is not connected yet. Please try again after MongoDB Atlas is available." : "Network error. Please try again.");
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #3d1a28 0%, #6b2e47 40%, #c45b78 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ position: "fixed", top: "-10%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,216,229,0.12), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,216,229,0.1), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", color: "rgba(249,232,239,0.7)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderRadius: 24, padding: "2.5rem", boxShadow: "0 12px 50px rgba(0,0,0,0.25)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <Sparkles size={20} color="#c45b78" />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#c45b78" }}>GlowHaus</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#3d1a28", marginBottom: "0.4rem" }}>Welcome Back</h1>
            <p style={{ fontSize: "0.875rem", color: "#8a5068" }}>Sign in to your beauty account</p>
          </div>

          {serverError && (
            <div style={{ background: "#fde8ef", border: "1px solid #f3c5d5", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#a33658", fontSize: "0.85rem" }}>
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <Field label="Email" error={errors.email}>
              <input
                type="email" placeholder="jane@email.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle(!!errors.email)}
              />
            </Field>

            <Field label="Password" error={errors.password}>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"} placeholder="Your password"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  style={{ ...inputStyle(!!errors.password), paddingRight: "2.75rem" }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8a5068" }}>
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </Field>

            <button
              type="submit" disabled={loading}
              style={{
                marginTop: "0.5rem", padding: "0.85rem", borderRadius: "999px", border: "none", cursor: loading ? "not-allowed" : "pointer",
                background: loading ? "#e8d5c4" : "linear-gradient(135deg, #c45b78, #a33658)",
                color: "#fff", fontWeight: 500, fontSize: "0.95rem",
                boxShadow: loading ? "none" : "0 4px 18px rgba(196,91,120,0.35)",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#8a5068" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#c45b78", fontWeight: 500, textDecoration: "none" }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 500, color: "#3d1a28", marginBottom: "0.4rem" }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: "0.78rem", color: "#c45b78", marginTop: "0.3rem" }}>{error}</p>}
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: "100%", padding: "0.7rem 1rem", borderRadius: 12, outline: "none",
    border: `1.5px solid ${hasError ? "#c45b78" : "#e8d5c4"}`,
    background: "#fdf8f5", color: "#3d1a28", fontSize: "0.9rem",
    transition: "border-color 0.2s", boxSizing: "border-box",
  };
}
