package com.silagedik.yuvamol.business.concretes;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silagedik.yuvamol.business.abstracts.AnimalPhotosService;
import com.silagedik.yuvamol.dataAccess.abstracts.AnimalPhotosDao;
import com.silagedik.yuvamol.dataAccess.abstracts.AnimalPostDao;
import com.silagedik.yuvamol.entities.abstracts.AnimalPhotosDto;
import com.silagedik.yuvamol.entities.concretes.Animal;
import com.silagedik.yuvamol.entities.concretes.AnimalPhotos;

@Service
public class AnimalPhotosManager implements AnimalPhotosService {

    private final AnimalPhotosDao animalPhotosDao;
    private final AnimalPostDao animalPostDao;

    @Autowired
    public AnimalPhotosManager(AnimalPhotosDao animalPhotosDao, AnimalPostDao animalPostDao) {
        this.animalPhotosDao = animalPhotosDao;
        this.animalPostDao = animalPostDao;
    }

    @Override
    public List<AnimalPhotosDto> getAllPhotosByAnimalId(int animalId) {
        List<AnimalPhotos> photos = animalPhotosDao.findByAnimal_AnimalId(animalId);
        return photos.stream()
                .map(photo -> new AnimalPhotosDto(photo.getPhotoId(), photo.getAnimal().getAnimalId(), photo.getPhoto()))
                .collect(Collectors.toList());
    }

    @Override
    public AnimalPhotos addPhoto(AnimalPhotosDto animalPhotosDto) {
        Animal animal = animalPostDao.findById(animalPhotosDto.getAnimalId())
                .orElseThrow(() -> new RuntimeException("Animal not found"));
        AnimalPhotos animalPhotos = new AnimalPhotos();
        animalPhotos.setAnimal(animal);
        animalPhotos.setPhoto(animalPhotosDto.getPhoto());
        return animalPhotosDao.save(animalPhotos);
    }

    @Override
    public AnimalPhotos updatePhoto(AnimalPhotosDto animalPhotosDto) {
        AnimalPhotos existingPhoto = animalPhotosDao.findById(animalPhotosDto.getPhotoId())
                .orElseThrow(() -> new RuntimeException("Photo not found"));
        existingPhoto.setPhoto(animalPhotosDto.getPhoto());
        return animalPhotosDao.save(existingPhoto);
    }

    @Override
    public void deletePhoto(int photoId) {
        animalPhotosDao.deleteById(photoId);
    }
}
