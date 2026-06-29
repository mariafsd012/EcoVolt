"use client";

import { Heebo } from "next/font/google";
import { GraduationCap, ChevronDown, SquarePen } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

const STATUS_COR = {
  realizado: "#3a6b35",
  pendente: "#c79b3a",
};

export default function TabelaTreinamentos({
  treinamentos = [],
  isLoading,
  erro,
  onChangeStatus,
  onEditar,
}) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "28px 28px 16px" }}>
        <GraduationCap size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Treinamentos por colaborador
        </h2>
      </div>

      <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f3f6f0" }}>
            {["Colaborador", "Treinamento", "Data / Prazo", "Válido até", "Status"].map((coluna) => (
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
              <td colSpan={6} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Carregando treinamentos...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td colSpan={6} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#b05a55" }}>
                Não foi possível carregar os treinamentos.
              </td>
            </tr>
          )}

          {!isLoading && !erro && treinamentos.length === 0 && (
            <tr>
              <td colSpan={6} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Nenhum treinamento encontrado para os filtros selecionados.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            treinamentos.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf5",
                  borderTop: "1px solid #eef2ea",
                }}
              >
                <td style={celulaStyle}>{item.colaborador}</td>
                <td style={celulaStyle}>{item.nomeLabel ?? item.nome}</td>
                <td style={celulaStyle}>{item.data || "-"}</td>
                <td style={celulaStyle}>{item.validade || "-"}</td>
                <td style={celulaStyle}>
                  <div style={{ position: "relative", display: "inline-block", minWidth: "130px" }}>
                    <select
                      value={item.status ?? "pendente"}
                      onChange={(e) => onChangeStatus?.(item.id, e.target.value)}
                      style={{
                        width: "100%",
                        height: "36px",
                        padding: "0 32px 0 14px",
                        borderRadius: "8px",
                        border: "none",
                        outline: "none",
                        appearance: "none",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: STATUS_COR[item.status] ?? "#5a6a55",
                        backgroundColor: "#f3f6f0",
                      }}
                    >
                      <option value="realizado">Realizado</option>
                      <option value="pendente">Pendente</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="text-[#8a9a85] pointer-events-none"
                      style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
                    />
                  </div>
                </td>
                <td style={{ ...celulaStyle, textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => onEditar?.(item)}
                    aria-label={`Editar treinamento de ${item.colaborador}`}
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