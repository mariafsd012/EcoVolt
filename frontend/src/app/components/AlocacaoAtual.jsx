"use client";

import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AlocacaoAtual({ alocacao }) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <span style={{ fontSize: "12px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
          Alocação atual
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#3a6b35",
            backgroundColor: "#dbe8d1",
            padding: "6px 14px",
            borderRadius: "999px",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3a6b35" }} />
          {alocacao?.status ?? "Em campo"}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            backgroundColor: "#3a6b35",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Briefcase size={20} color="#ffffff" />
        </div>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#222" }}>
            {alocacao?.titulo ?? "-"}
          </h2>
          <p style={{ fontSize: "13px", color: "#8a9a85", marginTop: "2px" }}>
            {alocacao?.subtitulo ?? "-"}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px", backgroundColor: "#f7faf5", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <MapPin size={14} className="text-[#5a6a55]" />
            <span style={{ fontSize: "12px", color: "#5a6a55", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Localização
            </span>
          </div>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#222" }}>
            {alocacao?.localizacao ?? "-"}
          </p>
        </div>

        <div style={{ flex: "1 1 260px", backgroundColor: "#f7faf5", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <Calendar size={14} className="text-[#5a6a55]" />
            <span style={{ fontSize: "12px", color: "#5a6a55", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Período
            </span>
          </div>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#222" }}>
            {alocacao?.dataInicio ?? "-"} → {alocacao?.dataFim ?? "-"}
          </p>
        </div>
      </div>
    </section>
  );
}