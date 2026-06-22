"use client";

import { useRouter } from "next/navigation";
import PontoHeader from "../../components/PontoHeader";
import FiltrosJustificativa from "../../components/FiltrosJustificativa";
import TabelaJustificativas from "../../components/TabelaJustificativas";
import { useJustificativas } from "../../hooks/useJustificativas";

export default function JustificativaPage() {
  const router = useRouter();

  const {
    justificativas,
    filtros,
    atualizarFiltro,
    isLoadingLista,
    erro,
    aprovar,
    reprovar,
  } = useJustificativas();

  function handleVerDetalhes(justificativaId) {
    // Ajustar a rota de destino conforme a navegação definida para detalhes da justificativa
    router.push(`/ponto/justificativa/${justificativaId}`);
  }

  return (
    <div className="min-h-screen bg-[#f8faf7] p-8 flex flex-col gap-6">
      <PontoHeader />

      <FiltrosJustificativa
        filtros={filtros}
        onChangeFiltro={atualizarFiltro}
      />

      <TabelaJustificativas
        justificativas={justificativas}
        isLoading={isLoadingLista}
        erro={erro}
        onAprovar={aprovar}
        onReprovar={reprovar}
        onVerDetalhes={handleVerDetalhes}
      />
    </div>
  );
}