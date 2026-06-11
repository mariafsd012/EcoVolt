package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name="chamado_justificativa_falta")
public class ChamadoJustificativaFalta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "chamado_id")
    private Chamado chamado;

    private LocalDate dataFalta;
    private LocalTime horaInicio;
    private LocalTime horaFim;

    @Enumerated(EnumType.STRING)
    private StatusJustificativa status;

    public enum StatusJustificativa {
        PENDENTE,
        APROVADA,
        REJEITADA
    }
}