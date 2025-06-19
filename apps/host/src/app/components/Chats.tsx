"use client";
import Image from "next/image";
import React from "react";
import { getUserChats } from "../services/chats";
import { Chats as ChatsType } from "../types/types";
import { useChatStore } from "../store/chats.store";
import useSWR from "swr";
import { getAvatar } from "../utils/getUserAvatar";

const Chats = () => {
  const {
    data: userChats,
    isLoading,
    error,
  } = useSWR("userChats", getUserChats);

  const { setCurrentChat } = useChatStore();

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {userChats && userChats?.chats.length > 0 ? (
        userChats?.chats.map((chat: ChatsType) => (
          <div
            onClick={() => setCurrentChat(chat)}
            key={chat._id}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-2 ">
              <Image
                width={48}
                height={48}
                src={getAvatar(chat.otherUser.avatar)}
                alt="user"
                className="rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h1 className="font-medium">{chat.otherUser.username}</h1>
                <p className="text-[#8C8C8C] text-sm font-normal">
                  {chat.lastMessage ||
                    "This is the beginning of our Conversation"}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>No chats yet. Add a friend to start chatting.</>
      )}
    </>
  );
};

export default Chats;
