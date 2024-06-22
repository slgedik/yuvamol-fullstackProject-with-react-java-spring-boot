package com.silagedik.yuvamol.entities.abstracts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDto {
    private int senderId;
    private int receiverId;
    private String content;
    private Timestamp sentAt;
    private Timestamp readAt;

   
    public ConversationDto(int senderId, int receiverId, Timestamp sentAt, String content, Timestamp readAt) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.sentAt = sentAt;
        this.content = content;
        this.readAt = readAt;
    }
}
