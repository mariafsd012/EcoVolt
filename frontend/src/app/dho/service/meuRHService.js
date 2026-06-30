import { apiClient } from "../../../../apiClient";

// Endpoints "auto-serviço": sempre retornam apenas os dados
// do colaborador autenticado (identificado via token/sessão no apiClient).
export const meuRHService = {
  async meuDesempenho(options = {}) {
    return apiClient.get("/api/dho/meu-rh/desempenho", options);
  },
  async meusBeneficios(options = {}) {
    return apiClient.get("/api/dho/meu-rh/beneficios", options);
  },
};