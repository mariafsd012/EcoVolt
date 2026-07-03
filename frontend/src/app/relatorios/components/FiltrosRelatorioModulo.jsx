"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const campoStyle = {
  height: "56px",
  padding: "0 20px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "15px",
  fontWeight: 500,
  color: "#374f30",
  backgroundColor: "#f7faf5",
  width: "100%",
};

const TIPOS_PONTO = [
  { value: "todos", label: "Todos os pontos" },
  { value: "ajuste", label: "Ajustes" },
  { value: "falta", label: "Faltas" },
  { value: "abono", label: "Abonos" },
  { value: "justificativa", label: "Justificativas" },
  { value: "solicitacao", label: "Solicitações" },
];

function Select({ value, onChange, placeholder, opcoes, style }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {opcoes.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="text-[#8a9a85] pointer-events-none"
        style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}
      />
    </div>
  );
}

function Texto({ value, onChange, placeholder, style }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...campoStyle, color: value ? "#374f30" : "#8a9a85", ...style }}
    />
  );
}

function Data({ value, onChange, style }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...campoStyle, ...style }}
    />
  );
}

export default function FiltrosRelatorioModulo({ modulo, filtros, onChangeFiltro, onGerar, isGerando }) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <SlidersHorizontal size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Filtros do relatório
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {modulo === "ponto" && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Data value={filtros.dataInicio} onChange={(v) => onChangeFiltro("dataInicio", v)} style={{ flex: "1 1 180px" }} />
            <Data value={filtros.dataFim} onChange={(v) => onChangeFiltro("dataFim", v)} style={{ flex: "1 1 180px" }} />
            <Texto value={filtros.colaborador} onChange={(v) => onChangeFiltro("colaborador", v)} placeholder="Colaborador" style={{ flex: "1 1 200px" }} />
            <Texto value={filtros.equipe} onChange={(v) => onChangeFiltro("equipe", v)} placeholder="Equipe" style={{ flex: "1 1 200px" }} />
            <Select
              value={filtros.tipo}
              onChange={(v) => onChangeFiltro("tipo", v)}
              placeholder="Tipo de apuração"
              opcoes={TIPOS_PONTO}
              style={{ flex: "1 1 200px" }}
            />
          </div>
        )}

        {modulo === "frota" && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Texto value={filtros.colaborador} onChange={(v) => onChangeFiltro("colaborador", v)} placeholder="Colaborador" style={{ flex: "1 1 220px" }} />
            <Data value={filtros.dataInicio} onChange={(v) => onChangeFiltro("dataInicio", v)} style={{ flex: "1 1 180px" }} />
            <Data value={filtros.dataFim} onChange={(v) => onChangeFiltro("dataFim", v)} style={{ flex: "1 1 180px" }} />
          </div>
        )}

        {modulo === "ti" && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Texto value={filtros.equipamento} onChange={(v) => onChangeFiltro("equipamento", v)} placeholder="Equipamento" style={{ flex: "1 1 220px" }} />
            <Texto value={filtros.colaborador} onChange={(v) => onChangeFiltro("colaborador", v)} placeholder="Colaborador" style={{ flex: "1 1 220px" }} />
          </div>
        )}

        {modulo === "ehs" && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Texto value={filtros.equipe} onChange={(v) => onChangeFiltro("equipe", v)} placeholder="Equipe" style={{ flex: "1 1 200px" }} />
            <Texto value={filtros.treinamento} onChange={(v) => onChangeFiltro("treinamento", v)} placeholder="Treinamento" style={{ flex: "1 1 220px" }} />
            <Data value={filtros.dataInicio} onChange={(v) => onChangeFiltro("dataInicio", v)} style={{ flex: "1 1 180px" }} />
            <Data value={filtros.dataFim} onChange={(v) => onChangeFiltro("dataFim", v)} style={{ flex: "1 1 180px" }} />
          </div>
        )}

        {modulo === "dho" && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Texto value={filtros.colaborador} onChange={(v) => onChangeFiltro("colaborador", v)} placeholder="Colaborador" style={{ flex: "1 1 220px" }} />
            <Texto value={filtros.equipe} onChange={(v) => onChangeFiltro("equipe", v)} placeholder="Equipe" style={{ flex: "1 1 200px" }} />
            <Texto value={filtros.setor} onChange={(v) => onChangeFiltro("setor", v)} placeholder="Setor" style={{ flex: "1 1 200px" }} />
          </div>
        )}

        {modulo === "moradia" && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Texto value={filtros.colaborador} onChange={(v) => onChangeFiltro("colaborador", v)} placeholder="Colaborador" style={{ flex: "1 1 220px" }} />
            <Texto value={filtros.unidade} onChange={(v) => onChangeFiltro("unidade", v)} placeholder="Unidade / Imóvel" style={{ flex: "1 1 220px" }} />
            <Data value={filtros.dataInicio} onChange={(v) => onChangeFiltro("dataInicio", v)} style={{ flex: "1 1 180px" }} />
            <Data value={filtros.dataFim} onChange={(v) => onChangeFiltro("dataFim", v)} style={{ flex: "1 1 180px" }} />
            <Select
              value={filtros.status}
              onChange={(v) => onChangeFiltro("status", v)}
              placeholder="Status"
              opcoes={[
                { value: "ocupado", label: "Ocupado" },
                { value: "disponivel", label: "Disponível" },
                { value: "manutencao", label: "Em manutenção" },
              ]}
              style={{ flex: "1 1 200px" }}
            />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <button
            type="button"
            onClick={onGerar}
            disabled={isGerando}
            style={{
              backgroundColor: "#3a6b35",
              height: "48px",
              padding: "0 64px",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              opacity: isGerando ? 0.6 : 1,
              border: "none",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {isGerando ? "Gerando..." : "Gerar relatório"}
          </button>
        </div>
      </div>
    </section>
  );
}