import { httpClient } from "../lib/axios/httpClient";

export const getConversations = async () => {
  try {
    return await httpClient.get("/conversations");
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};
