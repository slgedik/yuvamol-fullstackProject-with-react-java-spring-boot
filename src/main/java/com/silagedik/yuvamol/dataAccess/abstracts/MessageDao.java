package com.silagedik.yuvamol.dataAccess.abstracts;

import com.silagedik.yuvamol.entities.abstracts.ConversationDto;
import com.silagedik.yuvamol.entities.abstracts.MessageDto;
import com.silagedik.yuvamol.entities.concretes.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageDao extends JpaRepository<Message, Integer> {
    @Query("SELECT m FROM Message m WHERE (m.senderId = ?1 AND m.receiverId = ?2) OR (m.senderId = ?2 AND m.receiverId = ?1) ORDER BY m.sentAt ASC")
    List<Message> findConversation(int userId1, int userId2);

    @Query("SELECT new com.silagedik.yuvamol.entities.abstracts.MessageDto(m.id, m.senderId, m.receiverId, m.content, m.sentAt, m.readAt) FROM Message m WHERE m.receiverId = (SELECT u.id FROM User u WHERE u.username = ?1) AND m.readAt IS NULL")
    List<MessageDto> findUnreadMessagesByUsername(String username);

    @Query("SELECT new com.silagedik.yuvamol.entities.abstracts.ConversationDto(m.senderId, m.receiverId, MAX(m.sentAt), m.content, MAX(m.readAt)) FROM Message m WHERE m.senderId = (SELECT u.id FROM User u WHERE u.username = ?1) OR m.receiverId = (SELECT u.id FROM User u WHERE u.username = ?1) GROUP BY m.senderId, m.receiverId, m.content")
    List<ConversationDto> findConversationsByUsername(String username);
    
    List<Message> findBySenderIdAndReceiverIdOrderBySentAt(int senderId, int receiverId);
    Message findTopBySenderIdAndReceiverIdOrderBySentAtDesc(int senderId, int receiverId);
    
    void deleteBySenderIdAndReceiverId(int senderId, int receiverId);
}