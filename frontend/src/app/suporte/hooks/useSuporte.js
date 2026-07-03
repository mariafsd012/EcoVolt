"use client";

import { useCallback, useEffect, useState } from "react";
import { suporteService } from "../suporteService";

const CHAMADO_INICIAL = { tipo: "", detalhamento: "" };

export function useSuporte() {
  const [chamado, setChamado] = useState(CHAMADO_INICIAL);
  const [chamados, setChamados] = useState([]);
  const [isLoadingLista, setIsLoadingLista] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [erro, setErro] = useState(null);
  const [erroLista, setErroLista] = useState(null);

  const carregarChamados = useCallback(async () => {
    setIsLoadingLista(true);
    setErroLista(null);
    try {
      const data = await suporteService.listarChamados();
      setChamados(data?.chamados ?? data ?? []);
    } catch (err) {
      setErroLista(err);
    } finally {
      setIsLoadingLista(false);
    }
  }, []);

  useEffect(() => {
    carregarChamados();
  }, [carregarChamados]);

  function atualizarCampoChamado(campo, valor) {
    setChamado((prev) => ({ ...prev, [campo]: valor }));
  }

  async function abrirChamado() {
    setIsSubmitting(true);
    setErro(null);
    try {
      await suporteService.abrirChamado(chamado);
      setChamado(CHAMADO_INICIAL);
      await carregarChamados();
    } catch (err) {
      setErro(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function alterarSituacao(chamadoId, situacao) {
    setChamados((prev) =>
      prev.map((item) =>
        item.id === chamadoId ? { ...item, situacao } : item
      )
    );
    try {
      await suporteService.atualizarSituacaoChamado(chamadoId, situacao);
    } catch (err) {
      setErroLista(err);
    }
  }

  return {
    chamado,
    chamados,
    atualizarCampoChamado,
    abrirChamado,
    alterarSituacao,
    isSubmitting,
    isLoadingLista,
    erro,
    erroLista,
  };
}