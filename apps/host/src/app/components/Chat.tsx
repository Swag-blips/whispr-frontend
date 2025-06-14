import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";

export const Chat = () => {
  return (
    <div className="flex-1 relative bg-[#F6F8FC] h-full">
      <ChatHeader />
      <Messages />
      <MessageInput />
    </div>
  );
};
