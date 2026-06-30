package com.ecovolt.backend.controller;

import com.ecovolt.backend.service.EhsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ehs")
public class EhsController {

    private final EhsService ehsService;

    public EhsController(EhsService ehsService) {
        this.ehsService = ehsService;
    }

    @GetMapping("/alocacao/atual")
    public ResponseEntity<Map<String, Object>> buscarAlocacaoAtual() {
        return ResponseEntity.ok(ehsService.buscarAlocacaoAtual());
    }

    @GetMapping("/treinamentos/realizados")
    public ResponseEntity<List<Map<String, Object>>> listarTreinamentosRealizados() {
        return ResponseEntity.ok(ehsService.listarTreinamentosRealizados());
    }

    @GetMapping("/treinamentos/pendentes")
    public ResponseEntity<List<Map<String, Object>>> listarTreinamentosPendentes() {
        return ResponseEntity.ok(ehsService.listarTreinamentosPendentes());
    }

    @GetMapping("/alocacoes")
    public ResponseEntity<List<Map<String, Object>>> listarUltimasAlocacoes(
            @RequestParam(defaultValue = "3") int limite) {
        return ResponseEntity.ok(ehsService.listarUltimasAlocacoes(limite));
    }
}
