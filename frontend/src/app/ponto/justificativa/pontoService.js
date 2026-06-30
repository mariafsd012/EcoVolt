import { apiClient } from "../../../../apiClient";

function mapearChamado(chamado) {
  return {
    id: chamado.id,
    nome: chamado.colaborador?.nome ?? "-",
    detalhamento: chamado.descricao ?? "-",
    status: chamado.status?.toLowerCase() ?? "pendente",
    tipo: chamado.tipo,
  };
}

export const pontoService = {
  /**
   * Lista justificativas (abono, ajuste, falta etc.), com filtros de
   * colaborador (busca por nome) e tipo de chamado.
   * Usa o endpoint GET /api/chamados/justificativas, restrito a analistas de ponto.
   */
  async listarJustificativas(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.colaborador) params.set("colaborador", filtros.colaborador);
    if (filtros.detalhamento) params.set("tipo", filtros.detalhamento);

    const query = params.toString();
    const token = localStorage.getItem("token");

    const data = await apiClient.get(`/api/chamados/justificativas${query ? `?${query}` : ""}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    });

    return Array.isArray(data) ? data.map(mapearChamado) : [];
  },

  /** Aprova uma justificativa pendente */
  async aprovarJustificativa(justificativaId, options = {}) {
    const token = localStorage.getItem("token");
    return apiClient.put(`/api/chamados/${justificativaId}/avaliar`, { statusChamado: "FINALIZADO", statusJustificativa: "APROVADA" }, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    });
  },

  /** Reprova uma justificativa pendente */
  async reprovarJustificativa(justificativaId, options = {}) {
    const token = localStorage.getItem("token");
    return apiClient.put(`/api/chamados/${justificativaId}/avaliar`, { statusChamado: "FINALIZADO", statusJustificativa: "REJEITADA" }, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    });
  },
};