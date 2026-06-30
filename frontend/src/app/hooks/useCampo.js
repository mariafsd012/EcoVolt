"use client";

import { useEffect, useState } from "react";
import { campoService } from "../ehs/campo/campoService";

export function useCampo() {
  const [alocacaoAtual, setAlocacaoAtual] = useState(null);
  const [treinamentosRealizados, setTreinamentosRealizados] = useState([]);
  const [treinamentosPendentes, setTreinamentosPendentes] = useState([]);
  const [ultimasAlocacoes, setUltimasAlocacoes] = useState([]);
  const [moradia, setMoradia] = useState(null);

  const [isLoadingAlocacao, setIsLoadingAlocacao] = useState(true);
  const [isLoadingTreinamentos, setIsLoadingTreinamentos] = useState(true);
  const [isLoadingHistorico, setIsLoadingHistorico] = useState(true);
  const [isLoadingMoradia, setIsLoadingMoradia] = useState(true);

  const [erroAlocacao, setErroAlocacao] = useState(null);
  const [erroTreinamentos, setErroTreinamentos] = useState(null);
  const [erroHistorico, setErroHistorico] = useState(null);
  const [erroMoradia, setErroMoradia] = useState(null);

  useEffect(() => {
    campoService
      .buscarAlocacaoAtual()
      .then((data) => setAlocacaoAtual(data ?? null))
      .catch((err) => setErroAlocacao(err))
      .finally(() => setIsLoadingAlocacao(false));

    campoService
      .listarTreinamentos()
      .then((data) => {
        setTreinamentosRealizados(data?.realizados ?? []);
        setTreinamentosPendentes(data?.pendentes ?? []);
      })
      .catch((err) => setErroTreinamentos(err))
      .finally(() => setIsLoadingTreinamentos(false));

    campoService
      .listarUltimasAlocacoes()
      .then((data) => setUltimasAlocacoes(data?.alocacoes ?? data ?? []))
      .catch((err) => setErroHistorico(err))
      .finally(() => setIsLoadingHistorico(false));

    campoService
      .buscarMoradia()
      .then((data) => setMoradia(data ?? null))
      .catch((err) => setErroMoradia(err))
      .finally(() => setIsLoadingMoradia(false));
  }, []);

  return {
    alocacaoAtual,
    treinamentosRealizados,
    treinamentosPendentes,
    ultimasAlocacoes,
    moradia,
    isLoadingAlocacao,
    isLoadingTreinamentos,
    isLoadingHistorico,
    isLoadingMoradia,
    erroAlocacao,
    erroTreinamentos,
    erroHistorico,
    erroMoradia,
  };
}