package com.silagedik.yuvamol.entities.abstracts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private String username;
	private String email;
	private String password;
	private String profilePhoto; // Base64 encoded photo
	
	//private byte[] profilePhoto;
}


