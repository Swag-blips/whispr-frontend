import { Image, Mic, Send } from "lucide-react";
import React from "react";

export const MessageInput = () => {
  return (
    <div className="bg-white absolute bottom-0 py-2 px-3 h-[72px] w-full">
      <div className="bg-[#F6F8FC] p-4 rounded-xl flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Mic color="#868686" strokeWidth={1} />

          <input
            type="text"
            placeholder="Type your message"
            className="text-xs text-[#868686] placeholder:text-[#868686]"
          />
        </div>

        <div className="flex items-center gap-4">
          <Send strokeWidth={1} color="#868686" />
          <Image strokeWidth={1} color="#868686" />
        </div>
      </div>
    </div>
  );
};
