package com.HeimProjekt.KuhltruhenApp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class KuhlschrankArtikel {
    
    @Id
    @GeneratedValue

    private Long id;
    private String name;
    private int menge;
    private String kategorie;
    private LocalDate haltbarkeitsdatum;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMenge() {
        return menge;
    }

    public void setMenge(int menge) {
        this.menge = menge;
    }

    public String getKategorie() {
        return kategorie;
    }

    public void setKategorie(String kategorie) {
        this.kategorie = kategorie;
    }

    public LocalDate getHaltbarkeitsdatum() {
        return haltbarkeitsdatum;
    }

    public void setHaltbarkeitsdatum(LocalDate haltbarkeitsdatum) {
        this.haltbarkeitsdatum = haltbarkeitsdatum;
    }

}
