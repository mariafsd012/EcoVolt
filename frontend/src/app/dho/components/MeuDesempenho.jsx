"use client";

import { Target } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const NIVEL_LABEL = {
  excelente: "Excelente",
  bom: "Bom",
  regular: "Regular",
  abaixo: "Abaixo do esperado",
};

const NIVEL_COR = {
  excelente: "#3a6b35",
  bom: "#4e9fcc",
  regular: "#c79b3a",
  abaixo: "#b05a55",
};

function formatarData(data) {
  if (!data) return "—";
  try {
    return new Date(data).toLocaleDateString("pt-BR");
  } catch {
    return data;
  }
}

function CardDesempenho({ item }) {
  const cor = NIVEL_COR[item.nivel] ?? "#5a6a55";
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: cor,
            backgroundColor: "#f1f5ee",
            padding: "6px 16px",
            borderRadius: "999px",
          }}
        >
          {NIVEL_LABEL[item.nivel] ?? "Não avaliado"}
        </span>
        <span style={{ fontSize: "12px", color: "#7a8a75" }}>
          Avaliado em {formatarData(item.data)}
        </span>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontSize: "12px", color: "#5a6a55", fontWeight: 600 }}>Meta atingida</span>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#3a6b35" }}>
            {item.meta ?? 0}%
          </span>
        </div>
        <div style={{ width: "100%", height: "8px", borderRadius: "999px", backgroundColor: "#e7eee2" }}>
          <div
            style={{
              width: `${item.meta ?? 0}%`,
              height: "100%",
              borderRadius: "999px",
              backgroundColor: "#3a6b35",
            }}
          />
        </div>
      </div>

      {item.feedback && (
        <p style={{ fontSize: "13px", color: "#374f30", lineHeight: 1.5 }}>
          {item.feedback}
        </p>
      )}
    </div>
  );
}

export default function MeuDesempenho({ desempenhos = [], isLoading = false, erro = null }) {
  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <Target size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Meu desempenho
        </h2>
      </div>

      {isLoading && (
        <p style={{ color: "#fff", fontSize: "14px", opacity: 0.9 }}>Carregando avaliações...</p>
      )}

      {!isLoading && erro && (
        <p style={{ color: "#fff", fontSize: "14px", backgroundColor: "#b05a55", padding: "12px 16px", borderRadius: "10px" }}>
          {erro}
        </p>
      )}

      {!isLoading && !erro && desempenhos.length === 0 && (
        <p style={{ color: "#fff", fontSize: "14px", opacity: 0.9 }}>
          Você ainda não possui avaliações de desempenho registradas.
        </p>
      )}

      {!isLoading && !erro && desempenhos.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {desempenhos.map((item) => (
            <CardDesempenho key={item.id ?? `${item.data}-${item.nivel}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}