import { AxiosResponse } from "axios";
import { axiosInstance } from "../api/api";

export const sendFriendRequest = async (userId: string) => {
  try {
    const response = (await axiosInstance.post(`/friend/sendFriendRequest`, {
      receiverId: userId,
    })) as AxiosResponse<{ success: boolean; message: string }>;

    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const acceptFriendRequest = async (senderId: string) => {
  try {
    const response = (await axiosInstance.post(`/friend/acceptFriendRequest`, {
      senderId,
    })) as AxiosResponse<{ success: boolean; message: string }>;

    return response.data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};

export const declineFriendRequest = async (friendRequestId: string) => {
  try {
    const response = (await axiosInstance.get(
      `/friend/declineFriendRequest/${friendRequestId}`
    )) as AxiosResponse<{ success: boolean; message: string }>;

    return response.data;
  } catch (error) {
    console.error("Error deleting friend request:", error);
    throw error;
  }
};
