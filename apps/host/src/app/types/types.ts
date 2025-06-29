export interface User {
  avatar?: string;
  bio: string;
  createdAt: Date;
  email: string;
  friends: string[];
  _id: string;
  username: string;
}

export interface Notification {
  _id: string;
  from: User;
  to: string;
  type: "Accepted" | "Declined" | "Pending";
  createdAt: Date;
  updatedAt: string;
  __v: number;
}

export interface Chats {
  _id: string;
  bio: string;
  createdAt: string;
  lastMessage: string;
  participants: string[];
  type: "private" | "group";
  updatedAt: number;
  __v: number;
  groupName: string;
  otherUsers: User ;
  unreadMessages: number;
}

export interface createGroup {
  groupName: string;
  bio: string;
  participants: Array<string>;
}

export interface CreateGroupArgs {
  groupName: string;
  bio: string;
  participants: Array<string>;
}

export interface Message {
  _id: string;
  chatId: string;
  content: string;
  receiverId: string;
  senderId: string;
  createdAt: Date;
  updatedAt: string;
  __v: number;
  otherUserDetails: User;
  status: "delivered" | "sent" | "seen";
}
