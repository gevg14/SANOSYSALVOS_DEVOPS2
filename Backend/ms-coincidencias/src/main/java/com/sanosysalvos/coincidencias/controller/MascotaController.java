package com.sanosysalvos.coincidencias.controller;

import com.sanosysalvos.coincidencias.model.Mascota;
import com.sanosysalvos.coincidencias.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST que habilita las acciones del CRUD interactivo del panel.
 */
@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "*")
public class MascotaController {

    @Autowired
    private MascotaRepository repository;

    @GetMapping
    public List<Mascota> listarTodas() {
        return repository.findAll();
    }

    @PostMapping
    public Mascota registrar(@RequestBody Mascota mascota) {
        return repository.save(mascota);
    }

    // ... dentro de la clase MascotaController, modifica el PUT:
    @PutMapping("/{id}")
    public Mascota actualizar(@PathVariable Long id, @RequestBody Mascota datosActualizados) {
        return repository.findById(id)
                .map(m -> {
                    m.setNombre(datosActualizados.getNombre());
                    m.setEspecie(datosActualizados.getEspecie());
                    m.setEstado(datosActualizados.getEstado());
                    m.setZona(datosActualizados.getZona());
                    m.setImagenUrl(datosActualizados.getImagenUrl()); // 👈 Sincronizar imagen
                    return repository.save(m);
                }).orElseThrow(() -> new RuntimeException("Mascota no encontrada con ID: " + id));
    }
}