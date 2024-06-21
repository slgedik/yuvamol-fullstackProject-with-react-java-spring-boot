package com.silagedik.yuvamol.dataAccess.abstracts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.silagedik.yuvamol.entities.concretes.AnimalPhotos;

public interface AnimalPhotosDao extends JpaRepository<AnimalPhotos, Integer> {
    // Belirli bir hayvana ait tüm fotoğrafları getirir
	List<AnimalPhotos> findByAnimal_AnimalId(int animalId);
	
}