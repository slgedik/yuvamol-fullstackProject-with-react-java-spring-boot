package com.silagedik.yuvamol.entities.concretes;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //bu bir veritabanı nesnesidir
@Data
@Table (name = "users")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="id")
	private int id;
	
	@Column(name ="username")
	@NotBlank
	@NotNull
	private String username;
	
	@Column(name ="email")
	@Email
	@NotBlank
	@NotNull
	private String email;
	
	@Column(name ="password")
	@NotBlank
	@NotNull
	private String password;
	
	 
	 @Column(name = "profile_photo")
	 private byte[] profilePhoto;
	
	
	@OneToMany(mappedBy = "owner")
	@JsonIgnore
    private List<Animal> animals;


	
}
