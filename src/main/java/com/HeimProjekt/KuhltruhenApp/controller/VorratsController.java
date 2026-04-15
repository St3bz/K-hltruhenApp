package com.HeimProjekt.KuhltruhenApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.HeimProjekt.KuhltruhenApp.model.VorratsArtikel;
import com.HeimProjekt.KuhltruhenApp.service.VorratsService;

import jakarta.validation.Valid;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("api/v1/vorrat")
public class VorratsController {
    
    private VorratsService vorratsService;

    public VorratsController(VorratsService vorratsService) {
        this.vorratsService = vorratsService;
    }

    public ResponseEntity<?> add(@Valid @RequestBody VorratsArtikel artikel) {
        try {
            return ResponseEntity.ok(vorratsService.addArtikel(artikel));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding article: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<VorratsArtikel> addArtikelPost(@RequestBody VorratsArtikel artikel) {
        return ResponseEntity.ok(vorratsService.addArtikel(artikel));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<VorratsArtikel> updateArtikelPut(@PathVariable Long id, @RequestBody VorratsArtikel updatedArtikel) {
        try {
            return ResponseEntity.ok(vorratsService.update(id, updatedArtikel));
        } catch (IllegalArgumentException e) {
           return ResponseEntity.notFound().build();
        }   
    }

    @GetMapping
    public ResponseEntity<List<VorratsArtikel>> getAllArtikel() {
        return ResponseEntity.ok(vorratsService.getAllArtikel());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArtikel(@PathVariable Long id) {
        if (!vorratsService.artikelExists(id)) {
        return ResponseEntity.notFound().build();
    } else {
        vorratsService.deleteArtikel(id);
        return ResponseEntity.noContent().build();
    }
    }


    //sollbestand

    //aktuellen bedarf speichern

    //einkaufsliste berechen



}
