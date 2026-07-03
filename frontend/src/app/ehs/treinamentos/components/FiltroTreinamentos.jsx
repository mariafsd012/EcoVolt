"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const campoStyle = {
  height: "52px",
  padding: "0 18px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  fontWeight: 500,
  color: "#374f30",
  backgroundColor: "#f7faf5",
};

export default function FiltroTreinamentos({
  filtros = { busca: "", status: "" },
  onChangeFiltro,
}) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px 28px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <SlidersHorizontal size={18} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "16px" }}>
          Aplicar filtros
        </h2>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar por colaborador ou treinamento..."
          value={filtros.busca}
          onChange={(e) => onChangeFiltro("busca", e.target.value)}
          style={{ ...campoStyle, flex: "2 1 280px", color: filtros.busca ? "#374f30" : "#8a9a85" }}
        />

        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <select
            value={filtros.status}
            onChange={(e) => onChangeFiltro("status", e.target.value)}
            style={{ ...campoStyle, width: "100%", paddingRight: "36px", appearance: "none" }}
          >
            <option value="">Todos os status</option>
            <option value="realizado">Realizado</option>
            <option value="pendente">Pendente</option>
          </select>
          <ChevronDown
            size={15}
            className="text-[#8a9a85] pointer-events-none"
            style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}
          />
        </div>
      </div>
    </section>
  );
}