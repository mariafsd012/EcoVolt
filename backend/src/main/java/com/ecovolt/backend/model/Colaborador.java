package com.ecovolt.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "colaborador")
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String email;
    private String senha;

    @Enumerated(EnumType.STRING)
    private Cargo cargo;

    @Enumerated(EnumType.STRING)
    private Setor setor;

    @ManyToOne
    @JoinColumn(name = "escala_id")
    private Escala escala;

    @ManyToMany (fetch = FetchType.EAGER)
    @JoinTable(
        name = "colaborador_papel",
        joinColumns = @JoinColumn(name = "colaborador_id"),
        inverseJoinColumns = @JoinColumn(name = "papel_id")
    )
    private List<Papel> papeis;

    public enum Cargo{
        TECNICO_DE_CAMPO,
        COORDENADOR_DE_GESTAO_DE_PESSOAS,
        GERENTE_DE_TI,
        TECNICO_DE_TI,
        ANALISTA_DE_PONTO,
        GERENTE_DE_CAMPO,
        GERENTE_DE_LOGISTICA,
        COORDENADOR_DE_MORADIA
    }

    public enum Setor{
        CAMPO,
        DHO,
        TI,
        LOGISTICA,
        MORADIA,
        PONTO,
        EHS
    }
}