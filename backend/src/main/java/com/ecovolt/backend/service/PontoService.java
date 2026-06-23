package com.ecovolt.backend.service;

import com.ecovolt.backend.dto.EditarPontoRequest;
import com.ecovolt.backend.dto.HistoricoPontoDTO;
import com.ecovolt.backend.model.ChamadoJustificativaFalta;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.model.RegistroPonto;
import com.ecovolt.backend.repository.ChamadoJustificativaFaltaRepository;
import com.ecovolt.backend.repository.ColaboradorRepository;
import com.ecovolt.backend.repository.RegistroPontoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PontoService {

    private final RegistroPontoRepository registroPontoRepository;
    private final ColaboradorRepository colaboradorRepository;
    private final ChamadoJustificativaFaltaRepository chamadoJustificativaFaltaRepository;

    public PontoService(RegistroPontoRepository registroPontoRepository,
                        ColaboradorRepository colaboradorRepository,
                        ChamadoJustificativaFaltaRepository chamadoJustificativaFaltaRepository) {
        this.registroPontoRepository = registroPontoRepository;
        this.colaboradorRepository = colaboradorRepository;
        this.chamadoJustificativaFaltaRepository = chamadoJustificativaFaltaRepository;
    }

    public RegistroPonto registrar(Long colaboradorId) {
        Colaborador colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        LocalDateTime inicioDia = LocalDate.now().atStartOfDay();
        LocalDateTime fimDia = LocalDate.now().atTime(23, 59, 59);

        List<RegistroPonto> registrosHoje = registroPontoRepository
                .findByColaboradorIdAndDataHoraRegistroBetweenOrderByDataHoraRegistroAsc(colaboradorId, inicioDia, fimDia);

        if (registrosHoje.size() >= 4) {
            throw new RuntimeException("Limite diário de 4 registros atingido.");
        }

        RegistroPonto registro = new RegistroPonto();
        registro.setColaborador(colaborador);
        registro.setDataHoraRegistro(LocalDateTime.now());
        registro.setTipo(registrosHoje.size() % 2 == 0 ? RegistroPonto.TipoPonto.ENTRADA : RegistroPonto.TipoPonto.SAIDA);

        return registroPontoRepository.save(registro);
    }

    public List<HistoricoPontoDTO> buscarHistoricoAgrupado(Long colaboradorId) {
        List<RegistroPonto> registros = registroPontoRepository.findByColaboradorIdOrderByDataHoraRegistroAsc(colaboradorId);
        
        // Agrupa registros por data
        Map<LocalDate, List<RegistroPonto>> agrupados = registros.stream()
                .collect(Collectors.groupingBy(r -> r.getDataHoraRegistro().toLocalDate()));

        return agrupados.entrySet().stream().map(entry -> {
            List<RegistroPonto> doDia = entry.getValue();
            HistoricoPontoDTO dto = new HistoricoPontoDTO();
            dto.setData(entry.getKey().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            
            // Preenche horários conforme ordem cronológica
            if (doDia.size() > 0) dto.setEntrada1(formatarHora(doDia.get(0)));
            if (doDia.size() > 1) dto.setSaida1(formatarHora(doDia.get(1)));
            if (doDia.size() > 2) dto.setEntrada2(formatarHora(doDia.get(2)));
            if (doDia.size() > 3) dto.setSaida2(formatarHora(doDia.get(3)));
            
            return dto;
        }).sorted(Comparator.comparing(HistoricoPontoDTO::getData).reversed()).collect(Collectors.toList());
    }

    private String formatarHora(RegistroPonto r) {
        return r.getDataHoraRegistro().format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    public RegistroPonto editar(Long registroId, EditarPontoRequest request) {
        RegistroPonto registro = registroPontoRepository.findById(registroId)
                .orElseThrow(() -> new RuntimeException("Registro de ponto não encontrado"));
        if (request.getDataHoraRegistro() != null) registro.setDataHoraRegistro(request.getDataHoraRegistro());
        if (request.getTipo() != null) registro.setTipo(request.getTipo());
        return registroPontoRepository.save(registro);
    }

    public ChamadoJustificativaFalta abonarFalta(Long chamadoId) {
        ChamadoJustificativaFalta justificativa = chamadoJustificativaFaltaRepository.findByChamadoId(chamadoId)
                .orElseThrow(() -> new RuntimeException("Justificativa não encontrada"));
        justificativa.setStatus(ChamadoJustificativaFalta.StatusJustificativa.APROVADA);
        return chamadoJustificativaFaltaRepository.save(justificativa);
    }
}