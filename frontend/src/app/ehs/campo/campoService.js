import { apiClient } from "../../../../apiClient";

export const campoService = {
  async buscarAlocacaoAtual(options = {}) {
    return apiClient.get(`/api/campo/alocacao-atual`, options);
  },

  async listarTreinamentos(options = {}) {
    return apiClient.get(`/api/campo/treinamentos`, options);
  },

  async listarUltimasAlocacoes(options = {}) {
    return apiClient.get(`/api/campo/alocacoes`, options);
  },

  async buscarMoradia(options = {}) {
    return apiClient.get(`/api/campo/moradia`, options);
  },
};