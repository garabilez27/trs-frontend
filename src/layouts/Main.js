import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBox, FaChartBar, FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { removeToken, getToken } from "../utils/auth";
import api from '../api/api';

export default function Main({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "Products", path: "/products", icon: <FaBox /> },
  ];

  const logout = () => {
    removeToken();
    alert("Logged out!");
    navigate("/");
  };

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(response.data);
      } catch (err) {
        console.error(err);
        removeToken();
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#001f3f] text-white p-6 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">MyApp</h2>

          <hr className="border-gray-600 mb-6" />

          {/* User Info */}
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <FaUserCircle className="text-3xl text-gray-300 flex-shrink-0" />
            <div>
              {currentUser ? (
                <>
                  <p className="text-sm">{currentUser.name}</p>
                  <p className="text-xs text-gray-400">{currentUser.email}</p>
                </>
              ) : (
                <p className="text-sm text-gray-400">Loading...</p>
              )}
            </div>
          </div>

          <hr className="border-gray-600 mb-6" />

          {/* Menu */}
          <ul className="flex flex-col">
            {menuItems.map((item) => (
              <li key={item.name} className="mb-3 p-0">
                <Link
                  to={item.path}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "bg-blue-800 font-semibold"
                      : "hover:bg-blue-700"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold mt-6"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64">
        {/* Mobile Hamburger */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {location.pathname.includes("products") ? "Products" : "Dashboard"}
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl text-gray-800 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-4 hidden md:block">
          <h1 className="text-3xl font-bold text-gray-800">
            {location.pathname.includes("products") ? "Products" : "Dashboard"}
          </h1>
        </div>

        {/* Render page content */}
        {children}
      </main>
    </div>
  );
}
