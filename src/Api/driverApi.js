import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

export const createDriversApi = (Data) => {
  return axios.post(`${Api}/api/drivers`, Data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const UpdateDriversApi = async (driverId, data) => {
   try {
    // Ensure data is always an object
    const updateData =
      typeof data === "object" ? data : { assignedRoute: data };

    const response = await axios.put(
      `${Api}/api/drivers/${driverId}`,
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
    console.error("Error updating driver:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllDriversApi = () => {
  return axios.get(`${Api}/api/drivers`, {
    withCredentials: true,
  });
};

export const getDriversApi = (id) => {
  return axios.get(`${Api}/api/drivers/${id}`, {
    withCredentials: true,
  });
};

export const DeleteDriversApi = (id) => {
  return axios.delete(`${Api}/api/drivers/${id}`, {
    withCredentials: true,
  });
};
