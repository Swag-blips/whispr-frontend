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

export const getUnreadNotifications = async () => {
  try {
    const notifications = (await axiosInstance.get(
      "/notifications/unread-notifications"
    )) as AxiosResponse<{ success: boolean; notifications: number }>;

    return notifications.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationIds: string[]) => {
  try {
    const notifications = (await axiosInstance.post(
      "/notifications/mark-as-read",
      {
        notificationIds,
      }
    )) as AxiosResponse<{ success: boolean; message: string }>;

    return notifications.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
