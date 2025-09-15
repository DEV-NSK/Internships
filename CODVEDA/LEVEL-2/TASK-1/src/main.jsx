import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Projects from "./Projects.jsx";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <App></App>
      <About></About>
      <Skills></Skills>
      <Projects></Projects>
    </StrictMode>
  </HashRouter>
);
