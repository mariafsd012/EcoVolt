package com.ecovolt.backend.security;

import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.repository.ColaboradorRepository;
import org.springframework.security.core.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    private final ColaboradorRepository colaboradorRepository; // cria o atributo do colaborador 

    public CustomUserDetailsService(ColaboradorRepository colaboradorRepository){
        this.colaboradorRepository = colaboradorRepository; // instancia o colaboradorRepository no construtor
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Colaborador colaborador = colaboradorRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Colaborador não encontrado com email: " + email)); // busca o colaborador pelo email e lança uma exceção se não encontrar

        List<SimpleGrantedAuthority> authorities = colaborador.getPapeis().stream().map(papel -> new SimpleGrantedAuthority(papel.getNome().name())).collect(Collectors.toList());

        return new User(colaborador.getEmail(), colaborador.getSenha(), authorities); // retorna um objeto User do Spring Security com o email, senha e papéis do colaborador
    }
}