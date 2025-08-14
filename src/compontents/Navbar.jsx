import React from "react";
import { useApp } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.avif"


const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const handleRegisterClick = () => {
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-600 p-4">
      <div className="flex justify-between items-center">
         <h1 className="text-white text-lg font-bold">
         Delivery Simulation & KPI Dashboard
        </h1>
        <div className="space-x-5">
          {user ? (
            <div className="flex items-center space-x-3">
              <img
                src={profile}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-white font-semibold">{user.userName}</span>
            </div>
          ) : (
            <button
              onClick={handleRegisterClick}
              className="font-bold text-white text-xl hover:underline"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
