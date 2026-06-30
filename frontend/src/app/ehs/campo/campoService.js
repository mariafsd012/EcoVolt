import { apiClient } from "../../../../apiClient";

export const campoService = {
  /**
   * Busca a alocação atual do colaborador logado (local, equipe, período).
   * Depende do endpoint GET /api/campo/alocacao-atual ainda não implementado no backend.
   */
  async buscarAlocacaoAtual(options = {}) {
    return apiClient.get(`/api/campo/alocacao-atual`, options);
  },

  /**
   * Lista os treinamentos do colaborador, separados em realizados e pendentes.
   * Depende do endpoint GET /api/campo/treinamentos ainda não implementado no backend.
   */
  async listarTreinamentos(options = {}) {
    return apiClient.get(`/api/campo/treinamentos`, options);
  },

  /**
   * Lista o histórico de alocações anteriores do colaborador.
   * Depende do endpoint GET /api/campo/alocacoes ainda não implementado no backend.
   */
  async listarUltimasAlocacoes(options = {}) {
    return apiClient.get(`/api/campo/alocacoes`, options);
  },
};