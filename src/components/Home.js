import React, { useState, useEffect, useMemo } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation.json";
import "../styles/Home.css";

const Home = () => {
  const textArray = useMemo(() => ["Hey there", "Let's create together", "Welcome to my space"], []);
  const [currentText, setCurrentText] = useState(textArray[0]);
  const [index, setIndex] = useState(0);

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
      </div>
      <div className="animation-container">
        {/* Adjusted height and width */}
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
    </div>
  );
};

export default Home;
