package com.silagedik.yuvamol.business.abstracts;



import com.silagedik.yuvamol.entities.abstracts.ConversationDto;
import com.silagedik.yuvamol.entities.abstracts.MessageDto;
import com.silagedik.yuvamol.entities.concretes.Message;

import java.util.List;

public interface MessageService {
	Message sendMessage(MessageDto messageDto);
    List<Message> getConversation(int userId1, int userId2);
    List<MessageDto> getUnreadMessages(String username);
    List<ConversationDto> getConversations(String username);
    void markMessageAsRead(int messageId);
    void markConversationAsRead(int userId1, int userId2) ;
    Message getLastMessage(int userId1, int userId2);
    void deleteConversation(int userId1, int userId2);
    
}
