package com.ecovolt.backend.dto;

import lombok.Data;

@Data
public class LoginRequest{
    private String email;
    private String senha;
}

// esse arquivo representa os dados q entram pelo frontend