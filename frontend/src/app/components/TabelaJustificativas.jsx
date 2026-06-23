"use client";

import { Heebo } from "next/font/google";
import { FileText } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
  verticalAlign: "top",
};

function StatusDots({ status, onAprovar, onReprovar }) {
  const dotStyle = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "none",
  };

  if (status === "pendente") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          type="button"
          aria-label="Reprovar justificativa"
          onClick={onReprovar}
          style={{ ...dotStyle, backgroundColor: "#c0504d" }}
          className="hover:opacity-80 transition-opacity"
        />
        <button
          type="button"
          aria-label="Aprovar justificativa"
          onClick={onAprovar}
          style={{ ...dotStyle, backgroundColor: "#3a6b35" }}
          className="hover:opacity-80 transition-opacity"
        />
      </div>
    );
  }

  if (status === "reprovado") {
    return (
      <div
        style={{ ...dotStyle, backgroundColor: "#c0504d" }}
        title="Reprovado"
        aria-label="Reprovado"
      />
    );
  }

  return (
    <div
      style={{ ...dotStyle, backgroundColor: "#3a6b35" }}
      title="Aprovado"
      aria-label="Aprovado"
    />
  );
}

export default function TabelaJustificativas({
  justificativas = [],
  isLoading,
  erro,
  onAprovar,
  onReprovar,
  onVerDetalhes,
}) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden" }}
      className={heebo.className}
    >
      <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f3f6f0" }}>
            <th
              style={{
                padding: "16px 24px",
                fontSize: "12px",
                color: "#7d8d78",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 500,
              }}
            >
              Nome Completo
            </th>
            <th
              style={{
                padding: "16px 24px",
                fontSize: "12px",
                color: "#7d8d78",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 500,
              }}
            >
              Detalhamento
            </th>
            <th style={{ width: "112px" }} />
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Carregando justificativas...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#b05a55" }}>
                Não foi possível carregar os dados. Tente novamente em alguns instantes.
              </td>
            </tr>
          )}

          {!isLoading && !erro && justificativas.length === 0 && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Nenhuma justificativa encontrada para os filtros selecionados.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            justificativas.map((justificativa) => (
              <tr
                key={justificativa.id}
                style={{ backgroundColor: "#f7faf5", borderTop: "1px solid #eef2ea" }}
              >
                <td style={celulaStyle}>{justificativa.nome}</td>
                <td style={{ ...celulaStyle, color: "#5a6a55" }}>
                  {justificativa.detalhamento}
                </td>
                <td style={celulaStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-end" }}>
                    <StatusDots
                      status={justificativa.status}
                      onAprovar={() => onAprovar?.(justificativa.id)}
                      onReprovar={() => onReprovar?.(justificativa.id)}
                    />
                    <button
                      type="button"
                      onClick={() => onVerDetalhes?.(justificativa.id)}
                      aria-label={`Ver detalhes da justificativa de ${justificativa.nome}`}
                      style={{ color: "#3a6b35", border: "none", backgroundColor: "transparent" }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <FileText size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}