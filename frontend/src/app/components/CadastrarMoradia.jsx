"use client";

import { Home, ChevronDown, X } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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

const UTILIDADES = [
  { chave: "agua", label: "Água" },
  { chave: "energia", label: "Energia" },
  { chave: "internet", label: "Internet" },
  { chave: "gas", label: "Gás" },
];

export default function CadastrarMoradia({
  moradia = {
    endereco: "",
    cidade: "",
    dataInicio: "",
    dataEntrega: "",
    quartos: "",
    colaboradores: [],
    agua: false,
    energia: false,
    internet: false,
    gas: false,
  },
  colaboradoresDisponiveis = [],
  buscaColaborador = "",
  onChangeCampo,
  onChangeBuscaColaborador,
  onToggleColaborador,
  onRemoverColaborador,
  onCadastrar,
  isSubmitting = false,
}) {
  const sugestoes = buscaColaborador
    ? colaboradoresDisponiveis.filter(
        (c) =>
          c.nome.toLowerCase().includes(buscaColaborador.toLowerCase()) &&
          !moradia.colaboradores.some((sel) => sel.id === c.id)
      )
    : [];

  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <Home size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Cadastrar moradia
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* ENDEREÇO + CIDADE */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Endereço completo"
            value={moradia.endereco}
            onChange={(e) => onChangeCampo("endereco", e.target.value)}
            style={{ ...campoStyle, flex: "2 1 280px", color: moradia.endereco ? "#374f30" : "#9aa893" }}
          />
          <input
            type="text"
            placeholder="Cidade / Estado"
            value={moradia.cidade}
            onChange={(e) => onChangeCampo("cidade", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 200px", color: moradia.cidade ? "#374f30" : "#9aa893" }}
          />
        </div>

        {/* DATAS + QUARTOS */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 180px" }}>
            <span style={{ fontSize: "12px", color: "#ffffff", opacity: 0.85 }}>Data de início</span>
            <input
              type="date"
              value={moradia.dataInicio}
              onChange={(e) => onChangeCampo("dataInicio", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>
          <div style={{ flex: "1 1 180px" }}>
            <span style={{ fontSize: "12px", color: "#ffffff", opacity: 0.85 }}>Data de entrega</span>
            <input
              type="date"
              value={moradia.dataEntrega}
              onChange={(e) => onChangeCampo("dataEntrega", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <span style={{ fontSize: "12px", color: "#ffffff", opacity: 0.85 }}>Nº de quartos</span>
            <input
              type="number"
              min="1"
              placeholder="0"
              value={moradia.quartos}
              onChange={(e) => onChangeCampo("quartos", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>
        </div>

        {/* UTILITÁRIOS (checkboxes) */}
        <div>
          <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600, display: "block", marginBottom: "10px" }}>
            Inclui
          </span>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {UTILIDADES.map(({ chave, label }) => (
              <label
                key={chave}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "44px",
                  padding: "0 18px",
                  borderRadius: "10px",
                  backgroundColor: moradia[chave] ? "#3a6b35" : "#ffffff",
                  color: moradia[chave] ? "#ffffff" : "#374f30",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  flex: "1 1 120px",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!moradia[chave]}
                  onChange={(e) => onChangeCampo(chave, e.target.checked)}
                  style={{ display: "none" }}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* COLABORADORES */}
        <div>
          <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600, display: "block", marginBottom: "10px" }}>
            Colaboradores residentes ({moradia.colaboradores.length})
          </span>

          {/* pílulas dos já selecionados */}
          {moradia.colaboradores.length > 0 && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
              {moradia.colaboradores.map((c) => (
                <span
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    color: "#374f30",
                    backgroundColor: "#ffffff",
                    borderRadius: "999px",
                    padding: "6px 12px",
                    fontWeight: 500,
                  }}
                >
                  {c.nome}
                  <button
                    type="button"
                    onClick={() => onRemoverColaborador(c.id)}
                    style={{ border: "none", backgroundColor: "transparent", color: "#b05a55", lineHeight: 1 }}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Buscar e adicionar colaborador..."
              value={buscaColaborador}
              onChange={(e) => onChangeBuscaColaborador(e.target.value)}
              style={{ ...campoStyle, color: buscaColaborador ? "#374f30" : "#9aa893" }}
            />
            {sugestoes.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  zIndex: 10,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                {sugestoes.slice(0, 5).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onToggleColaborador(c)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 18px",
                      fontSize: "14px",
                      color: "#374f30",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                    className="hover:opacity-80"
                  >
                    {c.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTÃO */}
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
            {isSubmitting ? "Cadastrando..." : "Cadastrar moradia"}
          </button>
        </div>
      </div>
    </section>
  );
}