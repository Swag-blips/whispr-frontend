import Image from "next/image";
import { Ellipsis, Phone, Video } from "lucide-react";
import { Chats } from "../types/types";
import { getAvatar } from "../utils/getUserAvatar";

type Props = {
  currentChat: Chats;
};

export const ChatHeader = ({ currentChat }: Props) => {
  return (
    <header className="flex items-center bg-white justify-between p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          {currentChat.type === "private" ? (
            <Image
              width={48}
              height={48}
              src={getAvatar(currentChat.otherUsers.avatar)}
              alt="user"
              className="rounded-full"
            />
          ) : (
            <div className="bg-[#F5F5F5] flex items-center justify-center size-12 rounded-full">
              {currentChat.groupName[0]}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {currentChat.type === "private"
                ? currentChat.otherUsers.username
                : currentChat.groupName}
            </h1>
            <p className="text-[#8C8C8C] text-sm font-normal">
              {currentChat.type === "private"
                ? currentChat.otherUsers.bio
                : currentChat.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Phone strokeWidth={1} color="#848484" />
        <Video strokeWidth={1} color="#848484" />
        <Ellipsis strokeWidth={1} color="#848484" />
      </div>
    </header>
  );
};
