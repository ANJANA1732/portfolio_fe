import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import

import styles from "./../styles/Admin.module.css";

const API_BASE_URL = "http://localhost:8080/api";

const Admin = () => {
  const navigate = useNavigate(); // Updated to useNavigate()

  const [about, setAbout] = useState([]);
  const [icons, setIcons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    about: { description: "" },
    icon: { icon: "", img: null },
    project: { name: "", description: "", image: null },
    user: { username: "", password: "" },
  });

  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    // Check if the authFlag exists, otherwise redirect to login
    if (!localStorage.getItem("authFlag")) {
      navigate("/login");
      alert("Please log in to access this page.");
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const aboutRes = await axios.get(`${API_BASE_URL}/about`);
      const iconRes = await axios.get(`${API_BASE_URL}/icon`);
      const projectRes = await axios.get(`${API_BASE_URL}/project`);
      const userRes = await axios.get(`${API_BASE_URL}/admin/users`);

      setAbout(aboutRes.data);
      setIcons(iconRes.data);
      setProjects(projectRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${type}/${id}`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}`, error);
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleFileChange = (e, section) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: files[0] },
    }));
  };

  const handleAdd = async (type) => {
    try {
      if (type === "users") {
        await axios.post(`${API_BASE_URL}/register`, {
          username: formData.user.username,
          password: formData.user.password,
        });
      } else {
        const form = new FormData();

        if (type === "about") {
          form.append("description", formData.about.description);
        } else if (type === "icon") {
          form.append("icon", formData.icon.icon);
          form.append("img", formData.icon.img);
        } else if (type === "project") {
          form.append("name", formData.project.name);
          form.append("description", formData.project.description);
          form.append("image", formData.project.image);
        }

        await axios.post(`${API_BASE_URL}/${type}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchData();
      setFormData((prev) => ({
        ...prev,
        [type]: type === "users" ? { username: "", password: "" } : {},
      }));
    } catch (error) {
      console.error(`Error adding ${type}`, error);
    }
  };

  const handleEdit = (type, item) => {
    setEditing({ type, id: item.id });
    if (type === "about") {
      setFormData((prev) => ({ ...prev, about: { description: item.description } }));
    } else if (type === "icon") {
      setFormData((prev) => ({ ...prev, icon: { icon: item.icon, img: item.img } }));
    } else if (type === "project") {
      setFormData((prev) => ({
        ...prev,
        project: { name: item.name, description: item.description, image: item.image },
      }));
    }
  };

  const handleSaveEdit = async () => {
    const form = new FormData();
    try {
      const { type, id } = editing;

      if (type === "about") {
        form.append("description", formData.about.description);
      } else if (type === "icon") {
        form.append("icon", formData.icon.icon);
        if (formData.icon.img) {
          form.append("img", formData.icon.img);
        }
      } else if (type === "project") {
        form.append("name", formData.project.name);
        form.append("description", formData.project.description);
        if (formData.project.image) {
          form.append("image", formData.project.image);
        }
      }

      await axios.put(`${API_BASE_URL}/${type}/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchData();
      setFormData({ ...formData, [type]: {} });
      setEditing(null);
    } catch (error) {
      console.error(`Error saving ${editing.type}`, error);
    }
  };

  const handleLogout = () => {
    
    localStorage.removeItem("authFlag");
    localStorage.removeItem("username");

    navigate("/"); 
    window.location.reload(); 
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul>
          
          <li onClick={() => setActiveSection("about")}>About</li>
          <li onClick={() => setActiveSection("skills")}>Skills</li>
          <li onClick={() => setActiveSection("projects")}>Projects</li>
          <li onClick={() => setActiveSection("users")}>Users</li>
          
        </ul>

        <div className={styles.logoutButton}>
          <button onClick={handleLogout}>Logout</button>
        </div>

      </div>

      <div className={styles.content}>
        {activeSection === "users" && (
          <div className={styles.section}>
            <h2>Users</h2>
            <div className={styles.formGroup}>
              {users.map((user) => (
                <div key={user.id} className={styles.item}>
                  <p>{user.username}</p>
                  {/* <div className={styles.buttonGroup}>
                    <button onClick={() => handleDelete("users", user.id)}>Delete</button>
                  </div> */}
                </div>
              ))}
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                name="username"
                value={formData.user.username}
                onChange={(e) => handleInputChange(e, "user")}
                placeholder="Username"
              />
              <input
                type="password"
                name="password"
                value={formData.user.password}
                onChange={(e) => handleInputChange(e, "user")}
                placeholder="Password"
              />
              <div className={styles.bottomButtons}>
                <button onClick={() => handleAdd("users")}>Add User</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div className={styles.section}>
            <h2>About</h2>
            <div className={styles.formGroup}>
              {about.map((item) => (
                <div key={item.id} className={styles.item}>
                  <p>{item.description}</p>
                  <div className={styles.buttonGroup}>
                    <button onClick={() => handleEdit("about", item)}>Edit</button>
                    <button onClick={() => handleDelete("about", item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="description"
                value={formData.about.description}
                onChange={(e) => handleInputChange(e, "about")}
                placeholder="New description"
              />
              <div className={styles.bottomButtons}>
                {editing?.type === "about" ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleAdd("about")}>Add About</button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === "skills" && (
          <div className={styles.section}>
            <h2>Skills</h2>
            <div className={styles.formGroup}>
              {icons.map((icon) => (
                <div key={icon.id} className={styles.item}>
                  <p>{icon.icon}</p>
                  {icon.img && (
                    <img
                      className={styles.img_ad}
                      src={`${API_BASE_URL}/icon/${icon.id}/img`}
                      alt="icon"
                    />
                  )}
                  <div className={styles.buttonGroup}>
                    <button onClick={() => handleEdit("icon", icon)}>Edit</button>
                    <button onClick={() => handleDelete("icon", icon.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="icon"
                value={formData.icon.icon}
                onChange={(e) => handleInputChange(e, "icon")}
                placeholder="New icon"
              />
              <input
                type="file"
                name="img"
                onChange={(e) => handleFileChange(e, "icon")}
              />
              <div className={styles.bottomButtons}>
                {editing?.type === "icon" ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleAdd("icon")}>Add Icon</button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === "projects" && (
          <div className={styles.section}>
            <h2>Projects</h2>
            <div className={styles.formGroup}>
              {projects.map((project) => (
                <div key={project.id} className={styles.item}>
                  <p>{project.name}</p>
                  <p>{project.description}</p>
                    {project.image && (
                      <img className={styles.img_ad} src={`${API_BASE_URL}/project/${project.id}/image`} alt="project" />
                    )}
                  <div className={styles.buttonGroup}>
                    <button onClick={() => handleEdit("project", project)}>Edit</button>
                    <button onClick={() => handleDelete("project", project.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                value={formData.project.name}
                onChange={(e) => handleInputChange(e, "project")}
                placeholder="New project name"
              />
              <textarea
                name="description"
                value={formData.project.description}
                onChange={(e) => handleInputChange(e, "project")}
                placeholder="Project description"
              ></textarea>
              <input
                type="file"
                name="image"
                onChange={(e) => handleFileChange(e, "project")}
              />
              <div className={styles.bottomButtons}>
                {editing?.type === "project" ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleAdd("project")}>Add Project</button>
                )}
              </div>
            </div>
          </div>
        )}

        

        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Admin;
