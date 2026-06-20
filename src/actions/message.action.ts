"use server";

import { getMessages } from "../services/message.service";

export const getMessagesAction = async (conversationId: string) => {
        return await getMessages(conversationId);
}