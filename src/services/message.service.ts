import { httpClient } from "../lib/axios/httpClient";

export const getMessages = async (conversationId: string) => {
    try{
        return httpClient.get(`/messages/${conversationId}`);
    }
    catch(error){
        console.error(`Error fetching messages for conversation ${conversationId}:`, error);
        throw error;
    }
}