import { BACKEND_URL } from "@/app/config";
import useStore from "@/store";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from "@repo/http-status";
import axios from "axios";
import refreshAccessToken from "./refreshAccessToken";

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
  async (error) => {
    console.log("Error in response ", error);

    const originalRequest = error.config;

    if (
      error.response.data.statusCode ===
        HTTP_STATUS_CODES.EXPIRED_ACCESS_TOKEN &&
      error.response.data.message ===
        HTTP_STATUS_MESSAGES.EXPIRED_ACCESS_TOKEN &&
      !originalRequest._retry
    ) {
      console.log("Your Access Token expired");
      //Handle refreshing the refresh token logic and resending the request
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        useStore.getState().updateAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Failed to refresh the access token");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
