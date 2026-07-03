"use client";

import { useRouter } from "next/navigation";
import SuporteHeader from "../components/SuporteHeader";
import AbrirChamado from "./components/AbrirChamado";
import ChamadosRealizados from "./components/ChamadosRealizados";
import { useSuporte } from "./hooks/useSuporte";

export default function SuportePage() {
  const router = useRouter();

  const {
    chamado,
    chamados,
    atualizarCampoChamado,
    abrirChamado,
    alterarSituacao,
    isSubmitting,
    isLoadingLista,
    erroLista,
  } = useSuporte();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <SuporteHeader />

      <AbrirChamado
        chamado={chamado}
        onChangeCampo={atualizarCampoChamado}
        onAbrirChamado={abrirChamado}
        isSubmitting={isSubmitting}
      />

      <ChamadosRealizados
        chamados={chamados}
        isLoading={isLoadingLista}
        erro={erroLista}
        onChangeSituacao={alterarSituacao}
        onVerTodos={() => router.push("/suporte/chamados")}
      />
    </div>
  );
}