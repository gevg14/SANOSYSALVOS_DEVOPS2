package com.sanosysalvos.notificaciones.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destinatario;
    private String mensaje;
    private String tipo; // "EMAIL", "SMS"
    private Long idCoincidencia;
    private LocalDateTime fechaEnvio;
}