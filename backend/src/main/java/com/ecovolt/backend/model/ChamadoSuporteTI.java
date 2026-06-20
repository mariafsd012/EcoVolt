package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="chamado_suporte_ti")
public class ChamadoSuporteTI {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="chamado_id")
    private Chamado chamado;

    @Enumerated(EnumType.STRING)
    private CategoriaSuporte categoria;

    public enum CategoriaSuporte {
        DEFEITO_MAQUINA,
        ERRO_SISTEMA
    }
}