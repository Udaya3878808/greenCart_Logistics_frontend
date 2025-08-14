import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./compontents/ProtectedRouter";
import Sidebar from "./compontents/Sidebar";
import Navbar from "./compontents/Navbar";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Driver";
import Orders from "./pages/Orders";
import RoutesPage from "./pages/Route";
import Simulation from "./pages/Simulation";
import AuthPages from "./pages/AuthPages";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-6 flex-1 overflow-y-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/auth" element={<AuthPages />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/drivers"
                element={
                  <ProtectedRoute>
                    <Drivers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/routes"
                element={
                  <ProtectedRoute>
                    <RoutesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/simulation"
                element={
                  <ProtectedRoute>
                    <Simulation />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
