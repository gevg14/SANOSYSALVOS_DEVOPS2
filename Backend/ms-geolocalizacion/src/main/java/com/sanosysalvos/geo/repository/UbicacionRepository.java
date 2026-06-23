package com.sanosysalvos.geo.repository;

import com.sanosysalvos.geo.model.Ubicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para el manejo perimetral de ubicaciones.
 */
@Repository
public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {
}