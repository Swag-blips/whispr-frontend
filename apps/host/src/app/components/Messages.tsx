import Image from "next/image";
import React from "react";
import { messages } from "../utils/constants";

const Messages = () => {
  return (
    <div className="flex flex-col gap-6 px-4 mt-8 overflow-y-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex  ${msg.sender === "You" ? "ml-auto flex-row-reverse" : ""} items-start gap-2`}
        >
          <Image
            src={msg.avatar}
            alt={msg.sender}
            width={48}
            height={48}
            className="rounded-full"
          />

          <div className="flex flex-col gap-2">
            <div
              className={`flex ${msg.sender === "You" ? "flex-row-reverse" : ""} items-center gap-4`}
            >
              <h2 className="font-medium">{msg.sender}</h2>
              <p className="text-[#8C8C8C]">{msg.timestamp}</p>
            </div>
            <p
              className={` ${msg.sender === "You" ? "bg-[#444CE7] text-white" : "bg-white text-black"} rounded-tr-lg rounded-br-lg rounded-bl-lg  p-4 `}
            >
              {msg.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
