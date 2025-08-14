import React, { useState } from "react";
import { useApp } from "../context/AuthContext";

const Register = ({ onSwitch }) => {
  const { registerUser } = useApp();
  const [form, setForm] = useState({ userName: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userName || !form.password) {
      return alert("Please fill all fields");
    }
    await registerUser(form);
    setForm({ userName: "", password: "" });
  };

  return (
    <div className="min-h-screen flex justify-center items-center  dark:bg-gray-800">
      <div className="w-[380px] p-12 bg-white dark:bg-gray-900 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Create an acount
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              UserName
            </label>
            <input
              type="text"
              placeholder="UserName"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <button className="w-full bg-blue-600 py-3 text-white rounded cursor-pointer hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          already have an account ?{" "}
          <button
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={onSwitch}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
