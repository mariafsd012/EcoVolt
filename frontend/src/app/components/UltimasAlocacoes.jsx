"use client";

import { MapPin } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function UltimasAlocacoes({ alocacoes = [], isLoading, erro }) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px" }}
      className={heebo.className}
    >
      <span style={{ fontSize: "12px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, display: "block", marginBottom: "20px" }}>
        Últimas alocações
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {isLoading && (
          <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "20px 0" }}>
            Carregando histórico...
          </p>
        )}

        {!isLoading && erro && (
          <p style={{ fontSize: "13px", color: "#b05a55", textAlign: "center", padding: "20px 0" }}>
            Não foi possível carregar o histórico de alocações.
          </p>
        )}

        {!isLoading && !erro && alocacoes.length === 0 && (
          <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "20px 0" }}>
            Nenhuma alocação anterior encontrada.
          </p>
        )}

        {!isLoading &&
          !erro &&
          alocacoes.map((alocacao, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                backgroundColor: "#f7faf5",
                borderRadius: "12px",
                padding: "16px 20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#222" }}>{alocacao.titulo}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <MapPin size={13} className="text-[#8a9a85]" />
                  <span style={{ fontSize: "13px", color: "#5a6a55" }}>{alocacao.local}</span>
                </div>
              </div>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#5a6a55",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e8ede4",
                  borderRadius: "999px",
                  padding: "8px 16px",
                  whiteSpace: "nowrap",
                }}
              >
                {alocacao.dataInicio} → {alocacao.dataFim}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}