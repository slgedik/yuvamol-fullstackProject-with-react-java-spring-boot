package com.silagedik.yuvamol.business.abstracts;


import com.silagedik.yuvamol.entities.concretes.Animal;
import com.silagedik.yuvamol.entities.abstracts.AnimalDto ;

import java.util.List;

public interface AnimalPostService {
    Animal addAnimal(AnimalDto animalDto);
    List<Animal> getAllAnimals();
    Animal getAnimalById(int id);
    void deleteAnimal(int id);
    Animal updateAnimal(int id, AnimalDto animalDto);
    List<Animal> getAnimalsBySpecies(int speciesId);
    List<Animal> getAnimalsByGender(String gender);
    List<Animal> getAnimalsByLocation(String location);
    List<Animal> getAnimalsByOwnerId(int ownerId);
    
}
