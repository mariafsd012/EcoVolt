import { apiClient } from "../../../apiClient";

export const moradiaService = {
  async cadastrarMoradia(payload, options = {}) {
    return apiClient.post(`/api/moradia`, payload, options);
  },

  async listarMoradias(options = {}) {
    return apiClient.get(`/api/moradia`, options);
  },

  async editarMoradia(moradiaId, payload, options = {}) {
    return apiClient.put(`/api/moradia/${moradiaId}`, payload, options);
  },

  /** Lista colaboradores disponíveis para vincular a uma moradia */
  async listarColaboradores(options = {}) {
    return apiClient.get(`/api/colaboradores`, options);
  },

  /** Lista todas as contas, filtradas por moradia opcionalmente */
  async listarContas(moradiaId = null, options = {}) {
    const url = moradiaId ? `/api/moradia/${moradiaId}/contas` : `/api/moradia/contas`;
    return apiClient.get(url, options);
  },

  /**
   * Anexa uma nova conta (comprovante mensal por categoria).
   * Obs: como tem arquivo, deve ser enviado como FormData em vez de JSON —
   * ajustar o apiClient quando o backend definir o contrato.
   */
  async anexarConta(payload, options = {}) {
    return apiClient.post(`/api/moradia/contas`, payload, options);
  },

  async removerConta(contaId, options = {}) {
    return apiClient.delete(`/api/moradia/contas/${contaId}`, options);
  },
};