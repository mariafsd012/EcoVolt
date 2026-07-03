"use client";

import { useState } from "react";
import EquipesHeader from "./components/EquipesHeader";
import CadastrarEquipe from "./components/CadastrarEquipe";
import ListaEquipes from "./components/ListaEquipes";
import ColaboradoresSemEquipe from "./components/ColaboradoresSemEquipe";
import ModalEditarEquipe from "./components/ModalEditarEquipe";
import { useEquipes } from "./hooks/useEquipes";

export default function EquipesPage() {
  const {
    equipe,
    equipes,
    colaboradores,
    colaboradoresSemEquipe,
    buscaColaborador,
    setBuscaColaborador,
    atualizarCampoEquipe,
    toggleColaboradorEquipe,
    cadastrarEquipe,
    salvarEdicaoEquipe,
    isSubmitting,
    isLoadingEquipes,
    isLoadingSemEquipe,
    erroEquipes,
    erroSemEquipe,
  } = useEquipes();

  const [equipeSelecionada, setEquipeSelecionada] = useState(null);

  async function handleSalvarEdicao(equipeAlvo, payload) {
    await salvarEdicaoEquipe(equipeAlvo, payload);
    setEquipeSelecionada(null);
  }

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <EquipesHeader />

      <CadastrarEquipe
        equipe={equipe}
        colaboradoresDisponiveis={colaboradores}
        buscaColaborador={buscaColaborador}
        onChangeCampo={atualizarCampoEquipe}
        onChangeBuscaColaborador={setBuscaColaborador}
        onToggleColaborador={toggleColaboradorEquipe}
        onCadastrar={cadastrarEquipe}
        isSubmitting={isSubmitting}
      />

      <ListaEquipes
        equipes={equipes}
        isLoading={isLoadingEquipes}
        erro={erroEquipes}
        onEditar={setEquipeSelecionada}
      />

      <ColaboradoresSemEquipe
        colaboradores={colaboradoresSemEquipe}
        isLoading={isLoadingSemEquipe}
        erro={erroSemEquipe}
      />

      {equipeSelecionada && (
        <ModalEditarEquipe
          equipe={equipeSelecionada}
          colaboradoresDisponiveis={colaboradores}
          onClose={() => setEquipeSelecionada(null)}
          onSalvar={handleSalvarEdicao}
        />
      )}
    </div>
  );
}