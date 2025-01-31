import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project"; // Your project list page
import ProjectDetail from "./components/ProjectDetail"; // Detail page for a specific project
import Contact from "./components/Contact";

const App = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />          {/* Home page */}
      <Route path="/about" element={<About />} />    {/* About page */}
      <Route path="/project" element={<Project />} /> {/* Project page */}
      <Route path="/project/:id" element={<ProjectDetail />} /> {/* Project detail page */}
      <Route path="/contact" element={<Contact />} /> {/* Contact page */}
    </Routes>
  </>
);

export default App;
