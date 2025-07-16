"use client";
import { Bell, Search, Settings } from "lucide-react";
import { Messages } from "./icons";
import { useEffect, useState } from "react";
import { Search as SearchComponent } from "./Search";
import { Notifications } from "./Notifications";
import useSWR from "swr";
import { getUnreadNotifications } from "../services/notification";
import { useNotificationStore } from "../store/notification.store";

export type NavState = "Notifications" | "Search" | null;
export default function SidebarNav() {
  const [open, setOpen] = useState<NavState>(null);

  const [notificationCount, setNotificationCount] = useState<number>(0);
  const notificationStore = useNotificationStore(
    (state) => state.notifications
  );
  const { data, error, isLoading } = useSWR(
    "notifications",
    getUnreadNotifications
  );

  useEffect(() => {
    if (data && !isLoading) {
      setNotificationCount(data.notifications);
    }
  }, [data]);

  useEffect(() => {
    const handleUpdateNotification = () => {
      setNotificationCount(
        (prevNotificationCount) => prevNotificationCount + 1
      );
    };   
    handleUpdateNotification();
  }, [notificationStore]);

  return (  
    <nav className="flex flex-col gap-4">
      {open === "Search" && <SearchComponent setOpen={setOpen} />}
      {open === "Notifications" && <Notifications setOpen={setOpen} />}
      <div className="flex curosr-pointer items-center gap-2 bg-[#444CE7] py-2 px-2 rounded-lg text-white">
        <Messages />
        Messages
      </div>
      <div
        onClick={() => setOpen("Notifications")}
        className="flex cursor-pointer items-center py-2 px-2 gap-2"
      >
        <div className="relative ">
          <Bell strokeWidth={1} />

          {notificationCount ? (
            <div className="size-3 absolute top-0 right-0 text-white text-[10px] bg-red-500 rounded-full flex items-center justify-center">
              {notificationCount}
            </div>
          ) : (
            ""
          )}
        </div>
        Notifications
      </div>
      <div className="flex cursor-pointer py-2 px-2 items-center gap-2">
        <Settings strokeWidth={1} />
        Settings
      </div>
      <div
        onClick={() => setOpen("Search")}
        className="flex cursor-pointer py-2 px-2 items-center gap-2"
      >
        <Search strokeWidth={1} />
        Search
      </div>
    </nav>
  );
}
