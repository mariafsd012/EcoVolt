"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const campoStyle = {
  height: "52px",
  padding: "0 18px",
  borderRadius: "10px",
  border: "1px solid #e8ede4",
  outline: "none",
  fontSize: "14px",
  fontWeight: 500,
  color: "#374f30",
  backgroundColor: "#ffffff",
  width: "100%",
};

const treinamentosDisponiveis = [
  { value: "nr10", label: "NR-10 — Segurança em Eletricidade" },
  { value: "nr35", label: "NR-35 — Trabalho em Altura" },
  { value: "nr33", label: "NR-33 — Espaços Confinados" },
  { value: "primeiros_socorros", label: "Primeiros Socorros" },
  { value: "operacao_equipamentos", label: "Operação de Equipamentos" },
  { value: "outro", label: "Outro" },
];

export default function ModalEditarTreinamento({ treinamento, onClose, onSalvar }) {
  const [form, setForm] = useState({
    colaborador: treinamento?.colaborador ?? "",
    nome: treinamento?.nome ?? "",
    data: treinamento?.data ?? "",
    validade: treinamento?.validade ?? "",
    status: treinamento?.status ?? "pendente",
  });
  const [isSalvando, setIsSalvando] = useState(false);

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function salvar() {
    setIsSalvando(true);
    try {
      await onSalvar?.(treinamento, form);
    } finally {
      setIsSalvando(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(20, 30, 20, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={heebo.className}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxWidth: "480px",
          width: "100%",
          padding: "32px",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          style={{ position: "absolute", top: "16px", right: "16px", border: "none", backgroundColor: "transparent", color: "#8a9a85" }}
          className="hover:opacity-70 transition-opacity"
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#222", marginBottom: "24px" }}>
          Editar treinamento
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Colaborador</span>
            <input
              type="text"
              value={form.colaborador}
              onChange={(e) => atualizarCampo("colaborador", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>

          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Treinamento</span>
            <div style={{ position: "relative", marginTop: "4px" }}>
              <select
                value={form.nome}
                onChange={(e) => atualizarCampo("nome", e.target.value)}
                style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
              >
                {treinamentosDisponiveis.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="text-[#8a9a85] pointer-events-none"
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "12px", color: "#8a9a85" }}>Data / Prazo</span>
              <input
                type="date"
                value={form.data}
                onChange={(e) => atualizarCampo("data", e.target.value)}
                style={{ ...campoStyle, marginTop: "4px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "12px", color: "#8a9a85" }}>Válido até</span>
              <input
                type="date"
                value={form.validade}
                onChange={(e) => atualizarCampo("validade", e.target.value)}
                style={{ ...campoStyle, marginTop: "4px" }}
              />
            </div>
          </div>

          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Status</span>
            <div style={{ position: "relative", marginTop: "4px" }}>
              <select
                value={form.status}
                onChange={(e) => atualizarCampo("status", e.target.value)}
                style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
              >
                <option value="realizado">Realizado</option>
                <option value="pendente">Pendente</option>
              </select>
              <ChevronDown
                size={15}
                className="text-[#8a9a85] pointer-events-none"
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={salvar}
            disabled={isSalvando}
            style={{
              marginTop: "8px",
              height: "48px",
              borderRadius: "10px",
              backgroundColor: "#3a6b35",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              opacity: isSalvando ? 0.6 : 1,
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {isSalvando ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}