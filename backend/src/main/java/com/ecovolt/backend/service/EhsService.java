package com.ecovolt.backend.service;

import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.repository.ColaboradorRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EhsService {

    private final ColaboradorRepository colaboradorRepository;

    public EhsService(ColaboradorRepository colaboradorRepository) {
        this.colaboradorRepository = colaboradorRepository;
    }

    private Colaborador buscarColaboradorLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuário não autenticado");
        }

        return colaboradorRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));
    }

    public Map<String, Object> buscarAlocacaoAtual() {
        Colaborador colaborador = buscarColaboradorLogado();

        return Map.of(
            "nome", colaborador.getNome(),
            "sublocal", colaborador.getSetor() != null ? colaborador.getSetor().name() : "Campo",
            "localizacao", "Unidade de Campo",
            "periodo", LocalDate.now().getMonth() + " de " + LocalDate.now().getYear(),
            "equipe", "Equipe de Campo",
            "atividade", "Visita Técnica",
            "status", "Em campo"
        );
    }

    public List<Map<String, Object>> listarTreinamentosRealizados() {
        buscarColaboradorLogado();
        return List.of(
            Map.of("id", 1, "nome", "Segurança em campo", "validade", "2026-12-31"),
            Map.of("id", 2, "nome", "Primeiros Socorros", "validade", "2027-03-05")
        );
    }

    public List<Map<String, Object>> listarTreinamentosPendentes() {
        buscarColaboradorLogado();
        return List.of(
            Map.of("id", 1, "nome", "Treinamento de Altura", "prazo", "15/07/2026"),
            Map.of("id", 2, "nome", "Proteção Individual", "prazo", "22/07/2026")
        );
    }

    public List<Map<String, Object>> listarUltimasAlocacoes(int limite) {
        buscarColaboradorLogado();
        return List.of(
            Map.of("id", 1, "nome", "Manutenção Subestação", "local", "Sítio Alto", "periodo", "10 - 12 Jul"),
            Map.of("id", 2, "nome", "Auditoria de Rede", "local", "Fazenda Solar", "periodo", "02 - 04 Jul"),
            Map.of("id", 3, "nome", "Inspeção de Linha", "local", "Parque Eólico", "periodo", "25 - 27 Jun")
        ).stream().limit(limite).collect(Collectors.toList());
    }
}
