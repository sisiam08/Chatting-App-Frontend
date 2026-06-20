"use client";

import Image from "next/image";
import logo_icon from "../../../../../../public/logo_icon.png";
import { UserRoutes } from "@/src/routes/userRoutes";
import { ModeToggle } from "@/src/components/ui/mode-toggle";
import { ActionItems, RouteItems } from "@/src/interfaces";
import { useRouter, usePathname } from "next/navigation";
import { logoutAction } from "@/src/actions/session.action";

export default function UserSidebar({
  children,
  mobileView,
}: Readonly<{
  children: React.ReactNode;
  mobileView: "list" | "chat";
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const navItems = UserRoutes.navItems;
  const bottomActions = UserRoutes.bottomActions;

  const handleNavItemClick = (item: RouteItems) => {
    router.push(item.url);
  };
  const handleActionClick = async (action: ActionItems) => {
    if (action.id === "logout") {
      await logoutAction();
      router.push("/login");
    } else if (action.url) {
      router.push(action.url);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* SideNavBar (Rail) */}
      <nav className="hidden md:flex flex-col items-center py-gutter bg-surface w-nav-rail-width h-full shrink-0 z-20 border-r border-outline-variant">
        <div className="mx-auto my-4">
          <Image src={logo_icon} alt="Relay" width={40} height={40} />
        </div>
        <div className="flex-1 flex flex-col items-center gap-4 w-full mt-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.url);
            return (
              <button
                key={item.id}
                aria-label={item.label}
                className={
                  isActive
                    ? "w-12 h-12 flex items-center justify-center rounded-xl text-primary font-bold border-l-2 border-primary bg-secondary-container transition-colors duration-150"
                    : "w-12 h-12 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-secondary-container transition-colors duration-150 scale-95 active:scale-90"
                }
                onClick={() => handleNavItemClick(item)}
              >
                <Icon
                  className="w-5 h-5"
                  {...(item.filled ? { fill: "currentColor" } : {})}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom Nav Actions */}
        <div className="flex flex-col items-center gap-2 pb-4">
          {bottomActions.map((action) => {
            if (action?.type === "mode-toggle") {
              return (
                <ModeToggle
                  key={action.id}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-secondary-container hover:text-primary transition-colors duration-150"
                />
              );
            }
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                aria-label={action.label}
                title={action.label}
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant ${
                  action.danger
                    ? "hover:bg-red-500/20 hover:text-red-400"
                    : "hover:bg-secondary-container hover:text-primary"
                } transition-colors duration-150`}
                onClick={() => handleActionClick(action)}
              >
                {Icon && <Icon className="w-5 h-5" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main dashboard content area */}
      <div className="flex-1 min-w-0 h-full relative">{children}</div>

      {/* Mobile Bottom Navigation */}
      {mobileView === "list" && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline-variant flex items-center justify-around z-20 px-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.url);
            return (
              <button
                key={item.id}
                aria-label={item.label}
                className={
                  isActive
                    ? "flex flex-col items-center justify-center text-primary font-bold transition-colors duration-150"
                    : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors duration-150"
                }
                onClick={() => handleNavItemClick(item)}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
          <ModeToggle className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-secondary-container hover:text-primary transition-colors duration-150" />
        </nav>
      )}
    </div>
  );
}
