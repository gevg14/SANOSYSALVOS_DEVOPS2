package com.sanosysalvos.adopciones.controller;

import com.sanosysalvos.adopciones.model.Adopcion;
import com.sanosysalvos.adopciones.repository.AdopcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para exponer y administrar el flujo de adopciones.
 */
@RestController
@RequestMapping("/api/adopciones")
@CrossOrigin(origins = "*")
public class AdopcionController {

    @Autowired
    private AdopcionRepository repository;

    /**
     * Obtiene el listado completo de solicitudes registradas en el panel.
     * @return Lista con los expedientes de adopción.
     */
    @GetMapping
    public List<Adopcion> listarTodas() {
        return repository.findAll();
    }

    /**
     * Registra una nueva postulación desde el formulario público del frontend.
     */
    @PostMapping
    public Adopcion crear(@RequestBody Adopcion solicitud) {
        return repository.save(solicitud);
    }
}