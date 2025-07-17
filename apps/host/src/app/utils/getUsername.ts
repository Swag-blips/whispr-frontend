import { User } from "../types/types";

export const getUserName = (
  otherUsers: User | User[] | undefined,
  senderId: string
) => {
  if (Array.isArray(otherUsers)) {
    const otherUser = otherUsers.find((user: User) => user._id === senderId);

    return otherUser?.username ? otherUser.username : "";
  }

  return otherUsers?.username;
};
