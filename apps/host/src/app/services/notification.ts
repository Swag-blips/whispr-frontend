import { AxiosResponse } from "axios";
import { axiosInstance } from "../api/api";
import { Notification } from "../types/types";

export const getNotifications = async () => {
  try {
    const notifications = (await axiosInstance.get(
      "/notifications"
    )) as AxiosResponse<{ success: boolean; notifications: Notification[] }>;

    return notifications;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
