package com.silagedik.yuvamol.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.silagedik.yuvamol.entities.concretes.User;
import java.util.Optional;
public interface UserDao extends JpaRepository<User, Integer> {
	User findByUsername(String username);
	//User findById_Id(int id);
	Optional<User> findById(int id);
	Optional<User> findByEmail(String email);
	@Query("SELECT u FROM User u JOIN u.animals a WHERE a.id = :animalId")	
	Optional<User> findByAnimalId(@Param("animalId") int animalId);
	
	
}
