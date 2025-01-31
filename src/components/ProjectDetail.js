import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();  // Get the project ID from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Fetch specific project from the backend using the UUID id
        const response = await fetch(`http://localhost:8080/api/project/${id}`); // Fetch using UUID
        if (response.ok) {
          const data = await response.json();
          // Add the image URL dynamically to the project object
          const projectWithImage = {
            ...data,
            image: `http://localhost:8080/api/project/${id}/image`, // Dynamically construct image URL
          };
          setProject(projectWithImage);
        } else {
          throw new Error("Failed to fetch project details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);  // Re-run the fetch when the ID changes

  if (!project) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <div className="project-detail-container">
      <img src={project.image} alt={project.name} className="project-image" /> {/* Updated to use dynamic image URL */}
      <h1 className="project-title">{project.name}</h1>
      <p className="project-description">{project.description}</p>
    </div>
  );
};

export default ProjectDetail;
