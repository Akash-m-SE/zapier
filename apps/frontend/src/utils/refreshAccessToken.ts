import axiosInstance from "./axiosInstance";

const refreshAccessToken = async () => {
  try {
    const res = await axiosInstance.post(`/api/v1/user/refresh-access-token`);

    const userId = res.data.data.userId;
    const newAccessToken = res.data.data.accessToken;

    return { userId, newAccessToken };
  } catch (error) {
    console.log("Error refreshing access token = ", error);
    throw error;
  }
};

export default refreshAccessToken;
