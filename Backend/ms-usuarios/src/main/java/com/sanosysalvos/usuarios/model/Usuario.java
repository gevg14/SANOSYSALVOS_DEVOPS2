package com.sanosysalvos.usuarios.model;

import jakarta.persistence.*;

/**
 * Entidad que representa a un usuario dentro del ecosistema de Sanos y Salvos.
 */
@Entity
@Table(name = "usuarios")
@NamedStoredProcedureQuery(
        name = "Usuario.sp_buscar_usuario_por_email",
        procedureName = "sp_buscar_usuario_por_email",
        parameters = {
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_email", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.OUT, name = "p_id", type = Long.class)
        }
)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    public Usuario() {}

    public Usuario(String nombre, String email, String password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}