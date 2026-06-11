package com.ecovolt.backend.model;

import jakarta.persistence.*; // Importação das anotações JPA
import lombok.Data; // Importação da anotação @Data do Lombok

@Data
@Entity // Anotação para indicar que esta classe é uma entidade JPA
@Table(name="papel") 
public class Papel{

    @Id // chave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // gera automaticamente o id
    private Long id;

    @Enumerated(EnumType.STRING)
    private NomePapel nome;

    public enum NomePapel {
        ROLE_USUARIO_PADRAO,
        ROLE_GESTOR_SETOR,
        ROLE_ACESSO_CAMPO,
        ROLE_AVALIADOR_DESEMPENHO,
        ROLE_ADMIN_TI,
        ROLE_GESTOR_LOGISTICA,
        ROLE_ANALISTA_PONTO,
        ROLE_GESTOR_TREINAMENTO
    }

}

