package com.ecovolt.backend.controller;

import com.ecovolt.backend.dto.AvaliarChamadoRequest;
import com.ecovolt.backend.dto.AbrirChamadoRequest;
import com.ecovolt.backend.model.Chamado;
import com.ecovolt.backend.security.JwtUtil;
import com.ecovolt.backend.service.ChamadoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chamados")
public class ChamadoController {

    private final ChamadoService chamadoService;
    private final JwtUtil jwtUtil;

    public ChamadoController(ChamadoService chamadoService, JwtUtil jwtUtil) {
        this.chamadoService = chamadoService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/abrir")
    public ResponseEntity<Chamado> abrir(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody AbrirChamadoRequest request) {
        String token = authHeader.substring(7);
        Long colaboradorId = jwtUtil.extractId(token);
        Chamado chamado = chamadoService.abrir(colaboradorId, request);
        return ResponseEntity.ok(chamado);
    }

    @GetMapping("/{colaboradorId}")
    public ResponseEntity<List<Chamado>> listar(@PathVariable Long colaboradorId) {
        List<Chamado> chamados = chamadoService.listarPorColaborador(colaboradorId);
        return ResponseEntity.ok(chamados);
    }

    @PutMapping("/{chamadoId}/avaliar")
    public ResponseEntity<Chamado> avaliar(@PathVariable Long chamadoId, @RequestHeader("Authorization") String authHeader, @RequestBody AvaliarChamadoRequest request){

        String token = authHeader.substring(7);
        Long analistaId = jwtUtil.extractId(token);
        Chamado chamado = chamadoService.avaliar(chamadoId, analistaId, request);
        return ResponseEntity.ok(chamado);
    }
}