import React from "react";
import { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { runSimulationApi } from "../Api/simulateApi";

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const simulation = async (data) => {
    try {
      const res = await runSimulationApi(data);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Simulation failed");
      throw error;
    }
  };

  return (
    <SimulationContext.Provider value={{ simulation }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);
