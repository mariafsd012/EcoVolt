package com.ecovolt.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil{

    private static final String SECRET = "ecovolt-secret-key-2026-123456789";
    private static final long EXPIRATION_TIME = 86400000; // 24 horas em milissegundos

    private Key getSigninKey(){
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email, String papel, Long id){
        return Jwts.builder()
                .setSubject(email)
                .claim("papel", papel)
                .claim("id", id)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigninKey())
                .compact();
    }

    public String extractEmail(String token){
        return getClaims(token).getSubject();
    }

    public String extractPapel(String token){
        return getClaims(token).get("papel", String.class);
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
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}