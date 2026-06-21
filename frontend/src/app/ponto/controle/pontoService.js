/**
 * pontoService.js
 * Camada de domínio da tela "Controle de Ponto".
 *
 * ENDPOINTS REAIS JÁ EXISTENTES NO BACKEND (PontoController / ColaboradorController):
 *
 * GET  /api/ponto/historico/{colaboradorId}   -> List<RegistroPonto>
 * PUT  /api/ponto/{registroId}/editar         -> body: EditarPontoRequest
 * POST /api/colaboradores/cadastrar           -> body: CadastroRequest
 *
 * ⚠️ AINDA FALTA NO BACKEND (necessário para a tela de listagem com filtros):
 * GET /api/colaboradores
 *   query params sugeridos: ?setor=PONTO
 *   response sugerida: List<Colaborador> (id, nome, cargo, setor)
 *
 * Sem esse endpoint, listarColaboradores() abaixo não vai funcionar ainda.
 * Avise quando o ColaboradorController tiver esse método que eu ajusto aqui.
 */

import { apiClient } from "../../../../apiClient";

export const pontoService = {
  /**
   * Lista colaboradores, opcionalmente filtrando por setor (= "equipe" no design).
   * Depende do endpoint GET /api/colaboradores ainda não implementado no backend.
   */
  async listarColaboradores(filtros = {}, options = {}) {
    const params = new URLSearchParams();
    if (filtros.setor) params.set("setor", filtros.setor);
    if (filtros.colaboradorId) params.set("colaboradorId", filtros.colaboradorId);

    const query = params.toString();
    return apiClient.get(`/api/colaboradores${query ? `?${query}` : ""}`, options);
  },

  /** Histórico de registros de ponto de um colaborador específico */
  async buscarHistorico(colaboradorId, options = {}) {
    return apiClient.get(`/api/ponto/historico/${colaboradorId}`, options);
  },

  /** Edita um registro de ponto específico */
  async editarRegistro(registroId, payload, options = {}) {
    return apiClient.put(`/api/ponto/${registroId}/editar`, payload, options);
  },
};