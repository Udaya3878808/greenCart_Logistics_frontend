import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import delivery from "../assets/delivery2.webp"


const AuthPages = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-1/2 hidden md:flex justify-center items-center p-4 bg-gray-100">
        <img
           src={delivery}
          alt="auth"
          className=" w-100 h-120 -mt-12 rounded "
        />
      </div>
      <div className="min-h-screen flex justify-center items-center -mt-10 dark:bg-gray-800">
        {showLogin ? (
          <Login onSwitch={() => setShowLogin(false)} />
        ) : (
          <Register onSwitch={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthPages;
