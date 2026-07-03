"use client";

import { useState } from "react";
import TreinamentosHeader from "./components/TreinamentosHeader";
import CadastrarTreinamento from "./components/CadastrarTreinamento";
import FiltroTreinamentos from "./components/FiltroTreinamentos";
import TabelaTreinamentos from "./components/TabelaTreinamentos";
import ModalEditarTreinamento from "./components/ModalEditarTreinamento";
import { useTreinamentos } from "./hooks/useTreinamentos";

export default function TreinamentosPage() {
  const {
    treinamento,
    treinamentos,
    filtros,
    atualizarCampoTreinamento,
    atualizarFiltro,
    cadastrarTreinamento,
    alterarStatus,
    salvarEdicao,
    isSubmitting,
    isLoadingLista,
    erroLista,
  } = useTreinamentos();

  const [treinamentoSelecionado, setTreinamentoSelecionado] = useState(null);

  async function handleSalvarEdicao(treinamentoAlvo, payload) {
    await salvarEdicao(treinamentoAlvo, payload);
    setTreinamentoSelecionado(null);
  }

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <TreinamentosHeader />

      <CadastrarTreinamento
        treinamento={treinamento}
        onChangeCampo={atualizarCampoTreinamento}
        onCadastrar={cadastrarTreinamento}
        isSubmitting={isSubmitting}
      />

      <FiltroTreinamentos filtros={filtros} onChangeFiltro={atualizarFiltro} />

      <TabelaTreinamentos
        treinamentos={treinamentos}
        isLoading={isLoadingLista}
        erro={erroLista}
        onChangeStatus={alterarStatus}
        onEditar={setTreinamentoSelecionado}
      />

      {treinamentoSelecionado && (
        <ModalEditarTreinamento
          treinamento={treinamentoSelecionado}
          onClose={() => setTreinamentoSelecionado(null)}
          onSalvar={handleSalvarEdicao}
        />
      )}
    </div>
  );
}