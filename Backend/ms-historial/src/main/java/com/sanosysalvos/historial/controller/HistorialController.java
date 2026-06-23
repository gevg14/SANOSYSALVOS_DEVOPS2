package com.sanosysalvos.historial.controller;

import com.sanosysalvos.historial.model.FichaMedica;
import com.sanosysalvos.historial.repository.FichaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 🛠️ REQUISITO PDF: Controlador REST con JavaDoc estructurado.
 * Administra el ingreso de atenciones médicas veterinarias.
 */
@RestController
@RequestMapping("/api/historial")
@CrossOrigin(origins = "*")
public class HistorialController {

    @Autowired
    private FichaRepository repository;

    /**
     * Registra una nueva atención médica para una mascota atendida en Puerto Montt.
     * @param ficha Datos del diagnóstico clínico.
     * @return Ficha médica guardada de manera persistente.
     */
    @PostMapping
    public FichaRepository registrarAtencion(@RequestBody FichaRepository ficha) {
        return repository.save(ficha);
    }

    /**
     * Recupera todas las atenciones médicas previas de una mascota específica.
     * @param mascotaId Identificador de la mascota consultada.
     * @return Listado de fichas asociadas.
     */
    @GetMapping("/mascota/{mascotaId}")
    public List<FichaRepository> obtenerPorMascota(@PathVariable Long mascotaId) {
        return repository.findByMascotaId(mascotaId);
    }
}