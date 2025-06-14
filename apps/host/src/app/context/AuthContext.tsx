"use client";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { axiosInstance } from "../api/api";

type AuthContextType = {
  user: any;
  setUser: any;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/currentUser");

      if (res.data.success) {
        setUser(res.data.user);
      }
      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
