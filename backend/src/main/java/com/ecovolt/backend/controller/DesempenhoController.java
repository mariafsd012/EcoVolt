package com.ecovolt.backend.controller;

import com.ecovolt.backend.service.DesempenhoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/desempenho")
public class DesempenhoController {

    private final DesempenhoService desempenhoService;

    public DesempenhoController(DesempenhoService desempenhoService) {
        this.desempenhoService = desempenhoService;
    }

    @GetMapping("/{colaboradorId}")
    public ResponseEntity<Map<String, Object>> calcularDesempenho(
            @PathVariable Long colaboradorId,
            @RequestParam int mes,
            @RequestParam int ano) {
        Map<String, Object> resultado = desempenhoService.calcularDesempenho(colaboradorId, mes, ano);
        return ResponseEntity.ok(resultado);
    }
}