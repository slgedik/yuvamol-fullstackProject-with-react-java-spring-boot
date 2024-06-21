package com.silagedik.yuvamol.api.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.silagedik.yuvamol.business.abstracts.AnimalPhotosService;
import com.silagedik.yuvamol.entities.abstracts.AnimalPhotosDto;
import com.silagedik.yuvamol.entities.concretes.AnimalPhotos;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api/animal-photos")
@CrossOrigin
public class AnimalPhotosController {

    private final AnimalPhotosService animalPhotosService;

    @Autowired
    public AnimalPhotosController(AnimalPhotosService animalPhotosService) {
        this.animalPhotosService = animalPhotosService;
    }

    @PostMapping("/add")
    public ResponseEntity<AnimalPhotos> addPhoto(@RequestParam("animalId") int animalId, @RequestParam("photo") MultipartFile photo) throws IOException {
        AnimalPhotosDto animalPhotosDto = new AnimalPhotosDto();
        animalPhotosDto.setAnimalId(animalId);
        animalPhotosDto.setPhoto(photo.getBytes());
        AnimalPhotos newPhoto = animalPhotosService.addPhoto(animalPhotosDto);
        return ResponseEntity.ok(newPhoto);
    }
    
    @PutMapping("/update/{photoId}")
    public ResponseEntity<AnimalPhotos> updatePhoto(@PathVariable int photoId, @RequestParam("photo") MultipartFile photo) throws IOException {
        AnimalPhotosDto animalPhotosDto = new AnimalPhotosDto();
        animalPhotosDto.setPhotoId(photoId);
        animalPhotosDto.setPhoto(photo.getBytes());
        AnimalPhotos updatedPhoto = animalPhotosService.updatePhoto(animalPhotosDto);
        return ResponseEntity.ok(updatedPhoto);
    }
    
    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhoto(@PathVariable int photoId) {
        animalPhotosService.deletePhoto(photoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AnimalPhotosDto>> getAllPhotosByAnimalId(@PathVariable int animalId) {
        List<AnimalPhotosDto> photos = animalPhotosService.getAllPhotosByAnimalId(animalId);
        return ResponseEntity.ok(photos);
    }
    

    
}
