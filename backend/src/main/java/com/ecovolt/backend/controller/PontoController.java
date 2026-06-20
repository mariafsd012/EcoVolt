package com.ecovolt.backend.controller;

import com.ecovolt.backend.model.RegistroPonto;
import com.ecovolt.backend.security.JwtUtil;
import com.ecovolt.backend.service.PontoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.ecovolt.backend.dto.EditarPontoRequest;
import com.ecovolt.backend.model.ChamadoJustificativaFalta;

@RestController
@RequestMapping("/api/ponto")
public class PontoController {

    private final PontoService pontoService;
    private final JwtUtil jwtUtil;

    public PontoController(PontoService pontoService, JwtUtil jwtUtil) {
        this.pontoService = pontoService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/registrar")
    public ResponseEntity<RegistroPonto> registrar(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long colaboradorId = jwtUtil.extractId(token);
        RegistroPonto registro = pontoService.registrar(colaboradorId);
        return ResponseEntity.ok(registro);
    }

    @GetMapping("/historico/{colaboradorId}")
    public ResponseEntity<List<RegistroPonto>> buscarHistorico(@PathVariable Long colaboradorId) {
        List<RegistroPonto> historico = pontoService.buscarHistorico(colaboradorId);
        return ResponseEntity.ok(historico);
    }

    @PutMapping("/{registroId}/editar")
public ResponseEntity<RegistroPonto> editar(@PathVariable Long registroId,
                                             @RequestBody EditarPontoRequest request) {
    RegistroPonto registro = pontoService.editar(registroId, request);
    return ResponseEntity.ok(registro);
}

@PutMapping("/abonar/{chamadoId}")
public ResponseEntity<ChamadoJustificativaFalta> abonarFalta(@PathVariable Long chamadoId) {
    ChamadoJustificativaFalta justificativa = pontoService.abonarFalta(chamadoId);
    return ResponseEntity.ok(justificativa);
}
}