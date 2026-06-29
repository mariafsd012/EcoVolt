"use client";

import { useState } from "react";
import { relatoriosService } from "../relatorios/relatoriosService";

const FILTROS_INICIAIS_POR_MODULO = {
  ponto: { dataInicio: "", dataFim: "", colaborador: "", equipe: "", tipo: "todos" },
  frota: { colaborador: "", dataInicio: "", dataFim: "" },
  ti: { equipamento: "", colaborador: "" },
  ehs: { equipe: "", treinamento: "", dataInicio: "", dataFim: "" },
  dho: { colaborador: "", equipe: "", setor: "" },
  moradia: { colaborador: "", unidade: "", dataInicio: "", dataFim: "", status: "" },
};

export function useRelatorios() {
  const [modulo, setModulo] = useState("ponto");
  const [filtrosPorModulo, setFiltrosPorModulo] = useState(FILTROS_INICIAIS_POR_MODULO);
  const [registros, setRegistros] = useState([]);
  const [jaGerado, setJaGerado] = useState(false);
  const [isGerando, setIsGerando] = useState(false);
  const [erro, setErro] = useState(null);

  const filtros = filtrosPorModulo[modulo];

  function selecionarModulo(novoModulo) {
    setModulo(novoModulo);
    setJaGerado(false);
    setRegistros([]);
    setErro(null);
  }

  function atualizarFiltro(campo, valor) {
    setFiltrosPorModulo((prev) => ({
      ...prev,
      [modulo]: { ...prev[modulo], [campo]: valor },
    }));
  }

  async function gerarRelatorio() {
    setIsGerando(true);
    setJaGerado(true);
    setErro(null);
    try {
      const data = await relatoriosService.gerarRelatorio(modulo, filtros);
      setRegistros(data?.registros ?? data ?? []);
    } catch (err) {
      setErro(err);
    } finally {
      setIsGerando(false);
    }
  }

  async function exportarRelatorio() {
    await relatoriosService.exportarRelatorio(modulo, filtros);
  }

  return {
    modulo,
    selecionarModulo,
    filtros,
    atualizarFiltro,
    registros,
    jaGerado,
    isGerando,
    erro,
    gerarRelatorio,
    exportarRelatorio,
  };
}