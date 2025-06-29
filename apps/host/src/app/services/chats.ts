import { AxiosResponse } from "axios";
import { axiosInstance } from "../api/api";
import { Chats, CreateGroupArgs, Message } from "../types/types";

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
export const sendGroupMessage = async (chatId: string, content: string) => {
  try {
    const response = (await axiosInstance.post(
      `/chat/group/${chatId}`,
      {
        content,
      }
    )) as AxiosResponse<{ success: boolean; message: string }>;

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

export const createGroupChat = async (
  url: string,
  { arg }: { arg: CreateGroupArgs }
) => {
  try {
    const response = await axiosInstance.post(url, arg);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
