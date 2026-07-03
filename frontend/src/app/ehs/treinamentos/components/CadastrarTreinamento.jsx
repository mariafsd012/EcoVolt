"use client";

import { GraduationCap, ChevronDown } from "lucide-react";
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

export default function CadastrarTreinamento({
  treinamento = { colaborador: "", nome: "", status: "realizado", data: "", validade: "" },
  treinamentosDisponiveis = [
    { value: "nr10", label: "NR-10 — Segurança em Eletricidade" },
    { value: "nr35", label: "NR-35 — Trabalho em Altura" },
    { value: "nr33", label: "NR-33 — Espaços Confinados" },
    { value: "primeiros_socorros", label: "Primeiros Socorros" },
    { value: "operacao_equipamentos", label: "Operação de Equipamentos" },
    { value: "outro", label: "Outro" },
  ],
  onChangeCampo,
  onCadastrar,
  isSubmitting = false,
}) {
  const isRealizado = treinamento.status === "realizado";

  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      {/* HEADER */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
      >
        <GraduationCap size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Cadastrar treinamento
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* INPUT COLABORADOR */}
          <input
            type="text"
            placeholder="Colaborador"
            value={treinamento.colaborador}
            onChange={(e) => onChangeCampo("colaborador", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 220px", color: treinamento.colaborador ? "#374f30" : "#9aa893" }}
          />

          {/* SELECT TREINAMENTO */}
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <select
              value={treinamento.nome}
              onChange={(e) => onChangeCampo("nome", e.target.value)}
              style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
            >
              <option value="" disabled hidden>
                Treinamento
              </option>
              {treinamentosDisponiveis.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="text-[#8a9a85] pointer-events-none"
              style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}
            />
          </div>
        </div>

        {/* TOGGLE STATUS: REALIZADO OU PENDENTE */}
        <div style={{ display: "flex", gap: "16px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "56px",
              padding: "0 20px",
              borderRadius: "12px",
              backgroundColor: isRealizado ? "#3a6b35" : "#ffffff",
              color: isRealizado ? "#ffffff" : "#374f30",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              flex: "1 1 160px",
            }}
          >
            <input
              type="radio"
              name="statusTreinamento"
              value="realizado"
              checked={isRealizado}
              onChange={() => onChangeCampo("status", "realizado")}
              style={{ display: "none" }}
            />
            Realizado
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "56px",
              padding: "0 20px",
              borderRadius: "12px",
              backgroundColor: !isRealizado ? "#3a6b35" : "#ffffff",
              color: !isRealizado ? "#ffffff" : "#374f30",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              flex: "1 1 160px",
            }}
          >
            <input
              type="radio"
              name="statusTreinamento"
              value="pendente"
              checked={!isRealizado}
              onChange={() => onChangeCampo("status", "pendente")}
              style={{ display: "none" }}
            />
            Pendente
          </label>
        </div>

        {/* CAMPOS CONDICIONAIS */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px" }}>
            <span style={{ fontSize: "12px", color: "#ffffff", opacity: 0.85 }}>
              {isRealizado ? "Data de realização" : "Prazo"}
            </span>
            <input
              type="date"
              value={treinamento.data}
              onChange={(e) => onChangeCampo("data", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>

          {isRealizado && (
            <div style={{ flex: "1 1 200px" }}>
              <span style={{ fontSize: "12px", color: "#ffffff", opacity: 0.85 }}>
                Válido até
              </span>
              <input
                type="date"
                value={treinamento.validade}
                onChange={(e) => onChangeCampo("validade", e.target.value)}
                style={{ ...campoStyle, marginTop: "4px" }}
              />
            </div>
          )}
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
            {isSubmitting ? "Cadastrando..." : "Cadastrar treinamento"}
          </button>
        </div>
      </div>
    </section>
  );
}