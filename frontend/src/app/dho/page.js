"use client";

import { useState, useEffect } from "react";
import { User, Briefcase, MapPin, Calendar, CheckCircle, Clock } from "lucide-react";
import { usuarioService } from "../ponto/controle/usuarioService";

function PainelHeader({ nome, cargo }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
      <div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a2e1a", margin: 0 }}>Painel do Colaborador</h1>
        <p style={{ fontSize: "14px", color: "#667064", marginTop: "4px" }}>Acompanhe sua alocação, histórico e treinamentos.</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontWeight: "600", color: "#2d3a2a" }}>Bem vindo, {nome}!</p>
          <p style={{ margin: 0, fontSize: "12px", color: "#667064" }}>{cargo}</p>
        </div>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          backgroundColor: "#2d3a2a", color: "#fff", display: "flex",
          alignItems: "center", justifyContent: "center", fontWeight: "bold"
        }}>
          {nome?.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default function PainelColaboradorPage() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(usuarioService.obterUsuarioLogado());
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faf7] py-8 px-6">
      <PainelHeader nome={usuario?.nome || "Colaborador"} cargo={usuario?.cargo || "Eletricista de Campo"} />

      {/* Card Alocação Atual */}
      <section style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8e4", marginBottom: "24px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#4a5a47", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>ALOCAÇÃO ATUAL</span>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ backgroundColor: "#f8faf7", padding: "16px", borderRadius: "12px" }}>
            <Briefcase color="#3a6b35" size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#1a2e1a" }}>Subestação Norte — Manutenção</h3>
            <p style={{ margin: 0, color: "#667064", fontSize: "14px" }}>Subestação SE-04, Distrito Industrial</p>
          </div>
        </div>
      </section>

      {/* Grid de Treinamentos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <section style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8e4" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#4a5a47", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>TREINAMENTOS REALIZADOS</span>
          <div style={{ backgroundColor: "#f8faf7", borderRadius: "12px", padding: "14px", display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#374f30" }}>
            <CheckCircle size={16} /> NR-10 — Segurança em Eletricidade
          </div>
        </section>

        <section style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8e4" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#4a5a47", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>TREINAMENTOS PENDENTES</span>
          <div style={{ backgroundColor: "#f8faf7", borderRadius: "12px", padding: "14px", display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#374f30" }}>
            <Clock size={16} /> NR-33 — Espaços Confinados
          </div>
        </section>
      </div>

      {/* Tabela de Últimas Alocações */}
      <section style={{ backgroundColor: "#fff", borderRadius: "20px", border: "1px solid #e2e8e4", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #eef2ea" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#2d3a2a" }}>Últimas Alocações</h2>
        </div>
        <div style={{ padding: "16px 24px", fontSize: "14px", color: "#374f30", borderBottom: "1px solid #f0f0f0" }}>
          Linha de Transmissão LT-230 — Sorocaba — SP
        </div>
      </section>
    </div>
  );
}