package com.silagedik.yuvamol.business.concretes;



import com.silagedik.yuvamol.business.abstracts.MessageService;
import com.silagedik.yuvamol.dataAccess.abstracts.MessageDao;
import com.silagedik.yuvamol.entities.abstracts.ConversationDto;
import com.silagedik.yuvamol.entities.abstracts.MessageDto;
import com.silagedik.yuvamol.entities.concretes.Message;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
@Service
public class MessageManager implements MessageService {

    private final MessageDao messageDao;

    @Autowired
    public MessageManager(MessageDao messageDao) {
        this.messageDao = messageDao;
    }

    @Override
    public Message sendMessage(MessageDto messageDto) {
        Message message = new Message();
        message.setSenderId(messageDto.getSenderId());
        message.setReceiverId(messageDto.getReceiverId());
        message.setContent(messageDto.getContent());
        message.setSentAt(messageDto.getSentAt() != null ? messageDto.getSentAt() : new Timestamp(System.currentTimeMillis()));
        message.setReadAt(messageDto.getReadAt());
        return messageDao.save(message);
    }

    @Override
    public List<Message> getConversation(int userId1, int userId2) {
        return messageDao.findConversation(userId1, userId2);
    }

    
    @Override
    public List<MessageDto> getUnreadMessages(String username) {
        return messageDao.findUnreadMessagesByUsername(username);
    }


    @Override
    public List<ConversationDto> getConversations(String username) {
        return messageDao.findConversationsByUsername(username);
    }

    @Override
    public void markMessageAsRead(int messageId) {
        Message message = messageDao.findById(messageId).orElseThrow(() -> new RuntimeException("Message not found"));
        message.setReadAt(new Timestamp(System.currentTimeMillis()));
        messageDao.save(message);
    }
    
    
    @Override
    public void markConversationAsRead(int userId1, int userId2) {
        List<Message> messages = messageDao.findConversation(userId1, userId2);
        for (Message message : messages) {
            if (message.getReadAt() == null) {
                message.setReadAt(new Timestamp(System.currentTimeMillis()));
                messageDao.save(message);
            }
        }
    }
    
    @Override
    public Message getLastMessage(int userId1, int userId2) {
        return messageDao.findTopBySenderIdAndReceiverIdOrderBySentAtDesc(userId1, userId2);
    }
    
    @Transactional
    @Override
    public void deleteConversation(int userId1, int userId2) {
        messageDao.deleteBySenderIdAndReceiverId(userId1, userId2);
        messageDao.deleteBySenderIdAndReceiverId(userId2, userId1);
    }
    
   

   

    
    
}
