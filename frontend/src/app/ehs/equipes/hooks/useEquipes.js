"use client";

import { useCallback, useEffect, useState } from "react";
import { equipesService } from "../equipesService";

const EQUIPE_INICIAL = { nome: "", setor: "", colaboradoresIds: [] };

export function useEquipes() {
  const [equipe, setEquipe] = useState(EQUIPE_INICIAL);
  const [equipes, setEquipes] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradoresSemEquipe, setColaboradoresSemEquipe] = useState([]);
  const [buscaColaborador, setBuscaColaborador] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEquipes, setIsLoadingEquipes] = useState(true);
  const [isLoadingSemEquipe, setIsLoadingSemEquipe] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroEquipes, setErroEquipes] = useState(null);
  const [erroSemEquipe, setErroSemEquipe] = useState(null);

  const carregarEquipes = useCallback(async () => {
    setIsLoadingEquipes(true);
    setErroEquipes(null);
    try {
      const data = await equipesService.listarEquipes();
      setEquipes(data?.equipes ?? data ?? []);
    } catch (err) {
      setErroEquipes(err);
    } finally {
      setIsLoadingEquipes(false);
    }
  }, []);

  const carregarColaboradoresSemEquipe = useCallback(async () => {
    setIsLoadingSemEquipe(true);
    setErroSemEquipe(null);
    try {
      const data = await equipesService.listarColaboradoresSemEquipe();
      setColaboradoresSemEquipe(data?.colaboradores ?? data ?? []);
    } catch (err) {
      setErroSemEquipe(err);
    } finally {
      setIsLoadingSemEquipe(false);
    }
  }, []);

  useEffect(() => {
    carregarEquipes();
    carregarColaboradoresSemEquipe();

    equipesService
      .listarColaboradores()
      .then((data) => setColaboradores(data?.colaboradores ?? data ?? []))
      .catch(() => setColaboradores([]));
  }, [carregarEquipes, carregarColaboradoresSemEquipe]);

  function atualizarCampoEquipe(campo, valor) {
    setEquipe((prev) => ({ ...prev, [campo]: valor }));
  }

  function toggleColaboradorEquipe(colaboradorId) {
    setEquipe((prev) => {
      const jaSelecionado = prev.colaboradoresIds.includes(colaboradorId);
      return {
        ...prev,
        colaboradoresIds: jaSelecionado
          ? prev.colaboradoresIds.filter((id) => id !== colaboradorId)
          : [...prev.colaboradoresIds, colaboradorId],
      };
    });
  }

  async function cadastrarEquipe() {
    setIsSubmitting(true);
    setErro(null);
    try {
      await equipesService.cadastrarEquipe(equipe);
      setEquipe(EQUIPE_INICIAL);
      setBuscaColaborador("");
      await Promise.all([carregarEquipes(), carregarColaboradoresSemEquipe()]);
    } catch (err) {
      setErro(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function salvarEdicaoEquipe(equipeAlvo, payload) {
    await equipesService.editarEquipe(equipeAlvo.id, payload);
    await Promise.all([carregarEquipes(), carregarColaboradoresSemEquipe()]);
  }

  return {
    equipe,
    equipes,
    colaboradores,
    colaboradoresSemEquipe,
    buscaColaborador,
    setBuscaColaborador,
    atualizarCampoEquipe,
    toggleColaboradorEquipe,
    cadastrarEquipe,
    salvarEdicaoEquipe,
    isSubmitting,
    isLoadingEquipes,
    isLoadingSemEquipe,
    erro,
    erroEquipes,
    erroSemEquipe,
  };
}