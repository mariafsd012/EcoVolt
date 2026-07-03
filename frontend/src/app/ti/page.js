"use client";

import { useState } from "react";
import TIHeader from "../components/TIHeader";
import CadastrarEquipamento from "./components/CadastrarEquipamento";
import FiltroEquipamentos from "./components/FiltroEquipamentos";
import TabelaEquipamentos from "./components/TabelaEquipamentos";
import ModalEditarEquipamento from "./components/ModalEditarEquipamento";

import { useTI } from "./hooks/useTI";

export default function TIPage() {
  const {
    equipamento,
    equipamentos,
    busca,
    setBusca,
    atualizarCampoEquipamento,
    cadastrarEquipamento,
    alterarStatus,
    salvarEdicao,
    isSubmitting,
    isLoadingLista,
    erroLista,
  } = useTI();

  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  async function handleSalvarEdicao(equipamentoAlvo, payload) {
    await salvarEdicao(equipamentoAlvo, payload);
    setEquipamentoSelecionado(null);
  }

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <TIHeader />

      <CadastrarEquipamento
        equipamento={equipamento}
        onChangeCampo={atualizarCampoEquipamento}
        onCadastrar={cadastrarEquipamento}
        isSubmitting={isSubmitting}
      />

      <FiltroEquipamentos busca={busca} onChangeBusca={setBusca} />

      <TabelaEquipamentos
        equipamentos={equipamentos}
        isLoading={isLoadingLista}
        erro={erroLista}
        onChangeStatus={alterarStatus}
        onEditar={setEquipamentoSelecionado}
      />

      {equipamentoSelecionado && (
        <ModalEditarEquipamento
          equipamento={equipamentoSelecionado}
          onClose={() => setEquipamentoSelecionado(null)}
          onSalvar={handleSalvarEdicao}
        />
      )}
    </div>
  );
}