package com.HeimProjekt.KuhltruhenApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HeimProjekt.KuhltruhenApp.model.KuhlschrankArtikel;

public interface KuhlschrankRepository
        extends JpaRepository<KuhlschrankArtikel, Long> {

} 
