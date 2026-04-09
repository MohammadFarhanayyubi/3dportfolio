import { Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Layout            from "./components/Layout";
import HomePage          from "./pages/HomePage";
import AboutPage         from "./pages/AboutPage";
import ExperiencePage    from "./pages/ExperiencePage";
import SkillsPage        from "./pages/SkillsPage";
import ProjectsPage      from "./pages/ProjectsPage";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage       from "./pages/ContactPage";
import NotFoundPage      from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      {/* Layout wraps every route — gives us Navbar + Footer on all pages */}
      <Route element={<Layout />}>
        <Route path="/"                index element={<HomePage />}           />
        <Route path="/about"                  element={<AboutPage />}          />
        <Route path="/experience"             element={<ExperiencePage />}     />
        <Route path="/skills"                 element={<SkillsPage />}         />
        <Route path="/projects"               element={<ProjectsPage />}       />
        <Route path="/certifications"         element={<CertificationsPage />} />
        <Route path="/contact"                element={<ContactPage />}        />
        <Route path="*"                       element={<NotFoundPage />}       />
      </Route>
    </Routes>
  );
}
