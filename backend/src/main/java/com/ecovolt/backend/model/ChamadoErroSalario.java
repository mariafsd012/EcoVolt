package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "chamado_erro_salario")
public class ChamadoErroSalario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "chamado_id")
    private Chamado chamado;

    private LocalDate competencia; // mes e ano do erro
}