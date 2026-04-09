import { useEffect, useRef, useState } from "react";
import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { ME } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";
import TiltCard from "./TiltCard";

function useCounter(target, duration = 1400, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    const steps = 50;
    const delay = duration / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, delay);
    return () => clearInterval(t);
  }, [started, target, duration]);
  return val;
}

const STAT_CARDS = [
  { value: 3,  suffix: "+", label: "Internships",      color: "#0066ff", icon: "💼" },
  { value: 5,  suffix: "+", label: "Projects Shipped", color: "#00e5c4", icon: "🚀" },
  { value: 10, suffix: "+", label: "CVEs Studied",     color: "#e53e3e", icon: "🔐" },
  { value: 79, suffix: "%", label: "CGPA",              color: "#f0a060", icon: "🎓" },
];

export default function About() {
  const { isSmall } = useBreakpoint();
  const ref  = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCounter(STAT_CARDS[0].value, 1000, vis);
  const c1 = useCounter(STAT_CARDS[1].value, 1200, vis);
  const c2 = useCounter(STAT_CARDS[2].value, 1400, vis);
  const c3 = useCounter(STAT_CARDS[3].value, 1600, vis);
  const counts = [c0, c1, c2, c3];

  const stats = [
    { label: "Experience", value: ME.experience },
    { label: "Location",   value: ME.location   },
    { label: "Stack",      value: ME.stack      },
    { label: "Phone",      value: ME.phone      },
    { label: "Status",     value: ME.status, accent: true },
  ];

  return (
    <section id="about" style={{
      padding: isSmall ? "70px 0" : "110px 0",
      background: "linear-gradient(180deg, #06090f 0%, #070c14 100%)",
    }}>
      <div className="section-wrap">
        <p className="section-num">// 01 — ABOUT</p>
        <h2 className="section-title">About Me</h2>

        {/* ── Stat cards ── */}
        <div ref={ref} style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: 12, marginBottom: 60,
        }}>
          {STAT_CARDS.map(({ suffix, label, color, icon }, i) => (
            <TiltCard
              key={label}
              maxTilt={isSmall ? 0 : 10}
              style={{
                background: "linear-gradient(135deg, #0c1420, #080f1c)",
                border: `1px solid ${color}22`,
                borderRadius: 10,
                padding: isSmall ? "20px 16px" : "26px 20px",
                textAlign: "center",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Top color bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              }} />
              {/* Background number watermark */}
              <div style={{
                position: "absolute", bottom: -8, right: 6,
                fontFamily: FONT_TITLE, fontSize: 72, fontWeight: 800,
                color: `${color}08`, lineHeight: 1, pointerEvents: "none",
                userSelect: "none",
              }}>
                {counts[i]}
              </div>
              <div style={{ fontSize: isSmall ? 22 : 26, marginBottom: 8 }}>{icon}</div>
              <div style={{
                fontFamily: FONT_TITLE, fontWeight: 800,
                fontSize: isSmall ? 30 : 38,
                color, lineHeight: 1, marginBottom: 8,
              }}>
                {counts[i]}{suffix}
              </div>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 10,
                color: "#4a6a8a", letterSpacing: "0.12em",
              }}>
                {label.toUpperCase()}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* ── Bio + stats ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : "1.3fr 1fr",
          gap: isSmall ? 40 : 60,
          alignItems: "start",
        }}>
          {/* Bio */}
          <div>
            {/* Quoted accent */}
            <div style={{
              borderLeft: `3px solid ${C.accent}`,
              paddingLeft: 20, marginBottom: 24,
            }}>
              <p style={{ fontSize: 15, lineHeight: 2, color: "#9ab8d4", fontStyle: "italic" }}>
                "Security isn't an afterthought — it's the foundation everything else is built on."
              </p>
            </div>
            <p style={{ lineHeight: 1.95, fontSize: 13.5, marginBottom: 18, color: C.text }}>{ME.bio1}</p>
            <p style={{ lineHeight: 1.95, fontSize: 13.5, color: C.text, marginBottom: 32 }}>{ME.bio2}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={ME.cvLink}>
                <button className="btn" style={{ fontSize: 11 }}>Download CV ↓</button>
              </a>
              <a href={`mailto:${ME.email}`}>
                <button className="btn btn-muted" style={{ fontSize: 11 }}>Email Me →</button>
              </a>
            </div>
          </div>

          {/* Stats table */}
          <div style={{
            background: "linear-gradient(135deg, #0c1420, #080f1c)",
            border: `1px solid #15243a`,
            borderRadius: 10, padding: "24px 24px",
            boxShadow: `0 0 40px #00e5c408`,
          }}>
            <p style={{
              fontFamily: FONT_MONO, fontSize: 10,
              letterSpacing: "0.18em", color: "#2a4060",
              marginBottom: 18,
            }}>PROFILE.JSON</p>
            {stats.map(({ label, value, accent }) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: `1px solid #0e1e30`,
                fontSize: 13,
              }}>
                <span style={{ color: "#3a5a78", fontFamily: FONT_MONO }}>
                  "{label}"
                </span>
                <span style={{ color: accent ? C.accent : C.bright, fontFamily: FONT_MONO }}>
                  {accent
                    ? <><span style={{ marginRight: 6, color: C.accent, animation: "blink 2s step-end infinite" }}>●</span>{value}</>
                    : `"${value}"`
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
