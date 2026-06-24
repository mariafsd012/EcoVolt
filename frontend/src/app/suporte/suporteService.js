import { apiClient } from "../../../apiClient";

export const suporteService = {
  /**
   * Abre um novo chamado de suporte (Ponto, EHS, T.I, RH, Moradia ou Frota).
   * Depende do endpoint POST /api/suporte/chamados ainda não implementado no backend.
   */
  async abrirChamado(payload, options = {}) {
    return apiClient.post(`/api/suporte/chamados`, payload, options);
  },

  /** Lista os chamados já realizados pelo usuário logado */
  async listarChamados(options = {}) {
    return apiClient.get(`/api/suporte/chamados`, options);
  },
};