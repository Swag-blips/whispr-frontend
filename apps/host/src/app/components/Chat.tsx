import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

export const Chat = () => {
  return (
    <div className="flex-1 bg-[#F6F8FC] h-full">
      <ChatHeader />
      <Messages />
    </div>
  );
};
