package com.HeimProjekt.KuhltruhenApp.service;

import java.util.List;

import org.jspecify.annotations.Nullable;

import com.HeimProjekt.KuhltruhenApp.model.VorratsArtikel;
import com.HeimProjekt.KuhltruhenApp.repository.VorratsRepository;

import jakarta.validation.Valid;

public class VorratsService {
    
    private VorratsRepository vorratsRepository;

    public VorratsService(VorratsRepository vorratsRepository) {
        this.vorratsRepository = vorratsRepository;
    }

    public void safe (VorratsArtikel artikel) {
        vorratsRepository.save(artikel);
    }

    public VorratsArtikel update(Long id, VorratsArtikel updatedArtikel) {
        updatedArtikel.setId(id);
        return vorratsRepository.save(updatedArtikel);
    }

    public VorratsArtikel addArtikel(VorratsArtikel artikel) {
        return vorratsRepository.save(artikel);
    }

    public List<VorratsArtikel> getAllArtikel() {
        return vorratsRepository.findAll();
    }

    public void deleteArtikel(Long id) {
        vorratsRepository.deleteById(id);
    }
    


}
