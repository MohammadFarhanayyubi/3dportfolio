import { useRef } from "react";

// ─────────────────────────────────────────────────────────────────
//  TiltCard — wraps any child in a CSS 3D perspective tilt.
//  Mouse hover tilts the card toward the cursor.
//  Works on desktop only (no tilt on touch).
// ─────────────────────────────────────────────────────────────────

export default function TiltCard({ children, style, className, maxTilt = 10 }) {
  const ref     = useRef(null);
  const glowRef = useRef(null);

  const onMove = (e) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = (e.clientX - rect.left)  / rect.width  - 0.5; // -0.5 to 0.5
    const y    = (e.clientY - rect.top)   / rect.height - 0.5;

    el.style.transform = `
      perspective(900px)
      rotateY(${x * maxTilt * 2}deg)
      rotateX(${-y * maxTilt}deg)
      translateZ(8px)
    `;

    // Move inner glow highlight toward cursor
    if (glowRef.current) {
      glowRef.current.style.background = `
        radial-gradient(
          circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
          rgba(0,229,196,0.08) 0%,
          transparent 65%
        )
      `;
      glowRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Moving light reflection */}
      <div
        ref={glowRef}
        style={{
          position: "absolute", inset: 0,
          pointerEvents: "none", zIndex: 1,
          opacity: 0, transition: "opacity 0.3s",
        }}
      />
      {/* Content sits above glow */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
