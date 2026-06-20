"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCheck,
  Download,
  ExternalLink,
  FileText,
  MoveLeft,
  Phone,
  Plus,
  Search,
  SendHorizontal,
  Smile,
  Video,
  X,
} from "lucide-react";
import { ModeToggle } from "@/src/components/ui/mode-toggle";
import { useMobileView } from "../layout";
import {
  activeContact,
  lightboxImageSrc,
  type Conversation,
  type Message,
  type SenderMessage,
  type ReceiverTextMessage,
  type ReceiverFileMessage,
  type ReceiverImageMessage,
} from "./conversation.data";
import { getConversationsAction } from "@/src/actions/conversation.action";
import { getMessagesAction } from "@/src/actions/message.action";

// ── Constants ──────────────────────────────────────────────────────────

const TYPING_DOT_DELAYS = [0, 150, 300];

// ── Component ──────────────────────────────────────────────────────────

export default function ConversationPage() {
  const { mobileView, setMobileView } = useMobileView();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversationsResponse = await getConversationsAction();
        console.log("Fetched conversations:", conversationsResponse);
        if (conversationsResponse && conversationsResponse.data) {
          setConversations(conversationsResponse.data);

          // Set the initial active conversation
          const activeConv = conversationsResponse.data.find(
            (c: Conversation) => c.status === "active"
          );
          if (activeConv) {
            setActiveConversationId(activeConv.id);
            fetchMessages(activeConv.id);
          } else if (conversationsResponse.data.length > 0) {
            setActiveConversationId(conversationsResponse.data[0].id);
            fetchMessages(conversationsResponse.data[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, []);

  const fetchMessages = async (conversationId: string) => {
    try {
      const messagesResponse = await getMessagesAction(conversationId);
      console.log(
        `Fetched messages for conversation ${conversationId}:`,
        messagesResponse,
      );
      setMessages(messagesResponse.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ── Render Helpers ─────────────────────────────────────────────────

  function renderConversationItem(conv: Conversation) {
    const isActive = conv.id === activeConversationId;
    const isUnread = conv.status === "unread" && !isActive;

    return (
      <button
        key={conv.id}
        className={
          isActive
            ? "w-full text-left p-3 rounded-lg bg-secondary-container text-on-secondary-container flex items-center gap-3 transition-all duration-150 ease-in-out"
            : "w-full text-left p-3 rounded-lg hover:bg-surface-container-high text-on-surface-variant flex items-center gap-3 transition-all duration-150 ease-in-out group"
        }
        onClick={() => {
          setActiveConversationId(conv.id);
          fetchMessages(conv.id);
          setMobileView("chat");
        }}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          {conv.avatar.type === "image" ? (
            <>
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest overflow-hidden">
                <img
                  alt={`${conv.name} Avatar`}
                  className="w-full h-full object-cover"
                  src={conv.avatar.src}
                />
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${conv.isOnline
                  ? `bg-green-500 ${isActive ? "border-secondary-container" : "border-surface-container-low group-hover:border-surface-container-high transition-colors"}`
                  : `bg-surface-container-highest ${isActive ? "border-secondary-container" : "border-surface-container-low group-hover:border-surface-container-high transition-colors"}`
                  }`}
              />
            </>
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center font-headline-sm text-on-surface border border-outline">
              {conv.avatar.text}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline mb-0.5">
            <span
              className={`font-headline-sm text-body-md truncate text-on-surface ${isActive || isUnread ? "font-semibold" : ""}`}
            >
              {conv.name}
            </span>
            <span
              className={`font-label-sm text-[10px] ${isActive ? "text-primary" : "text-on-surface-variant"}`}
            >
              {conv.time}
            </span>
          </div>
          <p
            className={`font-body-md text-label-md truncate ${isActive || isUnread ? "text-on-surface" : ""} ${isUnread ? "font-medium" : ""}`}
          >
            {conv.lastMessage}
          </p>
        </div>

        {/* Unread indicator */}
        {isUnread && (
          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
        )}
      </button>
    );
  }

  function renderMessage(msg: Message) {
    if (msg.sender === "self") return renderSenderMessage(msg);
    switch (msg.type) {
      case "text":
        return renderReceiverText(msg);
      case "file":
        return renderReceiverFile(msg);
      case "image":
        return renderReceiverImage(msg);
    }
  }

  function renderSenderMessage(msg: SenderMessage) {
    return (
      <div
        key={msg.id}
        className="flex flex-col items-end self-end max-w-[85%] md:max-w-[70%]"
      >
        <div className="msg-bubble bg-primary/10 text-on-surface p-3 rounded-2xl rounded-br-sm border-l-2 border-l-primary border-t border-b border-r border-outline-variant font-body-md text-body-md">
          {msg.content}
        </div>
        <div className="flex items-center gap-1 mt-1 mr-2">
          <span className="font-label-sm text-[10px] text-on-surface-variant">
            {msg.time}
          </span>
          {msg.isRead && <CheckCheck className="w-3 h-3 text-primary" />}
        </div>
      </div>
    );
  }

  function renderReceiverText(msg: ReceiverTextMessage) {
    return (
      <div
        key={msg.id}
        className="flex flex-col items-start max-w-[85%] md:max-w-[70%]"
      >
        <div className="flex items-end gap-2">
          {msg.showAvatar ? (
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden shrink-0 hidden md:block">
              <img
                alt={msg.avatarAlt || ""}
                className="w-full h-full object-cover"
                src={msg.avatarSrc || ""}
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden shrink-0 hidden md:block opacity-0" />
          )}
          <div className="msg-bubble bg-surface-container-highest text-on-surface p-3 rounded-2xl rounded-bl-sm border border-outline-variant font-body-md text-body-md">
            {msg.content}
          </div>
        </div>
        <span className="font-label-sm text-[10px] text-on-surface-variant mt-1 ml-10 hidden md:block">
          {msg.time}
        </span>
      </div>
    );
  }

  function renderReceiverFile(msg: ReceiverFileMessage) {
    return (
      <div
        key={msg.id}
        className="flex flex-col items-start max-w-[85%] md:max-w-[70%]"
      >
        <div className="flex items-end gap-2 w-full">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden shrink-0 hidden md:block opacity-0" />
          <div className="msg-bubble bg-surface-container-highest text-on-surface p-1 rounded-xl rounded-bl-sm border border-outline-variant w-full sm:w-80">
            <div className="flex items-center gap-3 p-2 hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-surface-container-low rounded flex items-center justify-center text-primary group-hover:bg-outline transition-colors border border-outline-variant">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline-sm text-body-md truncate text-on-surface font-medium">
                  {msg.fileName}
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  {msg.fileSize} • {msg.fileType}
                </p>
              </div>
              <button className="text-on-surface-variant group-hover:text-primary transition-colors pr-2">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <span className="font-label-sm text-[10px] text-on-surface-variant mt-1 ml-10 hidden md:block">
          {msg.time}
        </span>
      </div>
    );
  }

  function renderReceiverImage(msg: ReceiverImageMessage) {
    return (
      <div
        key={msg.id}
        className="flex flex-col items-start max-w-[85%] md:max-w-[70%]"
      >
        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden shrink-0 hidden md:block opacity-0" />
          <div
            className="msg-bubble bg-surface-container-highest p-1.5 rounded-2xl rounded-bl-sm relative group overflow-hidden cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              alt={msg.alt}
              className="w-full max-w-sm rounded-xl object-cover h-48"
              src={msg.src}
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-surface-container-lowest/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl m-1.5">
              <button className="w-12 h-12 bg-primary rounded-full text-on-primary flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-200">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <span className="font-label-sm text-[10px] text-on-surface-variant mt-1 ml-10 hidden md:block">
          {msg.time}
        </span>
      </div>
    );
  }

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  return (
    <div className="dashboard-theme bg-background text-on-background h-screen w-full overflow-hidden flex font-body-md selection:bg-primary selection:text-on-primary">
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap"
        rel="stylesheet"
      />
      {/* SideNavBar (Drawer - Desktop Sidebar View) */}
      <aside className={`${mobileView === "list" ? "flex w-full" : "hidden"} md:flex flex-col h-full overflow-hidden bg-surface-container-low md:w-72 lg:w-sidebar-width shrink-0 z-10 border-r border-outline-variant`}>
        {/* Sidebar Header & Search */}
        <div className="p-4 border-b border-outline-variant shrink-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Chats
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                3 unread messages
              </p>
            </div>
            <button className="w-8 h-8 rounded bg-surface-container-highest hover:bg-outline border border-outline-variant flex items-center justify-center text-on-surface transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4.5 h-4.5" />
            <input
              className="w-full bg-surface-container-highest border-none rounded-md py-2 pl-9 pr-3 text-body-md text-on-surface placeholder:text-on-surface-variant focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="Search conversations..."
              type="text"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 pb-20 md:pb-3">
          {conversations.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface">
                <Smile className="w-6 h-6" />
              </div>
              <p className="font-headline-sm text-body-md text-on-surface">
                No conversations yet
              </p>
              <p className="font-label-md text-on-surface-variant">
                Start a new chat to see conversations here.
              </p>
            </div>
          ) : (
            conversations.map(renderConversationItem)
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`${mobileView === "chat" ? "flex w-full" : "hidden"} md:flex flex-1 flex-col min-h-0 overflow-hidden bg-surface-container-lowest relative`}>
        {conversations.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <p className="font-headline-sm text-body-md text-on-surface">
              No active conversation
            </p>
            <p className="font-label-md text-on-surface-variant">
              Select a conversation from the left or start a new one.
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded shadow-lg font-label-md font-bold hover:bg-primary/80 transition-colors">
              <Plus className="w-6 h-6" />
              Add contact
            </button>
          </div>
        ) : (
          // Render conversation messages
          <section className="flex-1 flex flex-col min-h-0 overflow-hidden relative h-full w-full">
            {/* TopAppBar */}
            <header className="flex justify-between items-center px-5 w-full h-16 bg-surface border-b border-outline-variant shrink-0 z-10">
              <div className="flex items-center gap-4">
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileView("list")}
                    className="text-on-surface-variant hover:text-on-surface transition-colors p-1 -ml-1 rounded-full hover:bg-surface-container-high"
                    aria-label="Back to chat list"
                  >
                    <MoveLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    {activeConversation && activeConversation.avatar.type === "image" ? (
                      <div className="w-8 h-8 rounded-full bg-surface-container-lowest overflow-hidden">
                        <img
                          alt="Active Contact Avatar"
                          className="w-full h-full object-cover"
                          src={activeConversation.avatar.src}
                        />
                      </div>
                    ) : activeConversation && activeConversation.avatar.type === "initials" ? (
                      <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-xs font-semibold text-on-surface border border-outline">
                        {activeConversation.avatar.text}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-surface-container-lowest overflow-hidden">
                        <img
                          alt="Active Contact Avatar"
                          className="w-full h-full object-cover"
                          src={activeContact.avatarSrc}
                        />
                      </div>
                    )}
                    {((activeConversation && activeConversation.isOnline) || (!activeConversation && activeContact.isOnline)) && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-surface" />
                    )}
                  </div>
                  <div>
                    <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      {activeConversation ? activeConversation.name : activeContact.name}
                    </h1>
                    <p className="font-label-sm text-[10px] text-on-surface-variant flex items-center gap-1">
                      {((activeConversation && activeConversation.isOnline) || (!activeConversation && activeContact.isOnline)) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      )}{" "}
                      {((activeConversation && activeConversation.isOnline) || (!activeConversation && activeContact.isOnline)) ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="call"
                  disabled
                  className="w-10 h-10 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100 transition-all duration-150 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button
                  id="video"
                  disabled
                  className="w-10 h-10 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100 transition-all duration-150 flex items-center justify-center"
                >
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Chat Body */}
            <div
              ref={chatContainerRef}
              className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 pb-25 lg:pb-30 lg:space-y-4 space-y-6 flex flex-col scroll-smooth"
              id="chat-container"
            >
              {/* Date Divider */}
              {/* <div className="flex items-center justify-center my-4">
            <span className="bg-surface-container-highest text-on-surface-variant text-xs px-2 py-0.5 rounded-full border border-outline">
              Today
            </span>
          </div> */}

              {/* Messages */}
              {messages.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 mt-10">
                  <p className="font-headline-sm text-body-md text-on-surface">
                    No messages yet
                  </p>
                  <p className="font-label-md text-on-surface-variant">
                    Send a message to start the conversation.
                  </p>
                </div>
              ) : (
                messages.map(renderMessage)
              )}

              {/* Typing Indicator */}
              {/* <div className="flex items-end gap-2 animate-pulse mt-4">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden shrink-0 hidden md:block">
              <img
                alt="Alex Rivera"
                className="w-full h-full object-cover"
                src={typingIndicatorAvatar}
              />
            </div>
            <div className="bg-surface-container-highest p-3 rounded-2xl rounded-bl-sm border border-outline-variant flex gap-1 h-10 items-center">
              {TYPING_DOT_DELAYS.map((delay) => (
                <div
                  key={delay}
                  className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div> */}
              <div className="h-4" />
            </div>

            {/* Message Input */}
            <div className="absolute bottom-5 left-0 right-0 px-4 z-10">
              <div className="max-w-4xl mx-auto flex items-center gap-2 rounded-2xl p-2 bg-surface-container-high/60 border border-outline-variant/50 shadow-xl backdrop-blur-xl focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-300">
                <button className="w-10 h-10 rounded-xl bg-surface/40 hover:bg-outline-variant/60 text-on-surface-variant hover:text-primary flex items-center justify-center shrink-0 transition-colors border border-outline-variant/40">
                  <Plus className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    className="w-full bg-transparent focus:ring-0 focus:outline-none text-body-md text-on-surface placeholder:text-on-surface-variant resize-none py-2.5 max-h-32 min-h-10 hide-scroll"
                    placeholder="Type a message..."
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 pb-1 shrink-0">
                  <button className="w-8 h-8 rounded hover:bg-surface-container-highest/60 text-on-surface-variant flex items-center justify-center transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:bg-primary/80 transition-colors shadow-sm ml-1">
                    <SendHorizontal className="w-5 h-5" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Image Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          id="image-lightbox"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-surface-container-lowest/90 backdrop-blur-sm transition-opacity"
            onClick={() => setIsLightboxOpen(false)}
          />
          {/* Dialog Content */}
          <div className="relative z-10 w-full max-w-5xl p-4 flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-full flex justify-end mb-4">
              <button
                className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant text-on-surface hover:text-primary hover:border-primary flex items-center justify-center transition-all shadow-lg"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-surface-container-high p-2 rounded-lg border border-outline-variant shadow-2xl relative group">
              <img
                alt="Server schematic full size"
                className="max-w-full max-h-204.75 object-contain rounded"
                src={lightboxImageSrc}
              />
              {/* Overlay Actions */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="px-4 py-2 bg-surface border border-outline-variant text-on-surface hover:text-primary rounded shadow-lg flex items-center gap-2 font-label-md transition-colors">
                  <ExternalLink className="w-4.5 h-4.5" /> Open Original
                </button>
                <button className="px-4 py-2 bg-primary text-on-primary rounded shadow-lg flex items-center gap-2 font-label-md font-bold hover:bg-primary/80 transition-colors">
                  <Download className="w-4.5 h-4.5" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
