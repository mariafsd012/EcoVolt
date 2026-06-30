"use client";

import { useCallback, useEffect, useState } from "react";
import { dhoService } from "../dho/dhoService";

const BENEFICIO_INICIAL = {
  nome: "",
  tipo: "",
  valor: "",
  dataInicio: "",
  dataFim: "",
  descricao: "",
};

const DESEMPENHO_INICIAL = {
  colaborador: "",
  nivel: "",
  meta: 50,
  feedback: "",
  data: "",
};

export function useDHO() {
  const [beneficio, setBeneficio] = useState(BENEFICIO_INICIAL);
  const [beneficios, setBeneficios] = useState([]);

  const [desempenho, setDesempenho] = useState(DESEMPENHO_INICIAL);
  const [desempenhos, setDesempenhos] = useState([]);

  const [isSubmittingBeneficio, setIsSubmittingBeneficio] = useState(false);
  const [isSubmittingDesempenho, setIsSubmittingDesempenho] = useState(false);

  const [isLoadingBeneficios, setIsLoadingBeneficios] = useState(true);
  const [isLoadingDesempenhos, setIsLoadingDesempenhos] = useState(true);

  const [erroBeneficios, setErroBeneficios] = useState(null);
  const [erroDesempenhos, setErroDesempenhos] = useState(null);

  const carregarBeneficios = useCallback(async () => {
    setIsLoadingBeneficios(true);
    setErroBeneficios(null);

    try {
      const data = await dhoService.listarBeneficios();
      setBeneficios(data?.beneficios ?? data ?? []);
    } catch (err) {
      setErroBeneficios(err);
    } finally {
      setIsLoadingBeneficios(false);
    }
  }, []);

  const carregarDesempenhos = useCallback(async () => {
    setIsLoadingDesempenhos(true);
    setErroDesempenhos(null);

    try {
      const data = await dhoService.listarDesempenhos();
      setDesempenhos(data?.desempenhos ?? data ?? []);
    } catch (err) {
      setErroDesempenhos(err);
    } finally {
      setIsLoadingDesempenhos(false);
    }
  }, []);

  useEffect(() => {
    // carregarBeneficios/carregarDesempenhos são funções async que buscam dados
    // externos; o setState ocorre após o await, não de forma síncrona no efeito.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarBeneficios();
    carregarDesempenhos();
  }, [carregarBeneficios, carregarDesempenhos]);

  function atualizarCampoBeneficio(campo, valor) {
    setBeneficio((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function atualizarCampoDesempenho(campo, valor) {
    setDesempenho((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  async function cadastrarBeneficio() {
    setIsSubmittingBeneficio(true);

    try {
      await dhoService.cadastrarBeneficio(beneficio);
      setBeneficio(BENEFICIO_INICIAL);
      await carregarBeneficios();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingBeneficio(false);
    }
  }

  async function registrarDesempenho() {
    setIsSubmittingDesempenho(true);

    try {
      await dhoService.registrarDesempenho(desempenho);
      setDesempenho(DESEMPENHO_INICIAL);
      await carregarDesempenhos();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingDesempenho(false);
    }
  }

  return {
    beneficio,
    beneficios,
    desempenho,
    desempenhos,
    atualizarCampoBeneficio,
    atualizarCampoDesempenho,
    cadastrarBeneficio,
    registrarDesempenho,
    isSubmittingBeneficio,
    isSubmittingDesempenho,
    isLoadingBeneficios,
    isLoadingDesempenhos,
    erroBeneficios,
    erroDesempenhos,
  };
}