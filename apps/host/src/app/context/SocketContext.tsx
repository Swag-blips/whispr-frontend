"use client";

import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface SocketContext {
  socket: Socket | null;
  onlineUsers: Array<string>;
}

export const SocketContext = createContext<SocketContext | null>(null);
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:3005", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
