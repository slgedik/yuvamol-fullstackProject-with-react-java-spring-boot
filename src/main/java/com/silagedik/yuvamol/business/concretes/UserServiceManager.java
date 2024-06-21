package com.silagedik.yuvamol.business.concretes;

import com.silagedik.yuvamol.business.abstracts.UserService;
import com.silagedik.yuvamol.dataAccess.abstracts.UserDao;
import com.silagedik.yuvamol.entities.abstracts.UserDto;
import com.silagedik.yuvamol.entities.concretes.User;
import java.util.Base64;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceManager implements UserService {

    private UserDao userDao;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceManager(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    
    @Override
    public User addUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        if (userDto.getProfilePhoto() != null && !userDto.getProfilePhoto().isEmpty()) {
            byte[] profilePhotoBytes = Base64.getDecoder().decode(userDto.getProfilePhoto().split(",")[1]);
            user.setProfilePhoto(profilePhotoBytes);
        }
        return userDao.save(user);
    }
    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    } 

    @Override
    public User getUserById(int id) {
        Optional<User> user = userDao.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(int id, UserDto userDto) {
        Optional<User> optionalUser = userDao.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            if (userDto.getProfilePhoto() != null) {
                user.setProfilePhoto(Base64.getDecoder().decode(userDto.getProfilePhoto()));
            }
            return userDao.save(user);
        }
        return null;
    }

    @Override
    public User getUserByAnimalId(int animalId) {
        Optional<User> user = userDao.findByAnimalId(animalId);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }
  
}
