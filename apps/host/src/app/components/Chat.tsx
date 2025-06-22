"use client";

import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";
import { useChatStore } from "../store/chats.store";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";

export const Chat = () => {
  const { currentChat } = useChatStore();
  const { socket } = useSocket();

  useEffect(() => {
    socket?.emit("joinRoom", currentChat?._id);

    return () => {
      socket?.emit("leaveRoom", currentChat?._id);
    };
  }, [currentChat]);

  if (!currentChat) return null; 

  return (
    <div className="flex-1 relative bg-[#F6F8FC] h-full flex flex-col">
      <ChatHeader currentChat={currentChat} />
      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
};
