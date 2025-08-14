import React from "react";
import { createContext, useContext } from "react";
import {
  createRouteApi,
  UpdateRouteApi,
  getAllRouteApi,
  getRouteApi,
  DeleteRouteApi,
} from "../Api/routeApi";
import { toast } from "react-hot-toast";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const createRoute = async (data) => {
    try {
      const res = await createRouteApi(data);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Create route failed");
      throw error;
    }
  };

  const updateRoute = async (data, id) => {
    try {
      const res = await UpdateRouteApi(data, id);
      toast.success(res.message || "Route updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Update route failed");
      throw error;
    }
  };

  const getAllRoutes = async () => {
    try {
      const res = await getAllRouteApi();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Get all route failed");
      throw error;
    }
  };

  const getRoute = async (id) => {
    try {
      const res = await getRouteApi(id);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Get route failed");
      throw error;
    }
  };

  const deleteRoute = async (id) => {
    try {
      const res = await DeleteRouteApi(id);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete route failed");
      throw error;
    }
  };

  return (
    <RouteContext.Provider
      value={{
        createRoute,
        updateRoute,
        getAllRoutes,
        getRoute,
        deleteRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
