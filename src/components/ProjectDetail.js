import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();  // Get the project ID from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Fetch all projects
        const response = await fetch("http://localhost:8080/api/projects");
        if (response.ok) {
          const data = await response.json();
          // Find the specific project by ID
          const selectedProject = data.find((proj) => proj.id === parseInt(id));
          setProject(selectedProject);
        } else {
          throw new Error("Failed to fetch project details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className="project-detail-container">
      <img src={project.image} alt={project.name} className="project-image" />
      <h1 className="project-title">{project.name}</h1>
      <p className="project-description">{project.description}</p>
    </div>
  );
};

export default ProjectDetail;
