package com.ecovolt.backend.service;

import com.ecovolt.backend.dto.EditarPontoRequest;
import com.ecovolt.backend.model.ChamadoJustificativaFalta;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.model.RegistroPonto;
import com.ecovolt.backend.repository.ChamadoJustificativaFaltaRepository;
import com.ecovolt.backend.repository.ColaboradorRepository;
import com.ecovolt.backend.repository.RegistroPontoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

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

        RegistroPonto registro = new RegistroPonto();
        registro.setColaborador(colaborador);
        registro.setDataHoraRegistro(LocalDateTime.now());
        registro.setTipo(determinarTipo(colaboradorId));

        return registroPontoRepository.save(registro);
    }

    public List<RegistroPonto> buscarHistorico(Long colaboradorId) {
        return registroPontoRepository.findByColaboradorId(colaboradorId);
    }

    public RegistroPonto editar(Long registroId, EditarPontoRequest request) {
        RegistroPonto registro = registroPontoRepository.findById(registroId)
                .orElseThrow(() -> new RuntimeException("Registro de ponto não encontrado"));

        if (request.getDataHoraRegistro() != null) {
            registro.setDataHoraRegistro(request.getDataHoraRegistro());
        }

        if (request.getTipo() != null) {
            registro.setTipo(request.getTipo());
        }

        return registroPontoRepository.save(registro);
    }

    public ChamadoJustificativaFalta abonarFalta(Long chamadoId) {
        ChamadoJustificativaFalta justificativa = chamadoJustificativaFaltaRepository.findByChamadoId(chamadoId)
                .orElseThrow(() -> new RuntimeException("Justificativa não encontrada"));

        justificativa.setStatus(ChamadoJustificativaFalta.StatusJustificativa.APROVADA);

        return chamadoJustificativaFaltaRepository.save(justificativa);
    }

    private RegistroPonto.TipoPonto determinarTipo(Long colaboradorId) {
        List<RegistroPonto> registros = registroPontoRepository.findByColaboradorId(colaboradorId);

        if (registros.isEmpty()) {
            return RegistroPonto.TipoPonto.ENTRADA;
        }

        RegistroPonto ultimo = registros.get(registros.size() - 1);
        return ultimo.getTipo() == RegistroPonto.TipoPonto.ENTRADA
                ? RegistroPonto.TipoPonto.SAIDA
                : RegistroPonto.TipoPonto.ENTRADA;
    }
}