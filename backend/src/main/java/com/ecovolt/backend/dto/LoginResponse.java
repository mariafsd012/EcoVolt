package com.ecovolt.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponse{
    private String token;
    private String nome;
    private String email;
    private String papel;
}