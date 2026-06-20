package com.ecovolt.backend.service;

import com.ecovolt.backend.dto.LoginRequest;
import com.ecovolt.backend.dto.LoginResponse;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.repository.ColaboradorRepository;
import com.ecovolt.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final ColaboradorRepository colaboradorRepository;
    private final JwtUtil jwtUtil;

    public AuthService(AuthenticationManager authenticationManager, ColaboradorRepository colaboradorRepository, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.colaboradorRepository = colaboradorRepository;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
        );

        Colaborador colaborador = colaboradorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        String papel = colaborador.getPapeis().isEmpty()
                ? "SEM_PAPEL"
                : colaborador.getPapeis().get(0).getNome().name();

        String token = jwtUtil.generateToken(colaborador.getEmail(), papel, colaborador.getId());

        return new LoginResponse(token, colaborador.getNome(), colaborador.getEmail(), papel);
    }
}