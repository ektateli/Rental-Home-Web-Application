import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProperty.css";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });
  const [image, setImage] = useState(null); // <-- for file upload

  const navigate = useNavigate();
  const ownerId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const payload = new FormData();
    payload.append("owner_id", ownerId);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("location", formData.location);
    payload.append("price", formData.price);
    payload.append("image", image); // must match `upload.single('image')`

    try {
      await axios.post("http://localhost:5000/api/properties", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Property added successfully");
      navigate("/owner-dashboard");
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property");
    }
  };

  return (
    <div className="add-property-container">
      <div className="form-box">
        <h2>Add New Property</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Property Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
