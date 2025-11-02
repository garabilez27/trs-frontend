import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";
import api from "../../api/api";
import Breadcrumb from "../../components/Breadcrumb";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setInitialData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      await api.put(`/products/${id}`, data);
      alert("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) return <div>Loading product data...</div>;

  return (
    <div>
      <Breadcrumb />
      <Form onSubmit={handleUpdate} loading={loading} initialData={initialData} />
    </div>
  );
}
