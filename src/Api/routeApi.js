import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

export const createRouteApi = (Data) => {
  return axios.post(`${Api}/api/routes`, Data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const UpdateRouteApi = async (routeId, data) => {
  try {
    // Ensure data is always an object
    const updateData = typeof data === "object" ? data : { name: data };

    const response = await axios.put(
      `${Api}/api/routes/${routeId}`,
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
      "Error updating route:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllRouteApi = () => {
  return axios.get(`${Api}/api/routes`, {
    withCredentials: true,
  });
};

export const getRouteApi = (id) => {
  return axios.get(`${Api}/api/routes/${id}`, {
    withCredentials: true,
  });
};

export const DeleteRouteApi = (id) => {
  return axios.delete(`${Api}/api/routes/${id}`, {
    withCredentials: true,
  });
};
