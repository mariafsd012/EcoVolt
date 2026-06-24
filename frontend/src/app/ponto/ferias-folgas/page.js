"use client";

import { useRouter } from "next/navigation";
import PontoHeader from "../../components/PontoHeader";
import CadastrarFeriado from "../../components/CadastrarFeriado";
import CadastrarAfastamento from "../../components/CadastrarAfastamento";
import { useFeriasFolgas } from "../../hooks/useFeriasFolgas";

export default function FeriasFolgasPage() {
  const router = useRouter();

  const {
    feriado,
    afastamento,
    atualizarCampoFeriado,
    atualizarCampoAfastamento,
    cadastrarFeriado,
    cadastrarAfastamento,
    isSubmittingFeriado,
    isSubmittingAfastamento,
  } = useFeriasFolgas();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "0.25cm", paddingRight: "0.25cm" }}
    >
      <PontoHeader />

      <CadastrarFeriado
        feriado={feriado}
        onChangeCampo={atualizarCampoFeriado}
        onCadastrar={cadastrarFeriado}
        isSubmitting={isSubmittingFeriado}
        onVerTodos={() => router.push("/ponto/ferias-folgas/feriados")}
      />

      <CadastrarAfastamento
        afastamento={afastamento}
        onChangeCampo={atualizarCampoAfastamento}
        onCadastrar={cadastrarAfastamento}
        isSubmitting={isSubmittingAfastamento}
        onVerTodos={() => router.push("/ponto/ferias-folgas/afastamentos")}
      />
    </div>
  );
}