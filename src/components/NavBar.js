import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1); 
    setActiveLink(path || "Home");
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={activeLink === "Home" ? "active" : ""}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/About" className={activeLink === "About" ? "active" : ""}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/Project" className={activeLink === "Project" ? "active" : ""}>
              Project
            </Nav.Link>
            <Nav.Link as={Link} to="/Contact" className={activeLink === "Contact" ? "active" : ""}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;