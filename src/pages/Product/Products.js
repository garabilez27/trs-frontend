import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../api/api"; 
import Breadcrumb from "../../components/Breadcrumb";

export default function Products() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/products?page=${page}`);
      const data = response.data;

      setProducts(data.data || []);
      setTotalPages(data.last_page || 1);
      setPageSize(data.per_page || data.data.length || 10); // <-- dynamic page size
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully!");
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div>
      <Breadcrumb />

      {/* Add New Product Button */}
      <div className="flex justify-end mb-4">
        <Link
          to="/products/add"
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          <FaPlus /> Add New
        </Link>
      </div>

      {/* Products Table */}
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Quantity</th>
            <th className="py-3 px-4 text-left">Price ($)</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                Loading products...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((p, index) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{(page - 1) * pageSize + (index + 1)}</td>
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.description || "-"}</td>
                <td className="py-2 px-4">{p.quantity}</td>
                <td className="py-2 px-4">{p.price}</td>
                <td className="py-2 px-4 text-center flex justify-center gap-2">
                  <Link
                    to={`/products/${p.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-400"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
