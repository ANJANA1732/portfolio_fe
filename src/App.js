import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project"; // Your project list page
import ProjectDetail from "./components/ProjectDetail"; // Detail page for a specific project
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <>
    
    <Routes>
      <Route path="/" element={<><NavBar /><Home /></>} />          {/* Home page */}
      <Route path="/about" element={<><NavBar /><About /></>} />    {/* About page */}
      <Route path="/project" element={<><NavBar /><Project /></>} /> {/* Project page */}
      <Route path="/project/:id" element={<><NavBar /><ProjectDetail /></>} /> {/* Project detail page */}
      <Route path="/contact" element={<><NavBar /><Contact /></>} /> {/* Contact page */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route
          path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      
    </Routes>
  </>
);

export default App;
