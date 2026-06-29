import { apiClient } from "../../../../apiClient";

export const treinamentosService = {
  /**
   * Cadastra um novo treinamento para um colaborador.
   * Depende do endpoint POST /api/ehs/treinamentos ainda não implementado no backend.
   */
  async cadastrarTreinamento(payload, options = {}) {
    return apiClient.post(`/api/ehs/treinamentos`, payload, options);
  },

  /**
   * Lista os treinamentos cadastrados, com filtro de busca (colaborador ou nome do
   * treinamento) e de status (realizado/pendente).
   * Depende do endpoint GET /api/ehs/treinamentos ainda não implementado no backend.
   */
  async listarTreinamentos(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.busca) params.set("busca", filtros.busca);
    if (filtros.status) params.set("status", filtros.status);

    const query = params.toString();
    return apiClient.get(`/api/ehs/treinamentos${query ? `?${query}` : ""}`, options);
  },

  /** Edita um treinamento (colaborador, nome, datas, status) */
  async editarTreinamento(treinamentoId, payload, options = {}) {
    return apiClient.put(`/api/ehs/treinamentos/${treinamentoId}`, payload, options);
  },

  /** Atualiza apenas o status (realizado/pendente) de um treinamento */
  async atualizarStatusTreinamento(treinamentoId, status, options = {}) {
    return apiClient.patch(`/api/ehs/treinamentos/${treinamentoId}/status`, { status }, options);
  },
};