import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProperty.css"; // reuse styles

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState(null); // image file state

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/properties/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("price", formData.price);

    if (imageFile) {
      data.append("image", imageFile);
    } else {
      data.append("image_url", formData.image_url); // fallback
    }

    try {
      await axios.put(`http://localhost:5000/api/properties/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Property updated successfully");
      navigate("/owner-dashboard");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update property");
    }
  };

  return (
    <div className="add-property-container">
      <div className="form-box">
        <h2>Edit Property</h2>
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
          ></textarea>
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
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Current Image:{" "}
            <a href={formData.image_url} target="_blank" rel="noreferrer">
              View
            </a>
          </p>

          <button type="submit">Update Property</button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
