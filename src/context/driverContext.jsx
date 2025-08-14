import React from "react";
import { createContext, useContext } from "react";
import {
  createDriversApi,
  UpdateDriversApi,
  getAllDriversApi,
  getDriversApi,
  DeleteDriversApi,
} from "../Api/driverApi";
import { toast } from "react-hot-toast";

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const createDriver = async (data) => {
    try {
      const res = await createDriversApi(data);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "create Driver Failed");
    }
  };

  const updateDriver = async (data, id) => {
    try {
      const res = await UpdateDriversApi(data, id);
      toast.success(res.message || "Driver updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Update Driver Failed");
    }
  };

  const getAllDriver = async () => {
    try {
      const res = await getAllDriversApi();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "get All Driver Failed");
    }
  };

  const getDriver = async (id) => {
    try {
      const res = await getDriversApi(id);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "All Driver Failed");
    }
  };

  const deleteDriver = async (id) => {
    try {
      const res = await DeleteDriversApi(id);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete Driver Failed");
    }
  };

  return (
    <DriverContext.Provider
      value={{
        createDriver,
        updateDriver,
        getAllDriver,
        getDriver,
        deleteDriver,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => useContext(DriverContext);
