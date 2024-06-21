package com.silagedik.yuvamol.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.silagedik.yuvamol.entities.concretes.Animal;

public interface AnimalPostDao extends JpaRepository<Animal, Integer>{
	
	Animal getByAnimalName(String animalName);
	List<Animal> findBySpecies_SpeciesId(int speciesId);
    List<Animal> findByBreed(String breed);
    List<Animal> findByAgeLessThan(int age);
    List<Animal> findByAgeGreaterThan(int age);
    List<Animal> findByGender(String gender);
    List<Animal> findByHealthStatus(String healthStatus);
    List<Animal> findByLocation(String location);
    List<Animal> findByOwner_Id(int ownerId); //
}
