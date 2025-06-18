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
