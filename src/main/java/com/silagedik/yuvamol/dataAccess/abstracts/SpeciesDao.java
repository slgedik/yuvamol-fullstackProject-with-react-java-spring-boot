package com.silagedik.yuvamol.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;

import com.silagedik.yuvamol.entities.concretes.Species;

public interface SpeciesDao extends JpaRepository<Species, Integer> {
}
