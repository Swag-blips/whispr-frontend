import axios from "axios";
import { getCookie } from "../utils/getCookie";

const accessToken = getCookie("accessToken");
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
