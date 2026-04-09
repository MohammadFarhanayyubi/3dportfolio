import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { CERTS, EDUCATION } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";

const TAG_STYLE = {
  dev: { color: "#0066ff", bg: "#0066ff12", border: "#0066ff30" },
  sec: { color: "#e53e3e", bg: "#e53e3e12", border: "#e53e3e30" },
  ops: { color: "#00e5c4", bg: "#00e5c412", border: "#00e5c430" },
};

export default function Certifications() {
  const { isSmall } = useBreakpoint();

  return (
    <section id="certifications" style={{ padding: isSmall ? "70px 0" : "110px 0" }}>
      <div className="section-wrap">
        <p className="section-num">// 06 — CREDENTIALS</p>
        <h2 className="section-title">Certifications & Education</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : "1.1fr 1fr",
          gap: isSmall ? 32 : 40,
        }}>
          {/* Certifications */}
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.15em", color: C.accent, marginBottom: 18 }}>
              CERTIFICATIONS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CERTS.map(({ title, issuer, year, tag }) => {
                const ts = TAG_STYLE[tag];
                return (
                  <div key={title} style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 6, padding: "16px 18px",
                    borderLeft: `3px solid ${ts.color}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <p style={{ fontSize: isSmall ? 12 : 13, color: C.bright, lineHeight: 1.5 }}>{title}</p>
                      <span style={{
                        fontFamily: FONT_MONO, fontSize: 10, padding: "2px 8px",
                        border: `1px solid ${ts.border}`, color: ts.color,
                        background: ts.bg, borderRadius: 3, flexShrink: 0,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                      }}>{tag}</span>
                    </div>
                    <p style={{ marginTop: 6, fontSize: 12, color: C.text }}>
                      {issuer} · <span style={{ color: C.border }}>{year}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education + AI Tools */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.15em", color: C.accent, marginBottom: 2 }}>
              EDUCATION
            </p>
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 6, padding: "22px 22px",
              borderLeft: `3px solid ${C.accent}`,
            }}>
              <p style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: isSmall ? 15 : 17, color: C.bright, marginBottom: 4 }}>
                {EDUCATION.degree}
              </p>
              <p style={{ fontSize: 13, color: C.accent, marginBottom: 16 }}>{EDUCATION.spec}</p>
              {[
                { k: "College", v: EDUCATION.college },
                { k: "Period",  v: EDUCATION.period  },
                { k: "CGPA",    v: EDUCATION.cgpa, accent: true },
              ].map(({ k, v, accent }) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 8, marginBottom: 8,
                }}>
                  <span style={{ color: C.text }}>{k}</span>
                  <span style={{ color: accent ? C.accent : C.bright }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "16px 18px" }}>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.12em", color: C.border, marginBottom: 12 }}>
                AI & AUTOMATION TOOLS
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["ChatGPT", "DeepSeek", "Claude", "AI-assisted Dev"].map(t => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
