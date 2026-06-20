package com.ecovolt.backend.dto;

import com.ecovolt.backend.model.RegistroPonto;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EditarPontoRequest {
    private LocalDateTime dataHoraRegistro;
    private RegistroPonto.TipoPonto tipo;
}