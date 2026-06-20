package com.ecovolt.backend.dto;

import com.ecovolt.backend.model.Chamado;
import com.ecovolt.backend.model.ChamadoJustificativaFalta;
import com.ecovolt.backend.model.ChamadoAjustePonto;
import lombok.Data;

@Data
public class AvaliarChamadoRequest{
    private Chamado.StatusChamado statusChamado;
    private ChamadoJustificativaFalta.StatusJustificativa statusJustificativa;
    private ChamadoAjustePonto.StatusAjustePonto statusAjuste;
}