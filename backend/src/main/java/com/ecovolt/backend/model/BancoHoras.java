package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table (name = "banco_horas")
public class BancoHoras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "colaborador_id")
    private Colaborador colaborador;

    private Integer horasExtras; // guarda em minutos para facilitar o calculo
    private Integer horasFaltantes;
    private LocalDateTime atualizadoEm;
}