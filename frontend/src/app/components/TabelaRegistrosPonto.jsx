"use client";

import { Heebo } from "next/font/google";
import { SquarePen } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const colunas = [
  { chave: "data", label: "Data" },
  { chave: "entrada1", label: "1ª Entrada" },
  { chave: "saida1", label: "1ª Saída" },
  { chave: "entrada2", label: "2ª Entrada" },
  { chave: "saida2", label: "2ª Saída" },
  { chave: "ht", label: "HT" },
  { chave: "hr", label: "HR" },
  { chave: "he", label: "HE" },
];

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

export default function TabelaRegistrosPonto({
  registros = [],
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
            {colunas.map((coluna) => (
              <th
                key={coluna.chave}
                style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  color: "#7d8d78",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontWeight: 500,
                }}
              >
                {coluna.label}
              </th>
            ))}
            <th style={{ width: "80px" }} />
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={colunas.length + 1} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Carregando registros...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td colSpan={colunas.length + 1} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#b05a55" }}>
                Não foi possível carregar os registros de ponto.
              </td>
            </tr>
          )}

          {!isLoading && !erro && registros.length === 0 && (
            <tr>
              <td colSpan={colunas.length + 1} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Nenhum registro encontrado para o período selecionado.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            registros.map((registro, index) => (
              <tr
                key={registro.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf5",
                  borderTop: "1px solid #eef2ea",
                }}
              >
                {colunas.map((coluna) => (
                  <td key={coluna.chave} style={celulaStyle}>
                    {registro[coluna.chave] || "-"}
                  </td>
                ))}

                <td style={{ ...celulaStyle, textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => onEditar?.(registro)}
                    aria-label={`Editar registro de ${registro.data}`}
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