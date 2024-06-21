package com.silagedik.yuvamol.business.abstracts;


import com.silagedik.yuvamol.entities.abstracts.UserDto;
import com.silagedik.yuvamol.entities.concretes.User;

public interface UserService {
    //User save(User user);
    User addUser(UserDto userDto);
    User findByUsername(String username);
   // User getUserByUserId(int id);
	User getUserById(int id);
	//User updateProfilePhoto(int userId, MultipartFile profilePhoto) throws IOException;
	User updateUser(int id, UserDto userDto);
	
	User getUserByAnimalId(int animalId);
}
