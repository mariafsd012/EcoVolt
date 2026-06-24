package com.ecovolt.backend.controller;

import com.ecovolt.backend.dto.EditarPontoRequest;
import com.ecovolt.backend.dto.HistoricoPontoDTO;
import com.ecovolt.backend.model.ChamadoJustificativaFalta;
import com.ecovolt.backend.model.RegistroPonto;
import com.ecovolt.backend.repository.ColaboradorRepository;
import com.ecovolt.backend.security.JwtUtil;
import com.ecovolt.backend.service.DesempenhoService;
import com.ecovolt.backend.service.PontoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ponto")
public class PontoController {

    private final PontoService pontoService;
    private final DesempenhoService desempenhoService;
    private final JwtUtil jwtUtil;
    private final ColaboradorRepository colaboradorRepository;

    public PontoController(PontoService pontoService, DesempenhoService desempenhoService, JwtUtil jwtUtil, ColaboradorRepository colaboradorRepository) {
        this.pontoService = pontoService;
        this.desempenhoService = desempenhoService;
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
        // Checagem de autenticação/autorizações: permite acesso ao próprio colaborador ou a roles administrativas
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String requesterEmail = authentication.getName();
        var requesterOpt = colaboradorRepository.findByEmail(requesterEmail);
        if (requesterOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        var requester = requesterOpt.get();
        boolean isOwner = requester.getId().equals(colaboradorId);
        boolean isAdminOrAnalyst = authentication.getAuthorities().stream()
            .map(a -> a.getAuthority())
            .anyMatch(auth -> auth.contains("ADMIN") || auth.equals("ROLE_ANALISTA_PONTO"));

        if (!isOwner && !isAdminOrAnalyst) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Agora chamamos o método que retorna o DTO agrupado
        List<HistoricoPontoDTO> historicoAgrupado = pontoService.buscarHistoricoAgrupado(colaboradorId);

        var colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("colaborador", Map.of(
            "nome", colaborador.getNome(), 
            "setor", colaborador.getSetor() != null ? colaborador.getSetor() : "Não definido"
        ));

        // Retornamos a lista formatada (HistoricoPontoDTO) para o frontend
        resposta.put("registros", historicoAgrupado);

        return ResponseEntity.ok(resposta);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> obterDashboard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String requesterEmail = authentication.getName();
        var requesterOpt = colaboradorRepository.findByEmail(requesterEmail);
        if (requesterOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        var requester = requesterOpt.get();
        Map<String, Object> dashboard = pontoService.buscarDashboardColaborador(requester.getId());
        Map<String, Object> desempenho = desempenhoService.calcularDesempenho(requester.getId(), LocalDate.now().getMonthValue(), LocalDate.now().getYear());
        dashboard.put("desempenho", desempenho);
        return ResponseEntity.ok(dashboard);
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
    @GetMapping("/banco-horas/{colaboradorId}")
public ResponseEntity<Map<String, Object>> calcularBancoHoras(
        @PathVariable Long colaboradorId,
        @RequestParam int mes,
        @RequestParam int ano) {
    Map<String, Object> resultado = pontoService.calcularBancoHoras(colaboradorId, mes, ano);
    return ResponseEntity.ok(resultado);
}
}