import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

export const runSimulationApi = (Data) => {
  return axios.post(`${Api}/api/simulation`, Data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
