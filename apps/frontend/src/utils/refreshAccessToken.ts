import axiosInstance from "./axiosInstance";

const refreshAccessToken = async () => {
  try {
    const res = await axiosInstance.post(`/api/v1/user/refresh-access-token`);

    const newAccessToken = res.data.data.accessToken;

    return newAccessToken;
  } catch (error) {
    console.log("Error refreshing access token = ", error);
    throw error;
  }
};

export default refreshAccessToken;
