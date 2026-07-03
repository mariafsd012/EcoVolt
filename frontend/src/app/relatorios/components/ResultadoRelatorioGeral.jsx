"use client";

import { Heebo } from "next/font/google";
import { Download } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

const COLUNAS_POR_MODULO = {
  ponto: [
    { chave: "colaborador", label: "Colaborador" },
    { chave: "equipe", label: "Equipe" },
    { chave: "data", label: "Data" },
    { chave: "tipo", label: "Tipo" },
    { chave: "status", label: "Status" },
  ],
  frota: [
    { chave: "colaborador", label: "Colaborador" },
    { chave: "veiculo", label: "Veículo" },
    { chave: "data", label: "Data" },
    { chave: "destino", label: "Destino" },
    { chave: "status", label: "Status" },
  ],
  ti: [
    { chave: "colaborador", label: "Colaborador" },
    { chave: "equipamento", label: "Equipamento" },
    { chave: "dataEntrega", label: "Data de entrega" },
    { chave: "status", label: "Status" },
  ],
  ehs: [
    { chave: "colaborador", label: "Colaborador" },
    { chave: "equipe", label: "Equipe" },
    { chave: "treinamento", label: "Treinamento" },
    { chave: "data", label: "Data / Prazo" },
    { chave: "status", label: "Status" },
  ],
  dho: [
    { chave: "colaborador", label: "Colaborador" },
    { chave: "equipe", label: "Equipe" },
    { chave: "setor", label: "Setor" },
    { chave: "status", label: "Status" },
  ],
  moradia: [
    { chave: "colaborador", label: "Colaborador" },
    { chave: "unidade", label: "Unidade" },
    { chave: "dataInicio", label: "Data de entrada" },
    { chave: "dataFim", label: "Data de saída" },
    { chave: "status", label: "Status" },
  ],
};

export default function ResultadoRelatorioGeral({
  modulo,
  registros = [],
  isLoading,
  erro,
  jaGerado,
  onExportar,
}) {
  const colunas = COLUNAS_POR_MODULO[modulo] ?? COLUNAS_POR_MODULO.ponto;

  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden" }}
      className={heebo.className}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 24px 0 24px",
        }}
      >
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "18px" }}>
          Resultado
        </h2>

        {jaGerado && registros.length > 0 && (
          <button
            type="button"
            onClick={onExportar}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              backgroundColor: "transparent",
              color: "#3a6b35",
              fontSize: "13px",
              fontWeight: 600,
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Download size={15} />
            Exportar
          </button>
        )}
      </div>

      <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", marginTop: "16px" }}>
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
          </tr>
        </thead>

        <tbody>
          {!jaGerado && (
            <tr>
              <td colSpan={colunas.length} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Selecione o módulo e os filtros, depois clique em "Gerar relatório".
              </td>
            </tr>
          )}

          {jaGerado && isLoading && (
            <tr>
              <td colSpan={colunas.length} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Gerando relatório...
              </td>
            </tr>
          )}

          {jaGerado && !isLoading && erro && (
            <tr>
              <td colSpan={colunas.length} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#b05a55" }}>
                Não foi possível gerar o relatório. Tente novamente.
              </td>
            </tr>
          )}

          {jaGerado && !isLoading && !erro && registros.length === 0 && (
            <tr>
              <td colSpan={colunas.length} style={{ ...celulaStyle, textAlign: "center", padding: "40px 24px", color: "#8a9a85" }}>
                Nenhum registro encontrado para os filtros selecionados.
              </td>
            </tr>
          )}

          {jaGerado &&
            !isLoading &&
            !erro &&
            registros.map((registro, index) => (
              <tr
                key={registro.id ?? index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf5",
                  borderTop: "1px solid #eef2ea",
                }}
              >
                {colunas.map((coluna) => (
                  <td key={coluna.chave} style={celulaStyle}>
                    {registro[coluna.chave] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      <div style={{ height: "8px" }} />
    </section>
  );
}