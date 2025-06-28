import { Pencil, Search } from "lucide-react";
import Chats from "./Chats";
import { CreateGroup } from "./CreateGroup";

const UserChats = () => {
  return (
    <aside className="max-w-[469px] pl-4 pr-8  flex-col py-4 overflow-y-auto h-full flex  border-r border-[#F2F0F0]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Messages</h2>

        <CreateGroup />
      </div>

      <div className="bg-[#F6F6F6] flex items-center gap-2 rounded-2xl py-3 pl-3 mt-6 w-full">
        <Search color="#C4C4C4" strokeWidth={1} />
        <input
          className="outline-none bg-transparent"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-col mt-8  gap-6">
        <Chats />
      </div>
      {/* 
      <div className="mt-8">
        <h2 className="text-2xl font-medium">Groups</h2>
        <div className="flex items-start mt-8 justify-between">
          <div className="flex items-center gap-2 ">
            <div className="bg-[#F5F5F5] rounded-full size-12 flex items-center justify-center">
              T
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-medium">T pain Group</h1>
              <p className="text-[#8C8C8C] text-sm font-normal ">
                <span className="text-[#8C8C8C] font-medium">You:</span> Send me
                cash
              </p>
            </div>
          </div>
          <div className="flex items-center flex-col gap-1">
            <p>16:23</p>
          </div>
        </div>
        <div className="flex items-start mt-8 justify-between">
          <div className="flex items-center gap-2 ">
            <div className="bg-[#F5F5F5] rounded-full size-12 flex items-center justify-center">
              W
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-medium">Web dev community</h1>
              <p className="text-[#8C8C8C] text-sm font-normal ">
                <span className="text-[#8C8C8C] font-medium">Coolerputt:</span>{" "}
                Free my nigga harambe
              </p>
            </div>
          </div>
          <div className="flex items-center flex-col gap-1">
            <p>16:23</p>
          </div>
        </div>
        <div className="flex items-start mt-8 justify-between">
          <div className="flex items-center gap-2 ">
            <div className="bg-[#F5F5F5] rounded-full size-12 flex items-center justify-center">
              T
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-medium">DSA Study group</h1>
              <p className="text-[#8C8C8C] text-sm font-normal ">
                <span className="text-[#8C8C8C] font-medium">Swag:</span> I
                think we should use hashmaps
              </p>
            </div>
          </div>
          <div className="flex items-center flex-col gap-1">
            <p>16:23</p>
          </div>
        </div>
      </div> */}
    </aside>
  );
};

export default UserChats;
