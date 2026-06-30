import { apiClient } from "../../../../apiClient";

export const ehsService = {
  /** Busca a alocação atual do colaborador logado */
  async buscarAlocacaoAtual(options = {}) {
    return apiClient.get("/api/ehs/alocacao/atual", options);
  },

  /** Lista treinamentos realizados do colaborador */
  async listarTreinamentosRealizados(options = {}) {
    return apiClient.get("/api/ehs/treinamentos/realizados", options);
  },

  /** Lista treinamentos pendentes do colaborador */
  async listarTreinamentosPendentes(options = {}) {
    return apiClient.get("/api/ehs/treinamentos/pendentes", options);
  },

  /** Lista histórico de alocações do colaborador */
  async listarUltimasAlocacoes(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.limite) params.set("limite", filtros.limite);

    const query = params.toString();
    return apiClient.get(`/api/ehs/alocacoes${query ? `?${query}` : ""}`, options);
  },
};