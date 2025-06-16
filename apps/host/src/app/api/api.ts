import axios, { AxiosError } from "axios";
import { getCookie } from "../utils/getCookie";

const accessToken = getCookie("accessToken");
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});
interface QueueItem {
  resolve: (value?: string | PromiseLike<string> | undefined | null) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (
  error: any,
  token: string | undefined | null = undefined
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest?._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`
        );   

        const accessToken = getCookie("accessToken");
        processQueue(null, accessToken!);

        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error, null);
        window.location.href = "/auth";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
