package com.silagedik.yuvamol.business.abstracts;


import java.util.List;

import com.silagedik.yuvamol.entities.abstracts.AnimalPhotosDto;
import com.silagedik.yuvamol.entities.concretes.AnimalPhotos;

public interface AnimalPhotosService {
    List<AnimalPhotosDto> getAllPhotosByAnimalId(int animalId);
    AnimalPhotos addPhoto(AnimalPhotosDto animalPhotosDto);
    AnimalPhotos updatePhoto(AnimalPhotosDto animalPhotosDto); // Güncelleme metodu
    void deletePhoto(int photoId); // Silme metodu
}
