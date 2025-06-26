import { AxiosResponse } from "axios";
import { axiosInstance } from "../api/api";
import { Chats, Message } from "../types/types";

export const getUserChats = async () => {
  try {
    const response = (await axiosInstance.get(
      "/chat/user-chats"
    )) as AxiosResponse<{
      success: boolean;
      chats: Chats[];
    }>;

    console.log("RESPONSE", response)

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendMessage = async (chatId: string, content: string) => {
  try {
    const response = (await axiosInstance.post(`/chat/message/${chatId}`, {
      content,
    })) as AxiosResponse<{ success: boolean; message: string }>;

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessages = async (chatId: string) => {
  try {
    const response = (await axiosInstance.get(
      `/chat/message/${chatId}`
    )) as AxiosResponse<{ success: boolean; messages: Message[] }>;

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
