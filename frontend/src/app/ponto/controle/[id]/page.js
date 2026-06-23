"use client";

import { useEffect, useState } from "react";
import { Heebo } from "next/font/google";
import { pontoService } from "../pontoService"; 
import PontoHeader from "../../../components/PontoHeader";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const celulaStyle = { padding: "16px 24px", fontSize: "14px", color: "#333333" };

export default function DetalhesHistoricoPage({ params }) {
  const [historico, setHistorico] = useState([]);
  const [colaborador, setColaborador] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      if (!params?.id) return;
      try {
        setIsLoading(true);
        const data = await pontoService.buscarHistorico(params.id);
        setHistorico(data.registros || []);
        setColaborador(data.colaborador || { nome: "Não encontrado", setor: "-" });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    carregarDados();
  }, [params?.id]);

  return (
    <div className={`min-h-screen bg-[#f8faf7] p-8 ${heebo.className}`}>
      <PontoHeader />
      
      <div className="max-w-6xl mx-auto mt-8">
        <div style={{ backgroundColor: "#dbe4d8", padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#2d3a2a" }}>
            Colaborador: {colaborador?.nome || "Carregando..."}
          </h2>
          <p style={{ color: "#4a5a47", fontWeight: "500" }}>Equipe: {colaborador?.setor || "-"}</p>
        </div>

        <section style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", border: "1px solid #eef2ea" }}>
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f3f6f0" }}>
                {["Data", "1ª Entr.", "1ª Saída", "2ª Entr.", "2ª Saída", "HT", "HR", "HE"].map((head) => (
                  <th key={head} style={{ padding: "16px 24px", fontSize: "12px", color: "#7d8d78", textTransform: "uppercase", fontWeight: 500 }}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historico.map((item, index) => (
                <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7faf5", borderTop: "1px solid #eef2ea" }}>
                  <td style={celulaStyle}>{item.data}</td>
                  <td style={celulaStyle}>{item.entrada1 || "-"}</td>
                  <td style={celulaStyle}>{item.saida1 || "-"}</td>
                  <td style={celulaStyle}>{item.entrada2 || "-"}</td>
                  <td style={celulaStyle}>{item.saida2 || "-"}</td>
                  <td style={celulaStyle}>{item.ht || "-"}</td>
                  <td style={celulaStyle}>{item.hr || "-"}</td>
                  <td style={celulaStyle}>{item.he || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}