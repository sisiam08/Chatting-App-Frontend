import { Routes } from "../interfaces";
import {
  CircleUser,
  LogOut,
  MessageCircle,
  Phone,
  Users,
  X,
} from "lucide-react";

export const UserRoutes: Routes = {
  navItems: [
    {
      id: "chats",
      title: "Chats",
      url: "/dashboard/conversation",
      label: "Chats",
      icon: MessageCircle,
      filled: true,
      isActive: true,
    },
    {
      id: "voice-calls",
      title: "Voice Calls",
      url: "/dashboard/voice-calls",
      label: "Voice Calls",
      icon: Phone,
      filled: false,
      isActive: false,
    },
    {
      id: "groups",
      title: "Groups",
      url: "/dashboard/groups",
      label: "Groups",
      icon: Users,
      filled: false,
      isActive: false,
    },
  ],
  bottomActions: [
    { id: "theme", title: "Mode", type: "mode-toggle" },
    {
      id: "profile",
      title: "Profile",
      url: "/dashboard/profile",
      label: "Profile",
      icon: CircleUser,
    },
    {
      id: "logout",
      title: "Logout",
      type: "button",
      label: "Logout",
      icon: LogOut,
      danger: true,
    },
  ],
};
