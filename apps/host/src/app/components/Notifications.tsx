import React from "react";
import Logo from "../../../public/Logo.svg";
import { X } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { NavState } from "./SidebarNav";
import Image from "next/image";
type Props = {
  setOpen: (state: NavState) => void;
};

export const Notifications = ({ setOpen }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/20 py-4 backdrop-blur-[10px] pr-8  top-0 z-50">
      <div className="bg-white h-full w-[345px] ml-auto rounded-lg">
        <div className="flex items-center px-4 py-4 justify-between">
          <div className="flex items-center gap-2">
            <Image src={Logo} alt="logo" width={32} height={32} />
            <h2 className="font-medium">Notifications</h2>
          </div>

          <X
            strokeWidth={1}
            color="#8C8C8C"
            size={16}
            className="cursor-pointer"
            onClick={() => setOpen(null)}
          />
        </div>

        <div className="flex flex-col mx-4 gap-6">
          <div className="flex items-start gap-2.5">
            <Image
              width={48}
              height={48}
              src="https://randomuser.me/api/portraits/med/men/75.jpg"
              alt="user"
              className="rounded-full"
            />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[#0A0A0A] font-medium ">
                  Adekolu olumide sent you a request
                </p>
                <p className="text-[#8C8C8C] font-normal text-xs">
                  Friday 2:22PM
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <button className="border rounded-lg border-[#D9D9D9] px-4 py-2">
                  Decline
                </button>
                <button className="bg-[#444CE7] text-white px-4 py-2 rounded-lg">
                  Accept
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Image
              width={48}
              height={48}
              src="https://randomuser.me/api/portraits/med/men/35.jpg"
              alt="user"
              className="rounded-full"
            />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[#0A0A0A] font-medium ">
                  Reed Richards sent you a request
                </p>
                <p className="text-[#8C8C8C] font-normal text-xs">
                  Friday 2:22PM
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <button className="border cursor-pointer rounded-lg border-[#D9D9D9] px-4 py-2">
                  Decline
                </button>
                <button className="bg-[#444CE7] cursor-pointer text-white px-4 py-2 rounded-lg">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
