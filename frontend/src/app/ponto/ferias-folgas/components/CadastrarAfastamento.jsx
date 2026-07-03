"use client";

import { Briefcase, ChevronDown } from "lucide-react";
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
  backgroundColor: "#e7eee1",
  width: "100%",
};

export default function CadastrarAfastamento({
  afastamento = { colaborador: "", tipo: "", dataInicio: "", dataFim: "" },
  tiposAfastamento = [
    { value: "ferias", label: "Férias" },
    { value: "licenca_medica", label: "Licença médica" },
    { value: "licenca_maternidade", label: "Licença maternidade" },
    { value: "outro", label: "Outro" },
  ],
  onChangeCampo,
  onCadastrar,
  onVerTodos,
  isSubmitting = false,
}) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      {/* HEADER */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
      >
        <Briefcase size={20} className="text-[#374f30]" />
        <h2 className="text-[#222] font-semibold" style={{ fontSize: "20px" }}>
          Cadastrar afastamento
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* INPUT COLABORADOR (busca por nome) */}
        <input
          type="text"
          placeholder="Buscar colaborador..."
          value={afastamento.colaborador}
          onChange={(e) => onChangeCampo("colaborador", e.target.value)}
          style={{ ...campoStyle, color: afastamento.colaborador ? "#374f30" : "#8a9a85" }}
        />

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* SELECT TIPO DE AFASTAMENTO */}
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <select
              value={afastamento.tipo}
              onChange={(e) => onChangeCampo("tipo", e.target.value)}
              style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
            >
              <option value="">Tipo de afastamento</option>
              {tiposAfastamento.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="text-[#8a9a85] pointer-events-none"
              style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}
            />
          </div>

          {/* DATA DE INÍCIO */}
          <input
            type="date"
            value={afastamento.dataInicio}
            onChange={(e) => onChangeCampo("dataInicio", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 160px" }}
          />

          {/* DATA DE FIM */}
          <input
            type="date"
            value={afastamento.dataFim}
            onChange={(e) => onChangeCampo("dataFim", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 160px" }}
          />
        </div>

        {/* BOTÃO CADASTRAR */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
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
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>

        {/* LINK VISUALIZAR TODOS */}
        <button
          type="button"
          onClick={onVerTodos}
          style={{ fontSize: "13px", color: "#5a6a55", textDecoration: "underline", textAlign: "center" }}
          className="hover:opacity-80 transition-opacity"
        >
          Visualizar todos os afastamentos
        </button>
      </div>
    </section>
  );
}