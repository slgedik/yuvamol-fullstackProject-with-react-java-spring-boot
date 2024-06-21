package com.silagedik.yuvamol.entities.abstracts;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalPhotosDto {
	private int photoId;
    private int animalId;
   private byte[] photo;
}
