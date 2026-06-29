"use client";

import { useEffect, useState } from "react";
import { ehsService } from "../campo/ehsService";

export function useCampo() {
  const [alocacaoAtual, setAlocacaoAtual] = useState(null);
  const [treinamentosRealizados, setTreinamentosRealizados] = useState([]);
  const [treinamentosPendentes, setTreinamentosPendentes] = useState([]);
  const [ultimasAlocacoes, setUltimasAlocacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        const [alocacao, realizados, pendentes, historico] = await Promise.all([
          ehsService.buscarAlocacaoAtual(),
          ehsService.listarTreinamentosRealizados(),
          ehsService.listarTreinamentosPendentes(),
          ehsService.listarUltimasAlocacoes({ limite: 3 }),
        ]);

        setAlocacaoAtual(alocacao);
        setTreinamentosRealizados(realizados);
        setTreinamentosPendentes(pendentes);
        setUltimasAlocacoes(historico);
      } catch (err) {
        setError(err?.message || "Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchDados();
  }, []);

  return {
    alocacaoAtual,
    treinamentosRealizados,
    treinamentosPendentes,
    ultimasAlocacoes,
    loading,
    error,
  };
}