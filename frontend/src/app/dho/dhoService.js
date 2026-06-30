import { apiClient } from "../../../apiClient";

export const dhoService ={
    async cadastrarBeneficio(payload, options = {}){
        return apiClient.post('/api/dho/beneficios', payload, options);
    },
    async listarBeneficios(options = {}){
        return apiClient.get('/api/dho/beneficios', options);
    },
    async editarBeneficios(id, payload, options = {}){
    return apiClient.get('/api/dho/beneficios', payload, options);
    },
    async registrarBeneficios(payload, options = {}){
    return apiClient.get('/api/dho/beneficios', payload, options);
    },
    async listarDesempenho(options = {}){
        return apiClient.get('/api/dho/desempenho', options);
    },
    async editarDesempenho(options = {}){
    return apiClient.get('/api/dho/desempenho/${id}', payload, options);
    },
};