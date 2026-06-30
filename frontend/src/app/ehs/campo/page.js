"use client";

import CampoHeader from "../../components/CampoHeader";
import AlocacaoAtual from "../../components/AlocacaoAtual";
import MoradiaColaborador from "../../components/MoradiaColaborador";
import TreinamentosCampo from "../../components/TreinamentosCampo";
import UltimasAlocacoes from "../../components/UltimasAlocacoes";
import { useCampo } from "../../hooks/useCampo";

export default function CampoPage() {
  const {
    alocacaoAtual,
    treinamentosRealizados,
    treinamentosPendentes,
    ultimasAlocacoes,
    moradia,
    isLoadingHistorico,
    isLoadingMoradia,
    erroHistorico,
    erroMoradia,
  } = useCampo();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <CampoHeader />

      <AlocacaoAtual alocacao={alocacaoAtual} />

      <MoradiaColaborador
        moradia={moradia}
        isLoading={isLoadingMoradia}
        erro={erroMoradia}
      />

      <TreinamentosCampo
        realizados={treinamentosRealizados}
        pendentes={treinamentosPendentes}
      />

      <UltimasAlocacoes
        alocacoes={ultimasAlocacoes}
        isLoading={isLoadingHistorico}
        erro={erroHistorico}
      />
    </div>
  );
}