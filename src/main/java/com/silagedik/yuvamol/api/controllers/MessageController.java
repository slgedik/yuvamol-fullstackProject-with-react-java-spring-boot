package com.silagedik.yuvamol.api.controllers;

import com.silagedik.yuvamol.business.abstracts.MessageService;
import com.silagedik.yuvamol.entities.abstracts.MessageDto;
import com.silagedik.yuvamol.entities.abstracts.ConversationDto;
import com.silagedik.yuvamol.entities.concretes.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDto messageDto) {
        try {
            Message newMessage = messageService.sendMessage(messageDto);
            return ResponseEntity.ok(newMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/conversation/{userId1}/{userId2}")
    public ResponseEntity<List<Message>> getConversation(@PathVariable int userId1, @PathVariable int userId2) {
        try {
            List<Message> messages = messageService.getConversation(userId1, userId2);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/unread")
    public ResponseEntity<List<MessageDto>> getUnreadMessages(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<MessageDto> messages = messageService.getUnreadMessages(username);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PostMapping("/read/conversation/{userId1}/{userId2}")
    public ResponseEntity<Void> markConversationAsRead(@PathVariable int userId1, @PathVariable int userId2) {
        try {
            messageService.markConversationAsRead(userId1, userId2);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationDto>> getConversations(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<ConversationDto> conversations = messageService.getConversations(username);
            return ResponseEntity.ok(conversations);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    
    
    @PostMapping("/read/{messageId}")
    public ResponseEntity<Void> markMessageAsRead(@PathVariable int messageId) {
        try {
            System.out.println("Marking message as read: " + messageId);
            messageService.markMessageAsRead(messageId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/last/{userId1}/{userId2}")
    public ResponseEntity<Message> getLastMessage(@PathVariable int userId1, @PathVariable int userId2) {
        try {
            Message lastMessage = messageService.getLastMessage(userId1, userId2);
            return ResponseEntity.ok(lastMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @DeleteMapping("/conversation/{userId1}/{userId2}")
    public ResponseEntity<Void> deleteConversation(@PathVariable int userId1, @PathVariable int userId2) {
        try {
            messageService.deleteConversation(userId1, userId2);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }	
    
    

}
