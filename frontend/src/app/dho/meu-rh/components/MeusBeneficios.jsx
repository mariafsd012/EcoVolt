"use client";

import { Gift } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const TIPO_LABEL = {
  saude: "Plano de Saúde",
  odontologico: "Plano Odontológico",
  alimentacao: "Vale Alimentação",
  refeicao: "Vale Refeição",
  transporte: "Vale Transporte",
  academia: "Gympass / Academia",
  outro: "Outro",
};

function formatarData(data) {
  if (!data) return "—";
  try {
    return new Date(data).toLocaleDateString("pt-BR");
  } catch {
    return data;
  }
}

function formatarValor(valor) {
  if (valor === "" || valor === null || valor === undefined) return "—";
  const numero = Number(valor);
  if (Number.isNaN(numero)) return valor;
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function CardBeneficio({ item }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <p style={{ fontSize: "15px", fontWeight: 700, color: "#374f30" }}>{item.nome}</p>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#3a6b35",
              backgroundColor: "#f1f5ee",
              padding: "4px 12px",
              borderRadius: "999px",
              display: "inline-block",
              marginTop: "6px",
            }}
          >
            {TIPO_LABEL[item.tipo] ?? "Benefício"}
          </span>
        </div>
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#3a6b35" }}>
          {formatarValor(item.valor)}
        </span>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", color: "#7a8a75" }}>
        <span>Início: {formatarData(item.dataInicio)}</span>
        <span>Término: {item.dataFim ? formatarData(item.dataFim) : "Indeterminado"}</span>
      </div>

      {item.descricao && (
        <p style={{ fontSize: "13px", color: "#374f30", lineHeight: 1.5 }}>
          {item.descricao}
        </p>
      )}
    </div>
  );
}

export default function MeusBeneficios({ beneficios = [], isLoading = false, erro = null }) {
  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <Gift size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Meus benefícios
        </h2>
      </div>

      {isLoading && (
        <p style={{ color: "#fff", fontSize: "14px", opacity: 0.9 }}>Carregando benefícios...</p>
      )}

      {!isLoading && erro && (
        <p style={{ color: "#fff", fontSize: "14px", backgroundColor: "#b05a55", padding: "12px 16px", borderRadius: "10px" }}>
          {erro}
        </p>
      )}

      {!isLoading && !erro && beneficios.length === 0 && (
        <p style={{ color: "#fff", fontSize: "14px", opacity: 0.9 }}>
          Você ainda não possui benefícios cadastrados.
        </p>
      )}

      {!isLoading && !erro && beneficios.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {beneficios.map((item) => (
            <CardBeneficio key={item.id ?? item.nome} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}