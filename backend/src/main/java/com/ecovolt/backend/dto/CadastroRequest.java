package com.ecovolt.backend.dto;

import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.model.Papel;
import lombok.Data;
import java.util.List;

@Data
public class CadastroRequest{
    private String nome;
    private String email;
    private String cpf;
    private String senha;
    private Colaborador.Cargo cargo;
    private Colaborador.Setor setor;
    private Long escalaId;
    private List<Papel.NomePapel> papeis;
}