import React, { useState } from "react";
import { useApp } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitch }) => {
  const { loginUser } = useApp();
  const [form, setForm] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userName || !form.password) {
      return alert("Please fill all fields");
    }
    await loginUser(form);
    navigate("/dashboard");
    setForm({ userName: "", password: "" });
  };

  return (
    <div className="min-h-screen flex justify-center items-center  dark:bg-gray-800">
      <div className="w-[380px] p-12 bg-white dark:bg-gray-900 shadow-md rounded ">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              userName
            </label>
            <input
              type="text"
              placeholder="text"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="block text-gray-700 dark:text-gray-200 mb-1">
            <label>password</label>
            <input
              type="password"
              placeholder="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <button className="w-full bg-blue-600 py-3 mt-3 text-white rounded cursor-pointer hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don’t have an account ?{" "}
          <button
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={onSwitch}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
