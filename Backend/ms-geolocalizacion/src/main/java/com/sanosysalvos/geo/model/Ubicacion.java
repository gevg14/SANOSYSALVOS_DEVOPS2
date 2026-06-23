package com.sanosysalvos.geo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ubicaciones")
public class Ubicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String sector;

    @Column(nullable = false)
    private Double latitud;

    @Column(nullable = false)
    private Double longitud;

    public Ubicacion() {}

    public Ubicacion(String sector, Double latitud, Double longitud) {
        this.sector = sector;
        this.latitud = latitud;
        this.longitud = longitud; // Nota: corregido en map de variables
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public Double getLatitud() { return latitud; }
    public void setLatitud(Double latitud) { this.latitud = latitud; }
    public Double getLongitud() { return longitud; }
    public void setLongitud(Double longitud) { this.longitud = longitud; }
}