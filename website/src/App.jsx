import { useState } from "react";


// Quantum Design System — Cyberpunk (Dark-first, Lime + Neon Cyan)
// Mirrors the CSS custom properties in index.css; hover, focus and effects live there.
const tokens = {
  bg:          "#0D1117",
  bgSurface:   "#161B24",
  bgRaised:    "#111823",
  bgDeep:      "#05070A",
  accent:      "#B5FF4D",
  accentFg:    "#0D1117",
  neonCyan:    "#00F0FF",
  neonPink:    "#FF2E97",
  text:        "#FFFFFF",
  textBody:    "#C9D1D9",
  textMuted:   "#8B98AB",
  border:      "#1E2A3A",
  white:       "#FFFFFF",
};

const fonts = {
  display: "'Space Grotesk', sans-serif",
  body:    "'Inter', sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
};

const styles = {
  global: {
    fontFamily: fonts.body,
    color: tokens.textBody,
    backgroundColor: tokens.bg,
    margin: 0,
    padding: 0,
  },
};

/** Hero SVG pattern (same path as classic Hero Patterns tile); colors from tokens */
const HERO_PATTERN_PATH_D = "M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z";

function heroPatternDataUrl({ fill, fillOpacity }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 304" width="304" height="304"><path fill="${fill}" fill-opacity="${fillOpacity}" d="${HERO_PATTERN_PATH_D}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const pad2 = (n) => String(n).padStart(2, "0");

// ─── COMPONENTS ───────────────────────────────────────────────

function Badge({ children }) {
  return (
    <span className="badge cut-corners cut-border" style={{ "--cut": "6px" }}>
      <span className="badge-prefix" aria-hidden="true">//</span>
      {children}
    </span>
  );
}

function Logo({ size = 24 }) {
  return (
    <span style={{
      color: tokens.white,
      fontFamily: fonts.display,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: "-0.02em",
    }}>
      undefined<span style={{ color: tokens.accent }}>.academy</span>
      <span className="cursor-blink" aria-hidden="true" style={{ width: "0.4em", height: "0.85em", marginLeft: 3, verticalAlign: "-0.05em" }} />
    </span>
  );
}

function PrimaryButton({ children, onClick, size = "md", type = "button", disabled }) {
  return (
    <span className="cyber-btn-glow">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`cyber-btn cyber-btn-primary cyber-btn-${size} cut-corners`}
      >
        {children}
      </button>
    </span>
  );
}

function SubmitAccentButton({ children, disabled }) {
  return (
    <div style={{ marginTop: 4 }}>
      <span className="cyber-btn-glow" style={{ display: "block" }}>
        <button
          type="submit"
          disabled={disabled}
          className="cyber-btn cyber-btn-primary cyber-btn-lg cut-corners"
          style={{ width: "100%" }}
        >
          {children}
        </button>
      </span>
    </div>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <span className="cyber-btn-glow">
      <button type="button" onClick={onClick} className="cyber-btn cyber-btn-secondary cut-corners cut-border">
        {children}
      </button>
    </span>
  );
}

async function subscribeToBrevo({ name, email }) {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Error al suscribirse");
  }
}

function SignupModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribeToBrevo({ name, email });
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(5,7,10,0.85)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="cut-corners scanlines"
        style={{
          "--cut": "20px",
          backgroundColor: tokens.bgSurface,
          borderTop: `3px solid ${tokens.accent}`,
          padding: "40px 32px 32px",
          width: "100%",
          maxWidth: 440,
          maxHeight: "calc(100vh - 32px)",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            fontFamily: fonts.mono,
            color: tokens.textMuted,
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          ✕
        </button>

        <div style={{ position: "relative", zIndex: 2 }}>
          {status === "success" ? (
            <div style={{ padding: "8px 0 0", textAlign: "left" }}>
              <h3 id="signup-modal-title" style={{
                fontFamily: fonts.display,
                fontSize: "clamp(26px, 6vw, 34px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                margin: "0 0 20px",
                color: tokens.white,
              }}>
                <span aria-hidden="true" style={{ marginRight: 8 }}>🎉</span>
                <span className="glitch-static" style={{ color: tokens.accent }}>Gracias</span>
              </h3>
              <p className="mono" style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: tokens.neonCyan,
                margin: "0 0 12px",
              }}>
                ¿Qué más debo hacer?
              </p>
              <ol style={{
                fontSize: 15,
                color: tokens.white,
                lineHeight: 1.75,
                paddingLeft: 22,
                margin: "0 0 24px",
                fontFamily: fonts.body,
              }}>
                <li style={{ marginBottom: 10 }}>
                  Accede al Discord:{" "}
                  <a href="https://germo.me/bootcamp-discord" target="_blank" rel="noopener noreferrer" className="modal-link">
                    https://germo.me/bootcamp-discord
                  </a>
                </li>
                <li>
                  Empieza aquí:{" "}
                  <a href="https://germo.me/bootcamp-empezar" target="_blank" rel="noopener noreferrer" className="modal-link">
                    https://germo.me/bootcamp-empezar
                  </a>
                </li>
              </ol>
              <div style={{
                borderTop: `1px solid ${tokens.border}`,
                paddingTop: 20,
                marginTop: 4,
              }}>
                <p style={{
                  fontSize: 12,
                  color: tokens.textMuted,
                  lineHeight: 1.65,
                  margin: "0 0 14px",
                  textAlign: "left",
                }}>
                  ✉️ Tu correo solo será usado para enviarte información relevante al Bootcamp.
                </p>
                <p style={{
                  fontSize: 12,
                  color: tokens.textMuted,
                  lineHeight: 1.65,
                  margin: 0,
                  textAlign: "left",
                }}>
                  🌟 Ayudame invitando a tus conocidos y conocidas 🌈 ¡En equipo se aprende mejor!
                </p>
              </div>
            </div>
          ) : (
            <>
              <Badge>Bootcamp gratuito</Badge>
              <h3 id="signup-modal-title" style={{
                fontFamily: fonts.display,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: tokens.white,
                margin: "14px 0 6px",
              }}>
                Inscríbete al bootcamp
              </h3>
              <p className="mono" style={{ fontSize: 13, color: tokens.textMuted, marginBottom: 24, lineHeight: 1.5 }}>
                16 semanas · Full-stack JavaScript · 100% gratis
              </p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input
                  required
                  type="text"
                  autoComplete="name"
                  aria-label="Tu nombre"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="signup-modal-input"
                />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  aria-label="Tu correo electrónico"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="signup-modal-input"
                />
                {status === "error" && (
                  <p role="alert" style={{ fontSize: 13, color: tokens.neonPink, margin: 0 }}>{errorMsg}</p>
                )}
                <SubmitAccentButton disabled={status === "loading"}>
                  {status === "loading" ? "Enviando…" : "Inscribirse gratis →"}
                </SubmitAccentButton>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "#contenidos", label: "Contenidos" },
  { href: "#profesor", label: "Profesor" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#faq", label: "FAQ" },
];

function HamburgerIcon({ open }) {
  const bar = (top, rotate, opacity = 1) => ({
    position: "absolute",
    left: 0,
    width: 22,
    height: 2,
    backgroundColor: tokens.accent,
    top,
    transition: "transform 0.25s, opacity 0.25s",
    transform: rotate,
    opacity,
  });
  return (
    <div style={{ position: "relative", width: 22, height: 16 }}>
      <span style={bar(0,  open ? "translateY(7px) rotate(45deg)" : "none")} />
      <span style={bar(7,  "none", open ? 0 : 1)} />
      <span style={bar(14, open ? "translateY(-7px) rotate(-45deg)" : "none")} />
    </div>
  );
}

function Nav({ onSignup }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <nav className="site-nav">
      {/* Top bar */}
      <div style={{
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}>
        <a href="/" aria-label="undefined.academy — Inicio" style={{ textDecoration: "none" }}>
          <Logo />
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 24 }} className="nav-desktop-links">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-desktop-cta">
          <PrimaryButton size="md" onClick={onSignup}>Inscribirse →</PrimaryButton>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-hamburger"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            display: "none",
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          borderTop: `1px solid ${tokens.border}`,
          padding: "8px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
          className="nav-mobile-drawer">
          {NAV_LINKS.map(({ href, label }, i) => (
            <a key={href} href={href} onClick={close} className="nav-mobile-link">
              <span aria-hidden="true" style={{ color: tokens.neonCyan, marginRight: 12 }}>{pad2(i + 1)}</span>
              {label}
            </a>
          ))}
          <div className="hero-cta-buttons" style={{ marginTop: 16, display: "flex" }}>
            <PrimaryButton size="lg" onClick={() => { close(); onSignup(); }}>Inscribirse →</PrimaryButton>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ onSignup }) {
  return (
    <section className="hero scanlines" style={{
      backgroundColor: tokens.bg,
      backgroundImage: heroPatternDataUrl({ fill: tokens.accent, fillOpacity: 0.05 }),
      backgroundRepeat: "repeat",
      backgroundSize: "304px 304px",
      color: tokens.white,
      padding: "clamp(72px, 12vw, 120px) 20px clamp(80px, 12vw, 120px)",
      textAlign: "center",
    }}>
      <div className="grid-floor" aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
        <Badge>Bootcamp · 16 semanas · Gratis</Badge>
        <h1 className="hero-title" style={{
          fontSize: "clamp(44px, 10vw, 104px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          margin: "28px 0 24px",
          color: tokens.white,
        }}>
          Conviértete en<br />
          <span className="glitch" style={{ display: "inline-block" }}>Full-stack Developer</span>
        </h1>
        <p style={{
          fontSize: "clamp(17px, 2.4vw, 20px)",
          lineHeight: 1.6,
          color: tokens.textBody,
          fontFamily: fonts.body,
          maxWidth: 560,
          margin: "0 auto 40px",
          fontWeight: 400,
        }}>
          <span className="mono" aria-hidden="true" style={{ color: tokens.neonCyan, marginRight: 8 }}>&gt;</span>
          16 semanas de formación intensiva en JavaScript — completamente gratis y 100% online.
          <span className="cursor-blink" aria-hidden="true" />
        </p>
        <div className="hero-cta-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <PrimaryButton size="lg" onClick={onSignup}>Inscribirse gratis →</PrimaryButton>
          <SecondaryButton onClick={() => document.getElementById("contenidos").scrollIntoView({ behavior: "smooth" })}>Ver contenidos</SecondaryButton>
        </div>
        <dl className="hero-stats" style={{ padding: 0 }}>
          {[
            { value: "16", label: "Semanas" },
            { value: "10h", label: "Por semana" },
            { value: "100%", label: "Gratuito" },
            { value: "Online", label: "En vivo + diferido" },
          ].map(({ value, label }) => (
            <div key={label} className="stat-card hud-corners" style={{ textAlign: "center", display: "flex", flexDirection: "column-reverse" }}>
              <dt className="mono" style={{
                fontSize: 11,
                color: tokens.textMuted,
                marginTop: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>{label}</dt>
              <dd style={{
                margin: 0,
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                fontFamily: fonts.display,
                color: tokens.accent,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textShadow: "0 0 18px rgba(181,255,77,0.35)",
              }}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const WEEKS = [
  {
    week: 1,
    title: "Terminal, Markdown, Git & HTML/CSS fundamentals",
    topics: [
      { name: "Configuración del ambiente de desarrollo (Prework)", items: ["Instalando Ubuntu en Windows 10/11", "Instalación de Git", "Configuración de las llaves SSH", "Creando una cuenta de GitHub", "Instalación de Node.js y Yarn", "Primeros pasos con VS Code"] },
      { name: "El mundo del Markdown", items: ["Sintaxis básica de Markdown", "Sintaxis saborizada en GitHub"] },
      { name: "Uso básico de la Terminal", items: ["Conociendo la terminal", "Comandos alias para la terminal"] },
      { name: "Git: Control de versiones", items: ["Cómo crear un repositorio local y hacer tu primer commit", "Las ramas y el uso de merge en git", "Entendiendo cómo funciona git rebase", "Git y los repositorios remotos"] },
      { name: "Introducción a HTML", items: ["Estructura básica de una página web", "Hiperlinks y media en HTML"] },
      { name: "Introducción a CSS", items: ["Las hojas de estilos, propiedades y unidades en CSS", "Modelo de caja en CSS", "Cómo funcionan los selectores en CSS", "Práctica de selectores en CSS", "Cómo funciona el layout en CSS", "Cascada y especificidad en CSS"] },
    ],
  },
  {
    week: 2,
    title: "Programación, JavaScript 101, HTML semántico & DOM",
    topics: [
      { name: "Introducción a la programación", items: ["¿Qué es el código y los algoritmos?", "Sentencias y Expresiones en los lenguajes", "¿Qué son los operadores en programación?", "Valores y tipos en el código", "Lenguajes interpretados y Compilados"] },
      { name: "JavaScript 101", items: ["Tipos y valores en JavaScript", "JavaScript y sus variables var, let y const", "Igualdades en JavaScript", "Falsy, Truthy y Nullish en JavaScript", "Objetos y sus propiedades en JavaScript", "Funciones puras y mutación en JavaScript", "Los operadores lógicos en JavaScript", "Condicionales y ciclos en JavaScript", "El alcance en JavaScript"] },
      { name: "HTML Semántico", items: ["El esquema del documento en HTML", "Artículos y secciones ¿Cuál usar y porque?", "nav, header, footer y aside en HTML", "¿Para qué usar divs en HTML?", "time y address en HTML", "Los tags figure, figcaption, picture e img"] },
      { name: "Formularios con HTML", items: ["Los forms clásicos en HTML", "inputs en los formularios de HTML", "Estilos para formularios en HTML", "Diferencia entre enlaces y botones", "Estilos para tus botones de HTML", "Controles modernos para formularios"] },
      { name: "JSON, DOM y CSSOM", items: ["El formato JSON", "¿Qué es el DOM?", "¿Qué es el CSSOM?"] },
    ],
  },
  {
    week: 3,
    title: "Flexbox, CSS Grid, Responsive Design & Frameworks de UI",
    topics: [
      { name: "Flexbox y CSS Responsive", items: ["¿Cómo funciona Flexbox?", "¿Como funciona CSS Grid?", "Cómo usar Flexbox y CSS Grid en conjunto", "Layouts modernas con Flexbox y CSS Grid", "Posicionamiento con CSS", "¿Qué es el Responsive Design?", "Cómo hacer imágenes responsive"] },
      { name: "Estructura moderna de un proyecto", items: ["Breve historia del bundling y el tooling en JavaScript", "Webpack y cómo cambió el modo de desarrollar", "Vite cómo alternativa a Webpack"] },
      { name: "Frameworks de UI", items: ["Introducción a Bootstrap 5", "Introducción a Tailwind CSS"] },
    ],
  },
  {
    week: 4,
    title: "Librerías JS, SASS & Design Tokens",
    topics: [
      { name: "Librerías de Javascript", items: ["Introducción a Lodash", "Introducción a Day.js", "JavaScript Vanilla: sin Lodash o Day.js"] },
      { name: "CSS en la práctica", items: ["Extendiendo CSS mediante SASS", "Evolución de las Arquitecturas de CSS", "Design Tokens con CSS Custom properties"] },
    ],
  },
  {
    week: 5,
    title: "ES2015+, Programación asíncrona & JS Avanzado",
    topics: [
      { name: "ES2015 y más allá", items: ["Template literals y la interpolación de Strings", "Diferencia de Rest parameters y Spread operator", "El ABC del destructuring en JavaScript", "La verdad sobre las arrow functions", "Map, Set, WeakMap y Weak Set", "Los for y el protocolo de Iteración", "Métodos en Array, Number, Object, Boolean, String y Math", "Encadenamiento opcional y operador nullish coalescing"] },
      { name: "Programación asíncrona", items: ["Callbacks y el infierno de los callbacks", "Las promesas de JavaScript", "Los generadores en Javascript", "Async / Await en JavaScript"] },
      { name: "JavaScript Avanzado", items: ["Herencia clásica versus herencia de prototipos", "Closures y el significado de \"this\"", "Programación funcional en JavaScript", "Aprende a usar Regex en tu día a día"] },
    ],
  },
  {
    week: 6,
    title: "JS en producción, Introducción a React & Hooks",
    topics: [
      { name: "JavaScript en producción", items: ["¿Qué son los Shim y Polyfills?", "Cómo usar correctamente Babel", "Minificación del código para producción", "Uso efectivo de los Source maps", "Code Splitting y eliminación del código no usado"] },
      { name: "Introducción a React", items: ["Introducción a React: JSX, Props, Children y Estado", "Ciclo de vida moderno en React", "Eventos y Formularios en React"] },
      { name: "React avanzado", items: ["Componentes de orden alto en React", "Patrón Render Props", "Todo sobre Hooks en React"] },
    ],
  },
  {
    week: 7,
    title: "Redux & Creación de apps con React / Next.js",
    topics: [
      { name: "Manejo de estado con Redux", items: ["Redux: Acciones, Reducers, Store y Flujo de datos", "Acciones asíncronas y middlewares en Redux", "Mejora tu arquitectura con React Redux", "useRedux al rescate"] },
      { name: "Creando apps con React", items: ["Creando un dashboard con Create React App", "Creando un dashboard con Next.js"] },
    ],
  },
  {
    week: 8,
    title: "Node.js, Express.js & MongoDB",
    topics: [
      { name: "Introducción a Node.js", items: ["¿Qué puedo hacer con Node.js?", "Diferencias entre Node.js y JavaScript"] },
      { name: "Introducción a Express.js", items: ["Crea un servidor con Express.js", "Todo sobre Middlewares en Express.js"] },
      { name: "Bases de datos NoSQL", items: ["Introducción a MongoDB", "¿Cómo conectarse a MongoDB desde Node.js?", "Las ventajas de usar Mongoose"] },
    ],
  },
  {
    week: 9,
    title: "Bases de datos SQL & PostgreSQL",
    topics: [
      { name: "Bases de datos SQL", items: ["¿Qué es el diagrama entidad-relación?", "¿Cómo conectarse a PostgreSQL desde Node.js?", "Consultas esenciales en PostgreSQL"] },
    ],
  },
  {
    week: 10,
    title: "Creando APIs REST",
    topics: [
      { name: "Creando una API", items: ["Creando una API con Express.js", "Creando una API con Hapi.js", "Creando una API con Sails.js", "Usando Firebase cómo API"] },
    ],
  },
  {
    week: 11,
    title: "Autenticación, OAuth 2.0 & Auth0",
    topics: [
      { name: "Autenticación y usuarios", items: ["Autenticación con Passport.js", "¿Cómo funciona OAuth 2.0?", "Usando Auth0 para nuestros MVP"] },
    ],
  },
  {
    week: 12,
    title: "Seguridad Web",
    topics: [
      { name: "Introducción a la seguridad Web", items: ["¿Que es injection y cómo evitarlo?", "¿Cómo implementar autenticación de manera correcta?", "¿Cómo evitar exponer datos sensibles en tus apps?", "Acceso, permisos y correcta configuración en un servidor"] },
    ],
  },
  {
    week: 13,
    title: "Servidores: Linux, SSH, Digital Ocean & Vercel",
    topics: [
      { name: "Introducción a los servidores", items: ["Permisos de usuarios y sistema de archivos", "Conexión SSH a un servidor remoto", "Manejo esencial de VIM"] },
      { name: "Servidores como servicio", items: ["Mi primer servidor en Digital Ocean", "Cómo despliego mi app en Fly.io", "Despliega más rápido con Vercel"] },
    ],
  },
  {
    week: 14,
    title: "CSS Avanzado: Tipografía, Animaciones & Design Systems",
    topics: [
      { name: "CSS Avanzado", items: ["Todo sobre tipografía en CSS", "Transiciones y Animaciones en CSS", "Sistemas de Diseño con CSS"] },
    ],
  },
  {
    week: 15,
    title: "Testing: Unit, Snapshot, Mocking & E2E",
    topics: [
      { name: "El mundo del testing", items: ["Los principios del testing", "Unit testing en nuestras apps", "Snapshot testing en React", "Cómo hacer buen mocking con los tests", "¿Qué son los tests funcionales o de integración?", "Tests de integración completa (E2E)"] },
    ],
  },
  {
    week: 16,
    title: "Docker, Kubernetes & CI/CD",
    topics: [
      { name: "Contenedores", items: ["Introducción a los contenedores", "Instalando y configurando Docker", "Introducción a Kubernetes", "Usando Kubernetes con Google Cloud Platform"] },
      { name: "Integración Continua", items: ["Integración continua y despliegue continuo", "Configura tu ambiente de Integración continua"] },
    ],
  },
];

function CurriculumSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="contenidos" style={{ padding: "clamp(72px, 10vw, 100px) 20px", backgroundColor: tokens.bgSurface }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Badge>Programa</Badge>
        <h2 className="section-title" style={{ margin: "16px 0 8px" }}>
          Contenidos
        </h2>
        <p style={{ fontSize: 17, color: tokens.textMuted, marginBottom: 40, lineHeight: 1.6 }}>
          De cero a Full-stack en 16 semanas con un currículo estructurado y progresivo.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {WEEKS.map(({ week, title, topics }) => {
            const isOpen = open === week;
            return (
              <div key={week} className="accordion-item" data-open={isOpen}>
                <h3 style={{ margin: 0 }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : week)}
                    aria-expanded={isOpen}
                    aria-controls={`semana-${week}`}
                    className="accordion-trigger"
                  >
                    <span className="week-number cut-corners cut-border" aria-hidden="true">
                      {pad2(week)}
                    </span>
                    <span style={{ fontFamily: fonts.body, fontWeight: 600, fontSize: 15, flex: 1 }}>
                      <span className="visually-hidden">Semana {week}: </span>
                      {title}
                    </span>
                    <span className="accordion-chevron" aria-hidden="true">›</span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`semana-${week}`}
                    style={{
                      margin: "0 20px",
                      padding: "16px 0 20px",
                      borderTop: `1px dashed ${tokens.border}`,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 20,
                    }}
                  >
                    {topics.map(({ name, items }) => (
                      <div key={name}>
                        <h4 className="mono" style={{
                          fontWeight: 500,
                          fontSize: 12,
                          color: tokens.neonCyan,
                          margin: "0 0 8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}>
                          {name}
                        </h4>
                        <ul className="topic-list">
                          {items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section id="profesor" style={{ padding: "clamp(72px, 10vw, 100px) 20px", backgroundColor: tokens.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
        <div className="instructor-photo cut-corners">
          <img
            src="/images/guillermo.webp"
            alt="Guillermo Rodas"
            width={214}
            height={214}
            loading="lazy"
            className="cut-corners"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <Badge>Tu profesor</Badge>
          <h2 className="section-title" style={{ fontSize: "clamp(34px, 6vw, 44px)", margin: "14px 0 12px" }}>
            Guillermo Rodas
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: tokens.textBody, marginBottom: 20 }}>
            Desarrollador Full-stack en JavaScript de Colombia viviendo en Suecia.
            Google Developer Expert en Tecnologías Web, Auth0 Ambassador y organizador de CSS Conf Colombia.
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Profesor de 6 cursos en Platzi",
              "Coach técnico en Platzi Master por más de 2 años",
              "Mentor del Bootcamp Full-stack con World Tech Makers",
              "Más de 50 charlas en meetups y conferencias",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span className="mono" aria-hidden="true" style={{ color: tokens.accent, fontSize: 15, lineHeight: 1.5 }}>▸</span>
                <span style={{ fontSize: 15, color: tokens.textMuted, lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Estefany Aguilar",
    handle: "@teffcode",
    role: "Sr. Frontend Dev",
    quote: "Gracias a Guille y a sus enseñanzas en el Bootcamp, me enamoré del desarrollo web. Conoce el por qué de cada cosa y la explica de una manera increíble.",
    image: "/images/estefany.webp",
  },
  {
    name: "Carlos Azaustre",
    handle: "@carlosazaustre",
    role: "Google Dev Expert",
    quote: "Guillermo es un auténtico todoterreno. No solo domina Frontend y Backend, además las explica de forma natural y sencilla.",
    image: "/images/carlos.webp",
  },
  {
    name: "Juan Garces",
    handle: "@juangarcesme",
    role: "Sr. Product Designer",
    quote: "Una de las cosas que más admiro de él es la forma en que puede transformar un tema complejo en un mensaje claro y fácil de entender.",
    image: "/images/juan.webp",
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonios" style={{ padding: "clamp(72px, 10vw, 100px) 20px", backgroundColor: tokens.bgSurface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Badge>Testimonios</Badge>
        <h2 className="section-title" style={{ margin: "16px 0 48px" }}>
          Lo que dicen los estudiantes
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 24 }}>
          {TESTIMONIALS.map(({ name, handle, role, quote, image }) => (
            <figure key={name} className="testimonial-card cut-corners cut-border" style={{ margin: 0 }}>
              <span className="mono" aria-hidden="true" style={{
                fontSize: 40,
                lineHeight: 1,
                color: tokens.accent,
                textShadow: "0 0 16px rgba(181,255,77,0.4)",
                marginBottom: 8,
              }}>“</span>
              <blockquote style={{
                margin: "0 0 24px",
                fontSize: 15,
                lineHeight: 1.7,
                color: tokens.textBody,
                flex: 1,
              }}>
                {quote}
              </blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px dashed ${tokens.border}`, paddingTop: 18 }}>
                <img src={image} alt={name} width={48} height={48} loading="lazy" className="cut-corners" style={{
                  "--cut": "8px",
                  width: 48,
                  height: 48,
                  objectFit: "cover",
                  display: "block",
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontWeight: 700, color: tokens.white, fontSize: 15 }}>{name}</div>
                  <div className="mono" style={{ fontSize: 12, color: tokens.textMuted }}>{role} · <span style={{ color: tokens.neonCyan }}>{handle}</span></div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: "¿Cuánto cuesta?", a: "Es totalmente gratis. Sin ningún costo oculto." },
  { q: "¿Cuánto dura?", a: "16 semanas estimadas con 10 horas semanales (6 horas en vivo)." },
  { q: "¿Cuándo empieza?", a: "Inició el 1 de Marzo del 2023, pero aún puedes empezar cuando quieras." },
  { q: "¿Qué requisitos hay?", a: "Un computador con acceso a internet y muchas ganas de aprender." },
  { q: "¿Quedan grabadas las clases?", a: "Sí, y puedes verlas en diferido cuando quieras." },
  { q: "Ya sé programar, ¿puedo asistir?", a: "Sí, seguro aprenderás algo nuevo." },
  { q: "No tengo conocimientos previos", a: "Sin problema — habrá asesorías offline para apoyar a todos." },
  { q: "¿Hay cupos limitados?", a: "No hay límite para las clases, pero las mentorías offline serán limitadas." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "clamp(72px, 10vw, 100px) 20px", backgroundColor: tokens.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Badge>Preguntas frecuentes</Badge>
        <h2 className="section-title" style={{ margin: "16px 0 40px" }}>
          FAQ
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ_ITEMS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="accordion-item" data-open={isOpen} style={{ backgroundColor: isOpen ? tokens.bgRaised : tokens.bgSurface }}>
                <h3 style={{ margin: 0 }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="accordion-trigger"
                    style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 16 }}
                  >
                    <span className="mono" aria-hidden="true" style={{ color: isOpen ? tokens.accent : tokens.neonCyan, fontSize: 13, fontWeight: 500 }}>
                      {pad2(i + 1)}
                    </span>
                    <span style={{ flex: 1 }}>{q}</span>
                    <span className="accordion-chevron" aria-hidden="true">›</span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={`faq-${i}`} style={{ padding: "0 20px 18px 56px", fontSize: 15, color: tokens.textBody, lineHeight: 1.6 }}>
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onSignup }) {
  return (
    <section className="cta scanlines" style={{
      backgroundColor: tokens.bgDeep,
      padding: "clamp(88px, 12vw, 120px) 20px",
      textAlign: "center",
    }}>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
        <p className="mono" style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.neonCyan, margin: "0 0 20px" }}>
          <span aria-hidden="true">&gt; </span>sistema listo
        </p>
        <h2 className="glitch-static" style={{
          fontSize: "clamp(40px, 8vw, 88px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: tokens.accent,
          margin: "0 0 24px",
          lineHeight: 1.0,
          textWrap: "balance",
        }}>
          ¿Listo para empezar?
        </h2>
        <p style={{ fontSize: 18, color: tokens.textBody, maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Únete al bootcamp más completo de Full-stack JavaScript. Gratis, online y con una comunidad increíble.
        </p>
        <div className="hero-cta-buttons" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <PrimaryButton size="lg" onClick={onSignup}>Inscribirse gratis →</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      backgroundColor: tokens.bg,
      color: tokens.textMuted,
      padding: "40px 20px 32px",
      textAlign: "center",
      borderTop: `1px solid ${tokens.border}`,
    }}>
      <div style={{ marginBottom: 8 }}>
        <Logo size={22} />
      </div>
      <div style={{ display: "flex", columnGap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
        {[
          { label: "GitHub",    href: "https://github.com/glrodasz/academy" },
          { label: "YouTube",   href: "https://germo.me/bootcamp-en-diferido" },
          { label: "Twitch",    href: "https://germo.me/bootcamp-en-vivo" },
          { label: "Discord",   href: "https://germo.me/bootcamp-discord" },
          { label: "Twitter",   href: "https://twitter.com/germorodas" },
          { label: "Instagram", href: "https://instagram.com/germorodas" },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-link">{label}</a>
        ))}
      </div>
      <p className="mono" style={{ fontSize: 12, color: tokens.textMuted, margin: 0 }}>
        © {new Date().getFullYear()} Guillermo Rodas · undefined.academy
      </p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openSignup = () => setModalOpen(true);
  const closeSignup = () => setModalOpen(false);

  return (
    <div style={styles.global}>
      <Nav onSignup={openSignup} />
      <main>
        <Hero onSignup={openSignup} />
        <CurriculumSection />
        <InstructorSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection onSignup={openSignup} />
      </main>
      <Footer />
      {modalOpen && <SignupModal onClose={closeSignup} />}
    </div>
  );
}
