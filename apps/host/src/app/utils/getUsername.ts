import { User } from "../types/types";

export const getUserName = (otherUsers: any, senderId: string) => {

  if (Array.isArray(otherUsers)) {
    const otherUser: User = otherUsers.find(
      (user: User) => user._id === senderId
    );
 
    return otherUser.username;
  }

  return otherUsers.username;
};
