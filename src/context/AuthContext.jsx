import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  registerUserApi,
  loginUserApi,
  getProfileApi,
  logoutUserApi,
} from "../Api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const registerUser = async (Data) => {
    try {
      const res = await registerUserApi(Data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "register Failed");
    }
  };

  const loginUser = async (Data) => {
    try {
      await loginUserApi(Data);
      const res = await getProfileApi();
      setUser(res.data.user);
      toast.success("Login successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "login Failed");
    }
  };

  const refreshUser = async () => {
    try {
      const res = await getProfileApi();
      setUser(res.data.user);
    } catch {
      setUser("");
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logoutUser = async () => {
    await logoutUserApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        user,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useApp = () => useContext(AuthContext);
