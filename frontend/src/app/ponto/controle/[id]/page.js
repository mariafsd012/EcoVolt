"use client";

import { useEffect, useState } from "react";
import { Heebo } from "next/font/google";
import { pontoService } from "../pontoService";
import PontoHeader from "../../../components/PontoHeader";
import { useRouter, useParams } from "next/navigation";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const celulaStyle = {
  padding: "16px 24px",
  fontSize: "14px",
  color: "#333333",
};

export default function DetalhesHistoricoPage() {
  const [historico, setHistorico] = useState([]);
  const [colaborador, setColaborador] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erroMsg, setErroMsg] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    async function carregarDados() {
      if (!id) return;

      try {
        setIsLoading(true);
        // Se não estiver autenticado, redireciona para login
        const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
        if (!token) {
          router.push("/login");
          return;
        }

        const data = await pontoService.buscarHistoricoAgrupado(id);

        setHistorico(data.registros || []);
        setColaborador(
          data.colaborador || { nome: "Não encontrado", setor: "-" }
        );
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        // Se for erro de autorização, leva ao login
        if (error?.status === 401) {
          window.localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (error?.status === 403) {
          setErroMsg("Acesso negado: você não tem permissão para ver este histórico.");
          return;
        }

        setErroMsg("Erro ao carregar histórico. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    }

    carregarDados();
  }, [params?.id]);

  return (
    <div className={`min-h-screen bg-[#f8faf7] p-8 ${heebo.className}`}>
      <PontoHeader />

      <div className="w-full mt-5 px-[10px]">
        {/* Header do colaborador */}
        <div
          style={{
            backgroundColor: "#dbe4d8",
            padding: "24px",
            borderRadius: "16px",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#2d3a2a" }}>
            Colaborador: {colaborador?.nome || "Carregando..."}
          </h2>
          <p style={{ color: "#4a5a47", fontWeight: "500" }}>
            Equipe: {colaborador?.setor || "-"}
          </p>
        </div>

        {/* Tabela */}
        <section
          className={heebo.className}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {erroMsg && (
            <div style={{ padding: 16, color: "#a33", fontWeight: 600 }}>{erroMsg}</div>
          )}

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
                  "Data",
                  "1ª Entr.",
                  "1ª Saída",
                  "2ª Entr.",
                  "2ª Saída",
                  "HT",
                  "HR",
                  "HE",
                ].map((head) => (
                  <th
                    key={head}
                    style={{
                      padding: "16px 24px",
                      fontSize: "12px",
                      color: "#7d8d78",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      fontWeight: 500,
                    }}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      ...celulaStyle,
                      textAlign: "center",
                      padding: "40px 24px",
                      color: "#8a9a85",
                    }}
                  >
                    Carregando histórico...
                  </td>
                </tr>
              ) : historico.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ ...celulaStyle, textAlign: "center", padding: "24px" }}>
                    Nenhum registro encontrado para este colaborador.
                  </td>
                </tr>
              ) : (
                historico.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "#ffffff" : "#f7faf5",
                      borderTop: "1px solid #eef2ea",
                    }}
                  >
                    <td style={celulaStyle}>{item.data}</td>
                    <td style={celulaStyle}>{item.entrada1 || "-"}</td>
                    <td style={celulaStyle}>{item.saida1 || "-"}</td>
                    <td style={celulaStyle}>{item.entrada2 || "-"}</td>
                    <td style={celulaStyle}>{item.saida2 || "-"}</td>
                    <td style={celulaStyle}>{item.ht || "-"}</td>
                    <td style={celulaStyle}>{item.hr || "-"}</td>
                    <td style={celulaStyle}>{item.he || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}