"use client";

import { useCallback, useEffect, useState } from "react";
import { moradiaService } from "../moradia/moradiaService";

const MORADIA_INICIAL = {
  endereco: "",
  cidade: "",
  dataInicio: "",
  dataEntrega: "",
  quartos: "",
  colaboradores: [],
  agua: false,
  energia: false,
  internet: false,
  gas: false,
};

export function useMoradia() {
  const [moradia, setMoradia] = useState(MORADIA_INICIAL);
  const [moradias, setMoradias] = useState([]);
  const [contas, setContas] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [buscaColaborador, setBuscaColaborador] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMoradias, setIsLoadingMoradias] = useState(true);
  const [isLoadingContas, setIsLoadingContas] = useState(true);
  const [erroMoradias, setErroMoradias] = useState(null);
  const [erroContas, setErroContas] = useState(null);

  const carregarMoradias = useCallback(async () => {
    setIsLoadingMoradias(true);
    setErroMoradias(null);
    try {
      const data = await moradiaService.listarMoradias();
      setMoradias(data?.moradias ?? data ?? []);
    } catch (err) {
      setErroMoradias(err);
    } finally {
      setIsLoadingMoradias(false);
    }
  }, []);

  const carregarContas = useCallback(async () => {
    setIsLoadingContas(true);
    setErroContas(null);
    try {
      const data = await moradiaService.listarContas();
      setContas(data?.contas ?? data ?? []);
    } catch (err) {
      setErroContas(err);
    } finally {
      setIsLoadingContas(false);
    }
  }, []);

  useEffect(() => {
    carregarMoradias();
    carregarContas();
    moradiaService
      .listarColaboradores()
      .then((data) => setColaboradores(data?.colaboradores ?? data ?? []))
      .catch(() => setColaboradores([]));
  }, [carregarMoradias, carregarContas]);

  function atualizarCampoMoradia(campo, valor) {
    setMoradia((prev) => ({ ...prev, [campo]: valor }));
  }

  function adicionarColaborador(colaborador) {
    setMoradia((prev) => ({
      ...prev,
      colaboradores: [...prev.colaboradores, colaborador],
    }));
    setBuscaColaborador("");
  }

  function removerColaborador(colaboradorId) {
    setMoradia((prev) => ({
      ...prev,
      colaboradores: prev.colaboradores.filter((c) => c.id !== colaboradorId),
    }));
  }

  async function cadastrarMoradia() {
    setIsSubmitting(true);
    try {
      await moradiaService.cadastrarMoradia({
        ...moradia,
        colaboradoresIds: moradia.colaboradores.map((c) => c.id),
      });
      setMoradia(MORADIA_INICIAL);
      setBuscaColaborador("");
      await carregarMoradias();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function salvarEdicao(moradiaAlvo, payload) {
    await moradiaService.editarMoradia(moradiaAlvo.id, payload);
    await carregarMoradias();
  }

  async function anexarConta(payload) {
    await moradiaService.anexarConta(payload);
    await carregarContas();
  }

  async function removerConta(contaId) {
    await moradiaService.removerConta(contaId);
    setContas((prev) => prev.filter((c) => c.id !== contaId));
  }

  return {
    moradia,
    moradias,
    contas,
    colaboradores,
    buscaColaborador,
    setBuscaColaborador,
    atualizarCampoMoradia,
    adicionarColaborador,
    removerColaborador,
    cadastrarMoradia,
    salvarEdicao,
    anexarConta,
    removerConta,
    isSubmitting,
    isLoadingMoradias,
    isLoadingContas,
    erroMoradias,
    erroContas,
  };
}