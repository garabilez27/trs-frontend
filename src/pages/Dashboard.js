import React from "react";
import { Link } from "react-router-dom";
import { FaBox } from "react-icons/fa"; // ✅ import icon

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Clickable Products card */}
      <Link
        to="/products"
        className="block bg-white p-4 rounded-md shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center"
      >
        <div className="flex flex-col items-center">
          <FaBox className="text-blue-700 text-3xl mb-2" /> {/* smaller icon */}
          <h2 className="text-md font-semibold text-blue-700 mb-1">Products</h2>
          <p className="text-sm text-gray-600">View and manage your product list.</p>
        </div>
      </Link>
    </div>
  );
}
