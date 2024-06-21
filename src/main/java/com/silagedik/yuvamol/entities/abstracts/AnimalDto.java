package com.silagedik.yuvamol.entities.abstracts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalDto {
    private String animalName;
    private String breed;
    private int age;
    private String gender;
    private String healthStatus;
    private String description;
    private String location;
    private int speciesId;
    private int ownerId;
}
