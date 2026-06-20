import { UserRole } from "@/src/interfaces";
import { getUserInfo } from "@/src/services/userInfo.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  user,
  admin,
}: Readonly<{
  user: React.ReactNode;
  admin: React.ReactNode;
}>) {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    redirect("/login");
  }
  return <div>{userInfo.role === UserRole.ADMIN ? admin : user}</div>;
}
