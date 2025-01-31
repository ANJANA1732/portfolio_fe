import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation-2.json";
import "../styles/About.css";

const About = () => {
  const [icons, setIcons] = useState([]);
  const [descriptions, setDescriptions] = useState([]); // State to hold multiple descriptions

  // Fetch icons and description data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching icons data
        const iconResponse = await fetch("http://localhost:8080/api/icon");
        if (iconResponse.ok) {
          const iconData = await iconResponse.json();
          const updatedIcons = iconData.map((icon) => ({
            ...icon,
            image: `http://localhost:8080/api/icon/${icon.id}/img`,
          }));
          setIcons(updatedIcons);
        } else {
          throw new Error("Failed to fetch icons");
        }

        // Fetching About description data
        const aboutResponse = await fetch("http://localhost:8080/api/about");
        if (aboutResponse.ok) {
          const aboutData = await aboutResponse.json();
          if (aboutData && aboutData.length > 0) {
            setDescriptions(aboutData); // Set all descriptions into state
          } else {
            setDescriptions([{ description: "No description available." }]);
          }
        } else {
          throw new Error("Failed to fetch description");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setDescriptions([{ description: "Error fetching description." }]);
      }
    };

    fetchData();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fallbackImage = "/assets/fallback.jpg";

  return (
    <div className="about-container">
      <div className="left-section">
        <h1>About Me</h1>
        {descriptions.map((desc, index) => (
          <p key={index}>{desc.description || "Loading description..."}</p> 
        ))} {/* Display all descriptions dynamically */}
      </div>

      <div className="right-section">
        <div className="animation-box">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className="skills-container">
          {icons.map((icon, index) => (
            <div className="image" key={index}>
              <img
                src={icon.image}
                alt={icon.name || "Skill Icon"}
                onError={(e) => {
                  e.target.src = fallbackImage;
                  e.target.style.width = "100px"; // Adjust as needed
                  e.target.style.height = "100px"; // Adjust as needed
                  e.target.style.objectFit = "cover"; // Keeps aspect ratio
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
