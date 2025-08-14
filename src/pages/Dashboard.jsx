import React, { useState, useEffect , useRef} from "react";
import { runSimulationApi } from "../Api/simulateApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const firstRun = useRef(true);

  useEffect(() => {
    // This will run automatically when the page loads

    if (firstRun.current) {
      firstRun.current = false;
    }
    const payload = {
      availableDrivers: 2,
      startTime: "09:00",
      maxHoursPerDriver: 6,
    };

    runSimulationApi(payload)
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  if (!dashboardData) {
    return <div className="p-4 text-center">Loading Dashboard...</div>;
  }

  const barData = [
    { name: "On-Time", deliveries: dashboardData.onTimeDeliveries },
    { name: "Late", deliveries: dashboardData.lateDeliveries },
  ];

  const pieData = [
    { name: "Fuel Cost", value: Number(dashboardData.totalFuelCost) },
    {
      name: "Remaining Profit",
      value:
        Number(dashboardData.totalProfit) - Number(dashboardData.totalFuelCost),
    },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        GreenCart Dashboard
      </h1>

      {/* Profit & Efficiency */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Profit</h2>
          <p className="text-2xl font-bold">₹{dashboardData.totalProfit}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Efficiency Score</h2>
          <p className="text-2xl font-bold">{dashboardData.efficiency}%</p>
        </div>
      </div>

      {/* On-time vs Late Deliveries */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          On-time vs Late Deliveries
        </h2>
        <BarChart width={500} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="deliveries" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Fuel Cost Breakdown */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Fuel Cost Breakdown</h2>
        <PieChart width={500} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
