import { useNavigate } from "react-router-dom";
import { C, FONT_MONO, FONT_TITLE } from "../styles/theme";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: FONT_MONO, textAlign: "center", padding: "0 24px",
    }}>
      <p style={{ color: C.accent, fontSize: 11, letterSpacing: "0.22em", marginBottom: 16 }}>
        // ERROR 404
      </p>
      <h1 style={{
        fontFamily: FONT_TITLE, fontWeight: 800, fontSize: "clamp(60px, 15vw, 120px)",
        color: C.border, lineHeight: 1, marginBottom: 20,
      }}>404</h1>
      <p style={{ color: C.text, fontSize: 14, marginBottom: 36 }}>
        This page doesn't exist. Maybe it got<br />penetration-tested out of existence.
      </p>
      <button
        className="btn btn-solid"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
    </div>
  );
}
