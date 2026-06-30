"use client";

import { Home, MapPin, BedDouble, Droplets, Zap, Wifi, Flame, Calendar } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const UTIL_ICONES = [
  { chave: "agua", label: "Água", Icone: Droplets },
  { chave: "energia", label: "Energia", Icone: Zap },
  { chave: "internet", label: "Internet", Icone: Wifi },
  { chave: "gas", label: "Gás", Icone: Flame },
];

export default function MoradiaColaborador({ moradia, isLoading, erro }) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px" }}
      className={heebo.className}
    >
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <span style={{ fontSize: "12px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
          Minha moradia
        </span>

        {moradia && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#3a6b35",
              backgroundColor: "#dbe8d1",
              padding: "6px 14px",
              borderRadius: "999px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3a6b35" }} />
            Ativo
          </span>
        )}
      </div>

      {/* LOADING */}
      {isLoading && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "24px 0" }}>
          Carregando informações da moradia...
        </p>
      )}

      {/* ERRO */}
      {!isLoading && erro && (
        <p style={{ fontSize: "13px", color: "#b05a55", textAlign: "center", padding: "24px 0" }}>
          Não foi possível carregar as informações da moradia.
        </p>
      )}

      {/* SEM MORADIA */}
      {!isLoading && !erro && !moradia && (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px 0" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#f3f6f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Home size={20} className="text-[#c9d9c4]" />
          </div>
          <p style={{ fontSize: "14px", color: "#8a9a85" }}>
            Nenhuma moradia vinculada ao seu cadastro.
          </p>
        </div>
      )}

      {/* COM MORADIA */}
      {!isLoading && !erro && moradia && (
        <>
          {/* ENDEREÇO */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#3a6b35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Home size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#222" }}>
                {moradia.endereco}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                <MapPin size={13} className="text-[#8a9a85]" />
                <span style={{ fontSize: "13px", color: "#8a9a85" }}>{moradia.cidade}</span>
              </div>
            </div>
          </div>

          {/* GRADE DE DETALHES */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {/* PERÍODO */}
            <div style={{ flex: "1 1 200px", backgroundColor: "#f7faf5", borderRadius: "12px", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <Calendar size={13} className="text-[#5a6a55]" />
                <span style={{ fontSize: "11px", color: "#5a6a55", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Período
                </span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#222" }}>
                {moradia.dataInicio || "-"}
              </p>
              <p style={{ fontSize: "12px", color: "#8a9a85", marginTop: "2px" }}>
                até {moradia.dataEntrega || "em aberto"}
              </p>
            </div>

            {/* QUARTOS */}
            <div style={{ flex: "1 1 140px", backgroundColor: "#f7faf5", borderRadius: "12px", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <BedDouble size={13} className="text-[#5a6a55]" />
                <span style={{ fontSize: "11px", color: "#5a6a55", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Quartos
                </span>
              </div>
              <p style={{ fontSize: "22px", fontWeight: 700, color: "#3a6b35" }}>
                {moradia.quartos ?? "-"}
              </p>
            </div>

            {/* UTILITÁRIOS */}
            <div style={{ flex: "2 1 240px", backgroundColor: "#f7faf5", borderRadius: "12px", padding: "14px 16px" }}>
              <span style={{ fontSize: "11px", color: "#5a6a55", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "10px" }}>
                Incluso
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {UTIL_ICONES.map(({ chave, label, Icone }) => (
                  <span
                    key={chave}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "5px 12px",
                      borderRadius: "999px",
                      backgroundColor: moradia[chave] ? "#dbe8d1" : "#ececec",
                      color: moradia[chave] ? "#3a6b35" : "#c9d9c4",
                    }}
                  >
                    <Icone size={12} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}