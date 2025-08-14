import React, { useState, useEffect } from "react";
import { useSimulation } from "../context/simulateContext";
import { toast } from "react-hot-toast";
const Simulation = () => {
  const { simulation } = useSimulation();
  const [form, setForm] = useState({
    availableDrivers: 1,
    startTime: "08:00",
    maxHoursPerDriver: 8,
  });
  const [result, setResult] = useState(null);
  
  const handleRun = async () => {
    try {
      const res = await simulation({
        availableDrivers: Number(form.availableDrivers),
        startTime: form.startTime,
        maxHoursPerDriver: Number(form.maxHoursPerDriver),
      });
      setResult(res);
      toast.success("run successfully");
    } catch (err) {
      console.error("Simulation failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Run Simulation</h1>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0 mb-4">
        <input
          type="number"
          placeholder="Available Drivers"
          value={form.availableDrivers}
          onChange={(e) =>
            setForm({ ...form, availableDrivers: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="time"
          placeholder="Start Time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Hours/Driver"
          value={form.maxHoursPerDriver}
          onChange={(e) =>
            setForm({ ...form, maxHoursPerDriver: e.target.value })
          }
          className="p-2 border rounded"
        />
        <button
          onClick={handleRun}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Run
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Simulation Result</h2>
          <p>Total Profit: {result.totalProfit}</p>
          <p>Efficiency: {result.efficiency}%</p>
          <p>On-Time Deliveries: {result.onTimeDeliveries}</p>
          <p>Late Deliveries: {result.lateDeliveries}</p>
          <p>Total Fuel Cost: {result.totalFuelCost}</p>
        </div>
      )}
    </div>
  );
};

export default Simulation;
