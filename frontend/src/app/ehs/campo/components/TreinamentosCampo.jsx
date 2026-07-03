"use client";

import { CheckCircle2, Clock } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function ListaTreinamentos({ titulo, itens, tipo }) {
  const Icone = tipo === "realizado" ? CheckCircle2 : Clock;
  const corIcone = tipo === "realizado" ? "#3a6b35" : "#c79b3a";

  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px", flex: "1 1 320px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <span style={{ fontSize: "12px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
          {titulo}
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#5a6a55",
            backgroundColor: "#f3f6f0",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {itens.length}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {itens.length === 0 && (
          <p style={{ fontSize: "13px", color: "#8a9a85" }}>Nenhum treinamento por aqui.</p>
        )}

        {itens.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              backgroundColor: "#f7faf5",
              borderRadius: "12px",
              padding: "14px 18px",
            }}
          >
            <Icone size={18} style={{ color: corIcone, marginTop: "2px", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#222" }}>{item.nome}</p>
              <p style={{ fontSize: "12px", color: "#8a9a85", marginTop: "2px" }}>
                {tipo === "realizado" ? `Válido até ${item.validade}` : `Prazo: ${item.prazo}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TreinamentosCampo({ realizados = [], pendentes = [] }) {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <ListaTreinamentos titulo="Treinamentos realizados" itens={realizados} tipo="realizado" />
      <ListaTreinamentos titulo="Treinamentos pendentes" itens={pendentes} tipo="pendente" />
    </div>
  );
}