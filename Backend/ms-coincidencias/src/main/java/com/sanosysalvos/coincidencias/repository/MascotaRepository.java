package com.sanosysalvos.coincidencias.repository;

import com.sanosysalvos.coincidencias.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de persistencia JPA para el manejo del inventario animal.
 */
@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {
}