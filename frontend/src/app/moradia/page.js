"use client";

import { useState } from "react";
import MoradiaHeader from "../components/MoradiaHeader";
import CadastrarMoradia from "../components/CadastrarMoradia";
import ListaMoradias from "../components/ListaMoradias";
import ContasMoradia from "../components/ContasMoradia";
import { useMoradia } from "../hooks/useMoradia";

export default function MoradiaPage() {
  const {
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
    anexarConta,
    removerConta,
    isSubmitting,
    isLoadingMoradias,
    isLoadingContas,
    erroMoradias,
    erroContas,
  } = useMoradia();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <MoradiaHeader />

      <CadastrarMoradia
        moradia={moradia}
        colaboradoresDisponiveis={colaboradores}
        buscaColaborador={buscaColaborador}
        onChangeCampo={atualizarCampoMoradia}
        onChangeBuscaColaborador={setBuscaColaborador}
        onToggleColaborador={adicionarColaborador}
        onRemoverColaborador={removerColaborador}
        onCadastrar={cadastrarMoradia}
        isSubmitting={isSubmitting}
      />

      <ListaMoradias
        moradias={moradias}
        isLoading={isLoadingMoradias}
        erro={erroMoradias}
        onEditar={() => {}}
      />

      <ContasMoradia
        moradias={moradias}
        contas={contas}
        isLoading={isLoadingContas}
        onAnexarConta={anexarConta}
        onRemoverConta={removerConta}
      />
    </div>
  );
}