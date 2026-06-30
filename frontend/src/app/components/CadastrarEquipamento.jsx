"use client";

import { Megaphone, ChevronDown } from "lucide-react";
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

export default function CadastrarEquipamento({
  equipamento = { tipo: "", colaborador: "", dataEntrega: "" },
  tiposEquipamento = [
    { value: "notebook", label: "Notebook" },
    { value: "celular", label: "Celular" },
    { value: "monitor", label: "Monitor" },
    { value: "headset", label: "Headset" },
    { value: "outro", label: "Outro" },
  ],
  onChangeCampo,
  onCadastrar,
  isSubmitting = false,
}) {
  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      {/* HEADER */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
      >
        <Megaphone size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Cadastrar novo equipamento
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* SELECT TIPO */}
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <select
              value={equipamento.tipo}
              onChange={(e) => onChangeCampo("tipo", e.target.value)}
              style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
            >
              <option value="" disabled hidden>
                Tipo
              </option>
              {tiposEquipamento.map((tipo) => (
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

          {/* INPUT COLABORADOR */}
          <input
            type="text"
            placeholder="Colaborador"
            value={equipamento.colaborador}
            onChange={(e) => onChangeCampo("colaborador", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 220px", color: equipamento.colaborador ? "#374f30" : "#9aa893" }}
          />

          {/* DATA DE ENTREGA */}
          <input
            type="date"
            value={equipamento.dataEntrega}
            onChange={(e) => onChangeCampo("dataEntrega", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 200px" }}
          />
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
            {isSubmitting ? "Cadastrando..." : "Cadastrar equipamento"}
          </button>
        </div>
      </div>
    </section>
  );
}