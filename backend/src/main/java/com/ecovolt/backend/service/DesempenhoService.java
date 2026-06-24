package com.ecovolt.backend.service;

import com.ecovolt.backend.model.*;
import com.ecovolt.backend.repository.*;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DesempenhoService {

    private final RegistroPontoRepository registroPontoRepository;
    private final ColaboradorRepository colaboradorRepository;
    private final ChamadoRepository chamadoRepository;
    private final ChamadoJustificativaFaltaRepository justificativaFaltaRepository;

    public DesempenhoService(RegistroPontoRepository registroPontoRepository,
                              ColaboradorRepository colaboradorRepository,
                              ChamadoRepository chamadoRepository,
                              ChamadoJustificativaFaltaRepository justificativaFaltaRepository) {
        this.registroPontoRepository = registroPontoRepository;
        this.colaboradorRepository = colaboradorRepository;
        this.chamadoRepository = chamadoRepository;
        this.justificativaFaltaRepository = justificativaFaltaRepository;
    }

    public Map<String, Object> calcularDesempenho(Long colaboradorId, int mes, int ano) {
        Colaborador colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        Escala escala = colaborador.getEscala();
        Duration cargaDiaria = Duration.between(escala.getHoraInicio(), escala.getHoraFim());

        YearMonth yearMonth = YearMonth.of(ano, mes);
        LocalDateTime inicio = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime fim = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        List<RegistroPonto> registros = registroPontoRepository
                .findByColaboradorIdAndDataHoraRegistroBetween(colaboradorId, inicio, fim);

        int diasTrabalhados = 0;
        int atrasos = 0;
        Duration totalExtras = Duration.ZERO;
        LocalDateTime entradaDia = null;

        for (RegistroPonto registro : registros) {
            if (registro.getTipo() == RegistroPonto.TipoPonto.ENTRADA) {
                entradaDia = registro.getDataHoraRegistro();

                LocalDateTime horaEsperada = entradaDia.toLocalDate()
                        .atTime(escala.getHoraInicio());
                Duration atraso = Duration.between(horaEsperada, entradaDia);
                if (atraso.toMinutes() > 15) {
                    atrasos++;
                }

            } else if (registro.getTipo() == RegistroPonto.TipoPonto.SAIDA && entradaDia != null) {
                diasTrabalhados++;
                Duration trabalhado = Duration.between(entradaDia, registro.getDataHoraRegistro());
                if (trabalhado.compareTo(cargaDiaria) > 0) {
                    totalExtras = totalExtras.plus(trabalhado.minus(cargaDiaria));
                }
                entradaDia = null;
            }
        }

        List<Chamado> chamados = chamadoRepository.findByColaboradorId(colaboradorId)
                .stream()
                .filter(c -> c.getTipo() == Chamado.TipoChamado.JUSTIFICATIVA_FALTA)
                .filter(c -> {
                    LocalDateTime criadoEm = c.getCriadoEm();
                    return criadoEm != null && !criadoEm.isBefore(inicio) && !criadoEm.isAfter(fim);
                })
                .toList();

        int faltasComJustificativaAprovada = 0;
        int faltasSemJustificativa = 0;

        int diasUteisNoMes = yearMonth.lengthOfMonth();
        int faltasTotais = diasUteisNoMes - diasTrabalhados;

        for (Chamado chamado : chamados) {
            ChamadoJustificativaFalta just = justificativaFaltaRepository
                    .findByChamadoId(chamado.getId()).orElse(null);
            if (just != null && just.getStatus() == ChamadoJustificativaFalta.StatusJustificativa.APROVADA) {
                faltasComJustificativaAprovada++;
            }
        }

        faltasSemJustificativa = Math.max(0, faltasTotais - faltasComJustificativaAprovada);

        double notaPontualidade = 30.0;
        if (diasTrabalhados > 0) {
            double percentualAtrasos = (double) atrasos / diasTrabalhados;
            notaPontualidade = 30.0 * (1 - percentualAtrasos);
        }

        double notaFrequencia = 30.0;
        notaFrequencia -= faltasSemJustificativa * 10.0;
        notaFrequencia -= faltasComJustificativaAprovada * 3.0;
        notaFrequencia = Math.max(0, notaFrequencia);

        double notaHorasExtras = Math.min(20.0, totalExtras.toHours() * 2.0);

        double totalChamados = chamados.size();
        double notaJustificativas = totalChamados > 0
                ? (faltasComJustificativaAprovada / totalChamados) * 20.0
                : 20.0;

        double notaFinal = notaPontualidade + notaFrequencia + notaHorasExtras + notaJustificativas;
        notaFinal = Math.min(100, Math.max(0, notaFinal));

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("colaboradorId", colaboradorId);
        resultado.put("mes", mes);
        resultado.put("ano", ano);
        resultado.put("notaFinal", Math.round(notaFinal));
        resultado.put("detalhes", Map.of(
                "pontualidade", Math.round(notaPontualidade),
                "frequencia", Math.round(notaFrequencia),
                "horasExtras", Math.round(notaHorasExtras),
                "justificativas", Math.round(notaJustificativas)
        ));
        resultado.put("diasTrabalhados", diasTrabalhados);
        resultado.put("atrasos", atrasos);
        resultado.put("faltasSemJustificativa", faltasSemJustificativa);
        resultado.put("faltasComJustificativaAprovada", faltasComJustificativaAprovada);
        resultado.put("horasExtras", totalExtras.toHours() + "h" + totalExtras.toMinutesPart() + "min");

        return resultado;
    }
}