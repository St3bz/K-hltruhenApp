package com.HeimProjekt.KuhltruhenApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HeimProjekt.KuhltruhenApp.model.VorratsArtikel;

public interface VorratsRepository 
    extends JpaRepository<VorratsArtikel, Long> {

} 
