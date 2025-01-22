import React, { useState, useEffect, useMemo } from "react";
import Lottie from "react-lottie";
import { FaArrowRight } from "react-icons/fa"; // Right arrow icon
import animationData from "../assets/Animation.json";
import LinkedInIcon from "../assets/icons/icons-linkedin.svg"; // LinkedIn SVG path
import InstagramIcon from "../assets/icons/icons-instagram.svg"; // Instagram SVG path
import "../styles/Home.css";

const Home = () => {
  const textArray = useMemo(() => ["Hey there", "Let's create together", "Welcome to my space"], []);
  const [currentText, setCurrentText] = useState(textArray[0]);
  const [index, setIndex] = useState(0);
  const [showIcons, setShowIcons] = useState(false); // Toggle icons visibility

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [textArray]);

  useEffect(() => setCurrentText(textArray[index]), [index, textArray]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div className="home-container">
      <div className="text-container">
        <h2>{currentText}</h2>
        <h2 className="highlight">I'm Anjana</h2>
        <div className="ping">
        <div className="arrow-container" onClick={() => setShowIcons(!showIcons)}>
          <FaArrowRight size={30} className="arrow-icon" />
        </div>
        {showIcons && (
          <div className="social-links">
            <div className="sicon">
            <a
              href="https://www.linkedin.com/in/anjana-sivakumar-766760203/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src={LinkedInIcon} alt="LinkedIn" className="svg-icon" />
            </a>
            </div>
            <div className="sicon">
              <a
                href="https://www.instagram.com/your-instagram-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <img src={InstagramIcon} alt="Instagram" className="svg-icon" />
              </a>
            </div>
          </div>
         
        )}
      </div>
      </div>
      <div className="animation-container">
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
    </div>
  );
};

export default Home;
