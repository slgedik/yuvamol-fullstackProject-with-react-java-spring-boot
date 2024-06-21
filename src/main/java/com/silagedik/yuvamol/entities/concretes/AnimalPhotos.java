package com.silagedik.yuvamol.entities.concretes;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="animal_photos")
@Entity
public class AnimalPhotos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int photoId;

    
    @Column(name = "photo")
    private byte[] photo;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    @JsonIgnore
    private Animal animal;

}

