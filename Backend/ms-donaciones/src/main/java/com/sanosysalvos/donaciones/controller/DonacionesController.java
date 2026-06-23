package com.sanosysalvos.donaciones.controller;

import com.sanosysalvos.donaciones.model.Donacion;
import com.sanosysalvos.donaciones.repository.DonacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST que expone la recolección de fondos para la causa animal.
 */
@RestController
@RequestMapping("/api/donaciones")
@CrossOrigin(origins = "*")
public class DonacionesController {

    @Autowired
    private DonacionRepository repository;

    /**
     * Registra un nuevo aporte monetario desde la pasarela del frontend.
     */
    @PostMapping
    public Donacion registrarDonacion(@RequestBody Donacion donacion) {
        return repository.save(donacion);
    }

    /**
     * Lista el histórico completo de donaciones para auditorías de transparencia.
     */
    @GetMapping
    public List<Donacion> listarTodas() {
        return repository.findAll();
    }
}