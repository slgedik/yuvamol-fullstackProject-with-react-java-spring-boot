package com.silagedik.yuvamol.entities.concretes;



import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="animals")
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Animal {
	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int animalId;
	
	@Column(name = "name")
	private String animalName;
	
	@Column(name = "breed")
	private String breed;
	
	@Column(name = "age")
	private int age;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "health_status")
	private String healthStatus;

	@Column(name = "description")
	private String description;
	
	@Column(name = "location")
	private String location;
	
	@ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
	@JsonIgnore
	private User owner;
	
	@ManyToOne()
	@JoinColumn(name= "species_id", nullable = false)
	@JsonIgnore
	private Species species;
	
	@OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<AnimalPhotos> photos; 
	
	 @Transient
	    public int getSpeciesId() {
	        return species != null ? species.getSpeciesId() : 0;
	    }

	 @Transient
	   public int getOwnerId() {
	       return owner != null ? owner.getId() : 0;
	   }

}
