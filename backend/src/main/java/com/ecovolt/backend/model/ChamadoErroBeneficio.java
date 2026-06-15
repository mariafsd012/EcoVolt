package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "chamado_erro_beneficio")
public class ChamadoErroBeneficio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "chamado_id")
    private Chamado chamado;

    @Enumerated(EnumType.STRING)
    private TipoBeneficio tipoBeneficio;

    @Enumerated(EnumType.STRING)
    private StatusErroBeneficio status;

    public enum TipoBeneficio {
        VALE_TRANSPORTE,
        VALE_ALIMENTACAO,
        VALE_REFEICAO
    }
    public enum StatusErroBeneficio {
        PENDENTE,
        RESOLVIDO
    }
}