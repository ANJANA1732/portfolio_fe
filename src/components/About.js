import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation-2.json";
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

  return (
    <div className="about-container">
      {/* Left Section */}
      <div className="left-section">
        <h1>About Me</h1>
        <p>
          Hello! I'm a passionate developer with experience in React, Spring Boot,
          PostgreSQL, and more. I enjoy solving complex problems and designing
          intuitive user interfaces.
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
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
        <div className="skills-container">
          <div className="skill">
            <img src={CIcon} alt="C" />
            <span>C</span>
          </div>
          <div className="skill">
            <img src={GitIcon} alt="Git" />
            <span>Git</span>
          </div>
          <div className="skill">
            <img src={SpringBootIcon} alt="Spring Boot" />
            <span>Spring Boot</span>
          </div>
          <div className="skill">
            <img src={ReactIcon} alt="React" />
            <span>React</span>
          </div>
          <div className="skill">
            <img src={HtmlIcon} alt="HTML" />
            <span>HTML</span>
          </div>
          <div className="skill">
            <img src={CssIcon} alt="CSS" />
            <span>CSS</span>
          </div>
          <div className="skill">
            <img src={JavaIcon} alt="Java" />
            <span>Java</span>
          </div>
          <div className="skill">
            <img src={FigmaIcon} alt="Figma" />
            <span>Figma</span>
          </div>
          <div className="skill">
            <img src={IllustratorIcon} alt="Illustrator" />
            <span>Illustrator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

