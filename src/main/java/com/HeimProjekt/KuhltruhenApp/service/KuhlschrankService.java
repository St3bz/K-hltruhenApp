package com.HeimProjekt.KuhltruhenApp.service;

import java.util.List;
import java.util.Optional;

import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import com.HeimProjekt.KuhltruhenApp.model.KuhlschrankArtikel;
import com.HeimProjekt.KuhltruhenApp.repository.KuhlschrankRepository;

@Service
public class KuhlschrankService {

    private KuhlschrankRepository kuhlschrankRepository;

    public KuhlschrankService(KuhlschrankRepository kuhlschrankRepository) {
        this.kuhlschrankRepository = kuhlschrankRepository;
    }

    public boolean artikelExists(Long id) {
        return kuhlschrankRepository.existsById(id);
    }

    public List<KuhlschrankArtikel> findAll() {
        return kuhlschrankRepository.findAll();
    }

    public void save(KuhlschrankArtikel artikel) {
        kuhlschrankRepository.save(artikel);
    }

    public KuhlschrankArtikel update(Long id, KuhlschrankArtikel updatedArtikel) {
        if (!artikelExists(id)) {
            throw new IllegalArgumentException("Artikel with ID " + id + " not found");
        } else {
            updatedArtikel.setId(id);
            return kuhlschrankRepository.save(updatedArtikel);
        }
    }

    public void deleteArtikel(Long id) {
        if (!artikelExists(id)) {
            throw new IllegalArgumentException("Artikel with ID " + id + " not found");
        } else {
            kuhlschrankRepository.deleteById(id);
        }
    }

    public KuhlschrankArtikel addArtikel(KuhlschrankArtikel artikel) {
       return kuhlschrankRepository.save(artikel);
    }

    public List<KuhlschrankArtikel> getAllArtikels() {
        return kuhlschrankRepository.findAll();
    }

    public Optional<KuhlschrankArtikel> getArtikelById(Long id) {
        return kuhlschrankRepository.findById(id);
    }
    
}
