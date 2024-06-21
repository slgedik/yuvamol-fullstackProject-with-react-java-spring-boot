package com.silagedik.yuvamol.api.controllers;

import com.silagedik.yuvamol.business.abstracts.UserService;
import com.silagedik.yuvamol.entities.abstracts.UserDto;
import com.silagedik.yuvamol.entities.concretes.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> addUser(@RequestBody UserDto userDto) {
        try {
            User newUser = userService.addUser(userDto);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody UserDto userDto) {
        try {
            User updatedUser = userService.updateUser(id, userDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
 

    @GetMapping("/user-details")
    public ResponseEntity<User> getUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/animal/{id}")
    public ResponseEntity<User> getUserByAnimalId(@PathVariable int id) {
        User user = userService.getUserByAnimalId(id);
        return ResponseEntity.ok(user);
    }
   

}
