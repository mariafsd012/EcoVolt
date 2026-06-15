package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="chamado_ajuste_ponto")
public class ChamadoAjustePonto {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "chamado_id")
    private Chamado chamado;

    @Enumerated(EnumType.STRING)
    private StatusAjustePonto status;

    public enum StatusAjustePonto {
        PENDENTE,
        APROVADO,
        REJEITADO
    }
}