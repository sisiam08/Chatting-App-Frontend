"use server";

import { cookies } from "next/headers";
import { getUserInfo } from "../services/userInfo.service";

export const getSessionAction = async () => {
  return await getUserInfo();
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

