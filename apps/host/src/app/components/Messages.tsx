"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import useSWR, { mutate } from "swr";
import { getMessages } from "../services/chats";
import { useChatStore } from "../store/chats.store";
import { useAuth } from "../context/AuthContext";
import { getAvatar } from "../utils/getUserAvatar";
import { convertTime } from "../utils/convertDate";
import { useSocket } from "../context/SocketContext";
import { Message } from "../types/types";
import { Check, CheckCheck } from "lucide-react";
import { getUserName } from "../utils/getUsername";
import { useMessageStore } from "../store/message.store";

export const Messages = () => {
  const { currentChat, setCurrentChat } = useChatStore();
  const { allMessages, setAllMessages, addMessage } = useMessageStore();
  const { socket } = useSocket();
  const { user } = useAuth();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = useSWR(currentChat?._id, getMessages);

  const scrollToBottom = () => {
    return lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateMessages = (updater: (msgs: Message[]) => Message[]) => {
    setAllMessages(updater(allMessages));
  };

  const handleAddMember = (data: {
    chatId: string;
    messageType: "system";
    content: string;
    systemAction: "user_added";
    messageId: string;
    createdAt: Date;
    meta: {
      actorId: string;
      memberId: string;
      memberAvatar: string;
    };
  }) => {
    const {
      chatId,
      messageType,
      content,
      systemAction,
      meta,
      createdAt,
      messageId,
    } = data;
    if (currentChat) {
      const updated = {
        ...currentChat,
        participants: [...currentChat.participants, meta.memberId],
      };
      setCurrentChat(updated);
    }
    addMessage({
      content,
      chatId,
      senderId: "",
      messageType,
      systemAction,
      _id: messageId,
      createdAt,
      meta,
      updatedAt: new Date(),
    });
    mutate("userChats");
  };

  useEffect(() => {
    if (data?.messages) {
      setAllMessages(data.messages);
    }
  }, [data?.messages, isLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    if (!socket || !currentChat?._id) return;

    const handleNewMessage = (newMsg: Message) => {
      if (newMsg.chatId === currentChat._id) {
        addMessage(newMsg);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, currentChat?._id]);

  useEffect(() => {
    socket?.on(
      "messagesDelivered",
      (data: { chatId: string; messageIds: string[]; receiverId: string }) => {
        console.log("incoming data", data);
        if (data.chatId !== currentChat?._id) {
          return;
        }

        updateMessages((prevMessages) =>
          prevMessages.map((msg) => {
            if (msg._id && data.messageIds.includes(msg._id)) {
              return {
                ...msg,
                status: "delivered",
              };
            } else if (!msg._id && msg.status === "sent" && msg.receiverId) {
              return {
                ...msg,
                status: "delivered",
              };
            }

            return msg;
          })
        );
      }
    );

    return () => {
      socket?.off("messagesDelivered");
    };
  }, [socket, currentChat?._id, allMessages]);
  useEffect(() => {
    socket?.on(
      "messagesSeen",
      (data: { receiverId: string; chatId: string }) => {
        if (data.chatId !== currentChat?._id) {
          return;
        }
        updateMessages((prevMessages) =>
          prevMessages.map((msg) => {
            if (msg.status !== "seen" && msg.senderId !== data.receiverId) {
              return {
                ...msg,
                status: "seen",
              };
            }
            return msg;
          })
        );
      }
    );

    return () => {
      socket?.off("messagesSeen");
    };
  }, [currentChat?._id, socket]);

  useEffect(() => {
    if (currentChat?.type !== "group") return;
    socket?.on(
      "memberRemoved",
      (data: {
        chatId: string;
        messageType: "system";
        content: string;
        systemAction: "user_added";
        meta: {
          actorId: string;
          memberId: string;
          memberAvatar: string;
        };
      }) => {
        if (data.chatId !== currentChat._id) return;
      }
    );
    return () => {
      socket?.off("memberRemoved");
    };
  }, [currentChat?._id, socket]);

  useEffect(() => {
    if (currentChat?.type !== "group") return;
    socket?.on(
      "memberAdded",
      (data: {
        chatId: string;
        messageType: "system";
        content: string;
        systemAction: "user_added";
        createdAt: Date;
        messageId: string;
        meta: {
          actorId: string;
          memberId: string;
          memberAvatar: string;
        };
      }) => {
        if (data.chatId !== currentChat._id) return;
        handleAddMember(data);
      }
    );

    return () => {
      socket?.off("memberRemoved");
    };
  }, [currentChat?._id, socket]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message || "Something went wrong"}</p>;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-8">
      <div className="flex-col pb-[90px] flex gap-6">
        {allMessages.length > 0 ? (
          allMessages.map((msg, index) => (
            <div key={msg._id}>
              {currentChat?.type === "group" && msg.messageType === "system" ? (
                <div className="flex items-center gap-2 justify-center">
                  <Image
                    width={20}
                    height={20}
                    src={getAvatar(msg.meta?.memberAvatar)}
                    alt="avatar"
                    className="rounded-full"
                  />
                  {msg.content}
                </div>
              ) : (
                <div
                  key={index}
                  className={`flex ${msg.senderId === user?._id ? "ml-auto flex-row-reverse" : ""} items-start gap-2`}
                >
                  {currentChat?.type === "private" ? (
                    <Image
                      src={
                        msg.senderId === user?._id
                          ? getAvatar(user.avatar)
                          : getAvatar(currentChat?.otherUsers.avatar)
                      }
                      alt={"user"}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={
                        msg.senderId === user?._id
                          ? getAvatar(user.avatar)
                          : getAvatar(
                              undefined,
                              "group",
                              currentChat?.otherUsers,
                              msg.senderId
                            )
                      }
                      alt={"user"}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}

                  <div className="flex flex-col gap-2">
                    <div
                      className={`flex ${msg.senderId === user?._id ? "flex-row-reverse" : ""} items-center gap-4`}
                    >
                      {currentChat?.type === "private" ? (
                        <h2 className="font-medium">
                          {msg.senderId === user?._id
                            ? user.username
                            : currentChat?.otherUsers.username}
                        </h2>
                      ) : (
                        <h2>
                          {msg.senderId === user?._id
                            ? user.username
                            : getUserName(
                                currentChat?.otherUsers,
                                msg.senderId
                              )}
                        </h2>
                      )}

                      <p className="text-[#8C8C8C] text-sm">
                        {convertTime(msg.createdAt)}
                      </p>
                    </div>
                    <p
                      className={`${
                        msg.senderId === user?._id
                          ? "bg-[#444CE7] text-white ml-auto"
                          : "bg-white text-black"
                      } w-fit rounded-tr-lg rounded-br-lg flex items-center gap-1 rounded-bl-lg p-4`}
                    >
                      {currentChat?.type !== "group" &&
                        msg.senderId === user?._id &&
                        (msg.status === "sent" ? (
                          <Check />
                        ) : msg.status === "delivered" ? (
                          <CheckCheck />
                        ) : (
                          ""
                        ))}

                      {msg.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Start your Conversation</div>
        )}
        <div ref={lastMessageRef} />
      </div>
    </div>
  );
};
