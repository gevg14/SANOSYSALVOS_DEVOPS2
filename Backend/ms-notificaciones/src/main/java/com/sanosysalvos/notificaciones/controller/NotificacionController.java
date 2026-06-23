package com.sanosysalvos.notificaciones.controller;

import com.sanosysalvos.notificaciones.model.Notificacion;
import com.sanosysalvos.notificaciones.repository.NotificacionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
@Tag(name = "Notificaciones", description = "Simulación y registro de alertas enviadas")
public class NotificacionController {

    @Autowired
    private NotificacionRepository repository;

    @Operation(summary = "Enviar y guardar una notificación")
    @PostMapping("/enviar")
    public Notificacion enviar(@RequestBody Notificacion notificacion) {
        // 1. Simulación de envío (Lógica de negocio)
        System.out.println("----------------------------------------------");
        System.out.println("SIMULANDO ENVÍO DE " + notificacion.getTipo());
        System.out.println("PARA: " + notificacion.getDestinatario());
        System.out.println("MENSAJE: " + notificacion.getMensaje());
        System.out.println("----------------------------------------------");

        // 2. Preparar datos para almacenamiento
        notificacion.setFechaEnvio(LocalDateTime.now());

        // 3. Guardar en historial
        return repository.save(notificacion);
    }

    @Operation(summary = "Ver historial de notificaciones enviadas")
    @GetMapping("/historial")
    public List<Notificacion> verHistorial() {
        return repository.findAll();
    }
}