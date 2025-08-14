import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DriverProvider } from "./context/driverContext.jsx";
import { OrderProvider } from "./context/orderContext.jsx";
import { RouteProvider } from "./context/routeContext.jsx";
import { SimulationProvider } from "./context/simulateContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DriverProvider>
        <OrderProvider>
          <RouteProvider>
            <SimulationProvider>
              <App />
              <Toaster />
            </SimulationProvider>
          </RouteProvider>
        </OrderProvider>
      </DriverProvider>
    </AuthProvider>
  </StrictMode>
);
