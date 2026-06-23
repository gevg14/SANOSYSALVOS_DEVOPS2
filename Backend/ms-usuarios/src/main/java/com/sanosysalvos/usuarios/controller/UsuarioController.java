package com.sanosysalvos.usuarios.controller;

import com.sanosysalvos.usuarios.model.Usuario;
import com.sanosysalvos.usuarios.service.UsuarioService;
import com.sanosysalvos.usuarios.security.JwtTokenProvider; // 👈 Importamos tu nuevo componente
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate; // 👈 NUEVO IMPORT
import com.sanosysalvos.usuarios.config.RabbitMQConfig;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST encargado de exponer los servicios de autenticacion real al Frontend.
 */
@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider; // 👈 Inyectamos el generador de tokens

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Usuario usuarioAutenticado = usuarioService.autenticarUsuario(email, password);
        String token = jwtTokenProvider.generarToken(usuarioAutenticado.getEmail());

        // 🚀 EVENTO ASÍNCRONO: Despachamos la alerta a la cola sin retrasar la respuesta HTTP
        String mensajeEvento = "¡Alerta de Seguridad! El usuario " + usuarioAutenticado.getEmail() + " ha ingresado al sistema.";
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_NOTIFICACIONES, mensajeEvento);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Autenticacion exitosa. Token emitido.");
        response.put("token", token);

        Map<String, Object> perfilUsuario = new HashMap<>();
        perfilUsuario.put("id", usuarioAutenticado.getId());
        perfilUsuario.put("nombre", usuarioAutenticado.getNombre());
        perfilUsuario.put("email", usuarioAutenticado.getEmail());
        response.put("usuario", perfilUsuario);

        return ResponseEntity.ok(response);
    }
}