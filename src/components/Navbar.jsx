import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";
import { useBreakpoint } from "../hooks/useBreakpoint";

const ROUTES = [
  { path: "/",               label: "home"    },
  { path: "/about",          label: "about"   },
  { path: "/experience",     label: "exp"     },
  { path: "/skills",         label: "skills"  },
  { path: "/projects",       label: "projects"},
  { path: "/certifications", label: "certs"   },
  { path: "/contact",        label: "contact" },
];

export default function Navbar() {
  const { isSmall }  = useBreakpoint();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  // Shared active / inactive styles
  const linkStyle = ({ isActive }) => ({
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color:  isActive ? C.accent : C.text,
    padding: "7px 11px",
    border: `1px solid ${isActive ? C.accent : "transparent"}`,
    background: "none",
    cursor: "pointer",
    transition: "all .2s",
    borderRadius: 3,
    whiteSpace: "nowrap",
    textDecoration: "none",
    display: "inline-block",
  });

  return (
    <>
      {/* ── Main bar ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: `${C.bg}ee`, backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 24px", height: 54,
      }}>
        {/* Logo */}
        <div
          onClick={() => { navigate("/"); close(); }}
          style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 16, color: C.bright, cursor: "pointer" }}
        >
          <span style={{ color: C.accent }}>&lt;</span>MF<span style={{ color: C.accent }}>/&gt;</span>
        </div>

        {/* Desktop: NavLinks */}
        {!isSmall && (
          <div style={{ display: "flex", gap: 2 }}>
            {ROUTES.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}          /* exact match for home only */
                style={linkStyle}
                onMouseEnter={e => {
                  if (!e.currentTarget.style.borderColor.includes("e5"))
                    Object.assign(e.currentTarget.style, { color: C.accent, borderColor: C.accent });
                }}
                onMouseLeave={e => {
                  if (!e.currentTarget.getAttribute("aria-current"))
                    Object.assign(e.currentTarget.style, { color: C.text, borderColor: "transparent" });
                }}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Mobile: hamburger button */}
        {isSmall && (
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: "none", border: `1px solid ${open ? C.accent : C.border}`,
              cursor: "pointer", padding: "7px 10px", borderRadius: 3,
              display: "flex", flexDirection: "column", gap: 4,
              transition: "border-color .2s",
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 18, height: 1.5,
                background: open ? C.accent : C.text,
                transition: "all .25s",
                transform: open
                  ? i === 0 ? "translateY(5.5px) rotate(45deg)"
                  : i === 2 ? "translateY(-5.5px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* ── Mobile drawer ── */}
      {isSmall && open && (
        <div className="mobile-menu" style={{
          position: "sticky", top: 54, zIndex: 99,
          background: `${C.bg}f8`, backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column",
        }}>
          {ROUTES.map(({ path, label }, idx) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={close}
              style={({ isActive }) => ({
                fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "15px 24px",
                textAlign: "left", textDecoration: "none", display: "block",
                borderBottom: `1px solid ${C.border}`,
                color: isActive ? C.accent : C.text,
                background: isActive ? `${C.accent}08` : "none",
              })}
            >
              <span style={{ color: C.accent, marginRight: 10 }}>
                {String(idx + 1).padStart(2, "0")}.
              </span>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
