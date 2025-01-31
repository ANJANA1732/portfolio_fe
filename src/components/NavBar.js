import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/NavBar.css";

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleToggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        {/* Brand Logo 
        <Link to="/" className="navbar-logo" onClick={handleCloseMenu}>
          <h2 style={{ fontWeight: "bold", margin: 0 }}>MyBrand</h2>
        </Link>
        */}

        {/* Hamburger Icon */}
        <div className="navbar-toggle" onClick={handleToggleMenu}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={handleCloseMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/About"
              className={location.pathname === "/About" ? "active" : ""}
              onClick={handleCloseMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/Project"
              className={location.pathname === "/Project" ? "active" : ""}
              onClick={handleCloseMenu}
            >
              Project
            </Link>
          </li>
          <li>
            <Link
              to="/Contact"
              className={location.pathname === "/Contact" ? "active" : ""}
              onClick={handleCloseMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
