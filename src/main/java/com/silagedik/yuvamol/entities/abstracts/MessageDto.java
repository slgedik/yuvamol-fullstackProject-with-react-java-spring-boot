package com.silagedik.yuvamol.entities.abstracts;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
	private int id;
    private int senderId;
    private int receiverId;
    private String content;
    private Timestamp sentAt;
    private Timestamp readAt;
}
