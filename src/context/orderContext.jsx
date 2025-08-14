import React from "react";
import { createContext, useContext } from "react";
import {
  createOrdersApi,
  UpdateOrdersApi,
  getAllOrdersApi,
  getOrdersApi,
  DeleteOrdersApi,
} from "../Api/ordersApi";
import { toast } from "react-hot-toast";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const createOrder = async (data) => {
    try {
      const res = await createOrdersApi(data);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Create order failed");
      throw error;
    }
  };

  const updateOrder = async (data, id) => {
    try {
      const res = await UpdateOrdersApi(data, id);
      toast.success(res.message || "order updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Update order failed");
      throw error;
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await getAllOrdersApi();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Get all orders failed");
      throw error;
    }
  };

  const getOrder = async (id) => {
    try {
      const res = await getOrdersApi(id);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Get order failed");
      throw error;
    }
  };

  const deleteOrder = async (id) => {
    try {
      const res = await DeleteOrdersApi(id);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete order failed");
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        updateOrder,
        getAllOrders,
        getOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
