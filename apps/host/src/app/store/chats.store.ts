import { create } from "zustand";
import { Chats } from "../types/types";

interface ChatStore {
  currentChat: Chats | null;
  setCurrentChat: (chat: Chats) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  currentChat: null,
  setCurrentChat: (chat) => {
    set({ currentChat: chat });
  },
}));
