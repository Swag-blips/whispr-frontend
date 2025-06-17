"use client";
import Image from "next/image";
import Logo from "../../../public/Logo.svg";
import { X } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { NavState } from "./SidebarNav";
import { useState } from "react";
import { User } from "../types/types";
import { axiosInstance } from "../api/api";
import { AxiosInstance, AxiosResponse } from "axios";
import Users from "./Users";

type Props = {
  setOpen: (state: NavState) => void;
};
export const Search = ({ setOpen }: Props) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const searchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!username.trim()) {
      return;
    }

    try {
      const response = (await axiosInstance.get(
        `/user/${username}`
      )) as AxiosResponse<{ success: boolean; results: User[] }>;

      console.log(response);
      if (response.data.success) {
        setUsers(response.data.results);
      }
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("users", users);
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

        <form
          onSubmit={(e) => {
            if (!loading) {
              searchUser(e);
            }
          }}
          className="bg-[#F6F6F6] flex items-center gap-2 mx-4 py-3 pl-3 rounded-lg"
        >
          <SearchIcon color="#C4C4C4" className="cursor-pointer" />

          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="search"
            className="placeholder:text-[#C4C4C4] text-black w-full outline-none"
          />
        </form>

        {users.length > 0 &&
          users.map((user) => <Users key={user._id} user={user} />)}
      </div>
    </div>
  );
};
