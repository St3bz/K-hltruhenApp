package com.HeimProjekt.KuhltruhenApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.HeimProjekt.KuhltruhenApp.model.KuhlschrankArtikel;
import com.HeimProjekt.KuhltruhenApp.service.KuhlschrankService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("api/v1/kuhlschrank")
public class KuhlschrankController {
    
    private KuhlschrankService kuhlschrankService;

    public KuhlschrankController(KuhlschrankService kuhlschrankService) {
        this.kuhlschrankService = kuhlschrankService;
    }
    
    public ResponseEntity<?> add(@Valid @RequestBody KuhlschrankArtikel artikel) {
        try {
            return ResponseEntity.ok(kuhlschrankService.addArtikel(artikel));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding article: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<KuhlschrankArtikel> addArtikelPost(@RequestBody KuhlschrankArtikel artikel) {
        return ResponseEntity.ok(kuhlschrankService.addArtikel(artikel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KuhlschrankArtikel> updateArtikelPut(@PathVariable Long id, @RequestBody KuhlschrankArtikel updatedArtikel) {
        try {
            return ResponseEntity.ok(kuhlschrankService.update(id, updatedArtikel));
        } catch (IllegalArgumentException e) {
           return ResponseEntity.notFound().build();
        }   
    }

    @GetMapping("/{id}")
    public ResponseEntity<KuhlschrankArtikel> getArtikelById(@PathVariable Long id) {
        if (kuhlschrankService.artikelExists(id)) {
            return ResponseEntity.ok(kuhlschrankService.getArtikelById(id).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<KuhlschrankArtikel>> getAllArtikels() {
        return ResponseEntity.ok(kuhlschrankService.getAllArtikels());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (!kuhlschrankService.artikelExists(id)) {
            return ResponseEntity.notFound().build();
        } else {
            kuhlschrankService.deleteArtikel(id);
            return ResponseEntity.noContent().build();
        }
    }


}