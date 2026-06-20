"use client";

import { createContext, useContext, useState } from "react";
import UserSidebar from "./_components/UserSidebar";

interface MobileViewContextType {
  mobileView: "list" | "chat";
  setMobileView: (view: "list" | "chat") => void;
}

const MobileViewContext = createContext<MobileViewContextType | undefined>(
  undefined,
);

export const useMobileView = () => {
  const context = useContext(MobileViewContext);
  if (!context) {
    throw new Error("useMobileView must be used within a MobileViewProvider");
  }
  return context;
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  return (
    <MobileViewContext.Provider value={{ mobileView, setMobileView }}>
      <UserSidebar mobileView={mobileView}>
        {children}
      </UserSidebar>
    </MobileViewContext.Provider>
  );
}
