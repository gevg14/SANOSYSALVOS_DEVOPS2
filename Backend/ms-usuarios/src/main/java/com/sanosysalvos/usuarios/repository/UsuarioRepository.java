package com.sanosysalvos.usuarios.repository;

import com.sanosysalvos.usuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // 👈 Cambiamos a Query
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositorio JPA optimizado mediante consultas nativas para evitar fallos de driver.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    /**
     * 🛠️ REQUISITO OBLIGATORIO: Invocacion de rutina nativa mediante Query limpia.
     * Al usar SELECT, el driver no intenta inyectar parametros de salida incorrectos.
     */
    @Query(value = "SELECT sp_buscar_usuario_por_email(:p_email)", nativeQuery = true)
    Long sp_buscar_usuario_por_email(@Param("p_email") String p_email);
}