package com.sanosysalvos.ms_registro_mascotas.controller;

import com.sanosysalvos.ms_registro_mascotas.model.Mascota;
import com.sanosysalvos.ms_registro_mascotas.repository.MascotaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@Tag(name = "Registro de Mascotas", description = "API para gestionar animales perdidos y encontrados")
public class MascotaController {

    @Autowired
    private MascotaRepository repository;

    @Operation(summary = "Obtener todas las mascotas registradas")
    @GetMapping
    public List<Mascota> listar() {
        return repository.findAll();
    }

    @Operation(summary = "Registrar una nueva mascota")
    @PostMapping
    public Mascota guardar(@RequestBody Mascota mascota) {
        return repository.save(mascota);
    }
}