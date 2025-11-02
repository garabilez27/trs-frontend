import React, { useState } from "react";

export default function ProductForm({ initialData = {}, onSubmit, loading = false }) {
  
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    quantity: initialData.quantity || "",
    price: initialData.price || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.quantity || isNaN(form.quantity) || Number(form.quantity) < 0)
      return "Quantity must be a non-negative number";
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      return "Price must be a non-negative number";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit({
      name: form.name,
      description: form.description,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow flex flex-col gap-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div>
        <label className="block mb-1 font-semibold" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="description">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="quantity">
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="price">
          Price ($) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 disabled:bg-green-400"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
