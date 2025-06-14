import Image from "next/image";
import { Ellipsis, Phone, Video } from "lucide-react";

export const ChatHeader = () => {
  return (
    <header className="flex items-center bg-white justify-between p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <Image
            width={48}
            height={48}
            src="https://randomuser.me/api/portraits/med/men/75.jpg"
            alt="user"
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">Gerard muller</h1>
            <p className="text-[#8C8C8C] text-sm font-normal">Send me cash</p>
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
