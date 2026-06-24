package com.ecovolt.backend.service;

import com.ecovolt.backend.dto.EditarPontoRequest;
import com.ecovolt.backend.dto.HistoricoPontoDTO;
import com.ecovolt.backend.model.ChamadoJustificativaFalta;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.model.Escala;
import com.ecovolt.backend.model.RegistroPonto;
import com.ecovolt.backend.repository.ChamadoJustificativaFaltaRepository;
import com.ecovolt.backend.repository.ColaboradorRepository;
import com.ecovolt.backend.repository.RegistroPontoRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

    public Map<String, Object> buscarDashboardColaborador(Long colaboradorId) {
        Colaborador colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        Map<String, Object> bancoHoras = calcularBancoHoras(colaboradorId, LocalDate.now().getMonthValue(), LocalDate.now().getYear());
        Map<String, Object> dashboard = new HashMap<>(bancoHoras);
        dashboard.put("colaborador", Map.of(
                "id", colaborador.getId(),
                "nome", colaborador.getNome(),
                "cargo", colaborador.getCargo() != null ? colaborador.getCargo().name() : "Não definido",
                "setor", colaborador.getSetor() != null ? colaborador.getSetor().name() : "Não definido",
                "equipe", colaborador.getSetor() != null ? colaborador.getSetor().name() : "Não definido",
                "papeis", colaborador.getPapeis().stream().map(p -> p.getNome().name()).toList()
        ));

        return dashboard;
    }

    public Map<String, Object> calcularBancoHoras(Long colaboradorId, int mes, int ano) {
        Colaborador colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        Escala escala = colaborador.getEscala();
        Duration cargaDiaria = Duration.between(escala.getHoraInicio(), escala.getHoraFim());

        YearMonth yearMonth = YearMonth.of(ano, mes);
        LocalDateTime inicio = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime fim = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        List<RegistroPonto> registros = registroPontoRepository
                .findByColaboradorIdAndDataHoraRegistroBetween(colaboradorId, inicio, fim);

        Duration totalTrabalhado = Duration.ZERO;
        Duration totalExtras = Duration.ZERO;
        Duration totalFaltantes = Duration.ZERO;

        LocalDateTime entradaDia = null;

        for (RegistroPonto registro : registros) {
            if (registro.getTipo() == RegistroPonto.TipoPonto.ENTRADA) {
                entradaDia = registro.getDataHoraRegistro();
            } else if (registro.getTipo() == RegistroPonto.TipoPonto.SAIDA && entradaDia != null) {
                Duration trabalhado = Duration.between(entradaDia, registro.getDataHoraRegistro());
                totalTrabalhado = totalTrabalhado.plus(trabalhado);

                if (trabalhado.compareTo(cargaDiaria) > 0) {
                    totalExtras = totalExtras.plus(trabalhado.minus(cargaDiaria));
                } else if (trabalhado.compareTo(cargaDiaria) < 0) {
                    totalFaltantes = totalFaltantes.plus(cargaDiaria.minus(trabalhado));
                }

                entradaDia = null;
            }
        }

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("colaboradorId", colaboradorId);
        resultado.put("mes", mes);
        resultado.put("ano", ano);
        resultado.put("horasTotais", formatarDuracao(totalTrabalhado));
        resultado.put("horasExtras", formatarDuracao(totalExtras));
        resultado.put("horasFaltantes", formatarDuracao(totalFaltantes));

        return resultado;
    }

    private String formatarDuracao(Duration duration) {
        long horas = duration.toHours();
        long minutos = duration.toMinutesPart();
        return String.format("%dh%02dmin", horas, minutos);
    }
}
