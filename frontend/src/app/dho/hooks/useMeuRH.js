"use client";

import { useEffect, useState, useCallback } from "react";
import { meuRHService } from "../service/meuRHService";

export function useMeuRH() {
  const [desempenhos, setDesempenhos] = useState([]);
  const [beneficios, setBeneficios] = useState([]);

  const [isLoadingDesempenhos, setIsLoadingDesempenhos] = useState(true);
  const [isLoadingBeneficios, setIsLoadingBeneficios] = useState(true);

  const [erroDesempenhos, setErroDesempenhos] = useState(null);
  const [erroBeneficios, setErroBeneficios] = useState(null);

  const carregarDesempenhos = useCallback(async () => {
    setIsLoadingDesempenhos(true);
    setErroDesempenhos(null);
    try {
      const data = await meuRHService.meuDesempenho();
      setDesempenhos(Array.isArray(data) ? data : data?.resultados ?? []);
    } catch (err) {
      setErroDesempenhos(
        err?.message ?? "Não foi possível carregar seu desempenho."
      );
    } finally {
      setIsLoadingDesempenhos(false);
    }
  }, []);

  const carregarBeneficios = useCallback(async () => {
    setIsLoadingBeneficios(true);
    setErroBeneficios(null);
    try {
      const data = await meuRHService.meusBeneficios();
      setBeneficios(Array.isArray(data) ? data : data?.resultados ?? []);
    } catch (err) {
      setErroBeneficios(
        err?.message ?? "Não foi possível carregar seus benefícios."
      );
    } finally {
      setIsLoadingBeneficios(false);
    }
  }, []);

  useEffect(() => {
    carregarDesempenhos();
    carregarBeneficios();
  }, [carregarDesempenhos, carregarBeneficios]);

  return {
    desempenhos,
    beneficios,
    isLoadingDesempenhos,
    isLoadingBeneficios,
    erroDesempenhos,
    erroBeneficios,
    recarregar: () => {
      carregarDesempenhos();
      carregarBeneficios();
    },
  };
}