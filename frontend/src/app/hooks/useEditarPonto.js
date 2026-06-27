"use client";

import { useCallback, useEffect, useState } from "react";
import { pontoService } from "../ponto/controle/pontoService";

export function useEditarPonto(colaboradorId) {
  const [colaborador, setColaborador] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarHistorico = useCallback(async () => {
    if (!colaboradorId) {
      setIsLoading(false);
      setErro(new Error("Colaborador não informado."));
      return;
    }

    setIsLoading(true);
    setErro(null);
    try {
      const data = await pontoService.buscarHistoricoPorPeriodo(colaboradorId, periodo);
      setColaborador(data?.colaborador ?? null);
      setRegistros(data?.registros ?? data ?? []);
    } catch (err) {
      setErro(err);
    } finally {
      setIsLoading(false);
    }
  }, [colaboradorId, periodo]);

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  async function salvarRegistro(registroId, payload) {
    await pontoService.editarRegistro(registroId, payload);
    setRegistros((prev) =>
      prev.map((registro) =>
        registro.id === registroId ? { ...registro, ...payload } : registro
      )
    );
  }

  async function lancarJustificativaAusencia(payload) {
    await pontoService.lancarJustificativaAusencia(payload);
  }

  return {
    colaborador,
    registros,
    periodo,
    setPeriodo,
    isLoading,
    erro,
    salvarRegistro,
    lancarJustificativaAusencia,
  };
}