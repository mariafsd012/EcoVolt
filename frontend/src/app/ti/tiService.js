import { apiClient } from "../../../apiClient";

export const tiService = {
  /**
   * Cadastra um novo equipamento entregue a um colaborador.
   * Depende do endpoint POST /api/ti/equipamentos ainda não implementado no backend.
   */
  async cadastrarEquipamento(payload, options = {}) {
    return apiClient.post(`/api/ti/equipamentos`, payload, options);
  },

  /**
   * Lista os equipamentos, com filtro opcional de busca por colaborador ou aparelho.
   * Depende do endpoint GET /api/ti/equipamentos ainda não implementado no backend.
   */
  async listarEquipamentos(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.busca) params.set("busca", filtros.busca);

    const query = params.toString();
    return apiClient.get(`/api/ti/equipamentos${query ? `?${query}` : ""}`, options);
  },

  /** Edita um equipamento (tipo, colaborador, datas de entrega/devolução, status) */
  async editarEquipamento(equipamentoId, payload, options = {}) {
    return apiClient.put(`/api/ti/equipamentos/${equipamentoId}`, payload, options);
  },

  /** Atualiza apenas o status (entregue, devolvido, pendente) de um equipamento */
  async atualizarStatusEquipamento(equipamentoId, status, options = {}) {
    return apiClient.patch(`/api/ti/equipamentos/${equipamentoId}/status`, { status }, options);
  },
};