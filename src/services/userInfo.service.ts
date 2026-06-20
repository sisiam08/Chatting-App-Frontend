import { cookies } from "next/headers";

export const getUserInfo = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      emailVerified: payload.emailVerified,
      role: payload.role,
    };
  } catch (error) {
    return null;
  }
};
