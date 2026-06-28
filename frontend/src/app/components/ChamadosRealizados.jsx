"use client";

import { Heebo } from "next/font/google";
import { MessageSquareText } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITUACAO_ESTILO = {
  aberto: { background: "#f3f6f0", texto: "#7d8d78", label: "Aberto" },
  pendente: { background: "#fbf0d9", texto: "#9a7b2e", label: "Em andamento" },
  finalizado: { background: "#dbe8d1", texto: "#3a6b35", label: "Resolvido" },
  recusado: { background: "#f6dedd", texto: "#b05a55", label: "Recusado" },
};

export default function ChamadosRealizados({
  chamados = [],
  isLoading,
  erro,
}) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}
      >
        <MessageSquareText size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Chamados realizados
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "12px", color: "#7d8d78", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>
          Detalhamento
        </span>
        <span style={{ fontSize: "12px", color: "#7d8d78", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>
          Situação
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {isLoading && (
          <div style={{ textAlign: "center", padding: "32px", fontSize: "14px", color: "#8a9a85" }}>
            Carregando chamados...
          </div>
        )}

        {!isLoading && erro && (
          <div style={{ textAlign: "center", padding: "32px", fontSize: "14px", color: "#b05a55" }}>
            Não foi possível carregar seus chamados.
          </div>
        )}

        {!isLoading && !erro && chamados.length === 0 && (
          <div style={{ textAlign: "center", padding: "32px", fontSize: "14px", color: "#8a9a85" }}>
            Nenhum chamado realizado até o momento.
          </div>
        )}

        {!isLoading &&
          !erro &&
          chamados.map((chamado) => {
            const estilo = SITUACAO_ESTILO[chamado.status?.toLowerCase()] ?? SITUACAO_ESTILO.aberto;
            return (
              <div
                key={chamado.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "18px 20px",
                  borderRadius: "12px",
                  backgroundColor: estilo.background,
                }}
              >
                <span style={{ fontSize: "14px", color: "#374f30" }}>
                  {chamado.descricao}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: estilo.texto,
                    whiteSpace: "nowrap",
                  }}
                >
                  {estilo.label}
                </span>
              </div>
            );
          })}
      </div>
    </section>
  );
}