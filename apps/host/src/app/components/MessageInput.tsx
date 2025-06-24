"use client";
import { Image, Mic, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { sendMessage } from "../services/chats";
import { useChatStore } from "../store/chats.store";
import { useSocket } from "../context/SocketContext";

function debounce(cb: (...args: any[]) => void, delay = 1000) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export const MessageInput = () => {
  const { currentChat } = useChatStore();
  const { socket } = useSocket();
  const [userIsTyping, setUserIsTyping] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceStopTypingRef = useRef(
    debounce(() => {
      console.log("STOPPED TYPING");
      socket?.emit("stopTyping", { chatId: currentChat?._id });
    }, 500)
  );
  useEffect(() => {
    socket?.on("userTyping", (data) => {
      setUserIsTyping(data);
    });

    socket?.on("stopTyping", () => {
      setUserIsTyping("");
    });

    return () => {
      socket?.off("userTyping");
      socket?.off("stopTyping");
    };
  }, [currentChat, socket]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContent(value);

    if (value.trim()) {
      socket?.emit("startTyping", { chatId: currentChat?._id });
      debounceStopTypingRef.current();
    }
  };

  const handleSendMessage = async () => {
    if (loading) return;
    setLoading(true);
    if (!currentChat?._id) return;
    try {
      const message = await sendMessage(currentChat?._id, content);

      if (message.success) {
        toast.success(message.message);
      } else {
        toast.error(message.message);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      setContent("");
    }
  };
  return (
    <>
      <div className="bg-white absolute bottom-0 py-2 px-3 h-[72px] w-full">
        <div>{userIsTyping}</div>
        <div className="bg-[#F6F8FC] p-4 rounded-xl flex items-center w-full">
          <div className="flex flex-1 items-center gap-2">
            <Mic color="#868686" strokeWidth={1} />

            <input
              type="text"
              value={content}
              onChange={handleInputChange}
              placeholder="Type your message"
              className="placeholder:text-xs w-full placeholder:text-[#868686] text-black outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <Send
              onClick={handleSendMessage}
              strokeWidth={1}
              color="#868686"
              className="cursor-pointer"
            />
            <Image strokeWidth={1} color="#868686" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};
