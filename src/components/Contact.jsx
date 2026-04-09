import { useState } from "react";
import emailjs from "@emailjs/browser";
import { C, FONT_MONO } from "../styles/theme";
import { ME, EMAILJS } from "../data/portfolio";
import { useBreakpoint } from "../hooks/useBreakpoint";

// ─────────────────────────────────────────────────────────────────
//  Field MUST live outside Contact — if defined inside, React
//  treats it as a new component type on every render and unmounts
//  the input, stealing focus after every keystroke.
// ─────────────────────────────────────────────────────────────────
function Field({ name, type = "text", placeholder, rows, value, onChange, error }) {
  const borderColor = error ? "#e53e3e" : C.border;

  const shared = {
    width: "100%",
    background: C.surface,
    border: `1px solid ${borderColor}`,
    color: C.bright,
    fontFamily: FONT_MONO,
    fontSize: 13,
    padding: "11px 14px",
    outline: "none",
    borderRadius: 3,
    display: "block",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ marginBottom: 14 }}>
      {rows ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          style={{ ...shared, resize: "vertical" }}
          onFocus={e  => (e.target.style.borderColor = error ? "#e53e3e" : C.accent)}
          onBlur={e   => (e.target.style.borderColor = borderColor)}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={shared}
          onFocus={e  => (e.target.style.borderColor = error ? "#e53e3e" : C.accent)}
          onBlur={e   => (e.target.style.borderColor = borderColor)}
        />
      )}
      {error && (
        <p style={{ marginTop: 5, fontSize: 11, color: "#e53e3e", fontFamily: FONT_MONO }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{
        width: 12, height: 12, flexShrink: 0,
        border: "1.5px solid #06090f44",
        borderTop: "1.5px solid #06090f",
        borderRadius: "50%",
        display: "inline-block",
        animation: "spin 0.7s linear infinite",
      }} />
    </>
  );
}

// ── Validator ─────────────────────────────────────────────────────
function validate({ name, email, message }) {
  const e = {};
  if (!name.trim())    e.name    = "Name is required.";
  if (!email.trim())   e.email   = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                       e.email   = "Enter a valid email address.";
  if (!message.trim()) e.message = "Message can't be empty.";
  else if (message.trim().length < 10)
                       e.message = "Message is too short (min 10 chars).";
  return e;
}

// ── Status display map ────────────────────────────────────────────
const STATUS_LABEL = {
  idle:    "Send Message →",
  sending: "Sending...",
  sent:    "Message Sent ✓",
  error:   "Try Again →",
};

// ─────────────────────────────────────────────────────────────────
export default function Contact() {
  const { isSmall } = useBreakpoint();

  const [form,     setForm]     = useState({ name: "", email: "", message: "" });
  const [errors,   setErrors]   = useState({});
  const [status,   setStatus]   = useState("idle");   // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  // Single onChange handler — does NOT recreate on render
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear the field's error as user types
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const submit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (status === "sending" || status === "sent") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          to_email:   ME.email,        // ← recipient — fixes "missing address"
          to_name:    "Mohammad Farhan",
          from_name:  form.name,
          from_email: form.email,
          reply_to:   form.email,
          message:    form.message,
        },
        EMAILJS.publicKey
      );

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);

    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(err?.text ?? "Something went wrong. Email me directly.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const links = [
    { label: "Email",    value: ME.email,    href: `mailto:${ME.email}`        },
    { label: "GitHub",   value: ME.github,   href: `https://${ME.github}`      },
    { label: "LinkedIn", value: ME.linkedin, href: `https://${ME.linkedin}`    },
    { label: "Phone",    value: ME.phone,    href: `tel:${ME.phone}`           },
  ];

  const isSent  = status === "sent";
  const isError = status === "error";

  return (
    <section id="contact" style={{ padding: isSmall ? "70px 0" : "110px 0", background: `${C.surface}60` }}>
      <div className="section-wrap">
        <p className="section-num">// 07 — CONTACT</p>
        <h2 className="section-title">Get In Touch</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : "1fr 1.3fr",
          gap: isSmall ? 40 : 64,
        }}>

          {/* ── Left: contact info ── */}
          <div>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: C.text, marginBottom: 28 }}>
              Open to full-time roles, freelance projects, and interesting collaborations.
              I respond within 24 hours.
            </p>

            {links.map(({ label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ display: "block", marginBottom: 14, fontSize: 13, textDecoration: "none" }}>
                <span style={{ color: C.accent }}>→ {label}: </span>
                <span style={{ color: C.bright }}>{value}</span>
              </a>
            ))}

            {/* Availability pulse badge */}
            <div style={{
              marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10,
              background: `${C.accent}0a`, border: `1px solid ${C.accent}22`,
              borderRadius: 4, padding: "10px 16px",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                background: C.accent, boxShadow: `0 0 6px ${C.accent}`,
                animation: "blink 2s step-end infinite",
              }} />
              <span style={{ fontSize: 12, color: C.accent, fontFamily: FONT_MONO }}>
                Available for new opportunities
              </span>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div>
            <Field
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Field
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Field
              name="message"
              placeholder="Tell me about your project..."
              rows={isSmall ? 4 : 5}
              value={form.message}
              onChange={handleChange}
              error={errors.message}
            />

            {/* Submit button */}
            <button
              onClick={submit}
              disabled={status === "sending"}
              className="btn btn-solid"
              style={{
                width: "100%",
                opacity: status === "sending" ? 0.65 : 1,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                background: isSent ? C.accent : isError ? "#e53e3e" : C.accent,
                borderColor: isSent ? C.accent : isError ? "#e53e3e" : C.accent,
                transition: "all .25s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
            >
              {STATUS_LABEL[status]}
              {status === "sending" && <Spinner />}
            </button>

            {/* Success banner */}
            {isSent && (
              <div style={{
                marginTop: 14, padding: "12px 16px",
                background: `${C.accent}0d`, border: `1px solid ${C.accent}30`,
                borderRadius: 4, fontSize: 12, color: C.accent, fontFamily: FONT_MONO,
              }}>
                ✓ Got it! I'll reply to {form.email || "you"} within 24 hours.
              </div>
            )}

            {/* Error banner */}
            {isError && errorMsg && (
              <div style={{
                marginTop: 14, padding: "12px 16px",
                background: "#e53e3e0d", border: "1px solid #e53e3e30",
                borderRadius: 4, fontSize: 12, color: "#e53e3e", fontFamily: FONT_MONO,
              }}>
                ✗ {errorMsg}
              </div>
            )}

            <p style={{ marginTop: 14, fontSize: 11, color: C.border, fontFamily: FONT_MONO }}>
              Powered by EmailJS · No data stored
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
