import { AxiosResponse } from "axios";
import { axiosInstance } from "../api/api";
import { Chats } from "../types/types";

export const getUserChats = async () => {
  try {
    const response = (await axiosInstance.get(
      "/chat/user-chats"
    )) as AxiosResponse<{
      success: boolean;
      chats: Chats[];
    }>;

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
