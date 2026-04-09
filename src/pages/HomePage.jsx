import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

export default function HomePage() {
  const navigate = useNavigate();
  // Hero expects onNav(path) — we translate to router navigate
  const onNav = (section) => navigate(`/${section === "home" ? "" : section}`);
  return <Hero onNav={onNav} />;
}
