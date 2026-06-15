package com.ecovolt.backend.security;

import io.jsonwebtoken.*; // importando a biblioteca jjwt
import io.jsonwebtoken.security.Keys; // importando a classe Keys para gerar a chave secreta
import org.springframework.stereotype.Component; 
import java.security.Key; // importando a classe Key para representar a chave secreta
import java.util.Date; 

@Component
public class JwtUtil{

    private static final String SECRET = "ecovolt-secret-key-2026-123456789"; // eh como se fosse uma senha do servirdor q vai gerenciar qm pode ou n acessar e criar tokens
    private static final long EXPIRATION_TIME = 86400000; // 24 horas em milissegundos

    private Key getSigninKey(){
        return Keys.hmacShaKeyFor(SECRET.getBytes()); // gerando a chave secreta a partir da string
    }

    public String generateToken(String email, String papel){
        return Jwts.builder()
                .setSubject(email)
            .claim("papel", papel)
            .claim("id", id)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
            .signWith(getSigningKey())
            .compact();
    }

    public String extractEmail(String token){
        return getClaims(token).getSubject(); // extraindo o email do token a partir do assunto
    }
    public String extractPapel(String token){
        return getClaims(token).get("papel", String.class); // extraindo o papel do token a partir da claim personalizada
    }
    public Long extractId(String token) {
    return getClaims(token).get("id", Long.class);
}

    public boolean isTokenValid(String token){
        try{
            getClaims(token);
            return true;
        } catch (JwtException e){
            return false;
        }
    }

    private Claims getClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigninKey()) // definindo a chave secreta para validar o token
                .build()
                .parseClaimsJws(token) // parseando o token para extrair as claims
                .getBody(); // retornando o corpo das claims
    }
}