import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useApp } from "../context/AuthContext";

const Sidebar = () => {
  const { logoutUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/auth");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8 underline">GreenCart Logistics</h1>
      <ul className="space-y-4 text-lg font-medium">
        <li>
          <Link
            to="/dashboard"
            className="block p-2 rounded hover:bg-gray-700 hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/drivers"
            className="block p-2 rounded hover:bg-gray-700 hover:text-blue-400 transition"
          >
            Drivers
          </Link>
        </li>
         <li>
          <Link
            to="/routes"
            className="block p-2 rounded hover:bg-gray-700 hover:text-blue-400 transition"
          >
            Routes
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block p-2 rounded hover:bg-gray-700 hover:text-blue-400 transition"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/simulation"
            className="block p-2 rounded hover:bg-gray-700 hover:text-blue-400 transition"
          >
            Simulation
          </Link>
        </li>
        <li
          onClick={handleLogout}
          className="block p-2 rounded hover:bg-gray-700 hover:text-red-400 cursor-pointer transition"
        >
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
