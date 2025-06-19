"use client";
import Image from "next/image";
import React from "react";
import { messages } from "../utils/constants";
import { MessageInput } from "./MessageInput";
import useSWR from "swr";
import { getMessages } from "../services/chats";
import { useChatStore } from "../store/chats.store";
import { useAuth } from "../context/AuthContext";
import { getAvatar } from "../utils/getUserAvatar";
import { convertTime } from "../utils/convertDate";

export const Messages = () => {
  const { currentChat } = useChatStore();
  const { user } = useAuth();
  const { data, isLoading, error } = useSWR(currentChat?._id, getMessages);

  if (isLoading) return <p>loading....</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-8">
      <div className="flex-col pb-[90px] flex gap-6">
        {data?.messages && data?.messages.length > 0 ? (
          data?.messages.map((msg) => (
            <div
              key={msg._id}  
              className={`flex  ${msg.senderId === user?._id ? "ml-auto flex-row-reverse" : ""} items-start gap-2`}
            >
              <Image
                src={
                  msg.senderId === user?._id
                    ? getAvatar(user.avatar)
                    : getAvatar(msg.otherUserDetails.avatar)
                }
                alt={"user"}
                width={48}
                height={48}
                className="rounded-full"
              />

              <div className="flex flex-col gap-2">
                <div
                  className={`flex ${msg.senderId === user?._id ? "flex-row-reverse" : ""} items-center gap-4`}
                >
                  <h2 className="font-medium">
                    {msg.senderId === user?._id
                      ? user.username
                      : msg?.otherUserDetails.username}
                  </h2>
                  <p className="text-[#8C8C8C] text-sm">
                    {convertTime(msg.createdAt)}
                  </p>
                </div>
                <p
                  className={` ${msg.senderId === user?._id ? "bg-[#444CE7] text-white ml-auto" : "bg-white text-black"} w-fit rounded-tr-lg rounded-br-lg rounded-bl-lg  p-4 `}
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
