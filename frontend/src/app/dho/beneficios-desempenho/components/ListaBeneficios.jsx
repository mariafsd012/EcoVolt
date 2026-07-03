"use client";

import { Gift, SquarePen } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

export default function ListaBeneficios({
  beneficios = [],
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
        <Gift size={20} className="text-[#374f30]" />
        <h2
          className="text-[#374f30] font-semibold"
          style={{ fontSize: "20px" }}
        >
          Benefícios cadastrados
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
            {[
              "Nome",
              "Tipo",
              "Valor",
              "Data Início",
              "Data Fim",
              "Descrição",
            ].map((coluna) => (
              <th
                key={coluna}
                style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  color: "#7d8d78",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontWeight: 500,
                }}
              >
                {coluna}
              </th>
            ))}
            <th style={{ width: "60px" }} />
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td
                colSpan={7}
                style={{
                  ...celulaStyle,
                  textAlign: "center",
                  padding: "40px 24px",
                  color: "#8a9a85",
                }}
              >
                Carregando benefícios...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td
                colSpan={7}
                style={{
                  ...celulaStyle,
                  textAlign: "center",
                  padding: "40px 24px",
                  color: "#b05a55",
                }}
              >
                Não foi possível carregar os benefícios.
              </td>
            </tr>
          )}

          {!isLoading && !erro && beneficios.length === 0 && (
            <tr>
              <td
                colSpan={7}
                style={{
                  ...celulaStyle,
                  textAlign: "center",
                  padding: "40px 24px",
                  color: "#8a9a85",
                }}
              >
                Nenhum benefício cadastrado ainda.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            beneficios.map((beneficio, index) => (
              <tr
                key={beneficio.id}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "#ffffff" : "#f7faf5",
                  borderTop: "1px solid #eef2ea",
                }}
              >
                <td style={{ ...celulaStyle, fontWeight: 600 }}>
                  {beneficio.nome}
                </td>

                <td style={celulaStyle}>
                  {beneficio.tipo || "-"}
                </td>

                <td style={{ ...celulaStyle, color: "#374f30", fontWeight: 600 }}>
                  {beneficio.valor
                    ? `R$ ${Number(beneficio.valor).toFixed(2)}`
                    : "-"}
                </td>

                <td style={celulaStyle}>
                  {beneficio.dataInicio || "-"}
                </td>

                <td style={celulaStyle}>
                  {beneficio.dataFim || "-"}
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
                  {beneficio.descricao || "-"}
                </td>

                <td style={{ ...celulaStyle, textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => onEditar?.(beneficio)}
                    aria-label={`Editar benefício ${beneficio.nome}`}
                    style={{
                      color: "#3a6b35",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
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