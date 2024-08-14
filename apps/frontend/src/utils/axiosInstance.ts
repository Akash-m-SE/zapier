import { BACKEND_URL } from "@/app/config";
import useStore from "@/store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useStore.getState().accessToken;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.log("Error in request ", error);

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error in response ", error);

    // Handling unauthorized errors
    if (error.response.status === 405) {
      console.log("Error from the axios interceptors");
      // Handle the error
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
