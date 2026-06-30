"use client";

import { useCallback, useEffect, useState } from "react";
import { treinamentosService } from "../ehs/treinamentos/treinamentosService";

const TREINAMENTO_INICIAL = {
  colaborador: "",
  nome: "",
  status: "realizado",
  data: "",
  validade: "",
};

const FILTROS_INICIAIS = { busca: "", status: "" };

export function useTreinamentos() {
  const [treinamento, setTreinamento] = useState(TREINAMENTO_INICIAL);
  const [treinamentos, setTreinamentos] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLista, setIsLoadingLista] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroLista, setErroLista] = useState(null);

  const carregarTreinamentos = useCallback(async () => {
    setIsLoadingLista(true);
    setErroLista(null);
    try {
      const data = await treinamentosService.listarTreinamentos(filtros);
      setTreinamentos(data?.treinamentos ?? data ?? []);
    } catch (err) {
      setErroLista(err);
    } finally {
      setIsLoadingLista(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregarTreinamentos();
  }, [carregarTreinamentos]);

  function atualizarCampoTreinamento(campo, valor) {
    setTreinamento((prev) => ({ ...prev, [campo]: valor }));
  }

  function atualizarFiltro(campo, valor) {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  }

  async function cadastrarTreinamento() {
    setIsSubmitting(true);
    setErro(null);
    try {
      await treinamentosService.cadastrarTreinamento(treinamento);
      setTreinamento(TREINAMENTO_INICIAL);
      await carregarTreinamentos();
    } catch (err) {
      setErro(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function alterarStatus(treinamentoId, status) {
    setTreinamentos((prev) =>
      prev.map((item) => (item.id === treinamentoId ? { ...item, status } : item))
    );
    try {
      await treinamentosService.atualizarStatusTreinamento(treinamentoId, status);
    } catch (err) {
      setErroLista(err);
    }
  }

  async function salvarEdicao(treinamentoAlvo, payload) {
    await treinamentosService.editarTreinamento(treinamentoAlvo.id, payload);
    setTreinamentos((prev) =>
      prev.map((item) => (item.id === treinamentoAlvo.id ? { ...item, ...payload } : item))
    );
  }

  return {
    treinamento,
    treinamentos,
    filtros,
    atualizarCampoTreinamento,
    atualizarFiltro,
    cadastrarTreinamento,
    alterarStatus,
    salvarEdicao,
    isSubmitting,
    isLoadingLista,
    erro,
    erroLista,
  };
}