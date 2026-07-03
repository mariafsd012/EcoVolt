"use client";

import { useState } from "react";
import { Home, MapPin, Users, BedDouble, Droplets, Zap, Wifi, Flame, SquarePen, ChevronDown, ChevronUp } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const UTIL_ICONES = [
  { chave: "agua", label: "Água", Icone: Droplets },
  { chave: "energia", label: "Energia", Icone: Zap },
  { chave: "internet", label: "Internet", Icone: Wifi },
  { chave: "gas", label: "Gás", Icone: Flame },
];

export default function ListaMoradias({ moradias = [], isLoading, erro, onEditar }) {
  const [expandida, setExpandida] = useState(null);

  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <Home size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Moradias cadastradas
        </h2>
      </div>

      {isLoading && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "32px 0" }}>
          Carregando moradias...
        </p>
      )}
      {!isLoading && erro && (
        <p style={{ fontSize: "13px", color: "#b05a55", textAlign: "center", padding: "32px 0" }}>
          Não foi possível carregar as moradias.
        </p>
      )}
      {!isLoading && !erro && moradias.length === 0 && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "32px 0" }}>
          Nenhuma moradia cadastrada ainda.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {!isLoading && !erro && moradias.map((moradia) => {
          const aberta = expandida === moradia.id;
          return (
            <div
              key={moradia.id}
              style={{ backgroundColor: "#f7faf5", borderRadius: "14px", overflow: "hidden" }}
            >
              {/* LINHA RESUMO (sempre visível) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  cursor: "pointer",
                  gap: "12px",
                }}
                onClick={() => setExpandida(aberta ? null : moradia.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "#dbe8d1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Home size={18} className="text-[#3a6b35]" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: "#222", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {moradia.endereco}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                      <MapPin size={12} className="text-[#8a9a85]" />
                      <span style={{ fontSize: "12px", color: "#8a9a85" }}>{moradia.cidade}</span>
                      <span style={{ fontSize: "12px", color: "#c9d9c4" }}>·</span>
                      <BedDouble size={12} className="text-[#8a9a85]" />
                      <span style={{ fontSize: "12px", color: "#8a9a85" }}>{moradia.quartos} quarto{moradia.quartos !== 1 ? "s" : ""}</span>
                      <span style={{ fontSize: "12px", color: "#c9d9c4" }}>·</span>
                      <Users size={12} className="text-[#8a9a85]" />
                      <span style={{ fontSize: "12px", color: "#8a9a85" }}>{moradia.colaboradores?.length ?? 0} residente{(moradia.colaboradores?.length ?? 0) !== 1 ? "s" : ""}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEditar?.(moradia); }}
                    aria-label={`Editar moradia ${moradia.endereco}`}
                    style={{ color: "#3a6b35", border: "none", backgroundColor: "transparent" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <SquarePen size={17} />
                  </button>
                  {aberta ? <ChevronUp size={17} className="text-[#8a9a85]" /> : <ChevronDown size={17} className="text-[#8a9a85]" />}
                </div>
              </div>

              {/* DETALHES EXPANDIDOS */}
              {aberta && (
                <div style={{ padding: "0 20px 20px", borderTop: "1px solid #eef2ea" }}>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
                    {/* PERÍODO */}
                    <div style={{ flex: "1 1 200px", backgroundColor: "#ffffff", borderRadius: "10px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "11px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Período</p>
                      <p style={{ fontSize: "14px", color: "#222", fontWeight: 600, marginTop: "4px" }}>
                        {moradia.dataInicio || "-"} → {moradia.dataEntrega || "-"}
                      </p>
                    </div>

                    {/* UTILITÁRIOS */}
                    <div style={{ flex: "1 1 200px", backgroundColor: "#ffffff", borderRadius: "10px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "11px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600, marginBottom: "8px" }}>Inclui</p>
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
                              padding: "4px 10px",
                              borderRadius: "999px",
                              backgroundColor: moradia[chave] ? "#dbe8d1" : "#f3f6f0",
                              color: moradia[chave] ? "#3a6b35" : "#c9d9c4",
                            }}
                          >
                            <Icone size={12} />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RESIDENTES */}
                    <div style={{ flex: "2 1 280px", backgroundColor: "#ffffff", borderRadius: "10px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "11px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600, marginBottom: "8px" }}>Residentes</p>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {(moradia.colaboradores ?? []).length === 0
                          ? <span style={{ fontSize: "13px", color: "#8a9a85" }}>Nenhum residente.</span>
                          : moradia.colaboradores.map((c) => (
                            <span
                              key={c.id}
                              style={{ fontSize: "13px", color: "#374f30", backgroundColor: "#f7faf5", border: "1px solid #e8ede4", borderRadius: "999px", padding: "5px 12px" }}
                            >
                              {c.nome}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}