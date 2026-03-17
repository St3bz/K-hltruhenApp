package com.HeimProjekt.KuhltruhenApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class VorratsArtikel {
    
    @Id
    @GeneratedValue

    private Long id;
    private String name;
    private int zielMenge;
    private int momentaneMenge;

}
