package com.sanosysalvos.reportes.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> crearReporteMascota(
            @RequestParam(value = "nombre", required = false) String nombre,
            @RequestParam("especie") String especie,
            @RequestParam("color") String color,
            @RequestParam("tamano") String tamano,
            @RequestParam("foto") MultipartFile foto) {

        Map<String, Object> response = new HashMap<>();
        try {
            // Captura del archivo físico cargado desde el explorador del usuario
            String nombreOriginalFoto = foto.getOriginalFilename();
            long tamanoBytes = foto.getSize();

            // Mensajes de trazabilidad para lucirte mostrando la consola en vivo
            System.out.println("=============================================");
            System.out.println("📥 FORMULARIO MULTIPART RECIBIDO CON ÉXITO");
            System.out.println("Mascota: " + especie + " (Color: " + color + ")");
            System.out.println("Archivo capturado: " + nombreOriginalFoto + " (" + tamanoBytes + " bytes)");
            System.out.println("=============================================");

            response.put("success", true);
            response.put("message", "Reporte de " + especie + " procesado de forma transparente.");
            response.put("fotoRecibida", nombreOriginalFoto);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno al procesar el stream binario: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}