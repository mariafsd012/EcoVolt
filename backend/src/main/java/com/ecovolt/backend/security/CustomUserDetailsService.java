package com.ecovolt.backend.security;

import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.repository.ColaboradorRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final ColaboradorRepository colaboradorRepository;
    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    public CustomUserDetailsService(ColaboradorRepository colaboradorRepository) {
        this.colaboradorRepository = colaboradorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Colaborador colaborador = colaboradorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Colaborador não encontrado com email: " + email));

        // Adiciona "ROLE_" como prefixo para garantir consistência com o SecurityConfig
        List<SimpleGrantedAuthority> authorities = colaborador.getPapeis().stream()
            .map(papel -> new SimpleGrantedAuthority(papel.getNome().name()))
            .collect(Collectors.toList());

        // Log para debug no terminal do backend
        logger.debug("Autoridades carregadas para {}: {}", email, authorities);

        return new User(colaborador.getEmail(), colaborador.getSenha(), authorities);
    }
}