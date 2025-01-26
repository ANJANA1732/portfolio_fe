import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={scrolled ? "scrolled navbar-custom" : "navbar-custom"}
    >
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/About"
              className={location.pathname === "/About" ? "active" : ""}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Project"
              className={location.pathname === "/Project" ? "active" : ""}
            >
              Project
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Contact"
              className={location.pathname === "/Contact" ? "active" : ""}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
