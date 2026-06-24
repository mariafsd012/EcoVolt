package com.ecovolt.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor; // Adicione este import

@Data
@Builder
@NoArgsConstructor // Adicione esta anotação
@AllArgsConstructor // Adicione esta anotação
public class HistoricoPontoDTO {
    private String data;
    private String entrada1;
    private String saida1;
    private String entrada2;
    private String saida2;
    private String ht;
    private String hr;
    private String he;
}