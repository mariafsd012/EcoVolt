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
  // Isso fará o navegador ir para /ponto/controle/1, por exemplo
  router.push(`/ponto/controle/${colaboradorId}`);
}
  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "0.25cm", paddingRight: "0.25cm" }}
    >
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