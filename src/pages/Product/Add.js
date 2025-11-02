import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import api from "../../api/api";
import Breadcrumb from "../../components/Breadcrumb";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/products", data);

      // Accept both 200 OK and 201 Created as success
      if (res.status === 200 || res.status === 201) {
        alert("Product added successfully!");
        navigate("/products");
      } else {
        console.warn("Unexpected status:", res.status);
        alert("Something went wrong, please try again.");
      }
    } catch (err) {
      console.error("Add product error:", err.response || err);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Breadcrumb />
        <Form onSubmit={handleAdd} loading={loading} />
    </div>
  );
}
