package com.HeimProjekt.KuhltruhenApp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "kuhlschrank_artikel")
public class KuhlschrankArtikel {
    
    @Id
    @GeneratedValue

    private Long id;
    @NotBlank
    private String name;
    @Min(0)
    private int menge;
    public enum Kategorie{
        Obst, Gemüse, Fleisch, Fertiggerichte, Beilagen, Sonstiges
    }
    private Kategorie kategorie;
    private LocalDate haltbarkeitsdatum;

    @ManyToOne
    @JoinColumn(name = "vorrats_artikel_id")  // Adjust column name as needed
    private VorratsArtikel vorratsArtikel;

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

    public Kategorie getKategorie() {
        return kategorie;
    }

    public void setKategorie(Kategorie kategorie) {
        this.kategorie = kategorie;
    }

    public LocalDate getHaltbarkeitsdatum() {
        return haltbarkeitsdatum;
    }

    public void setHaltbarkeitsdatum(LocalDate haltbarkeitsdatum) {
        this.haltbarkeitsdatum = haltbarkeitsdatum;
    }

    @JsonIgnore
    public VorratsArtikel getVorratsArtikel() {
        return vorratsArtikel;
    }

    public void setVorratsArtikel(VorratsArtikel vorratsArtikel) {
        this.vorratsArtikel = vorratsArtikel;
    }
}
