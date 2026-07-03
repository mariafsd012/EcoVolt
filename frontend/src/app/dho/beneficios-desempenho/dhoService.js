import { apiClient } from "../../../../apiClient";

export const dhoService = {
  async cadastrarBeneficio(payload, options = {}) {
    return apiClient.post('/api/dho/beneficios', payload, options);
  },
  async listarBeneficios(options = {}) {
    return apiClient.get('/api/dho/beneficios', options);
  },
  async editarBeneficio(id, payload, options = {}) {
    return apiClient.put(`/api/dho/beneficios/${id}`, payload, options);
  },

  async registrarDesempenho(payload, options = {}) {
    return apiClient.post('/api/dho/desempenho', payload, options);
  },
  async listarDesempenhos(options = {}) {
    return apiClient.get('/api/dho/desempenho', options);
  },
  async editarDesempenho(id, payload, options = {}) {
    return apiClient.put(`/api/dho/desempenho/${id}`, payload, options);
  },
};