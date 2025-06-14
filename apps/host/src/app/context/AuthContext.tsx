"use client";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { axiosInstance } from "../api/api";
import { AxiosResponse } from "axios";
import { User } from "../types/types";

type AuthContextType = {
  user: any;
  setUser: any;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = (await axiosInstance.get(
        "/user/currentUser"
      )) as AxiosResponse<{ success: boolean; currentUser: User }>;

      console.log(res);
      if (res.data.success) {
        setUser(res.data.currentUser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(user);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
