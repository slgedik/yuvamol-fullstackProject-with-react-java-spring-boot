package com.silagedik.yuvamol.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.silagedik.yuvamol.business.abstracts.SpeciesService;
import com.silagedik.yuvamol.entities.concretes.Species;

@RestController
@RequestMapping("/api/species")
@CrossOrigin 
public class SpeciesController {
	private SpeciesService speciesService;
	@Autowired
	public SpeciesController(SpeciesService speciesService) {
		this.speciesService = speciesService;
	}


    /*@GetMapping("/all")
    public ResponseEntity<List<Species>> getAllSpecies() {
        List<Species> species = speciesService.getAllSpecies();
        return ResponseEntity.ok(species);
    }
    */
    @GetMapping("/all")
    public ResponseEntity<?> getAllSpecies() {
        try {
            List<Species> species = speciesService.getAllSpecies();
            return ResponseEntity.ok(species);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving species: " + e.getMessage());
        }
    }

}
