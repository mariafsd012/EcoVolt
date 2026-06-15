package com.ecovolt.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil; // cria o atributo do JwtUtil
    private final CustomDetailsService customDetailsService; // cria o atributo do CustomDetailsService

    public JwtAutheticationFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService){
        this.JwtUtil = jwtUtil;
        this.customDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServlet request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        String AuthHeader = request.getHeader("Authorization"); // obtém o header de autorização da requisição

        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return; // se o header for nulo ou não começar com "Bearer ", continua a cadeia de filtros sem autenticar
        }

        String token = authHeader.substring(7); // extrai o token removendo o prefixo "Bearer "

        if (jwtUtil.isTokenValid(token)){
            String email = jwtUtil.extractEmail(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            UsernamePasswordAutheticationToken authToken = newUsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // define os detalhes da autenticação com base na requisição
            SecurityContextHolder.getContext().setAuthentication(authToken); // define a autenticação no contexto de segurança do Spring
        }

        filterChain.doFilter(request, response);
    }
}