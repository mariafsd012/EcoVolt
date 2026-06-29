import { apiClient } from "../../../apiClient";

// Mapeamento do tipo do frontend para o enum do backend
const TIPO_MAP = {
  ponto: "AJUSTE_PONTO",
  ehs: "JUSTIFICATIVA_FALTA",
  ti: "SUPORTE_TI",
  rh: "ERRO_BENEFICIO",
  moradia: "ERRO_SALARIO",
  frota: "JUSTIFICATIVA_FALTA",
};

export const suporteService = {
  /**
   * Abre um novo chamado de suporte.
   * Converte o payload do frontend para o formato esperado pelo backend.
   */
  async abrirChamado(chamado, options = {}) {
    const token = localStorage.getItem("token");
    const payload = {
  tipo: chamado.tipo, // já vem como enum do backend
  descricao: chamado.detalhamento,
};
    return apiClient.post(`/api/chamados/abrir`, payload, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    });
  },

  /**
   * Lista os chamados do usuário logado.
   */
  async listarChamados(options = {}) {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const colaboradorId = payload.id ?? payload.sub;
    return apiClient.get(`/api/chamados/${colaboradorId}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    });
  },
};