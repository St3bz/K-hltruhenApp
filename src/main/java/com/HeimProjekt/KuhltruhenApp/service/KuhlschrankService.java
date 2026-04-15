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
    private VorratsService vorratsService;

    public KuhlschrankService(KuhlschrankRepository kuhlschrankRepository, VorratsService vorratsService) {
        this.kuhlschrankRepository = kuhlschrankRepository;
        this.vorratsService = vorratsService;
    }

    public boolean artikelExists(Long id) {
        return kuhlschrankRepository.existsById(id);
    }

    public void save(KuhlschrankArtikel artikel) {
        kuhlschrankRepository.save(artikel);
    }

    public KuhlschrankArtikel update(Long id, KuhlschrankArtikel updatedArtikel) {
            updatedArtikel.setId(id);
            return kuhlschrankRepository.save(updatedArtikel);
    }

    public void deleteArtikel(Long id) {
            KuhlschrankArtikel artikel = kuhlschrankRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Artikel mit ID " + id + " nicht gefunden"));

            vorratsService.reduceVorrat(artikel.getVorratsArtikel(), artikel.getMenge());


            kuhlschrankRepository.deleteById(id);  
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
