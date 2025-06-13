import Chats from "./components/Chats";
import { Sidebar } from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex items-start h-screen">
      <Sidebar />
      <Chats />
    </div>
  );
}
