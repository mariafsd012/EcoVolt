"use client";

import { useState } from "react";
import { Target, ChevronDown } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const campoStyle = {
  height: "56px",
  padding: "0 20px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "15px",
  fontWeight: 500,
  color: "#374f30",
  backgroundColor: "#ffffff",
  width: "100%",
};

const NIVEIS = [
  { value: "excelente", label: "Excelente" },
  { value: "bom", label: "Bom" },
  { value: "regular", label: "Regular" },
  { value: "abaixo", label: "Abaixo do esperado" },
];

const NIVEL_COR = {
  excelente: "#3a6b35",
  bom: "#4e9fcc",
  regular: "#c79b3a",
  abaixo: "#b05a55",
};

export default function CadastrarDesempenho({
  desempenho = { colaborador: "", nivel: "", meta: 50, feedback: "", data: "" },
  onChangeCampo,
  onSalvar,
  isSubmitting = false,
}) {
  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <Target size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Registrar desempenho
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* COLABORADOR + NÍVEL + DATA */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: "2 1 240px" }}>
            <span style={{ fontSize: "12px", color: "#fff", opacity: 0.85 }}>Nome do colaborador</span>
            <input
              type="text"
              placeholder="Buscar colaborador..."
              value={desempenho.colaborador}
              onChange={(e) => onChangeCampo("colaborador", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px", color: desempenho.colaborador ? "#374f30" : "#9aa893" }}
            />
          </div>

          <div style={{ flex: "1 1 200px" }}>
            <span style={{ fontSize: "12px", color: "#fff", opacity: 0.85 }}>Nível de desempenho</span>
            <div style={{ position: "relative", marginTop: "4px" }}>
              <select
                value={desempenho.nivel}
                onChange={(e) => onChangeCampo("nivel", e.target.value)}
                style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
              >
                <option value="" disabled hidden>Selecionar...</option>
                {NIVEIS.map((n) => (
                  <option key={n.value} value={n.value}>{n.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="text-[#8a9a85] pointer-events-none"
                style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div style={{ flex: "1 1 180px" }}>
            <span style={{ fontSize: "12px", color: "#fff", opacity: 0.85 }}>Data de avaliação</span>
            <input
              type="date"
              value={desempenho.data}
              onChange={(e) => onChangeCampo("data", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>
        </div>

        {/* SLIDER DE META + FEEDBACK */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* SLIDER */}
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>Ajuste de metas</span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#3a6b35",
                  backgroundColor: "#ffffff",
                  padding: "4px 12px",
                  borderRadius: "8px",
                }}
              >
                {desempenho.meta ?? 50}%
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={desempenho.meta ?? 50}
              onChange={(e) => onChangeCampo("meta", Number(e.target.value))}
              style={{ width: "100%", accentColor: "#3a6b35" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              {[0, 20, 40, 60, 80, 100].map((v) => (
                <span key={v} style={{ fontSize: "11px", color: "#ffffff", opacity: 0.7 }}>{v}</span>
              ))}
            </div>
          </div>

          {/* FEEDBACK */}
          <div style={{ flex: "2 1 280px" }}>
            <span style={{ fontSize: "12px", color: "#fff", opacity: 0.85 }}>Feedback e comentários</span>
            <textarea
              placeholder="Registre observações, pontos de melhoria, reconhecimentos..."
              value={desempenho.feedback}
              onChange={(e) => onChangeCampo("feedback", e.target.value)}
              rows={4}
              style={{
                ...campoStyle,
                height: "auto",
                minHeight: "110px",
                padding: "14px 20px",
                resize: "vertical",
                marginTop: "4px",
                color: desempenho.feedback ? "#374f30" : "#9aa893",
              }}
            />
          </div>
        </div>

        {/* NÍVEL VISUAL */}
        {desempenho.nivel && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: NIVEL_COR[desempenho.nivel] ?? "#5a6a55",
                backgroundColor: "#ffffff",
                padding: "6px 16px",
                borderRadius: "999px",
              }}
            >
              {NIVEIS.find((n) => n.value === desempenho.nivel)?.label}
            </span>
            <span style={{ fontSize: "12px", color: "#ffffff", opacity: 0.8 }}>
              · Meta em {desempenho.meta ?? 50}%
            </span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <button
            type="button"
            onClick={onSalvar}
            disabled={isSubmitting}
            style={{
              backgroundColor: "#3a6b35",
              height: "48px",
              padding: "0 64px",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              opacity: isSubmitting ? 0.6 : 1,
              border: "none",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </section>
  )
};