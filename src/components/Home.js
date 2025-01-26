import React, { useState, useEffect, useMemo } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation.json";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Importing icons
import "../styles/Home.css";

const Home = () => {
  const textArray = useMemo(() => ["Hey there", "Let's create together", "Welcome to my space"], []);
  const [currentText, setCurrentText] = useState(textArray[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 4000);
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

        {/* Social Icons below the name */}
        <div className="social-icons">
          <a href="https://github.com/ANJANA1732" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} />
          </a>
          <a href="https://www.linkedin.com/in/anjana-sivakumar-766760203/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
      <div className="hanimation-container">
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
    </div>
  );
};

export default Home;
