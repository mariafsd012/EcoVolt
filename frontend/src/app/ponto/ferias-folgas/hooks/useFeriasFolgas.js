"use client";

import { useState } from "react";
import { pontoService } from "../pontoService";

const FERIADO_INICIAL = {
  nome: "",
  equipe: "",
  tipo: "",
  dataInicio: "",
  dataFim: "",
};

const AFASTAMENTO_INICIAL = {
  colaborador: "",
  tipo: "",
  dataInicio: "",
  dataFim: "",
};

export function useFeriasFolgas() {
  const [feriado, setFeriado] = useState(FERIADO_INICIAL);
  const [afastamento, setAfastamento] = useState(AFASTAMENTO_INICIAL);
  const [isSubmittingFeriado, setIsSubmittingFeriado] = useState(false);
  const [isSubmittingAfastamento, setIsSubmittingAfastamento] = useState(false);
  const [erro, setErro] = useState(null);

  function atualizarCampoFeriado(campo, valor) {
    setFeriado((prev) => ({ ...prev, [campo]: valor }));
  }

  function atualizarCampoAfastamento(campo, valor) {
    setAfastamento((prev) => ({ ...prev, [campo]: valor }));
  }

  async function cadastrarFeriado() {
    setIsSubmittingFeriado(true);
    setErro(null);
    try {
      await pontoService.cadastrarFeriado(feriado);
      setFeriado(FERIADO_INICIAL);
    } catch (err) {
      setErro(err);
    } finally {
      setIsSubmittingFeriado(false);
    }
  }

  async function cadastrarAfastamento() {
    setIsSubmittingAfastamento(true);
    setErro(null);
    try {
      await pontoService.cadastrarAfastamento(afastamento);
      setAfastamento(AFASTAMENTO_INICIAL);
    } catch (err) {
      setErro(err);
    } finally {
      setIsSubmittingAfastamento(false);
    }
  }

  return {
    feriado,
    afastamento,
    atualizarCampoFeriado,
    atualizarCampoAfastamento,
    cadastrarFeriado,
    cadastrarAfastamento,
    isSubmittingFeriado,
    isSubmittingAfastamento,
    erro,
  };
}