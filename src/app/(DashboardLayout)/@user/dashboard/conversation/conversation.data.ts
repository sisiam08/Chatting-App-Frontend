import type { LucideIcon } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────

export interface HeaderAction {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: { type: "image"; src: string } | { type: "initials"; text: string };
  status: "active" | "unread" | "read";
  isOnline: boolean;
}

export interface ActiveContact {
  name: string;
  avatarSrc: string;
  isOnline: boolean;
}

// ── Message Types ──────────────────────────────────────────────────────

interface MessageBase {
  id: string;
  time: string;
}

export interface SenderMessage extends MessageBase {
  sender: "self";
  type: "text";
  content: string;
  isRead?: boolean;
}

export interface ReceiverTextMessage extends MessageBase {
  sender: "other";
  type: "text";
  content: string;
  showAvatar: boolean;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface ReceiverFileMessage extends MessageBase {
  sender: "other";
  type: "file";
  fileName: string;
  fileSize: string;
  fileType: string;
  showAvatar: boolean;
}

export interface ReceiverImageMessage extends MessageBase {
  sender: "other";
  type: "image";
  src: string;
  alt: string;
  showAvatar: boolean;
}

export type Message =
  | SenderMessage
  | ReceiverTextMessage
  | ReceiverFileMessage
  | ReceiverImageMessage;

// ── Active Contact ─────────────────────────────────────────────────────

export const activeContact: ActiveContact = {
  name: "Alex Rivera",
  avatarSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBSRPHtfnQP366Z0b2oZERwR8N_xCqklkErCPNHk3iPlnEeaBZVaVkXrQzUlmNJHgH02Xg-RWqwmC-UNCHVhArqvqLH7Z0eZEjqrthsX3AOlkqSGpOz0As1SOGRf1Bz3yDb0vBUBwMQLJ4CGscjHIA6pcYoJ4Gw8IOnqwmvIyFgcdnQcnE8TrtDIE793b_ABwD0AVZfagEJbGSzCAdWYe8WHy7bhziB-r6Hb1IG-cJdEx70aFBXgwub-Q",
  isOnline: true,
};

// ── Conversations ────────────────────────────────────────────────────

// ── Typing Indicator ───────────────────────────────────────────────────

export const typingIndicatorAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDNI0AIqENUIYbEdwuaSjWfl9Hq4w5KbVrFxa44f818nsjVc2l5n7cwtECzMDuUmexqHlDTo2XzPl3oiwSRhoLtcAwBGXm6N52XZrLyUpB4Q5gdOQ439B0kbwky_IzZawK7QDS-IBdzwpCSzeFB9xhBBb9bF5ven4gKmmJjO-8DaTExtODPnKyzhrFyOs_gIYounyB1g6z5EEYBMFtLB46QqNOsrUq8PZ6wgvqE9kSCL2CaZPC12Nspcg";

// ── Lightbox ───────────────────────────────────────────────────────────

export const lightboxImageSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAXwhqwWKIVGViWI_Y5eaRx2WuFGyuewv4aBqPu21csQ0O0dkJoGrMsDwgJwXNMRxdBEywaFVgxpbLSvH9ck6w46YBWskOaSMhWkl-QAE9_dTlF6vBkG0OBKanFi-PuRL7iPnRlE93GsFMHQ9FjHSn6UWwH7G6Kaq4brCGRou0aFZ_jNJH-IA6in-r7u3uVbHefxXH-I8cX36XPXgPxNXg6muIuDB09B4jRqg3JbIYwV2UHVl8lIzZJ7Q";
