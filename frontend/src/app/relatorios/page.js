"use client";

import RelatoriosHeader from "../components/RelatoriosHeader";
import SeletorModulo from "../components/SeletorModulo";
import FiltrosRelatorioModulo from "../components/FiltrosRelatorioModulo";
import ResultadoRelatorioGeral from "../components/ResultadoRelatorioGeral";
import { useRelatorios } from "../hooks/useRelatorios";

export default function RelatoriosPage() {
  const {
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
  } = useRelatorios();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <RelatoriosHeader />

      <SeletorModulo moduloSelecionado={modulo} onSelecionarModulo={selecionarModulo} />

      <FiltrosRelatorioModulo
        modulo={modulo}
        filtros={filtros}
        onChangeFiltro={atualizarFiltro}
        onGerar={gerarRelatorio}
        isGerando={isGerando}
      />

      <ResultadoRelatorioGeral
        modulo={modulo}
        registros={registros}
        isLoading={isGerando}
        erro={erro}
        jaGerado={jaGerado}
        onExportar={exportarRelatorio}
      />
    </div>
  );
}