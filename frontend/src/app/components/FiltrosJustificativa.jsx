"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  backgroundColor: "#f7faf5",
  width: "100%",
};

export default function FiltrosJustificativa({
  filtros = { colaborador: "", periodo: "", detalhamento: "" },
  tiposDetalhamento = [
    { value: "abono", label: "Abono" },
    { value: "ajuste", label: "Ajuste" },
    { value: "falta", label: "Falta" },
  ],
  onChangeFiltro,
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
        <SlidersHorizontal size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Aplicar filtros
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* INPUT COLABORADOR (busca por nome) */}
        <input
          type="text"
          placeholder="Buscar colaborador..."
          value={filtros.colaborador}
          onChange={(e) => onChangeFiltro("colaborador", e.target.value)}
          style={{ ...campoStyle, color: filtros.colaborador ? "#374f30" : "#8a9a85" }}
        />

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* INPUT PERÍODO (seletor de data nativo) */}
          <input
            type="date"
            value={filtros.periodo}
            onChange={(e) => onChangeFiltro("periodo", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 200px" }}
          />

          {/* SELECT DETALHAMENTO */}
          <div style={{ position: "relative", flex: "1 1 200px" }}>
            <select
              value={filtros.detalhamento}
              onChange={(e) => onChangeFiltro("detalhamento", e.target.value)}
              style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
            >
              <option value="">Detalhamento</option>
              {tiposDetalhamento.map((tipo) => (
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
        </div>
      </div>
    </section>
  );
}