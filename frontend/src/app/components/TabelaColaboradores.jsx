"use client";

import { Heebo } from "next/font/google";
import { SquarePen } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

export default function TabelaColaboradores({
  colaboradores,
  isLoading,
  erro,
  onEditar,
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
              Equipe
            </th>
            <th style={{ width: "48px" }} />
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Carregando colaboradores...
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

          {!isLoading && !erro && colaboradores.length === 0 && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Nenhum colaborador encontrado para os filtros selecionados.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            colaboradores.map((colaborador, index) => (
              <tr
                key={colaborador.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf5",
                  borderTop: "1px solid #eef2ea",
                }}
              >
                <td style={celulaStyle}>{colaborador.nome}</td>
                <td style={celulaStyle}>{colaborador.setor ?? "-"}</td>
                <td style={{ ...celulaStyle, textAlign: "right" }}>
                  <button
                    onClick={() => onEditar(colaborador.id)}
                    aria-label={`Editar registro de ${colaborador.nome}`}
                    style={{ color: "#3a6b35", border: "none", backgroundColor: "transparent" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <SquarePen size={17} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}