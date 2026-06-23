package com.sanosysalvos.adopciones.model;

import jakarta.persistence.*;

@Entity
@Table(name = "adopciones")
public class Adopcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long mascotaId;

    @Column(nullable = false, length = 100)
    private String adoptanteNombre;

    @Column(nullable = false, length = 100)
    private String adoptanteEmail;

    @Column(nullable = false, length = 50)
    private String estado;

    public Adopcion() {}

    public Adopcion(Long mascotaId, String adoptanteNombre, String adoptanteEmail, String estado) {
        this.mascotaId = mascotaId;
        this.adoptanteNombre = adoptanteNombre;
        this.adoptanteEmail = adoptanteEmail;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMascotaId() { return mascotaId; }
    public void setMascotaId(Long mascotaId) { this.mascotaId = mascotaId; }
    public String getAdoptanteNombre() { return adoptanteNombre; }
    public void setAdoptanteNombre(String adoptanteNombre) { this.adoptanteNombre = adoptanteNombre; }
    public String getAdoptanteEmail() { return adoptanteEmail; }
    public void setAdoptanteEmail(String adoptanteEmail) { this.adoptanteEmail = adoptanteEmail; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}