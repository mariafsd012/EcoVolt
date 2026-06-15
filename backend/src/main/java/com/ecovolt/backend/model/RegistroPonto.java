package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name= "registro_ponto")
public class RegistroPonto{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name= "colaborador_id")
    private Colaborador colaborador; // aqui ta linkando o colaborador ao registro pelo id do colaborador

    private LocalDateTime dataHoraRegistro;

    @Enumerated(EnumType.STRING)
    private TipoPonto tipo;

    public enum TipoPonto{
        ENTRADA,
        SAIDA
    }
}