import { apiClient } from "../../../../apiClient";

export const pontoService = {
  /**
   * Lista colaboradores com suporte a filtros.
   * O backend espera os parâmetros: 'nome' e 'setor'.
   */
  async listarColaboradores(filtros = {}, options = {}) {
    const params = new URLSearchParams();

    // Filtro por setor (equipe)
    if (filtros.setor) {
      params.set("setor", filtros.setor);
    }
    
    // Filtro por nome (usando o campo que o backend entende como nome)
    if (filtros.colaboradorId) {
      params.set("nome", filtros.colaboradorId);
    }

    const query = params.toString();
    const url = `/api/colaboradores${query ? `?${query}` : ""}`;
    
    return await apiClient.get(url, options);
  },

  /** Histórico de registros de ponto de um colaborador específico */
  async buscarHistorico(colaboradorId, options = {}) {
    // Verifique se o backend realmente usa /api/ponto/historico/${id}
    return await apiClient.get(`/api/ponto/historico/${colaboradorId}`, options);
  },

  /** Edita um registro de ponto específico */
  async editarRegistro(registroId, payload, options = {}) {
    return await apiClient.put(`/api/ponto/${registroId}/editar`, payload, options);
  },
};