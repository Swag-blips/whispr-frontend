import { Image, Mic, Send } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { sendMessage } from "../services/chats";
import { useChatStore } from "../store/chats.store";

export const MessageInput = () => {
  const { currentChat } = useChatStore();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="bg-white absolute bottom-0 py-2 px-3 h-[72px] w-full">
      <div className="bg-[#F6F8FC] p-4 rounded-xl flex items-center w-full">
        <div className="flex flex-1 items-center gap-2">
          <Mic color="#868686" strokeWidth={1} />

          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message"
            className="placeholder:text-xs w-full placeholder:text-[#868686] text-black outline-none "
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
  );
};
