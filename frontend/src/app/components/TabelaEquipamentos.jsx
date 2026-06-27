"use client";

import { Heebo } from "next/font/google";
import { Laptop2, ChevronDown, SquarePen } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

const STATUS_OPCOES = [
  { value: "entregue", label: "Entregue" },
  { value: "devolvido", label: "Devolvido" },
  { value: "pendente", label: "Pendente" },
];

const STATUS_COR = {
  entregue: "#3a6b35",
  devolvido: "#7d8d78",
  pendente: "#c79b3a",
};

export default function TabelaEquipamentos({
  equipamentos = [],
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
        <Laptop2 size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Equipamentos por colaborador
        </h2>
      </div>

      <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f3f6f0" }}>
            {["Colaborador", "Aparelho", "Data de entrega", "Status"].map((coluna) => (
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
              <td colSpan={5} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Carregando equipamentos...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td colSpan={5} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#b05a55" }}>
                Não foi possível carregar os equipamentos.
              </td>
            </tr>
          )}

          {!isLoading && !erro && equipamentos.length === 0 && (
            <tr>
              <td colSpan={5} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Nenhum equipamento encontrado.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            equipamentos.map((equipamento, index) => (
              <tr
                key={equipamento.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf5",
                  borderTop: "1px solid #eef2ea",
                }}
              >
                <td style={celulaStyle}>{equipamento.colaborador}</td>
                <td style={celulaStyle}>{equipamento.tipoLabel ?? equipamento.tipo}</td>
                <td style={celulaStyle}>{equipamento.dataEntrega || "-"}</td>
                <td style={celulaStyle}>
                  <div style={{ position: "relative", display: "inline-block", minWidth: "140px" }}>
                    <select
                      value={equipamento.status ?? "pendente"}
                      onChange={(e) => onChangeStatus?.(equipamento.id, e.target.value)}
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
                        color: STATUS_COR[equipamento.status] ?? "#5a6a55",
                        backgroundColor: "#f3f6f0",
                      }}
                    >
                      {STATUS_OPCOES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
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
                    onClick={() => onEditar?.(equipamento)}
                    aria-label={`Editar equipamento de ${equipamento.colaborador}`}
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