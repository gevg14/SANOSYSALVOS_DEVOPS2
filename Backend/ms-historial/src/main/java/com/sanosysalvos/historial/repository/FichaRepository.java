package com.sanosysalvos.historial.repository;

import com.sanosysalvos.historial.model.FichaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para gestionar las consultas y persistencia de fichas clínicas.
 */
@Repository
public interface FichaRepository extends JpaRepository<FichaRepository, Long> {
    List<FichaRepository> findByMascotaId(Long mascotaId);
}