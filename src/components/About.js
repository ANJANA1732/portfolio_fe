import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation-2.json";

// Icons
import CIcon from "../assets/icons/icons-c.svg";
import GitIcon from "../assets/icons/icons-git.svg";
import SpringBootIcon from "../assets/icons/icons-spring-boot.svg";
import ReactIcon from "../assets/icons/icons-react.svg";
import HtmlIcon from "../assets/icons/icons-html5.svg";
import CssIcon from "../assets/icons/icons-css.svg";
import JavaIcon from "../assets/icons/icons-java.svg";
import FigmaIcon from "../assets/icons/icons-figma.svg";
import IllustratorIcon from "../assets/icons/icons-illustrator.svg";

import "../styles/About.css";

const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const skills = [
    { icon: CIcon, name: "C" },
    { icon: GitIcon, name: "Git" },
    { icon: SpringBootIcon, name: "Spring Boot" },
    { icon: ReactIcon, name: "React" },
    { icon: HtmlIcon, name: "HTML" },
    { icon: CssIcon, name: "CSS" },
    { icon: JavaIcon, name: "Java" },
    { icon: FigmaIcon, name: "Figma" },
    { icon: IllustratorIcon, name: "Illustrator" },
  ];

  return (
    <div className="about-container">
      {/* Left Section */}
      <div className="left-section">
        <h1>About Me</h1>
        <p>
          Hello! I'm a passionate developer with experience in React, Spring
          Boot, PostgreSQL, and more. I enjoy solving complex problems and
          designing intuitive user interfaces.
        </p>
        <p>
          In my free time, I explore creative tools like Figma and contribute to
          open-source projects.
        </p>
        <p>Feel free to reach out for collaborations or project discussions!</p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="animation-box">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill" key={index}>
              <img src={skill.icon} alt={skill.name} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
