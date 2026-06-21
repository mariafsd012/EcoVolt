"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pontoService } from "../ponto/controle/pontoService";

// Enum Setor do backend (Colaborador.java) - fixo, não vem da API
export const SETORES = [
  { value: "CAMPO", label: "Campo" },
  { value: "DHO", label: "DHO" },
  { value: "TI", label: "T.I" },
  { value: "LOGISTICA", label: "Logística" },
  { value: "MORADIA", label: "Moradia" },
  { value: "PONTO", label: "Ponto" },
  { value: "EHS", label: "EHS" },
];

/**
 * Gerencia o estado da tela de Controle de Ponto:
 * - filtro por setor (= "equipe" no design) e por colaborador
 * - listagem de colaboradores
 * - estados de loading / erro
 *
 * Depende de GET /api/colaboradores existir no backend (ver nota em pontoService.js).
 */
export function useControlePonto() {
  const [colaboradores, setColaboradores] = useState([]);

  const [filtros, setFiltros] = useState({
    colaboradorId: "",
    setor: "",
  });

  const [isLoadingLista, setIsLoadingLista] = useState(true);
  const [erro, setErro] = useState(null);

  const abortRef = useRef(null);

  const buscarColaboradores = useCallback(async (filtrosAtuais) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoadingLista(true);
    setErro(null);

    try {
      const resposta = await pontoService.listarColaboradores(filtrosAtuais, {
        signal: controller.signal,
      });
      // resposta esperada: array de Colaborador (id, nome, cargo, setor)
      setColaboradores(Array.isArray(resposta) ? resposta : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setErro(err);
        setColaboradores([]);
      }
    } finally {
      setIsLoadingLista(false);
    }
  }, []);

  useEffect(() => {
    buscarColaboradores(filtros);
  }, [filtros, buscarColaboradores]);

  function atualizarFiltro(campo, valor) {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  }

  return {
    colaboradores,
    setores: SETORES,
    filtros,
    atualizarFiltro,
    isLoadingLista,
    erro,
    recarregar: () => buscarColaboradores(filtros),
  };
}