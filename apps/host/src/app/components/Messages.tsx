"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getMessages } from "../services/chats";
import { useChatStore } from "../store/chats.store";
import { useAuth } from "../context/AuthContext";
import { getAvatar } from "../utils/getUserAvatar";
import { convertTime } from "../utils/convertDate";
import { useSocket } from "../context/SocketContext";
import { Message } from "../types/types";

export const Messages = () => {
  const { currentChat } = useChatStore();
  const { socket } = useSocket();
  const { user } = useAuth();

  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const { data, isLoading, error } = useSWR(currentChat?._id, getMessages);

  useEffect(() => {
    if (data?.messages) {
      setAllMessages(data.messages);
    }
  }, [data?.messages]);

  useEffect(() => {
    if (!socket || !currentChat?._id) return;

    const handleNewMessage = (newMsg: Message) => {
      if (newMsg.chatId === currentChat._id) {
        setAllMessages((prev) => [...prev, newMsg]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, currentChat?._id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message || "Something went wrong"}</p>;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-8">
      <div className="flex-col pb-[90px] flex gap-6">
        {allMessages.length > 0 ? (
          allMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === user?._id ? "ml-auto flex-row-reverse" : ""
              } items-start gap-2`}
            >
              <Image
                src={
                  msg.senderId === user?._id
                    ? getAvatar(user.avatar)
                    : getAvatar(currentChat?.otherUser.avatar)
                }
                alt={"user"}
                width={48}
                height={48}
                className="rounded-full"
              />

              <div className="flex flex-col gap-2">
                <div
                  className={`flex ${
                    msg.senderId === user?._id ? "flex-row-reverse" : ""
                  } items-center gap-4`}
                >
                  <h2 className="font-medium">
                    {msg.senderId === user?._id
                      ? user.username
                      : currentChat?.otherUser.username}
                  </h2>
                  <p className="text-[#8C8C8C] text-sm">
                    {convertTime(msg.createdAt)}
                  </p>
                </div>
                <p
                  className={`${
                    msg.senderId === user?._id
                      ? "bg-[#444CE7] text-white ml-auto"
                      : "bg-white text-black"
                  } w-fit rounded-tr-lg rounded-br-lg rounded-bl-lg p-4`}
                >
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>Start your Conversation</div>
        )}
      </div>
    </div>
  );
};
