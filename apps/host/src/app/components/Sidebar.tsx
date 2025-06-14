import Image from "next/image";
import React from "react";
import Logo from "../../../public/Logo.svg";

import { Bell, Search, Settings } from "lucide-react";
import { Messages } from "./icons";

export const Sidebar = () => {
  return (
    <aside className="w-[250px] flex items-center flex-col justify-between  place-items-center py-8 h-full border-r border-[#F2F0F0]">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4 ">
          <Image src={Logo} alt="logo" />
          <p className="text-2xl font-medium">Whispr</p>
        </div>

        <nav className="flex flex-col gap-4">
          <div className="flex curosr-pointer items-center gap-2 bg-[#444CE7] py-2 px-2 rounded-lg text-white">
            <Messages />
            Messages
          </div>
          <div className="flex cursor-pointer items-center py-2 px-2 gap-2">
            <Bell strokeWidth={1} />
            Notifications
          </div>
          <div className="flex cursor-pointer py-2 px-2 items-center gap-2">
            <Settings strokeWidth={1} />
            Settings
          </div>
          <div className="flex cursor-pointer py-2 px-2 items-center gap-2">
            <Search strokeWidth={1} />
            Search
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Image
          src="https://randomuser.me/api/portraits/med/men/75.jpg"
          alt="user-profile-img"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Swag</span>
          <span className="text-xs text-[#D9D9D9]">Logout</span>
        </div>
      </div>
    </aside>
  );
};
