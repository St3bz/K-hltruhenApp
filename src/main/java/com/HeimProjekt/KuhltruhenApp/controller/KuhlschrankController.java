package com.HeimProjekt.KuhltruhenApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.HeimProjekt.KuhltruhenApp.model.KuhlschrankArtikel;
import com.HeimProjekt.KuhltruhenApp.service.KuhlschrankService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("api/v1/kuhlschrank")
public class KuhlschrankController {
    
    private KuhlschrankService kuhlschrankService;

    String redirect = "redirect:/kuhlschrank";

    public KuhlschrankController(KuhlschrankService kuhlschrankService) {
        this.kuhlschrankService = kuhlschrankService;
    }

    
    
    @PostMapping
    public ResponseEntity<KuhlschrankArtikel> addArtikelPost(@RequestBody KuhlschrankArtikel artikel) {
        return ResponseEntity.ok(kuhlschrankService.addArtikel(artikel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KuhlschrankArtikel> updateArtikelPut(@PathVariable Long id, @RequestBody KuhlschrankArtikel updatedArtikel) {
        return ResponseEntity.ok(kuhlschrankService.update(id, updatedArtikel));
    }


    @GetMapping("/id")
    public ResponseEntity<KuhlschrankArtikel> getArtikelById(@RequestParam Long id) {
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


    @DeleteMapping
    public ResponseEntity<String> delete(@RequestBody Long id) {
        if (!kuhlschrankService.artikelExists(id)) {
            return ResponseEntity.notFound().build();
        } else {
            kuhlschrankService.deleteArtikel(id);
            return ResponseEntity.ok("Artikel deleted successfully");
        }
    }


}