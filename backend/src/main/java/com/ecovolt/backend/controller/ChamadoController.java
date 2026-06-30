package com.ecovolt.backend.controller;

import com.ecovolt.backend.dto.AvaliarChamadoRequest;
import com.ecovolt.backend.dto.AbrirChamadoRequest;
import com.ecovolt.backend.model.Chamado;
import com.ecovolt.backend.security.JwtUtil;
import com.ecovolt.backend.service.ChamadoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    /**
     * Lista todos os chamados de ajuste de ponto / justificativa de falta,
     * com filtros opcionais por nome do colaborador e tipo.
     * Acesso restrito a quem possui o papel ROLE_ANALISTA_PONTO ou ADMIN.
     */
    @GetMapping("/justificativas")
    public ResponseEntity<List<Chamado>> listarJustificativas(
            @RequestParam(required = false) String colaborador,
            @RequestParam(required = false) String tipo) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean isAnalistaOuAdmin = authentication.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .anyMatch(auth -> auth.contains("ADMIN") || auth.equals("ROLE_ANALISTA_PONTO"));

        if (!isAnalistaOuAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<Chamado> chamados = chamadoService.listarJustificativas(colaborador, tipo);
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