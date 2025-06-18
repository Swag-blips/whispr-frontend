import Image from "next/image";
import React, { useState } from "react";
import { User } from "../types/types";
import { sendFriendRequest } from "../services/friend";
import toast from "react-hot-toast";
import { Generating } from "@repo/ui/icons/Generating";

type Props = {
  user: User;
};

const Users = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSendRequest = async (userId: string) => {
    setLoading(true);
    try {
      const request = await sendFriendRequest(userId);

      if (request.success) {
        toast.success(request.message);
      } else {
        console.log("ELSE BLOCK");
        toast.error(request.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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

        <button
          onClick={() => handleSendRequest(user._id)}
          className="bg-[#444CE7] cursor-pointer flex items-center justify-center rounded-lg text-white h-8 mt-2 text-xs"
        >
          {loading ? <Generating /> : "Add friend"}
        </button>
      </div>
    </div>
  );
};

export default Users;
