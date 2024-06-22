package com.silagedik.yuvamol.business.concretes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silagedik.yuvamol.business.abstracts.AnimalPostService;
import com.silagedik.yuvamol.dataAccess.abstracts.AnimalPostDao;
import com.silagedik.yuvamol.dataAccess.abstracts.SpeciesDao;
import com.silagedik.yuvamol.dataAccess.abstracts.UserDao;
import com.silagedik.yuvamol.entities.abstracts.AnimalDto;
import com.silagedik.yuvamol.entities.concretes.Animal;
import com.silagedik.yuvamol.entities.concretes.Species;
import com.silagedik.yuvamol.entities.concretes.User;

@Service
public class AnimalPostManager implements AnimalPostService  {
	
	private AnimalPostDao animalPostDao;
	private  UserDao userDao;
	private  SpeciesDao speciesDao;
	 @Autowired
	    public AnimalPostManager(AnimalPostDao animalPostDao, UserDao userDao, SpeciesDao speciesDao) {
	        this.animalPostDao = animalPostDao;
	        this.userDao = userDao;
	        this.speciesDao = speciesDao;
	    }

	 @Override
	    public Animal addAnimal(AnimalDto animalDto) {
	        User owner = userDao.findById(animalDto.getOwnerId())
	                .orElseThrow(() -> new RuntimeException("User not found"));
	        Species species = speciesDao.findById(animalDto.getSpeciesId())
	                .orElseThrow(() -> new RuntimeException("Species not found"));
	        
	        Animal animal = new Animal();
	        animal.setAnimalName(animalDto.getAnimalName());
	        animal.setBreed(animalDto.getBreed());
	        animal.setAge(animalDto.getAge());
	        animal.setGender(animalDto.getGender());
	        animal.setHealthStatus(animalDto.getHealthStatus());
	        animal.setDescription(animalDto.getDescription());
	        animal.setLocation(animalDto.getLocation());
	        animal.setOwner(owner);
	        animal.setSpecies(species); // Bu satırı ekleyin

	        return animalPostDao.save(animal);
	    }
	

	    @Override
	    public List<Animal> getAllAnimals() {
	        return animalPostDao.findAll();
	    }

	    @Override
	    public Animal getAnimalById(int id) {
	        return animalPostDao.findById(id).orElseThrow(() -> new RuntimeException("Animal not found"));
	    }

	    @Override
	    public void deleteAnimal(int id) {
	        animalPostDao.deleteById(id);
	    }
	    
	    public List<Animal> getAnimalsBySpecies(int speciesId) {
	        return animalPostDao.findBySpecies_SpeciesId(speciesId);
	    }

	    public List<Animal> getAnimalsByGender(String gender) {
	        return animalPostDao.findByGender(gender);
	    }

	    public List<Animal> getAnimalsByLocation(String location) {
	        return animalPostDao.findByLocation(location);
	    }

	    public List<Animal> getAnimalsByOwnerId(int ownerId) {
		    return animalPostDao.findByOwner_Id(ownerId);
		}

	    @Override
	    public Animal updateAnimal(int id, AnimalDto animalDto) {
	        Animal existingAnimal = animalPostDao.findById(id)
	                .orElseThrow(() -> new RuntimeException("Animal not found"));

	        User owner = userDao.findById(animalDto.getOwnerId())
	                .orElseThrow(() -> new RuntimeException("User with ID " + animalDto.getOwnerId() + " not found"));
	        Species species = speciesDao.findById(animalDto.getSpeciesId())
	                .orElseThrow(() -> new RuntimeException("Species with ID " + animalDto.getSpeciesId() + " not found"));

	        existingAnimal.setAnimalName(animalDto.getAnimalName());
	        existingAnimal.setBreed(animalDto.getBreed());
	        existingAnimal.setAge(animalDto.getAge());
	        existingAnimal.setGender(animalDto.getGender());
	        existingAnimal.setHealthStatus(animalDto.getHealthStatus());
	        existingAnimal.setDescription(animalDto.getDescription());
	        existingAnimal.setLocation(animalDto.getLocation());
	        existingAnimal.setOwner(owner);
	        existingAnimal.setSpecies(species);

	        return animalPostDao.save(existingAnimal);
	    }
	

}
