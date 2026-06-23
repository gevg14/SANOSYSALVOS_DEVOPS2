package com.sanosysalvos.coincidencias.model;

import jakarta.persistence.*;

/**
 * Entidad que representa a un animal dentro del refugio o reportado en la calle.
 */
@Entity
@Table(name = "mascotas")
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(nullable = false, length = 30)
    private String especie;

    @Column(nullable = false, length = 50)
    private String estado;

    @Column(nullable = false, length = 100)
    private String zona;

    @Column(name = "imagen_url", nullable = true, length = 255)
    private String imagenUrl;

    // Constructor vacio obligatorio para el funcionamiento de JPA
    public Mascota() {}

    // Constructor sin imagen (Mantiene compatibilidad con tus pruebas unitarias de repositorio)
    public Mascota(String nombre, String especie, String estado, String zona) {
        this.nombre = nombre;
        this.especie = especie;
        this.estado = estado;
        this.zona = zona;
    }

    // Constructor completo con ruta de imagen incorporada
    public Mascota(String nombre, String especie, String estado, String zona, String imagenUrl) {
        this.nombre = nombre;
        this.especie = especie;
        this.estado = estado;
        this.zona = zona;
        this.imagenUrl = imagenUrl;
    }

    // ==========================================
    // GETTERS Y SETTERS (Bloque de Acceso Obligatorio)
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getZona() {
        return zona;
    }

    public void setZona(String zona) {
        this.zona = zona;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
}