import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { ME } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function Footer() {
  const { isSmall } = useBreakpoint();
  const links = [
    { label: "Email",    href: `mailto:${ME.email}` },
    { label: "GitHub",   href: `https://${ME.github}` },
    { label: "LinkedIn", href: `https://${ME.linkedin}` },
  ];

  return (
    <footer style={{
      borderTop: `1px solid #0e1e30`,
      background: "linear-gradient(180deg, #06090f 0%, #040710 100%)",
      padding: isSmall ? "28px 20px" : "28px 52px",
    }}>
      {/* Top divider glow */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.accent}44, #0066ff44, transparent)`,
        marginBottom: 24,
      }} />

      <div style={{
        display: "flex",
        flexDirection: isSmall ? "column" : "row",
        justifyContent: "space-between", alignItems: isSmall ? "flex-start" : "center",
        gap: 16,
      }}>
        {/* Logo */}
        <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 15, color: C.bright }}>
          <span style={{ color: C.accent }}>&lt;</span>MF<span style={{ color: C.accent }}>/&gt;</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#2a4060", marginLeft: 12 }}>
            © {new Date().getFullYear()}
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 24 }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ color: "#2a4060", textDecoration: "none", fontFamily: FONT_MONO, fontSize: 11, transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = "#2a4060"}
            >{label}</a>
          ))}
        </div>

        {/* Tag */}
        <div style={{ display: "flex", gap: 8, fontFamily: FONT_MONO, fontSize: 10 }}>
          {[["Dev","#0066ff"],["Sec","#e53e3e"],["Ops","#00e5c4"]].map(([l,col]) => (
            <span key={l} style={{
              padding: "3px 10px", borderRadius: 999,
              border: `1px solid ${col}28`, color: col,
              background: `${col}09`,
            }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
