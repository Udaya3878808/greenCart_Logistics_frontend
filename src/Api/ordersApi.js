import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

export const createOrdersApi = (Data) => {
  return axios.post(`${Api}/api/orders`, Data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const UpdateOrdersApi = async (orderId, data) => {
  try {
    // Ensure data is always an object
    const updateData =
      typeof data === "object" ? data : { assignedRoute: data };

    const response = await axios.put(
      `${Api}/api/orders/${orderId}`,
      updateData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating order:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllOrdersApi = () => {
  return axios.get(`${Api}/api/orders`, {
    withCredentials: true,
  });
};

export const getOrdersApi = (id) => {
  return axios.get(`${Api}/api/orders/${id}`, {
    withCredentials: true,
  });
};

export const DeleteOrdersApi = (id) => {
  return axios.delete(`${Api}/api/orders/${id}`, {
    withCredentials: true,
  });
};
