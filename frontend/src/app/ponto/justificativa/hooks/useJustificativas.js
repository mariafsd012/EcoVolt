"use client";

import { useCallback, useEffect, useState } from "react";
import { pontoService } from "../pontoService";

const FILTROS_INICIAIS = {
  colaborador: "",
  periodo: "",
  detalhamento: "",
};

export function useJustificativas() {
  const [justificativas, setJustificativas] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS);
  const [isLoadingLista, setIsLoadingLista] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarJustificativas = useCallback(async (filtrosAtuais) => {
    setIsLoadingLista(true);
    setErro(null);
    try {
      const data = await pontoService.listarJustificativas(filtrosAtuais);
      setJustificativas(data?.justificativas ?? data ?? []);
    } catch (err) {
      setErro(err);
    } finally {
      setIsLoadingLista(false);
    }
  }, []);

  useEffect(() => {
    carregarJustificativas(filtros);
  }, [filtros, carregarJustificativas]);

  function atualizarFiltro(campo, valor) {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  }

  async function aprovar(justificativaId) {
    await pontoService.aprovarJustificativa(justificativaId);
    setJustificativas((prev) =>
      prev.map((j) => (j.id === justificativaId ? { ...j, status: "aprovado" } : j))
    );
  }

  async function reprovar(justificativaId) {
    await pontoService.reprovarJustificativa(justificativaId);
    setJustificativas((prev) =>
      prev.map((j) => (j.id === justificativaId ? { ...j, status: "reprovado" } : j))
    );
  }

  return {
    justificativas,
    filtros,
    atualizarFiltro,
    isLoadingLista,
    erro,
    aprovar,
    reprovar,
  };
}