package com.ecovolt.backend.controller;

import com.ecovolt.backend.model.RegistroPonto;
import com.ecovolt.backend.security.JwtUtil;
import com.ecovolt.backend.service.PontoService;
// ALTERE A LINHA ABAIXO SE O NOME FOR DIFERENTE NO SEU SISTEMA
import com.ecovolt.backend.repository.ColaboradorRepository; 

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.ecovolt.backend.dto.EditarPontoRequest;
import com.ecovolt.backend.model.ChamadoJustificativaFalta;

@RestController
@RequestMapping("/api/ponto")
public class PontoController {

    private final PontoService pontoService;
    private final JwtUtil jwtUtil;
    private final ColaboradorRepository colaboradorRepository; 

    public PontoController(PontoService pontoService, JwtUtil jwtUtil, ColaboradorRepository colaboradorRepository) {
        this.pontoService = pontoService;
        this.jwtUtil = jwtUtil;
        this.colaboradorRepository = colaboradorRepository;
    }

    @PostMapping("/registrar")
    public ResponseEntity<RegistroPonto> registrar(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long colaboradorId = jwtUtil.extractId(token);
        RegistroPonto registro = pontoService.registrar(colaboradorId);
        return ResponseEntity.ok(registro);
    }

    @GetMapping("/historico/{colaboradorId}")
    public ResponseEntity<Map<String, Object>> buscarHistorico(@PathVariable Long colaboradorId) {
        List<RegistroPonto> historico = pontoService.buscarHistorico(colaboradorId);
        
        // Ajustado para usar o colaboradorRepository
        var colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));
        
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("colaborador", Map.of(
            "nome", colaborador.getNome(), 
            "setor", colaborador.getSetor() != null ? colaborador.getSetor() : "Não definido"
        ));
        resposta.put("registros", historico);
        
        return ResponseEntity.ok(resposta);
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