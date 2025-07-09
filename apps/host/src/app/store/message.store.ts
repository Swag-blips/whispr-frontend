import { Message } from "../types/types";
import { create } from "zustand";

interface MessageStore {
  allMessages: Message[];
  setAllMessages: (messages: Message[]) => void;
  addMessage: (msg: Message) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  allMessages: [],
  setAllMessages: (messages) => set({ allMessages: messages }),
  addMessage: (msg) =>
    set((state) => ({ allMessages: [...state.allMessages, msg] })),
}));
