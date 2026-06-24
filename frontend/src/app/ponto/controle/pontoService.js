import { apiClient } from "../../../../apiClient";

export const pontoService = {
  /**
   * Lista colaboradores com suporte a filtros.
   */
  async listarColaboradores(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    
    if (filtros.setor) {
      params.set("setor", filtros.setor);
    }
    
    if (filtros.colaboradorId) {
      params.set("nome", filtros.colaboradorId);
    }

    const query = params.toString();
    const url = `/api/colaboradores${query ? `?${query}` : ""}`;
    
    return await apiClient.get(url, options);
  },

  /** * Histórico de registros de ponto de um colaborador específico.
   * Utiliza a nova estrutura agrupada pelo backend.
   */
  async buscarHistoricoAgrupado(colaboradorId, options = {}) {
    return await apiClient.get(`/api/ponto/historico/${colaboradorId}`, options);
  },

  /** * Método mantido para compatibilidade, caso precise buscar o histórico 
   * bruto em algum outro ponto do sistema.
   */
  async buscarHistorico(colaboradorId, options = {}) {
    return await apiClient.get(`/api/ponto/historico/${colaboradorId}`, options);
  },

  /** * Registra um novo ponto (1ª Entrada, 1ª Saída, etc)
   */
  async registrarPonto(options = {}) {
    // Endpoint backend extrai o colaborador a partir do token, então não enviamos corpo
    return await apiClient.post(`/api/ponto/registrar`, null, options);
  },

  /** * Edita um registro de ponto específico 
   */
  async editarRegistro(registroId, payload, options = {}) {
    return await apiClient.put(`/api/ponto/${registroId}/editar`, payload, options);
  },

  /** * Abona uma falta baseada no ID do chamado 
   */
  async abonarFalta(chamadoId, options = {}) {
    return await apiClient.put(`/api/ponto/abonar/${chamadoId}`, options);
  }
};