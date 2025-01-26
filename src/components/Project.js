import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation-4.json";
import "../styles/Project.css";
import { Link } from "react-router-dom";

const sampleProjects = [
  {
    id: 1,
    name: "Visual Question Answering",
    image: "/assets/p1.jpg",
    link: "/project/1", // Route to project details page
  },
  {
    id: 2,
    name: "Medi Find",
    image: "/assets/p2.svg",
    link: "/project/2",
  },
  {
    id: 3,
    name: "Grievance Management System",
    image: "/assets/p3.svg",
    link: "/project/3",
  },
  {
    id: 4,
    name: "Avengers Frontend Project",
    image: "/assets/p4.jpeg",
    link: "/project/4",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
        setProjects(sampleProjects); // Use sample data if fetch fails
      }
    };

    fetchProjects();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div className="projects-container">
      <div className="header">
        <div className="animation-container">
          <Lottie options={defaultOptions} height={80} width={80} />
        </div>
        <h1 className="projects-heading">Works</h1>
      </div>
      <div className="cards-container">
        {projects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id} className="card">

          <div className="image-container">
            <img src={project.image} alt={project.name} />
            <div className="overlay">
              <p>View More</p>
            </div>
          </div>
          <h2>{project.name}</h2>
          </Link>
        
        ))}
    </div>
     
    </div>
  );
};

export default Projects;
