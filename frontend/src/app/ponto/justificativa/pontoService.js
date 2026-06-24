import { apiClient } from "../../../../apiClient";

export const pontoService = {
  /**
   * Lista justificativas (abono, ajuste, falta etc.), com filtros de
   * colaborador (busca por nome), período e tipo de detalhamento.
   * Depende do endpoint GET /api/ponto/justificativas ainda não implementado no backend.
   */
  async listarJustificativas(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.colaborador) params.set("colaborador", filtros.colaborador);
    if (filtros.periodo) params.set("periodo", filtros.periodo);
    if (filtros.detalhamento) params.set("detalhamento", filtros.detalhamento);

    const query = params.toString();
    return apiClient.get(`/api/ponto/justificativas${query ? `?${query}` : ""}`, options);
  },

  /** Aprova uma justificativa pendente */
  async aprovarJustificativa(justificativaId, options = {}) {
    return apiClient.patch(`/api/ponto/justificativas/${justificativaId}/aprovar`, {}, options);
  },

  /** Reprova uma justificativa pendente */
  async reprovarJustificativa(justificativaId, options = {}) {
    return apiClient.patch(`/api/ponto/justificativas/${justificativaId}/reprovar`, {}, options);
  },

  /** Detalhes completos de uma justificativa (texto, anexos, etc.) */
  async buscarDetalhesJustificativa(justificativaId, options = {}) {
    return apiClient.get(`/api/ponto/justificativas/${justificativaId}`, options);
  },
};