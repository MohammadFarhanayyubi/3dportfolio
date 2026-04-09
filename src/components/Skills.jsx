import { useEffect, useRef, useState } from "react";
import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { SKILL_GROUPS } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";

const ROW1 = [
  "React.js","Node.js","Java","JavaScript","TypeScript","HTML/CSS","Bootstrap",
  "REST APIs","MongoDB","SQL","Git","Netlify","Express.js","Axios","Recharts",
];
const ROW2 = [
  "Kali Linux","Burp Suite","Nmap","Wireshark","OWASP","VAPT","Secure SDLC",
  "AWS EC2","AWS S3","VPC","IAM","Linux","CI/CD","Network Security","Draw.io",
];

const TAB_META = {
  Dev: { color: "#0066ff", glow: "#0066ff33", icon: "⟨/⟩" },
  Sec: { color: "#e53e3e", glow: "#e53e3e33", icon: "⊘"   },
  Ops: { color: "#00e5c4", glow: "#00e5c433", icon: "⚙"   },
};

function MarqueeRow({ items, reverse = false, color }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", marginBottom: 12, maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div style={{
        display: "flex", gap: 10,
        animation: `${reverse ? "marqueeRev" : "marquee"} 30s linear infinite`,
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: FONT_MONO, fontSize: 12,
            padding: "6px 18px",
            border: `1px solid ${color}30`,
            color, borderRadius: 999,
            background: `${color}09`,
            whiteSpace: "nowrap", flexShrink: 0,
            letterSpacing: "0.04em",
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillPill({ name, color }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: FONT_MONO, fontSize: 13,
        padding: "9px 20px",
        border: `1px solid ${hov ? color : "#1e3550"}`,
        color: hov ? color : "#9ab8d4",
        borderRadius: 999,
        background: hov ? `${color}12` : "#0a1525",
        whiteSpace: "nowrap", cursor: "default",
        transition: "all 0.18s",
        display: "inline-block",
        boxShadow: hov ? `0 0 14px ${color}28` : "none",
        transform: hov ? "translateY(-2px)" : "none",
      }}
    >
      {name}
    </span>
  );
}

export default function Skills() {
  const { isSmall } = useBreakpoint();
  const [activeTab, setActiveTab] = useState("Dev");
  const [animKey,   setAnimKey]   = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [activeTab]);

  const group = SKILL_GROUPS.find(g => g.label === activeTab);
  const meta  = TAB_META[activeTab];

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: isSmall ? "70px 0" : "110px 0",
        background: "linear-gradient(180deg, #06090f 0%, #090e18 50%, #06090f 100%)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ambient background glow that follows active tab color */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translateX(-50%)",
        width: 600, height: 400, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${meta.color}07 0%, transparent 70%)`,
        pointerEvents: "none", transition: "background 0.5s",
      }} />

      <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
        <p className="section-num">// 03 — SKILLS</p>
        <h2 className="section-title">Tech Stack</h2>

        {/* ── Pill tab switcher ── */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: isSmall ? 8 : 12, marginBottom: 40,
        }}>
          {SKILL_GROUPS.map(({ label }) => {
            const on  = activeTab === label;
            const col = TAB_META[label].color;
            const ico = TAB_META[label].icon;
            return (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: isSmall ? 12 : 12,
                  letterSpacing: "0.08em",
                  padding: isSmall ? "9px 20px" : "10px 28px",
                  borderRadius: 999,
                  border: `1px solid ${on ? col : "#1e3550"}`,
                  background: on
                    ? `linear-gradient(135deg, ${col}ee, ${col}bb)`
                    : "#0a1525",
                  color: on ? "#06090f" : "#7a9ab8",
                  cursor: "pointer",
                  fontWeight: on ? 700 : 400,
                  transition: "all .25s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: on ? `0 4px 24px ${col}44, 0 0 0 1px ${col}33` : "none",
                  transform: on ? "scale(1.05)" : "scale(1)",
                  display: "flex", alignItems: "center", gap: 7,
                }}
              >
                <span style={{ fontSize: 13, opacity: on ? 1 : 0.5 }}>{ico}</span>
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Tag cloud card ── */}
        <div
          key={animKey}
          style={{
            background: "linear-gradient(135deg, #0c1420 0%, #0a1220 100%)",
            border: `1px solid ${meta.color}28`,
            borderRadius: 14,
            padding: isSmall ? "24px 18px" : "36px 40px",
            minHeight: 180,
            display: "flex", flexWrap: "wrap",
            gap: 10, alignContent: "flex-start",
            boxShadow: `0 0 60px ${meta.color}0c, inset 0 1px 0 ${meta.color}15`,
            transition: "border-color 0.4s, box-shadow 0.4s",
            marginBottom: 52,
            animation: "pageFade 0.3s ease both",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Subtle corner glow inside card */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 180, height: 180, borderRadius: "50%",
            background: `radial-gradient(circle, ${meta.color}12, transparent 70%)`,
            pointerEvents: "none",
          }} />
          {/* Bottom-left glow */}
          <div style={{
            position: "absolute", bottom: -30, left: -30,
            width: 120, height: 120, borderRadius: "50%",
            background: `radial-gradient(circle, ${meta.color}09, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {group.items.map(({ name }) => (
            <SkillPill key={name} name={name} color={meta.color} />
          ))}
        </div>

        {/* ── Marquee ticker ── */}
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 20,
          }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #15243a)" }} />
            <p style={{
              fontFamily: FONT_MONO, fontSize: 10,
              letterSpacing: "0.18em", color: "#2a4060",
              whiteSpace: "nowrap",
            }}>ALL TECHNOLOGIES</p>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #15243a, transparent)" }} />
          </div>
          <MarqueeRow items={ROW1} color={C.accent}  />
          <MarqueeRow items={ROW2} color="#0066ff" reverse />
        </div>
      </div>
    </section>
  );
}
