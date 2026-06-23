package com.sanosysalvos.ms_registro_mascotas.repository;

import com.sanosysalvos.ms_registro_mascotas.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    // Aquí podrías crear métodos para buscar por color o raza más adelante
}