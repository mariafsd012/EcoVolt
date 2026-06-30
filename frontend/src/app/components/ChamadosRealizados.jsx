"use client";

import { Heebo } from "next/font/google";
import { MessageSquareText, ChevronDown } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#374f30",
};

const SITUACOES = [
  { value: "pendente", label: "Pendente" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "resolvido", label: "Resolvido" },
  { value: "recusado", label: "Recusado" },
];

export default function ChamadosRealizados({
  chamados = [],
  isLoading,
  erro,
  onChangeSituacao,
  onVerTodos,
}) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "28px 28px 20px" }}>
        <MessageSquareText size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Chamados
        </h2>
      </div>

      <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px 24px", fontSize: "12px", color: "#8a9a85", fontWeight: 500 }}>
              Colaborador
            </th>
            <th style={{ padding: "8px 24px", fontSize: "12px", color: "#8a9a85", fontWeight: 500 }}>
              Detalhamento
            </th>
            <th style={{ padding: "8px 24px", fontSize: "12px", color: "#8a9a85", fontWeight: 500, textAlign: "right" }}>
              Situação
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "32px 24px", color: "#8a9a85" }}>
                Carregando chamados...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "32px 24px", color: "#b05a55" }}>
                Não foi possível carregar os chamados.
              </td>
            </tr>
          )}

          {!isLoading && !erro && chamados.length === 0 && (
            <tr>
              <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", padding: "32px 24px", color: "#8a9a85" }}>
                Nenhum chamado realizado até o momento.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            chamados.map((chamado) => (
              <tr key={chamado.id} style={{ backgroundColor: "#dbe8d1" }}>
                <td style={{ ...celulaStyle, borderRadius: "12px 0 0 12px" }}>
                  {chamado.colaborador?.nome ?? "—"}
                </td>
                <td style={celulaStyle}>{chamado.detalhamento}</td>
                <td style={{ ...celulaStyle, textAlign: "right", borderRadius: "0 12px 12px 0" }}>
                  <div style={{ position: "relative", display: "inline-block", minWidth: "150px" }}>
                    <select
                      value={chamado.situacao ?? "pendente"}
                      onChange={(e) => onChangeSituacao?.(chamado.id, e.target.value)}
                      style={{
                        width: "100%",
                        height: "36px",
                        padding: "0 32px 0 14px",
                        borderRadius: "8px",
                        border: "none",
                        outline: "none",
                        appearance: "none",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#374f30",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      {SITUACOES.map((situacao) => (
                        <option key={situacao.value} value={situacao.value}>
                          {situacao.label}
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
              </tr>
            ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <button
          type="button"
          onClick={onVerTodos}
          style={{ fontSize: "13px", color: "#5a6a55", textDecoration: "underline", border: "none", backgroundColor: "transparent" }}
          className="hover:opacity-80 transition-opacity"
        >
          Visualizar todos os chamados
        </button>
      </div>
    </section>
  );
}