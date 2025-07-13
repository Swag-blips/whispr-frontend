import { AxiosResponse } from "axios";
import { User } from "../types/types";
import { axiosInstance } from "../api/api";

export const getFriends = async () => {
  try {
    const response = (await axiosInstance.get(
      "/user/friends"
    )) as AxiosResponse<{
      success: boolean;
      friends: User[];
    }>;

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
