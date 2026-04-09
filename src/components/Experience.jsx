import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { EXPERIENCE } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";

const TAG_STYLE = {
  dev: { color: "#0066ff", bg: "#0066ff0e", border: "#0066ff28" },
  sec: { color: "#e53e3e", bg: "#e53e3e0e", border: "#e53e3e28" },
  ops: { color: "#00e5c4", bg: "#00e5c40e", border: "#00e5c428" },
};

export default function Experience() {
  const { isSmall } = useBreakpoint();

  return (
    <section id="experience" style={{
      padding: isSmall ? "70px 0" : "110px 0",
      background: "linear-gradient(180deg, #070c14 0%, #06090f 100%)",
    }}>
      <div className="section-wrap">
        <p className="section-num">// 02 — EXPERIENCE</p>
        <h2 className="section-title">Work History</h2>

        <div style={{ position: "relative" }}>
          {/* Glowing timeline line */}
          <div style={{
            position: "absolute",
            left: isSmall ? 6 : 7, top: 8, bottom: 8, width: 1,
            background: `linear-gradient(to bottom, ${C.accent}, #0066ff66, transparent)`,
          }} />
          {/* Pulse at top of line */}
          <div style={{
            position: "absolute", left: isSmall ? 1 : 2, top: 4,
            width: 10, height: 10, borderRadius: "50%",
            background: C.accent, opacity: 0.7,
            boxShadow: `0 0 10px ${C.accent}`,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: isSmall ? 28 : 36 }}>
            {EXPERIENCE.map(({ role, company, type, period, tag, bullets }, idx) => {
              const ts = TAG_STYLE[tag];
              return (
                <div key={role} style={{ display: "flex", gap: isSmall ? 18 : 28 }}>
                  {/* Timeline dot */}
                  <div style={{ flexShrink: 0, paddingTop: 6, position: "relative" }}>
                    <div style={{
                      width: isSmall ? 13 : 15, height: isSmall ? 13 : 15,
                      borderRadius: "50%",
                      border: `2px solid ${ts.color}`,
                      background: `${ts.color}18`,
                      boxShadow: `0 0 12px ${ts.color}66, 0 0 4px ${ts.color}`,
                      position: "relative", zIndex: 1,
                    }} />
                    {/* Pulse ring */}
                    {idx === 0 && (
                      <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: isSmall ? 13 : 15, height: isSmall ? 13 : 15,
                        borderRadius: "50%",
                        border: `1px solid ${ts.color}`,
                        animation: "pulseRing 2s ease-out infinite",
                      }} />
                    )}
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1, minWidth: 0,
                    background: "linear-gradient(135deg, #0c1420 0%, #080f1c 100%)",
                    border: `1px solid ${ts.border}`,
                    borderRadius: 10, padding: isSmall ? "18px 16px" : "22px 24px",
                    position: "relative", overflow: "hidden",
                  }}>
                    {/* Left accent bar */}
                    <div style={{
                      position: "absolute", left: 0, top: 16, bottom: 16, width: 2,
                      background: ts.color, borderRadius: 1,
                    }} />

                    {/* Header */}
                    <div style={{
                      display: "flex",
                      flexDirection: isSmall ? "column" : "row",
                      justifyContent: "space-between",
                      marginBottom: 12, gap: 8,
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: FONT_TITLE, fontWeight: 700,
                          fontSize: isSmall ? 15 : 17, color: C.bright, marginBottom: 4,
                        }}>{role}</h3>
                        <div style={{ fontSize: 12, color: C.text }}>
                          <span style={{ color: ts.color, fontWeight: 600 }}>{company}</span>
                          <span style={{ margin: "0 8px", color: "#1e3550" }}>·</span>
                          {type}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", flexShrink: 0, flexWrap: "wrap" }}>
                        <span style={{
                          fontFamily: FONT_MONO, fontSize: 10, padding: "3px 10px",
                          border: `1px solid ${ts.border}`, color: ts.color,
                          background: ts.bg, borderRadius: 999,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                        }}>{tag}</span>
                        <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#2a4060", paddingTop: 3 }}>
                          {period}
                        </span>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                      {bullets.map((b, i) => (
                        <li key={i} style={{
                          fontSize: isSmall ? 12 : 13, color: "#7a9ab8",
                          lineHeight: 1.7, display: "flex", gap: 10,
                        }}>
                          <span style={{ color: ts.color, flexShrink: 0, marginTop: 1, fontSize: 10 }}>▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
