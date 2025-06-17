import { AxiosResponse } from "axios";
import { axiosInstance } from "../api/api";

export const sendFriendRequest = async (userId: string) => {
  try {
    const response = (await axiosInstance.post(`/friend/sendFriendRequest`, {
      userId,
    })) as AxiosResponse<{ success: boolean; message: string }>;

    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const acceptFriendRequest = async (userId: string) => {
  try {
    const response = (await axiosInstance.post(`/friend/acceptFriendRequest`, {
      userId,
    })) as AxiosResponse<{ success: boolean; message: string }>;

    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};
