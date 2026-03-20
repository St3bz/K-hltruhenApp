package com.HeimProjekt.KuhltruhenApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
public class VorratsArtikel {
    
    @Id
    @GeneratedValue

    private Long id;
    @NotBlank
    private String name;
    @Min(0)
    private int zielMenge;
    @Min(0)
    private int momentaneMenge;

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

    public int getZielMenge() {
        return zielMenge;
    }

    public void setZielMenge(int zielMenge) {
        this.zielMenge = zielMenge;
    }

    public int getMomentaneMenge() {
        return momentaneMenge;
    }

    public void setMomentaneMenge(int momentaneMenge) {
        this.momentaneMenge = momentaneMenge;
    }

}
