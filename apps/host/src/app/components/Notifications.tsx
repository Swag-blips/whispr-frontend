import React, { useEffect, useState } from "react";
import Logo from "../../../public/Logo.svg";
import { X } from "lucide-react";
import { NavState } from "./SidebarNav";
import Image from "next/image";
import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notification";
import toast from "react-hot-toast";
import { Notification } from "../types/types";
import { convertDate } from "../utils/convertDate";
import { acceptFriendRequest, declineFriendRequest } from "../services/friend";
import { Generating } from "@repo/ui/icons/Generating";
import { AxiosError } from "axios";
type Props = {
  setOpen: (state: NavState) => void;
};

export const Notifications = ({ setOpen }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [loading, setLoading] = useState(false);
  const fetchNotifications = async () => {
    try {
      const notifications = await getNotifications();

      console.log(notifications);
      setNotifications(notifications.data.notifications);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleMarkNotificationsAsRead = async (notificationIds: string[]) => {
    try {
      const notifications = markNotificationAsRead(notificationIds);
      return notifications;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const acceptFriendRequestWrapper = async (senderId: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const friendRequest = await acceptFriendRequest(senderId);

      if (friendRequest.success) {
        toast.success(friendRequest.message);
      } else if (!friendRequest.success) {
        toast.error(friendRequest.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const declineFriendRequestWrapper = async (friendRequestId: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const friendRequest = await declineFriendRequest(friendRequestId);

      if (friendRequest.success) {
        toast.success(friendRequest.message);
      } else if (!friendRequest.success) {
        toast.error(friendRequest.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!notifications.length) return;

    const unreadNotifications = notifications.filter(
      (notification) => !notification.read
    );

    if (unreadNotifications.length) {
      const unreadIds = unreadNotifications.map(
        (unreadNotification) => unreadNotification._id
      );
      handleMarkNotificationsAsRead(unreadIds);
    }
  }, [notifications]);
  return (
    <div className="fixed inset-0 bg-black/20 py-4 backdrop-blur-[10px] pr-8  top-0 z-50">
      <div className="bg-white h-full w-[345px] ml-auto rounded-lg">
        <div className="flex items-center px-4 py-4 justify-between">
          <div className="flex items-center gap-2">
            <Image src={Logo} alt="logo" width={32} height={32} />
            <h2 className="font-medium">Notifications</h2>
          </div>

          <X
            strokeWidth={1}
            color="#8C8C8C"
            size={16}
            className="cursor-pointer"
            onClick={() => setOpen(null)}
          />
        </div>

        <div className="flex flex-col mx-4 gap-6">
          {notifications.map((notification) => (
            <div key={notification._id} className="flex items-start gap-2.5">
              <Image
                width={48}
                height={48}
                src={
                  notification.from.avatar ||
                  "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
                }
                alt="user"
                className="rounded-full"
              />

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[#0A0A0A] font-medium ">
                    {notification.from.username} sent you a request
                  </p>
                  <p className="text-[#8C8C8C] font-normal text-xs">
                    {convertDate(notification.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <button
                    disabled={loading}
                    onClick={() =>
                      declineFriendRequestWrapper(notification._id)
                    }
                    className=" cursor-pointer border rounded-lg border-[#D9D9D9] px-4 py-2"
                  >
                    Decline
                  </button>
                  <button
                    disabled={loading}
                    onClick={() =>
                      acceptFriendRequestWrapper(notification.from._id)
                    }
                    className=" cursor-pointer flex items-center justify-center bg-[#444CE7] text-white px-4 py-2 rounded-lg"
                  >
                    {loading ? <Generating /> : "Accept"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
