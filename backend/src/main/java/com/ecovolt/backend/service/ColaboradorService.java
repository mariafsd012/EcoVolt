package com.ecovolt.backend.service;

import com.ecovolt.backend.dto.CadastroRequest;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.model.Escala;
import com.ecovolt.backend.model.Papel;
import com.ecovolt.backend.repository.ColaboradorRepository;
import com.ecovolt.backend.repository.EscalaRepository;
import com.ecovolt.backend.repository.PapelRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColaboradorService {

    private final ColaboradorRepository colaboradorRepository;
    private final EscalaRepository escalaRepository;
    private final PapelRepository papelRepository;
    private final PasswordEncoder passwordEncoder;

    public ColaboradorService(ColaboradorRepository colaboradorRepository, 
                              EscalaRepository escalaRepository, 
                              PapelRepository papelRepository, 
                              PasswordEncoder passwordEncoder) {
        this.colaboradorRepository = colaboradorRepository;
        this.escalaRepository = escalaRepository;
        this.papelRepository = papelRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Método atualizado para filtrar por nome e setor.
     * O Controller chama este método.
     */
    public List<Colaborador> listarFiltrado(String nome, String setor) {
        Colaborador.Setor setorEnum = null;
        if (setor != null && !setor.isEmpty()) {
            try {
                setorEnum = Colaborador.Setor.valueOf(setor.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Setor inválido informado: ignora o filtro de setor
                setorEnum = null;
            }
        }

        boolean temNome = nome != null && !nome.isEmpty();
        boolean temSetor = setorEnum != null;

        if (temNome && temSetor) {
            return colaboradorRepository.findByNomeContainingIgnoreCaseAndSetor(nome, setorEnum);
        } else if (temNome) {
            return colaboradorRepository.findByNomeContainingIgnoreCase(nome);
        } else if (temSetor) {
            return colaboradorRepository.findBySetor(setorEnum);
        }
        return colaboradorRepository.findAll();
    }

    public Colaborador cadastrar(CadastroRequest request) {
        Escala escala = escalaRepository.findById(request.getEscalaId())
                .orElseThrow(() -> new RuntimeException("Escala não encontrada"));

        List<Papel> papeis = request.getPapeis().stream()
                .map(nomePapel -> papelRepository.findByNome(nomePapel)
                        .orElseThrow(() -> new RuntimeException("Papel não encontrado: " + nomePapel)))
                .collect(Collectors.toList());

        Colaborador colaborador = new Colaborador();
        colaborador.setNome(request.getNome());
        colaborador.setCpf(request.getCpf());
        colaborador.setEmail(request.getEmail());
        colaborador.setSenha(passwordEncoder.encode(request.getSenha()));
        colaborador.setCargo(request.getCargo());
        colaborador.setSetor(request.getSetor());
        colaborador.setEscala(escala);
        colaborador.setPapeis(papeis);

        return colaboradorRepository.save(colaborador);
    }
}