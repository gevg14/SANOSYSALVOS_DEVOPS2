package com.sanosysalvos.historial.model;

import jakarta.persistence.*;

@Entity
@Table(name = "historiales")
public class FichaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long mascotaId;

    @Column(nullable = false, length = 100)
    private String diagnostico;

    @Column(nullable = false, length = 255)
    private String tratamiento;

    public FichaMedica() {}

    public FichaMedica(Long mascotaId, String diagnostico, String tratamiento) {
        this.mascotaId = mascotaId;
        this.diagnostico = diagnostico;
        this.tratamiento = tratamiento;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMascotaId() { return mascotaId; }
    public void setMascotaId(Long mascotaId) { this.mascotaId = mascotaId; }
    public String getDiagnostico() { return diagnostico; }
    public void setDiagnostico(String diagnostico) { this.diagnostico = diagnostico; }
    public String getTratamiento() { return tratamiento; }
    public void setTratamiento(String tratamiento) { this.tratamiento = tratamiento; }
}