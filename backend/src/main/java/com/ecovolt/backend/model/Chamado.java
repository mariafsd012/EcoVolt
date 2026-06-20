package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table (name = "chamado")
public class Chamado {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    @ManyToOne
    @JoinColumn (name = "colaborador_id")
    private Colaborador colaborador;

    @Enumerated(EnumType.STRING)
    private TipoChamado tipo;

    @Enumerated(EnumType.STRING)
    private StatusChamado status;

    private String descricao;
    private LocalDateTime criadoEm;

    @ManyToOne
    @JoinColumn (name = "avaliado_por")
    private Colaborador avaliador;

    private LocalDateTime avaliadoEm;

    public enum TipoChamado {
        JUSTIFICATIVA_FALTA,
        SUPORTE_TI,
        AJUSTE_PONTO,
        ERRO_BENEFICIO,
        ERRO_SALARIO
    }

    public enum StatusChamado {
        ABERTO,
        PENDENTE,
        FINALIZADO
    }
}