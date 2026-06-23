package com.sanosysalvos.donaciones.model;

import jakarta.persistence.*;

@Entity
@Table(name = "donaciones")
public class Donacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String campaña;

    @Column(nullable = false)
    private Double monto;

    @Column(nullable = false, length = 100)
    private String donanteNombre;

    public Donacion() {}

    public Donacion(String campaña, Double monto, String donanteNombre) {
        this.campaña = campaña;
        this.monto = monto;
        this.donanteNombre = donanteNombre;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCampaña() { return campaña; }
    public void setCampaña(String campaña) { this.campaña = campaña; }
    public Double getMonto() { return monto; }
    public void setMonto(Double monto) { this.monto = monto; }
    public String getDonanteNombre() { return donanteNombre; }
    public void setDonanteNombre(String donanteNombre) { this.donanteNombre = donanteNombre; }
}