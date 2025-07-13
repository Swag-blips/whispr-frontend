"use client";

import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";
import { useChatStore } from "../store/chats.store";
import { useSocket } from "../context/SocketContext";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { getMessages } from "../services/chats";
import { Message } from "../types/types";
import { useAuth } from "../context/AuthContext";

export const Chat = () => {
  const { currentChat } = useChatStore();
  const { socket } = useSocket();
  const { user } = useAuth();
  const { data, isLoading, error } = useSWR(currentChat?._id, getMessages);
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket?.emit("joinRoom", currentChat?._id);

    return () => {
      socket?.emit("leaveRoom", currentChat?._id);
    };
  }, [currentChat]);

  useEffect(() => {
    if (data?.messages) {
      setAllMessages(data.messages);
    }
  }, [data?.messages, isLoading]);

  // Add message optimistically
  const addMessage = (msg: Message) => {
    setAllMessages((prev) => [...prev, msg]);
  };

  useEffect(() => {
    if (!socket || !currentChat?._id) return;

    const handleNewMessage = (newMsg: Message) => {
      console.log("new Message!", newMsg);
      if (newMsg.chatId === currentChat._id) {
        if (newMsg.tempId && newMsg.senderId === user?._id) {
          setAllMessages((prev) =>
            prev.map((msg) =>
              msg.tempId === newMsg.tempId
                ? {
                    ...msg,
                    status: newMsg.status,
                    receiverId: newMsg.receiverId,

                    ...newMsg,
                  }
                : msg
            )
          );
        } else {
          setAllMessages((prev) => [...prev, newMsg]);
        }
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, currentChat?._id]);

  if (!currentChat) return null;

  console.log("allMessages", allMessages);
  return (
    <div className="flex-1 relative bg-[#F6F8FC] h-full flex flex-col">
      <ChatHeader currentChat={currentChat} />
      <div className="flex-1 overflow-hidden">
        <Messages
          allMessages={allMessages}
          setAllMessages={setAllMessages}
          isLoading={isLoading}
          error={error}
        />
      </div>
      <MessageInput addMessage={addMessage} />
    </div>
  );
};
