package com.HeimProjekt.KuhltruhenApp.service;

import java.util.List;
import java.util.Optional;

import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import com.HeimProjekt.KuhltruhenApp.model.VorratsArtikel;
import com.HeimProjekt.KuhltruhenApp.repository.VorratsRepository;

import jakarta.validation.Valid;

@Service
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

    public boolean artikelExists(Long id) {
        return vorratsRepository.existsById(id);
    }

    //public void reduceStock(Object vorratsArtikel, Object quantity) {
    //    int currentMenge = vorratsArtikel.getMomentaneMenge();
    //    vorratsArtikel.setMomentaneMenge(currentMenge - quantity);
    //    vorratsRepository.save(vorratsArtikel);
    //}
    
    public List<VorratsArtikel> getEinkaufsliste() {
        return vorratsRepository.findAll().stream()
        .filter(a -> a.getMomentaneMenge() < a.getZielMenge())
        .toList();
    }

    public void reduceVorrat(Object name, int amount) {
    Optional<VorratsArtikel> optional = vorratsRepository.findAll().stream()
        .filter(a -> a.getName().equalsIgnoreCase((String) name))
        .findFirst();

    if (optional.isPresent()) {
        VorratsArtikel artikel = optional.get();
        artikel.setMomentaneMenge(
            Math.max(0, artikel.getMomentaneMenge() - amount)
        );
        vorratsRepository.save(artikel);
    }
}

}
