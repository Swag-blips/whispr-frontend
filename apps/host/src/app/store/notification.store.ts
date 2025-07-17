import { create } from "zustand";
import { User } from "../types/types";

type Notification = {
  type: "sendFriendRequest" | "acceptFriendRequest";

  sender: User;
};

type NotificationStore = {
  notifications: Notification[];
  initNotifications: (userId: string) => void;
  clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  initNotifications: (userId: string) => {
    if (!userId) return;

    const events = new EventSource(
      `http://localhost:3004/api/notifications/events?userId=${userId}`
    );

    events.onmessage = (event) => {
      console.log("event", event);
      const data = JSON.parse(event.data);

      set((state) => ({
        notifications: [...state.notifications, data],
      }));
    };

    events.onerror = (err) => {
      console.error("SSE error:", err);
      events.close();
    };
  },

  clearNotifications: () => set({ notifications: [] }),
}));
