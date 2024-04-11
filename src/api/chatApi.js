import {chatServiceApi} from "./axiosConfig";

export const listAllMessages = async (chatId) => {
    try {
        return await chatServiceApi.get(`/${chatId}/messages`);
    } catch (error) {
        throw error;
    }
}

export const sendMessage = async ({ messageId, chatId, senderId, senderName, senderPicture, type, content, timestamp }) => {
    try {
        return await chatServiceApi.put(`/${chatId}/messages`, {
            newMessage: {
                messageId,
                senderId, senderName, senderPicture, type, content, timestamp
            }
        })
    } catch (error) {
        throw error;
    }
}