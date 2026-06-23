package com.sanosysalvos.geo.controller;

import com.sanosysalvos.geo.model.Ubicacion;
import com.sanosysalvos.geo.repository.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para mapear las coordenadas en tiempo real sobre los planos.
 */
@RestController
@RequestMapping("/api/geolocalizacion")
@CrossOrigin(origins = "*")
public class UbicacionController {

    @Autowired
    private UbicacionRepository repository;

    /**
     * Retorna todos los marcadores geográficos activos para alimentar el mapa interactivo.
     */
    @GetMapping
    public List<Ubicacion> obtenerPuntos() {
        return repository.findAll();
    }

    /**
     * Guarda un nuevo punto de referencia espacial al reportar una mascota.
     */
    @PostMapping
    public Ubicacion guardarPunto(@RequestBody Ubicacion punto) {
        return repository.save(punto);
    }
}