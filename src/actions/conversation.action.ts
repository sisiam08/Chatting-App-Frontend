"use server";

import { getConversations } from "../services/conversation.service";

export const getConversationsAction = async () => {
        return await getConversations();
}