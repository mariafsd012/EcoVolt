"use client";

import { Users } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const campoStyle = {
  height: "56px",
  padding: "0 20px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "15px",
  fontWeight: 500,
  color: "#374f30",
  backgroundColor: "#ffffff",
  width: "100%",
};

export default function CadastrarEquipe({
  equipe = { nome: "", setor: "", colaboradoresIds: [] },
  colaboradoresDisponiveis = [],
  buscaColaborador = "",
  onChangeCampo,
  onChangeBuscaColaborador,
  onToggleColaborador,
  onCadastrar,
  isSubmitting = false,
}) {
  const listaFiltrada = buscaColaborador
    ? colaboradoresDisponiveis.filter((c) =>
        c.nome.toLowerCase().includes(buscaColaborador.toLowerCase())
      )
    : colaboradoresDisponiveis;

  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      {/* HEADER */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
      >
        <Users size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Cadastrar equipe
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* NOME DA EQUIPE */}
          <input
            type="text"
            placeholder="Nome da equipe"
            value={equipe.nome}
            onChange={(e) => onChangeCampo("nome", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 220px", color: equipe.nome ? "#374f30" : "#9aa893" }}
          />

          {/* SETOR / ÁREA */}
          <input
            type="text"
            placeholder="Setor / Área"
            value={equipe.setor}
            onChange={(e) => onChangeCampo("setor", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 220px", color: equipe.setor ? "#374f30" : "#9aa893" }}
          />
        </div>

        {/* SELEÇÃO DE COLABORADORES */}
        <div>
          <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600, marginBottom: "8px", display: "block" }}>
            Colaboradores ({equipe.colaboradoresIds.length} selecionado{equipe.colaboradoresIds.length === 1 ? "" : "s"})
          </span>

          <input
            type="text"
            placeholder="Buscar colaborador..."
            value={buscaColaborador}
            onChange={(e) => onChangeBuscaColaborador(e.target.value)}
            style={{ ...campoStyle, marginBottom: "10px", color: buscaColaborador ? "#374f30" : "#9aa893" }}
          />

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              maxHeight: "240px",
              overflowY: "auto",
            }}
          >
            {listaFiltrada.length === 0 && (
              <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "20px" }}>
                Nenhum colaborador encontrado.
              </p>
            )}

            {listaFiltrada.map((colaborador, index) => (
              <label
                key={colaborador.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 18px",
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf5",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={equipe.colaboradoresIds.includes(colaborador.id)}
                  onChange={() => onToggleColaborador(colaborador.id)}
                  style={{ width: "16px", height: "16px", accentColor: "#3a6b35" }}
                />
                <span style={{ fontSize: "14px", color: "#374f30" }}>{colaborador.nome}</span>
                <span style={{ fontSize: "12px", color: "#8a9a85", marginLeft: "auto" }}>
                  {colaborador.setor ?? "Sem equipe"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* BOTÃO CADASTRAR */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <button
            type="button"
            onClick={onCadastrar}
            disabled={isSubmitting}
            style={{
              backgroundColor: "#3a6b35",
              height: "48px",
              padding: "0 64px",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              opacity: isSubmitting ? 0.6 : 1,
              border: "none",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar equipe"}
          </button>
        </div>
      </div>
    </section>
  );
}