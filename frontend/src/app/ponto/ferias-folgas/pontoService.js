import { apiClient } from "../../../../apiClient";

export const pontoService = {
  /**
   * Cadastra um novo feriado.
   * Depende do endpoint POST /api/ponto/feriados ainda não implementado no backend.
   */
  async cadastrarFeriado(payload, options = {}) {
    return apiClient.post(`/api/ponto/feriados`, payload, options);
  },

  /** Lista feriados cadastrados */
  async listarFeriados(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.equipe) params.set("equipe", filtros.equipe);
    if (filtros.tipo) params.set("tipo", filtros.tipo);

    const query = params.toString();
    return apiClient.get(`/api/ponto/feriados${query ? `?${query}` : ""}`, options);
  },

  /**
   * Cadastra um novo afastamento (férias, licença, etc).
   * Depende do endpoint POST /api/ponto/afastamentos ainda não implementado no backend.
   */
  async cadastrarAfastamento(payload, options = {}) {
    return apiClient.post(`/api/ponto/afastamentos`, payload, options);
  },

  /** Lista afastamentos cadastrados */
  async listarAfastamentos(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.colaborador) params.set("colaborador", filtros.colaborador);
    if (filtros.tipo) params.set("tipo", filtros.tipo);

    const query = params.toString();
    return apiClient.get(`/api/ponto/afastamentos${query ? `?${query}` : ""}`, options);
  },
};