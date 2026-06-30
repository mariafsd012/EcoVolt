package com.ecovolt.backend.service;

import com.ecovolt.backend.dto.AvaliarChamadoRequest;
import com.ecovolt.backend.dto.AbrirChamadoRequest;
import com.ecovolt.backend.model.*;
import com.ecovolt.backend.repository.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChamadoService {

    private final ChamadoRepository chamadoRepository;
    private final ColaboradorRepository colaboradorRepository;
    private final ChamadoJustificativaFaltaRepository justificativaFaltaRepository;
    private final ChamadoAjustePontoRepository ajustePontoRepository;
    private final ChamadoSuporteTIRepository suporteTIRepository;
    private final ChamadoErroBeneficioRepository erroBeneficioRepository;
    private final ChamadoErroSalarioRepository erroSalarioRepository;

    public ChamadoService(ChamadoRepository chamadoRepository,
                          ColaboradorRepository colaboradorRepository,
                          ChamadoJustificativaFaltaRepository justificativaFaltaRepository,
                          ChamadoAjustePontoRepository ajustePontoRepository,
                          ChamadoSuporteTIRepository suporteTIRepository,
                          ChamadoErroBeneficioRepository erroBeneficioRepository,
                          ChamadoErroSalarioRepository erroSalarioRepository) {
        this.chamadoRepository = chamadoRepository;
        this.colaboradorRepository = colaboradorRepository;
        this.justificativaFaltaRepository = justificativaFaltaRepository;
        this.ajustePontoRepository = ajustePontoRepository;
        this.suporteTIRepository = suporteTIRepository;
        this.erroBeneficioRepository = erroBeneficioRepository;
        this.erroSalarioRepository = erroSalarioRepository;
    }

    public Chamado abrir(Long colaboradorId, AbrirChamadoRequest request) {
        Colaborador colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        Chamado chamado = new Chamado();
        chamado.setColaborador(colaborador);
        chamado.setTipo(request.getTipo());
        chamado.setDescricao(request.getDescricao());
        chamado.setStatus(Chamado.StatusChamado.ABERTO);
        chamado.setCriadoEm(LocalDateTime.now());

        chamadoRepository.save(chamado);

        switch (request.getTipo()) {
            case JUSTIFICATIVA_FALTA -> {
                ChamadoJustificativaFalta justificativa = new ChamadoJustificativaFalta();
                justificativa.setChamado(chamado);
                justificativa.setDataFalta(request.getDataFalta());
                justificativa.setHoraInicio(request.getHoraInicio());
                justificativa.setHoraFim(request.getHoraFim());
                justificativa.setStatus(ChamadoJustificativaFalta.StatusJustificativa.APROVADA);
                justificativaFaltaRepository.save(justificativa);
            }
            case AJUSTE_PONTO -> {
                ChamadoAjustePonto ajuste = new ChamadoAjustePonto();
                ajuste.setChamado(chamado);
                ajuste.setDataPonto(request.getDataPonto());
                ajuste.setHoraCorreta(request.getHoraCorreta());
                ajustePontoRepository.save(ajuste);
            }
            case SUPORTE_TI -> {
                ChamadoSuporteTI suporte = new ChamadoSuporteTI();
                suporte.setChamado(chamado);
                suporte.setCategoria(request.getCategoria());
                suporteTIRepository.save(suporte);
            }
            case ERRO_BENEFICIO -> {
                ChamadoErroBeneficio erroBeneficio = new ChamadoErroBeneficio();
                erroBeneficio.setChamado(chamado);
                erroBeneficio.setTipoBeneficio(request.getTipoBeneficio());
                erroBeneficioRepository.save(erroBeneficio);
            }
            case ERRO_SALARIO -> {
                ChamadoErroSalario erroSalario = new ChamadoErroSalario();
                erroSalario.setChamado(chamado);
                erroSalario.setCompetencia(request.getCompetencia());
                erroSalarioRepository.save(erroSalario);
            }
        }

        return chamado;
    }

    public Chamado avaliar(Long chamadoId, Long analistaId, AvaliarChamadoRequest request){
        Chamado chamado = chamadoRepository.findById(chamadoId).orElseThrow(() -> new RuntimeException("Chamado não encontrado"));

        Colaborador colaborador = colaboradorRepository.findById(analistaId).orElseThrow(() -> new RuntimeException("Analista não encontrado"));

        chamado.setStatus(request.getStatusChamado());
        chamado.setAvaliador(colaborador);
        chamado.setAvaliadoEm(LocalDateTime.now());

        chamadoRepository.save(chamado);

        switch (chamado.getTipo()){
            case JUSTIFICATIVA_FALTA -> {
                if(request.getStatusJustificativa() != null){
                    ChamadoJustificativaFalta justificativa = justificativaFaltaRepository.findById(chamadoId).orElseThrow(() -> new RuntimeException("Justificativa não encontrada"));
                    justificativa.setStatus(request.getStatusJustificativa());
                    justificativaFaltaRepository.save(justificativa);
                }
            }
            case AJUSTE_PONTO -> {
                if(request.getStatusAjuste() != null){
                    ChamadoAjustePonto ajuste = ajustePontoRepository.findById(chamadoId).orElseThrow(() -> new RuntimeException("Ajuste não encontrado"));
                    ajuste.setStatus(request.getStatusAjuste());
                    ajustePontoRepository.save(ajuste);
                }
            }
            default -> {}
        }
        
        return chamado;
    }

    public List<Chamado> listarPorColaborador(Long colaboradorId) {
        return chamadoRepository.findByColaboradorId(colaboradorId);
    }

    /**
     * Lista chamados de justificativa/ajuste de ponto, com filtros opcionais
     * de nome de colaborador e tipo de chamado. Usado na tela de justificativas
     * do analista de ponto.
     */
    public List<Chamado> listarJustificativas(String nomeColaborador, String tipo) {
        List<Chamado> chamados = chamadoRepository.findAll().stream()
                .filter(c -> c.getTipo() == Chamado.TipoChamado.JUSTIFICATIVA_FALTA
                          || c.getTipo() == Chamado.TipoChamado.AJUSTE_PONTO)
                .collect(Collectors.toList());

        if (nomeColaborador != null && !nomeColaborador.isEmpty()) {
            String filtro = nomeColaborador.toLowerCase();
            chamados = chamados.stream()
                    .filter(c -> c.getColaborador() != null
                              && c.getColaborador().getNome() != null
                              && c.getColaborador().getNome().toLowerCase().contains(filtro))
                    .collect(Collectors.toList());
        }

        if (tipo != null && !tipo.isEmpty()) {
            try {
                Chamado.TipoChamado tipoEnum = Chamado.TipoChamado.valueOf(tipo.toUpperCase());
                chamados = chamados.stream()
                        .filter(c -> c.getTipo() == tipoEnum)
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException ignored) {
                // tipo inválido informado: ignora o filtro
            }
        }

        return chamados;
    }
}