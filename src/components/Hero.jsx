import { useState, useEffect, Suspense, lazy } from "react";
import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { ME, ROLES } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export default function Hero({ onNav }) {
  const { isMobile, isSmall, isTablet, isDesktop } = useBreakpoint();
  const [typed, setTyped] = useState("");
  const [del,   setDel]   = useState(false);
  const [ri,    setRi]    = useState(0);
  const [ci,    setCi]    = useState(0);

  useEffect(() => {
    const cur   = ROLES[ri];
    const delay = del ? 50 : ci === cur.length ? 1800 : 100;
    const t = setTimeout(() => {
      if      (!del && ci < cur.length)   { setTyped(cur.slice(0, ci + 1)); setCi(c => c + 1); }
      else if (del  && ci > 0)            { setTyped(cur.slice(0, ci - 1)); setCi(c => c - 1); }
      else if (!del && ci === cur.length) { setDel(true); }
      else if (del  && ci === 0)          { setDel(false); setRi(i => (i + 1) % ROLES.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, ri]);

  // Padding varies by screen size
  const px = isMobile ? "20px" : isTablet ? "36px" : "52px";

  // On tablet: text is on top, globe is semi-transparent behind
  // On desktop: text left, globe right
  // On mobile: no globe, just radial glow

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: isTablet ? "flex-end" : "center",
      position: "relative", overflow: "hidden",
      background: C.bg,
      paddingBottom: isTablet ? 60 : 0,
      paddingTop: isMobile ? 90 : isTablet ? 80 : 0,
    }}>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 49px, #15243a33 49px, #15243a33 50px),
          repeating-linear-gradient(90deg, transparent, transparent 49px, #15243a33 49px, #15243a33 50px)
        `,
      }} />

      {/* 3D canvas — desktop + tablet (not tiny mobile) */}
      {!isMobile && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      {/* Mobile glow fallback */}
      {isMobile && (
        <div style={{
          position: "absolute", top: "5%", right: "-30%",
          width: 300, height: 300,
          background: `radial-gradient(circle, ${C.accent}18 0%, ${C.accent2}08 55%, transparent 72%)`,
          borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        }} />
      )}

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 120, zIndex: 1,
        background: `linear-gradient(transparent, ${C.accent}05, transparent)`,
        animation: "scanMove 9s linear infinite", pointerEvents: "none",
      }} />

      {/* Corner label — desktop only */}
      {isDesktop && (
        <div style={{
          position: "absolute", bottom: 44, right: 44, zIndex: 2,
          fontFamily: FONT_MONO, fontSize: 10, color: C.border, letterSpacing: "0.18em",
        }}>DEV · SEC · OPS</div>
      )}

      {/* Status dot */}
      {!isMobile && (
        <div style={{
          position: "absolute", top: 24, right: 32, zIndex: 2,
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: FONT_MONO, fontSize: 10, color: C.accent,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: C.accent, boxShadow: `0 0 6px ${C.accent}`,
            animation: "blink 2s step-end infinite",
          }} />
          SYSTEM ONLINE
        </div>
      )}

      {/* ── Text content ── */}
      <div style={{
        padding: `0 ${px}`,
        maxWidth: isTablet ? "100%" : 580,
        width: "100%",
        position: "relative", zIndex: 2,
        // On tablet: add backdrop blur so text is readable over globe
        ...(isTablet ? {
          background: `${C.bg}bb`,
          backdropFilter: "blur(2px)",
          paddingTop: 32, paddingBottom: 32,
          borderRadius: 8,
          margin: "0 auto",
          textAlign: "center",
        } : {}),
      }}>
        <p className="fu" style={{
          color: C.accent, fontSize: 11, letterSpacing: "0.22em", marginBottom: 16,
        }}>
          // HELLO, WORLD — I'M
        </p>

        <h1 className="fu2" style={{
          fontFamily: FONT_TITLE, fontWeight: 800,
          fontSize: isMobile ? "clamp(44px,13vw,68px)" : isTablet ? "clamp(52px,10vw,80px)" : "clamp(56px,8vw,92px)",
          lineHeight: 0.92, letterSpacing: "-0.02em",
          color: C.bright, marginBottom: 22,
        }}>
          Mohammad<br />
          <span style={{ color: C.accent }}>Farhan</span>
        </h1>

        {/* Typing role */}
        <div className="fu3" style={{
          fontSize: isMobile ? 13 : 17,
          marginBottom: 22,
          display: "flex", alignItems: "center",
          gap: 8, height: 32,
          justifyContent: isTablet ? "center" : "flex-start",
        }}>
          <span style={{ color: C.border }}>_</span>
          <span style={{ color: C.accent2 }}>{typed}</span>
          <span style={{ animation: "blink 1s step-end infinite", color: C.accent }}>▋</span>
        </div>

        <p className="fu3" style={{
          fontSize: 13, lineHeight: 1.9, color: C.text,
          maxWidth: isTablet ? 480 : 460,
          marginBottom: 32,
          margin: isTablet ? "0 auto 32px" : "0 0 32px",
        }}>
          {ME.tagline} Integrating security at every layer — from frontend code to AWS infrastructure.
        </p>

        {/* CTA buttons */}
        <div className="fu4" style={{
          display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36,
          justifyContent: isTablet ? "center" : "flex-start",
        }}>
          <button className="btn btn-solid" onClick={() => onNav("projects")}>View Projects</button>
          <button className="btn"           onClick={() => onNav("experience")}>Experience</button>
          {!isSmall && (
            <button className="btn btn-muted" onClick={() => onNav("contact")}>Contact</button>
          )}
        </div>

        {/* Dev/Sec/Ops trio */}
        <div className="fu4" style={{
          display: "flex", gap: 10, flexWrap: "wrap",
          justifyContent: isTablet ? "center" : "flex-start",
        }}>
          {[
            { label: "Dev", color: "#0066ff", sub: "React · Java · Node"   },
            { label: "Sec", color: "#e53e3e", sub: "VAPT · Kali · OWASP"  },
            { label: "Ops", color: "#00e5c4", sub: "AWS · IAM · Linux"     },
          ].map(({ label, color, sub }) => (
            <div key={label} style={{
              background: `${color}0d`, border: `1px solid ${color}30`,
              borderRadius: 6, padding: isMobile ? "8px 14px" : "10px 16px",
              fontFamily: FONT_MONO,
            }}>
              <div style={{ fontSize: 11, color, letterSpacing: "0.12em", marginBottom: 2 }}>[ {label} ]</div>
              <div style={{ fontSize: 10, color: C.text }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
