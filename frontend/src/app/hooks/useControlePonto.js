"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pontoService } from "../ponto/controle/pontoService";

export const SETORES = [
  { value: "CAMPO", label: "Campo" },
  { value: "DHO", label: "DHO" },
  { value: "TI", label: "T.I" },
  { value: "LOGISTICA", label: "Logística" },
  { value: "MORADIA", label: "Moradia" },
  { value: "PONTO", label: "Ponto" },
  { value: "EHS", label: "EHS" },
];

export function useControlePonto() {
  const [colaboradores, setColaboradores] = useState([]);
  const [filtros, setFiltros] = useState({
    colaboradorId: "",
    setor: "",
  });
  const [isLoadingLista, setIsLoadingLista] = useState(true);
  const [erro, setErro] = useState(null);

  const abortRef = useRef(null);

  // O useCallback garante que a função só mude se os filtros mudarem
  const buscarColaboradores = useCallback(async (filtrosAtuais) => {
    // Cancela requisição anterior se o usuário digitar rápido
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoadingLista(true);
    setErro(null);

    try {
      const resposta = await pontoService.listarColaboradores(filtrosAtuais, {
        signal: controller.signal,
      });
      
      setColaboradores(Array.isArray(resposta) ? resposta : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Erro ao buscar colaboradores:", err);
        setErro("Não foi possível carregar os colaboradores.");
        setColaboradores([]);
      }
    } finally {
      setIsLoadingLista(false);
    }
  }, []);

  // Efeito principal: dispara busca sempre que filtros mudam
  useEffect(() => {
    buscarColaboradores(filtros);
    
    // Cleanup no desmonte do componente
    return () => abortRef.current?.abort();
  }, [filtros, buscarColaboradores]);

  // Atualiza o filtro e reinicia a busca
  const atualizarFiltro = (campo, valor) => {
    setFiltros((prev) => ({ 
      ...prev, 
      [campo]: valor 
    }));
  };

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