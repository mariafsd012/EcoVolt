import { apiClient } from "../../../apiClient";

export const relatoriosService = {
  /**
   * Gera um relatório para o módulo selecionado (ponto, frota, ti, ehs), aplicando
   * os filtros correspondentes (período, colaborador, equipe, tipo, etc).
   * Depende do endpoint GET /api/relatorios/:modulo ainda não implementado no backend.
   */
  async gerarRelatorio(modulo, filtros = {}, options = {}) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([chave, valor]) => {
      if (valor) params.set(chave, valor);
    });

    const query = params.toString();
    return apiClient.get(`/api/relatorios/${modulo}${query ? `?${query}` : ""}`, options);
  },

  /** Exporta o relatório já gerado (ex: para CSV/Excel) */
  async exportarRelatorio(modulo, filtros = {}, options = {}) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([chave, valor]) => {
      if (valor) params.set(chave, valor);
    });

    const query = params.toString();
    return apiClient.get(`/api/relatorios/${modulo}/exportar${query ? `?${query}` : ""}`, options);
  },
};