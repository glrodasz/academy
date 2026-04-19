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
          {WEEKS.map(({ week, title, topics }) => (
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
                flexDirection: "column",
                gap: 0,
                transition: "border-color 0.2s",
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
                  flexShrink: 0,
                }}>
                  {week}
                </span>
                <span style={{ fontWeight: 600, fontSize: 15, color: tokens.primary, flex: 1 }}>{title}</span>
                <span style={{ color: tokens.neutralMid, fontSize: 18, fontWeight: 300 }}>{open === week ? "−" : "+"}</span>
              </div>

              {/* Expanded content */}
              {open === week && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: `1px solid ${tokens.neutralMid}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  {topics.map(({ name, items }) => (
                    <div key={name}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: tokens.primary, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {name}
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 3 }}>
                        {items.map((item) => (
                          <li key={item} style={{ fontSize: 14, color: tokens.neutralPrincipal, lineHeight: 1.5 }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
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
