package com.ecovolt.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil{

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret:ecovolt-secret-key-2026-123456789}")
    private String secret;

    private static final long EXPIRATION_TIME = 86400000; // 24 horas em milissegundos

    private Key getSigninKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
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
        } catch (ExpiredJwtException e) {
            logger.info("JWT expired: {}", e.getMessage());
            return false;
        } catch (JwtException e){
            logger.info("JWT invalid: {}", e.getMessage());
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