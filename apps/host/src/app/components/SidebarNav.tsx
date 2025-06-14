"use client";
import { Bell, Search, Settings } from "lucide-react";
import { Messages } from "./icons";
import { useState } from "react";
import { Search as SearchComponent } from "./Search";
import { Notifications } from "./Notifications";

export type NavState = "Notifications" | "Search" | null;
export default function SidebarNav() {
  const [open, setOpen] = useState<NavState>(null);
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
        <Bell strokeWidth={1} />
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
