"use client";

import { useCallback, useEffect, useState } from "react";
import { tiService } from "../ti/tiService";

const EQUIPAMENTO_INICIAL = { tipo: "", colaborador: "", dataEntrega: "" };

export function useTI() {
  const [equipamento, setEquipamento] = useState(EQUIPAMENTO_INICIAL);
  const [equipamentos, setEquipamentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLista, setIsLoadingLista] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroLista, setErroLista] = useState(null);

  const carregarEquipamentos = useCallback(async () => {
    setIsLoadingLista(true);
    setErroLista(null);
    try {
      const data = await tiService.listarEquipamentos({ busca });
      setEquipamentos(data?.equipamentos ?? data ?? []);
    } catch (err) {
      setErroLista(err);
    } finally {
      setIsLoadingLista(false);
    }
  }, [busca]);

  useEffect(() => {
    carregarEquipamentos();
  }, [carregarEquipamentos]);

  function atualizarCampoEquipamento(campo, valor) {
    setEquipamento((prev) => ({ ...prev, [campo]: valor }));
  }

  async function cadastrarEquipamento() {
    setIsSubmitting(true);
    setErro(null);
    try {
      await tiService.cadastrarEquipamento(equipamento);
      setEquipamento(EQUIPAMENTO_INICIAL);
      await carregarEquipamentos();
    } catch (err) {
      setErro(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function alterarStatus(equipamentoId, status) {
    setEquipamentos((prev) =>
      prev.map((item) => (item.id === equipamentoId ? { ...item, status } : item))
    );
    try {
      await tiService.atualizarStatusEquipamento(equipamentoId, status);
    } catch (err) {
      setErroLista(err);
    }
  }

  async function salvarEdicao(equipamentoAlvo, payload) {
    await tiService.editarEquipamento(equipamentoAlvo.id, payload);
    setEquipamentos((prev) =>
      prev.map((item) => (item.id === equipamentoAlvo.id ? { ...item, ...payload } : item))
    );
  }

  return {
    equipamento,
    equipamentos,
    busca,
    setBusca,
    atualizarCampoEquipamento,
    cadastrarEquipamento,
    alterarStatus,
    salvarEdicao,
    isSubmitting,
    isLoadingLista,
    erro,
    erroLista,
  };
}