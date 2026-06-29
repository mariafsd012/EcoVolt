import { apiClient } from "../../../../apiClient";

export const equipesService = {
  /**
   * Cadastra uma nova equipe, com nome, setor e a lista de colaboradores incluídos.
   * Depende do endpoint POST /api/dho/equipes ainda não implementado no backend.
   */
  async cadastrarEquipe(payload, options = {}) {
    return apiClient.post(`/api/dho/equipes`, payload, options);
  },

  /** Lista as equipes cadastradas, com seus colaboradores */
  async listarEquipes(options = {}) {
    return apiClient.get(`/api/dho/equipes`, options);
  },

  /** Edita uma equipe (nome, setor, colaboradores) */
  async editarEquipe(equipeId, payload, options = {}) {
    return apiClient.put(`/api/dho/equipes/${equipeId}`, payload, options);
  },

  /** Lista todos os colaboradores (para seleção ao cadastrar/editar equipes) */
  async listarColaboradores(options = {}) {
    return apiClient.get(`/api/colaboradores`, options);
  },

  /** Lista apenas os colaboradores que não estão em nenhuma equipe */
  async listarColaboradoresSemEquipe(options = {}) {
    return apiClient.get(`/api/dho/colaboradores-sem-equipe`, options);
  },
};