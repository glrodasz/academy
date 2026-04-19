import { useState } from "react";

// Quantum Design System — Mint Blue theme
// System tokens remapped: Prussian Blue (Primary) + Mint (Complementary)
const tokens = {
  primary: "#003049",
  primarySubtle: "#0092E0",
  primaryOff: "#EBF8FF",
  accent: "#52B788",
  neutralPrincipal: "#454545",
  neutralOff: "#F6F6F6",
  neutralMid: "#C8C8C8",
  white: "#FFFFFF",
};

const styles = {
  global: {
    fontFamily: "'Manrope', sans-serif",
    color: tokens.neutralPrincipal,
    backgroundColor: tokens.white,
    margin: 0,
    padding: 0,
  },
};

// ─── COMPONENTS ───────────────────────────────────────────────

function Badge({ children }) {
  return (
    <span style={{
      display: "inline-block",
      backgroundColor: tokens.accent,
      color: tokens.primary,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "4px 10px",
      borderRadius: 4,
    }}>
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, size = "md" }) {
  const [hover, setHover] = useState(false);
  const padding = size === "lg" ? "16px 36px" : "12px 24px";
  const fontSize = size === "lg" ? 17 : 15;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? tokens.primarySubtle : tokens.primary,
        color: tokens.white,
        padding,
        fontSize,
        fontWeight: 700,
        fontFamily: "'Manrope', sans-serif",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        transition: "background-color 0.2s",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: "transparent",
        color: hover ? tokens.primarySubtle : tokens.primary,
        padding: "12px 24px",
        fontSize: 15,
        fontWeight: 700,
        fontFamily: "'Manrope', sans-serif",
        border: `2px solid ${hover ? tokens.primarySubtle : tokens.primary}`,
        borderRadius: 8,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
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
    borderRadius: 2,
    backgroundColor: tokens.white,
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

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: tokens.primary,
      borderBottom: `3px solid ${tokens.accent}`,
    }}>
      {/* Top bar */}
      <div style={{
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}>
        <span style={{
          color: tokens.white,
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: "-0.02em",
        }}>
          undefined<span style={{ color: tokens.accent }}>.academy</span>
        </span>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 12, "@media(max-width:640px)": { display: "none" } }}
          className="nav-desktop-links">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} style={{ color: tokens.neutralMid, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>{label}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-desktop-cta">
          <PrimaryButton size="sm">Inscribirse →</PrimaryButton>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-hamburger"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "none",
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          backgroundColor: tokens.primary,
          borderTop: `1px solid #ffffff18`,
          padding: "16px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
          className="nav-mobile-drawer">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              style={{
                color: tokens.neutralMid,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                padding: "12px 0",
                borderBottom: "1px solid #ffffff10",
              }}
            >
              {label}
            </a>
          ))}
          <div style={{ marginTop: 16 }}>
            <PrimaryButton size="lg" onClick={close}>Inscribirse →</PrimaryButton>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${tokens.primary} 60%, #004a6e 100%)`,
      color: tokens.white,
      padding: "96px 32px 80px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: -80,
        right: -80,
        width: 320,
        height: 320,
        borderRadius: "50%",
        backgroundColor: tokens.accent,
        opacity: 0.06,
      }} />
      <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
        <Badge>Bootcamp · 16 semanas · Gratis</Badge>
        <h1 style={{
          fontSize: "clamp(42px, 7vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          margin: "24px 0 20px",
          color: tokens.white,
        }}>
          Conviértete en<br />
          <span style={{ color: tokens.accent }}>Full-stack Developer</span>
        </h1>
        <p style={{
          fontSize: 20,
          lineHeight: 1.6,
          color: tokens.primaryOff,
          maxWidth: 520,
          margin: "0 auto 40px",
          fontWeight: 400,
        }}>
          16 semanas de formación intensiva en JavaScript — completamente gratis y 100% online.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <PrimaryButton size="lg">Inscribirse gratis →</PrimaryButton>
          <SecondaryButton>Ver contenidos</SecondaryButton>
        </div>
        <div style={{
          marginTop: 56,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          flexWrap: "wrap",
        }}>
          {[
            { value: "16", label: "Semanas" },
            { value: "10h", label: "Por semana" },
            { value: "100%", label: "Gratuito" },
            { value: "Online", label: "En vivo + diferido" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: tokens.accent }}>{value}</div>
              <div style={{ fontSize: 13, color: tokens.primaryOff, marginTop: 2, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WEEKS = [
  { week: 1, title: "Terminal, Markdown, Git & HTML/CSS fundamentals" },
  { week: 2, title: "Programación, JavaScript 101, HTML semántico & DOM" },
  { week: 3, title: "Flexbox, CSS Grid, Responsive Design & Frameworks de UI" },
  { week: 4, title: "Librerías JS, SASS & Design Tokens" },
  { week: 5, title: "ES2015+, Programación asíncrona & JS Avanzado" },
  { week: 6, title: "JS en producción, Introducción a React & Hooks" },
  { week: 7, title: "Redux & Creación de apps con React / Next.js" },
  { week: 8, title: "Node.js, Express.js & MongoDB" },
  { week: 9, title: "Bases de datos SQL & PostgreSQL" },
  { week: 10, title: "Creando APIs REST" },
  { week: 11, title: "Autenticación, OAuth 2.0 & Auth0" },
  { week: 12, title: "Seguridad Web" },
  { week: 13, title: "Servidores: Linux, SSH, Digital Ocean & Vercel" },
  { week: 14, title: "CSS Avanzado: Tipografía, Animaciones & Design Systems" },
  { week: 15, title: "Testing: Unit, Snapshot, Mocking & E2E" },
  { week: 16, title: "Docker, Kubernetes & CI/CD" },
];

function CurriculumSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="contenidos" style={{ padding: "80px 32px", backgroundColor: tokens.neutralOff }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Badge>Programa</Badge>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", margin: "16px 0 8px", color: tokens.primary }}>
          📚 Contenidos
        </h2>
        <p style={{ fontSize: 17, color: tokens.neutralPrincipal, marginBottom: 40, lineHeight: 1.6 }}>
          De cero a Full-stack en 16 semanas con un currículo estructurado y progresivo.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {WEEKS.map(({ week, title }) => (
            <div
              key={week}
              onClick={() => setOpen(open === week ? null : week)}
              style={{
                backgroundColor: tokens.white,
                border: `1.5px solid ${open === week ? tokens.primarySubtle : tokens.neutralMid}`,
                borderRadius: 10,
                padding: "16px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "border-color 0.2s",
              }}
            >
              <span style={{
                minWidth: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: open === week ? tokens.primary : tokens.primaryOff,
                color: open === week ? tokens.accent : tokens.primarySubtle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 800,
                transition: "all 0.2s",
              }}>
                {week}
              </span>
              <span style={{ fontWeight: 600, fontSize: 15, color: tokens.primary, flex: 1 }}>{title}</span>
              <span style={{ color: tokens.neutralMid, fontSize: 18, fontWeight: 300 }}>{open === week ? "−" : "+"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section id="profesor" style={{ padding: "80px 32px", backgroundColor: tokens.white }}>
      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: tokens.primaryOff,
          border: `4px solid ${tokens.accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          flexShrink: 0,
        }}>
          🧑‍💻
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <Badge>Tu profesor</Badge>
          <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", margin: "12px 0 8px", color: tokens.primary }}>
            🎓 Guillermo Rodas
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: tokens.neutralPrincipal, marginBottom: 20 }}>
            Desarrollador Full-stack en JavaScript de Colombia viviendo en Suecia.
            Google Developer Expert en Tecnologías Web, Auth0 Ambassador y organizador de CSS Conf Colombia.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Profesor de 6 cursos en Platzi",
              "Coach técnico en Platzi Master por más de 2 años",
              "Mentor del Bootcamp Full-stack con World Tech Makers",
              "Más de 50 charlas en meetups y conferencias",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: tokens.accent, fontSize: 18, lineHeight: 1.4 }}>✦</span>
                <span style={{ fontSize: 15, color: tokens.neutralPrincipal }}>{item}</span>
              </div>
            ))}
          </div>
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
    emoji: "👩‍💻",
  },
  {
    name: "Carlos Azaustre",
    handle: "@carlosazaustre",
    role: "Google Dev Expert",
    quote: "Guillermo es un auténtico todoterreno. No solo domina Frontend y Backend, además las explica de forma natural y sencilla.",
    emoji: "🧑‍🎤",
  },
  {
    name: "Juan Garces",
    handle: "@juangarcesme",
    role: "Sr. Product Designer",
    quote: "Una de las cosas que más admiro de él es la forma en que puede transformar un tema complejo en un mensaje claro y fácil de entender.",
    emoji: "🎨",
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonios" style={{ padding: "80px 32px", backgroundColor: tokens.primary }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Badge>Testimonios</Badge>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", margin: "16px 0 48px", color: tokens.white }}>
          🌟 Lo que dicen los estudiantes
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map(({ name, handle, role, quote, emoji }) => (
            <div key={name} style={{
              backgroundColor: "#ffffff0f",
              border: "1px solid #ffffff18",
              borderRadius: 14,
              padding: 28,
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{emoji}</div>
              <p style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: tokens.primaryOff,
                marginBottom: 20,
                fontStyle: "italic",
              }}>
                "{quote}"
              </p>
              <div>
                <div style={{ fontWeight: 700, color: tokens.white, fontSize: 15 }}>{name}</div>
                <div style={{ fontSize: 13, color: tokens.accent }}>{role} · {handle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: "💸 ¿Cuánto cuesta?", a: "Es totalmente gratis. Sin ningún costo oculto." },
  { q: "⏳ ¿Cuánto dura?", a: "16 semanas estimadas con 10 horas semanales (6 horas en vivo)." },
  { q: "🗓️ ¿Cuándo empieza?", a: "Inició el 1 de Marzo del 2023, pero aún puedes empezar cuando quieras." },
  { q: "🎒 ¿Qué requisitos hay?", a: "Un computador con acceso a internet y muchas ganas de aprender." },
  { q: "📹 ¿Quedan grabadas las clases?", a: "Sí, y puedes verlas en diferido cuando quieras." },
  { q: "💾 Ya sé programar, ¿puedo asistir?", a: "Sí, seguro aprenderás algo nuevo." },
  { q: "🐣 No tengo conocimientos previos", a: "Sin problema — habrá asesorías offline para apoyar a todos." },
  { q: "🎟 ¿Hay cupos limitados?", a: "No hay límite para las clases, pero las mentorías offline serán limitadas." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "80px 32px", backgroundColor: tokens.neutralOff }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Badge>Preguntas frecuentes</Badge>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", margin: "16px 0 40px", color: tokens.primary }}>
          🙋 FAQ
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tokens.white,
                border: `1.5px solid ${open === i ? tokens.primarySubtle : tokens.neutralMid}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "16px 20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: tokens.primary,
                }}
              >
                {q}
                <span style={{ fontSize: 18, color: tokens.neutralMid }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 16px", fontSize: 15, color: tokens.neutralPrincipal, lineHeight: 1.6 }}>
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{
      backgroundColor: tokens.accent,
      padding: "80px 32px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", color: tokens.primary, marginBottom: 16 }}>
          ¿Listo para empezar?
        </h2>
        <p style={{ fontSize: 18, color: "#1a3d2b", marginBottom: 36, lineHeight: 1.6 }}>
          Únete al bootcamp más completo de Full-stack JavaScript. Gratis, online y con una comunidad increíble.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            backgroundColor: tokens.primary,
            color: tokens.white,
            padding: "16px 36px",
            fontSize: 17,
            fontWeight: 700,
            fontFamily: "'Manrope', sans-serif",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}>
            Inscribirse gratis →
          </button>
          <button style={{
            backgroundColor: "transparent",
            color: tokens.primary,
            padding: "16px 36px",
            fontSize: 17,
            fontWeight: 700,
            fontFamily: "'Manrope', sans-serif",
            border: `2px solid ${tokens.primary}`,
            borderRadius: 8,
            cursor: "pointer",
          }}>
            Unirse al Discord
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: tokens.primary, color: tokens.primaryOff, padding: "32px", textAlign: "center" }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontWeight: 800, fontSize: 18, color: tokens.white }}>
          undefined<span style={{ color: tokens.accent }}>.academy</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
        {["Discord", "YouTube", "Twitter", "Instagram", "Twitch"].map((social) => (
          <a key={social} href="#" style={{ color: tokens.neutralMid, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>{social}</a>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#ffffff55" }}>
        © {new Date().getFullYear()} Guillermo Rodas · undefined.academy
      </p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={styles.global}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <Nav />
      <Hero />
      <CurriculumSection />
      <InstructorSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
