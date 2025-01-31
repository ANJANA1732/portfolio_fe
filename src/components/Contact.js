import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation-3.json";
import axios from "axios"; 
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.name.trim()) {
      isValid = false;
      errors.name = "Name is required.";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      isValid = false;
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      isValid = false;
      errors.email = "Please enter a valid email.";
    }

    if (!formData.message.trim()) {
      isValid = false;
      errors.message = "Message is required.";
    }

    setErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Do not submit if form is invalid
    }

    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:8080/api/contact", formData);
      console.log("Response from backend:", response.data);

      // Display success message
      setResponseMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form fields
    } catch (error) {
      console.error("Error while sending data to the backend:", error);
      setResponseMessage("Failed to send message. Please try again.");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="contact-container">
      <div className="form-section">
        <h1>Contact Me</h1>
        {responseMessage && <p className="response-message">{responseMessage}</p>} {/* Show response message */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="glass-effect"
            />
            {errors.name && <p className="error-message">{errors.name}</p>} {/* Show name error */}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="glass-effect"
            />
            {errors.email && <p className="error-message">{errors.email}</p>} {/* Show email error */}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              className="glass-effect"
            ></textarea>
            {errors.message && <p className="error-message">{errors.message}</p>} {/* Show message error */}
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="animation-section">
        <Lottie options={defaultOptions} height={500} width={500} className="tilted-animation" />
      </div>
    </div>
  );
};

export default Contact;
