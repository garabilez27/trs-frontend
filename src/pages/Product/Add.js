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
      await api.post("/products", data);
      alert("Product added successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
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
