package com.ecovolt.backend.dto;

import com.ecovolt.backend.model.Chamado;
import com.ecovolt.backend.model.ChamadoErroBeneficio;
import com.ecovolt.backend.model.ChamadoSuporteTI;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AbrirChamadoRequest {

    // campos gerais
    private Chamado.TipoChamado tipo;
    private String descricao;

    // campos de justificativa de falta
    private LocalDate dataFalta;
    private LocalTime horaInicio;
    private LocalTime horaFim;

    // campos de ajuste de ponto
    private LocalDate dataPonto;
    private LocalTime horaCorreta;

    // campos de suporte TI
    private ChamadoSuporteTI.CategoriaSuporte categoria;

    // campos de erro beneficio
    private ChamadoErroBeneficio.TipoBeneficio tipoBeneficio;

    // campos de erro salario
    private LocalDate competencia;
}