"use client";

import DHOHeader from "./components/DHOHeader";
import CadastrarBeneficio from "./components/CadastrarBeneficio";
import ListaBeneficios from "./components/ListaBeneficios";
import CadastrarDesempenho from "./components/CadastrarDesempenho";
import ListaDesempenhos from "./components/ListaDesempenhos";
import { useDHO } from "./hooks/useDHO";

export default function DHOBeneficiosPage() {
  const {
    beneficio,
    beneficios,
    desempenho,
    desempenhos,
    atualizarCampoBeneficio,
    atualizarCampoDesempenho,
    cadastrarBeneficio,
    registrarDesempenho,
    isSubmittingBeneficio,
    isSubmittingDesempenho,
    isLoadingBeneficios,
    isLoadingDesempenhos,
    erroBeneficios,
    erroDesempenhos,
  } = useDHO();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <DHOHeader />

      <CadastrarBeneficio
        beneficio={beneficio}
        onChangeCampo={atualizarCampoBeneficio}
        onCadastrar={cadastrarBeneficio}
        isSubmitting={isSubmittingBeneficio}
      />

      <ListaBeneficios
        beneficios={beneficios}
        isLoading={isLoadingBeneficios}
        erro={erroBeneficios}
        onEditar={() => {}}
      />

      <CadastrarDesempenho
        desempenho={desempenho}
        onChangeCampo={atualizarCampoDesempenho}
        onSalvar={registrarDesempenho}
        isSubmitting={isSubmittingDesempenho}
      />

      <ListaDesempenhos
        desempenhos={desempenhos}
        isLoading={isLoadingDesempenhos}
        erro={erroDesempenhos}
        onEditar={() => {}}
      />
    </div>
  );
}