import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

export const registerUserApi = (Data) => {
  return axios.post(`${Api}/api/auth/register`, Data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginUserApi = (Data) => {
  return axios.post(`${Api}/api/auth/login`, Data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const logoutUserApi = () => {
  return axios.delete(`${Api}/api/auth/logout`, {
    withCredentials: true,
  });
};

export const getProfileApi = () => {
  return axios.get(`${Api}/api/auth/profile`, {
    withCredentials: true,
  });
};
