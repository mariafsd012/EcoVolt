package com.ecovolt.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoPontoDTO {
    private String data;
    private Long idEntrada1;
    private String entrada1;
    private Long idSaida1;
    private String saida1;
    private Long idEntrada2;
    private String entrada2;
    private Long idSaida2;
    private String saida2;
    private String ht;
    private String hr;
    private String he;
}