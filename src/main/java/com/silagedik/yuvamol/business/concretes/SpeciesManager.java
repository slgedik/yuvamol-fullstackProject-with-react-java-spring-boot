package com.silagedik.yuvamol.business.concretes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.silagedik.yuvamol.business.abstracts.SpeciesService;
import com.silagedik.yuvamol.dataAccess.abstracts.SpeciesDao;
import com.silagedik.yuvamol.entities.concretes.Species;

@Service
public class SpeciesManager implements SpeciesService {
	
	private SpeciesDao speciesDao;
	@Autowired
	public SpeciesManager(SpeciesDao speciesDao) {
		super();
		this.speciesDao = speciesDao;
	}
	@Override
	public List<Species> getAllSpecies() {
		return speciesDao.findAll();
	}

}
