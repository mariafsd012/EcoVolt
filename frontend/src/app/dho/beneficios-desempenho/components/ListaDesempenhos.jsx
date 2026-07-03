"use client";

import { Target, SquarePen } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const NIVEL_COR = {
  excelente: { bg: "#dbe8d1", text: "#3a6b35", label: "Excelente" },
  bom: { bg: "#dce8f5", text: "#2e5e8a", label: "Bom" },
  regular: { bg: "#fbf0d9", text: "#9a7b2e", label: "Regular" },
  abaixo: { bg: "#f6dedd", text: "#b05a55", label: "Abaixo do esperado" },
};

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

export default function ListaDesempenhos({
  desempenhos = [],
  isLoading,
  erro,
  onEditar,
}) {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
      }}
      className={heebo.className}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "28px 28px 16px",
        }}
      >
        <Target size={20} className="text-[#374f30]" />
        <h2
          className="text-[#374f30] font-semibold"
          style={{ fontSize: "20px" }}
        >
          Histórico de desempenhos
        </h2>
      </div>

      <table
        style={{
          width: "100%",
          textAlign: "left",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f3f6f0" }}>
            {["Colaborador", "Nível", "Meta", "Data", "Feedback"].map(
              (col) => (
                <th
                  key={col}
                  style={{
                    padding: "16px 24px",
                    fontSize: "12px",
                    color: "#7d8d78",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    fontWeight: 500,
                  }}
                >
                  {col}
                </th>
              )
            )}
            <th style={{ width: "60px" }} />
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td
                colSpan={6}
                style={{
                  ...celulaStyle,
                  textAlign: "center",
                  padding: "40px 24px",
                  color: "#8a9a85",
                }}
              >
                Carregando desempenhos...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td
                colSpan={6}
                style={{
                  ...celulaStyle,
                  textAlign: "center",
                  padding: "40px 24px",
                  color: "#b05a55",
                }}
              >
                Não foi possível carregar os desempenhos.
              </td>
            </tr>
          )}

          {!isLoading && !erro && desempenhos.length === 0 && (
            <tr>
              <td
                colSpan={6}
                style={{
                  ...celulaStyle,
                  textAlign: "center",
                  padding: "40px 24px",
                  color: "#8a9a85",
                }}
              >
                Nenhum desempenho registrado ainda.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            desempenhos.map((d, index) => {
              const cor = NIVEL_COR[d.nivel] ?? {
                bg: "#f3f6f0",
                text: "#7d8d78",
                label: d.nivel,
              };

              return (
                <tr
                  key={d.id}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#ffffff" : "#f7faf5",
                    borderTop: "1px solid #eef2ea",
                  }}
                >
                  <td style={{ ...celulaStyle, fontWeight: 600 }}>
                    {d.colaborador}
                  </td>

                  <td style={celulaStyle}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: cor.text,
                        backgroundColor: cor.bg,
                        padding: "4px 12px",
                        borderRadius: "999px",
                      }}
                    >
                      {cor.label}
                    </span>
                  </td>

                  <td style={celulaStyle}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "6px",
                          borderRadius: "999px",
                          backgroundColor: "#f3f6f0",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${d.meta ?? 0}%`,
                            height: "100%",
                            backgroundColor: "#3a6b35",
                            borderRadius: "999px",
                          }}
                        />
                      </div>

                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#374f30",
                        }}
                      >
                        {d.meta ?? 0}%
                      </span>
                    </div>
                  </td>

                  <td style={{ ...celulaStyle, color: "#5a6a55" }}>
                    {d.data || "-"}
                  </td>

                  <td
                    style={{
                      ...celulaStyle,
                      color: "#8a9a85",
                      maxWidth: "220px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.feedback || "-"}
                  </td>

                  <td style={{ ...celulaStyle, textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => onEditar?.(d)}
                      aria-label={`Editar desempenho de ${d.colaborador}`}
                      style={{
                        color: "#3a6b35",
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <SquarePen size={17} />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}