	package com.silagedik.yuvamol.api.controllers;
	
	import com.silagedik.yuvamol.business.abstracts.AnimalPostService;
	import com.silagedik.yuvamol.entities.concretes.Animal;
	import com.silagedik.yuvamol.entities.abstracts.AnimalDto;
	import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;
	
	import java.util.List;
	
	@RestController
	@RequestMapping("/api/animals")
	@CrossOrigin 
	public class AnimalPostController {
	
	    private final AnimalPostService animalPostService;
	
	    @Autowired
	    public AnimalPostController(AnimalPostService animalPostService) {
	        this.animalPostService = animalPostService;
	    }
	
	    @PostMapping("/add")
	    public ResponseEntity<Animal> addAnimal(@RequestBody AnimalDto animalDto) {
	        try {
	            Animal newAnimal = animalPostService.addAnimal(animalDto);
	            return ResponseEntity.ok(newAnimal);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	
	    @GetMapping("/all")
	    public ResponseEntity<List<Animal>> getAllAnimals() {
	        List<Animal> animals = animalPostService.getAllAnimals();
	        return ResponseEntity.ok(animals);
	    }
	
	    @GetMapping("/{id}")
	    public ResponseEntity<Animal> getAnimalById(@PathVariable int id) {
	        Animal animal = animalPostService.getAnimalById(id);
	        return ResponseEntity.ok(animal);
	    }
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Animal> updateAnimal(@PathVariable int id, @RequestBody AnimalDto animalDto) {
	        try {
	            Animal updatedAnimal = animalPostService.updateAnimal(id, animalDto);
	            return ResponseEntity.ok(updatedAnimal);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteAnimal(@PathVariable int id) {
	        animalPostService.deleteAnimal(id);
	        return ResponseEntity.noContent().build();
	    }
	
	  
	    @GetMapping("/species/{species}")
	    public ResponseEntity<List<Animal>> getAnimalsBySpecies(@PathVariable int species) {
	        List<Animal> animals = animalPostService.getAnimalsBySpecies(species);
	        return ResponseEntity.ok(animals);
	    }

	
	    @GetMapping("/gender/{gender}")
	    public ResponseEntity<List<Animal>> getAnimalsByGender(@PathVariable String gender) {
	        List<Animal> animals = animalPostService.getAnimalsByGender(gender);
	        return ResponseEntity.ok(animals);
	    }	
	
	  
	
	    @GetMapping("/location/{location}")
	    public ResponseEntity<List<Animal>> getAnimalsByLocation(@PathVariable String location) {
	        List<Animal> animals = animalPostService.getAnimalsByLocation(location);
	        return ResponseEntity.ok(animals);
	    }
	
	    @GetMapping("/owner/{ownerId}")
	    public ResponseEntity<List<Animal>> getAnimalsByOwnerId(@PathVariable int ownerId) {
	        List<Animal> animals = animalPostService.getAnimalsByOwnerId(ownerId);
	        return ResponseEntity.ok(animals);
	    }
	}
