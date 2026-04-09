import { useState } from "react";
import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { PROJECTS } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";
import TiltCard from "./TiltCard";

const FILTERS   = ["All", "Dev", "Sec", "Ops"];
const CAT_COLOR = { dev: "#0066ff", sec: "#e53e3e", ops: "#00e5c4" };
const CAT_LABEL = { dev: "Dev",    sec: "Sec",    ops: "Ops" };

export default function Projects() {
  const { isSmall } = useBreakpoint();
  const [filter, setFilter] = useState("All");

  const visible = filter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === filter.toLowerCase());

  return (
    <section id="projects" style={{
      padding: isSmall ? "70px 0" : "110px 0",
      background: "linear-gradient(180deg, #06090f 0%, #070c14 100%)",
    }}>
      <div className="section-wrap">
        <p className="section-num">// 04 — WORK</p>
        <h2 className="section-title">Featured Projects</h2>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap", alignItems: "center" }}>
          {FILTERS.map(f => {
            const on  = filter === f;
            const col = f === "All" ? C.accent : f === "Dev" ? "#0066ff" : f === "Sec" ? "#e53e3e" : "#00e5c4";
            return (
              <button key={f} onClick={() => setFilter(f)} style={{
                fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.1em",
                textTransform: "uppercase", padding: isSmall ? "8px 14px" : "8px 20px",
                borderRadius: 999,
                border: `1px solid ${on ? col : "#1e3550"}`,
                color: on ? "#06090f" : "#7a9ab8",
                background: on ? col : "#0a1525",
                cursor: "pointer", transition: "all .2s",
                boxShadow: on ? `0 0 16px ${col}44` : "none",
                fontWeight: on ? 700 : 400,
              }}>
                {f === "All" ? "All Projects" : f}
              </button>
            );
          })}
          <span style={{ fontSize: 11, color: "#2a4060", fontFamily: FONT_MONO }}>
            {visible.length} project{visible.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {visible.map(({ title, desc, tags, cat, status, year, demo, repo }) => {
            const cc = CAT_COLOR[cat];
            return (
              <TiltCard
                key={title}
                maxTilt={isSmall ? 0 : 6}
                style={{
                  background: "linear-gradient(135deg, #0c1420 0%, #080f1c 100%)",
                  border: `1px solid #15243a`,
                  borderRadius: 10,
                  padding: isSmall ? "20px 18px" : "26px 30px",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Gradient top line in category color */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${cc}, ${cc}44, transparent)`,
                }} />

                <div style={{
                  display: "flex",
                  flexDirection: isSmall ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: 12, gap: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: isSmall ? 16 : 19, color: C.bright }}>{title}</h3>
                    <span style={{
                      fontSize: 10, padding: "3px 10px", borderRadius: 999,
                      background: `${cc}12`, color: cc, border: `1px solid ${cc}30`,
                      letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: FONT_MONO,
                    }}>{CAT_LABEL[cat]}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: "#2a4060", fontFamily: FONT_MONO }}>{year}</span>
                    <span style={{
                      fontSize: 10, padding: "3px 10px", borderRadius: 999, fontFamily: FONT_MONO,
                      background: status === "Live" ? `${C.accent}12` : "#0a1525",
                      color: status === "Live" ? C.accent : "#7a9ab8",
                      border: `1px solid ${status === "Live" ? C.accent + "30" : "#1e3550"}`,
                    }}>
                      {status === "Live" && <span style={{ marginRight: 5, animation: "blink 2s step-end infinite" }}>●</span>}
                      {status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: isSmall ? 12 : 13, lineHeight: 1.85, color: "#7a9ab8", marginBottom: 16 }}>{desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
                  {tags.map(t => (
                    <span key={t} style={{
                      fontFamily: FONT_MONO, fontSize: 11,
                      padding: "3px 10px", borderRadius: 3,
                      border: `1px solid ${cc}20`, color: cc,
                      background: `${cc}08`,
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <a href={demo} target="_blank" rel="noreferrer">
                    <button className="btn" style={{ fontSize: 11, padding: "8px 18px" }}>Live Demo ↗</button>
                  </a>
                  <a href={repo} target="_blank" rel="noreferrer">
                    <button className="btn btn-muted" style={{ fontSize: 11, padding: "8px 18px" }}>GitHub ↗</button>
                  </a>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
