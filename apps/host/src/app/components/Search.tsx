import Image from "next/image";
import Logo from "../../../public/Logo.svg";
import { X } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { NavState } from "./SidebarNav";

type Props = {
  setOpen: (state: NavState) => void;
};
export const Search = ({ setOpen }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/20 py-4 backdrop-blur-[10px] pr-8  top-0 z-50">
      <div className="bg-white h-full w-[345px] ml-auto rounded-lg">
        <div className="flex items-center px-4 py-4 justify-between">
          <div className="flex items-center gap-2">
            <Image src={Logo} alt="logo" width={32} height={32} />
            <h2 className="font-medium">Search</h2>
          </div>

          <X
            strokeWidth={1}
            color="#8C8C8C"
            size={16}
            className="cursor-pointer"
            onClick={() => setOpen(null)}
          />
        </div>

        <div className="bg-[#F6F6F6] flex items-center gap-2 mx-4 py-3 pl-3 rounded-lg">
          <SearchIcon color="#C4C4C4" className="cursor-pointer" />

          <input
            type="text"
            placeholder="search"
            className="placeholder:text-[#C4C4C4] text-black w-full outline-none"
          />
        </div>
      </div>
    </div>
  );
};
