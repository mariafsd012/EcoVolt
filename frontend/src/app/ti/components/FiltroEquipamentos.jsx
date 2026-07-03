"use client";

import { SlidersHorizontal } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function FiltroEquipamentos({ busca, onChangeBusca }) {
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

      <input
        type="text"
        placeholder="Buscar por colaborador ou aparelho..."
        value={busca}
        onChange={(e) => onChangeBusca(e.target.value)}
        style={{
          height: "52px",
          padding: "0 20px",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          fontSize: "14px",
          fontWeight: 500,
          color: busca ? "#374f30" : "#8a9a85",
          backgroundColor: "#f7faf5",
          width: "100%",
        }}
      />
    </section>
  );
}