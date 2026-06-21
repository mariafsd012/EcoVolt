"use client";

import { useRouter } from "next/navigation";
import PontoHeader from "../../components/PontoHeader";
import FiltrosPonto from "../../components/FiltrosPonto";
import TabelaColaboradores from "../../components/TabelaColaboradores";
import { useControlePonto } from "../../hooks/useControlePonto";

export default function ControlePontoPage() {
  const router = useRouter();

  const {
    colaboradores,
    setores,
    filtros,
    atualizarFiltro,
    isLoadingLista,
    erro,
  } = useControlePonto();

  function handleEditar(colaboradorId) {
    // Ajustar a rota de destino conforme a navegação definida para edição de jornada
    router.push(`/ponto/controle/${colaboradorId}`);
  }

  return (
    <div className="min-h-screen bg-[#f8faf7] p-8 flex flex-col gap-6">
      <PontoHeader />

      <FiltrosPonto
        filtros={filtros}
        setores={setores}
        onChangeFiltro={atualizarFiltro}
      />

      <TabelaColaboradores
        colaboradores={colaboradores}
        isLoading={isLoadingLista}
        erro={erro}
        onEditar={handleEditar}
      />
    </div>
  );
}