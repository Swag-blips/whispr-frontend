import Image from "next/image";
import React from "react";
import { User } from "../types/types";

type Props = {
  user: User;
};

const Users = ({ user }: Props) => {
  return (
    <div className="flex items-start mx-4 mt-4 gap-2">
      <Image
        src={
          user.avatar ||
          "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
        }
        width={48}
        height={48}
        className="rounded-full"
        alt="user"
      />

      <div className="flex flex-col ">
        <h2>{user.username}</h2>
        <p className="text-xs text-[#8C8C8C]">{user.bio}</p>

        <button className="bg-[#444CE7] rounded-lg text-white h-8 mt-2 text-xs">Add friend</button>
      </div>
    </div>
  );
};

export default Users;
