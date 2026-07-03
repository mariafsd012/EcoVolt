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

const tiposEquipamento = [
  { value: "notebook", label: "Notebook" },
  { value: "celular", label: "Celular" },
  { value: "monitor", label: "Monitor" },
  { value: "headset", label: "Headset" },
  { value: "outro", label: "Outro" },
];

const statusEquipamento = [
  { value: "entregue", label: "Entregue" },
  { value: "devolvido", label: "Devolvido" },
  { value: "pendente", label: "Pendente" },
];

export default function ModalEditarEquipamento({ equipamento, onClose, onSalvar }) {
  const [form, setForm] = useState({
    tipo: equipamento?.tipo ?? "",
    colaborador: equipamento?.colaborador ?? "",
    dataEntrega: equipamento?.dataEntrega ?? "",
    dataDevolucao: equipamento?.dataDevolucao ?? "",
    status: equipamento?.status ?? "entregue",
  });
  const [isSalvando, setIsSalvando] = useState(false);

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function salvar() {
    setIsSalvando(true);
    try {
      await onSalvar?.(equipamento, form);
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
          Editar equipamento
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* TIPO */}
          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Tipo de aparelho</span>
            <div style={{ position: "relative", marginTop: "4px" }}>
              <select
                value={form.tipo}
                onChange={(e) => atualizarCampo("tipo", e.target.value)}
                style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
              >
                {tiposEquipamento.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
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

          {/* COLABORADOR */}
          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Colaborador</span>
            <input
              type="text"
              value={form.colaborador}
              onChange={(e) => atualizarCampo("colaborador", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>

          {/* DATAS */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "12px", color: "#8a9a85" }}>Data de entrega</span>
              <input
                type="date"
                value={form.dataEntrega}
                onChange={(e) => atualizarCampo("dataEntrega", e.target.value)}
                style={{ ...campoStyle, marginTop: "4px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "12px", color: "#8a9a85" }}>Data de devolução</span>
              <input
                type="date"
                value={form.dataDevolucao}
                onChange={(e) => atualizarCampo("dataDevolucao", e.target.value)}
                style={{ ...campoStyle, marginTop: "4px" }}
              />
            </div>
          </div>

          {/* STATUS */}
          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Status</span>
            <div style={{ position: "relative", marginTop: "4px" }}>
              <select
                value={form.status}
                onChange={(e) => atualizarCampo("status", e.target.value)}
                style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
              >
                {statusEquipamento.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
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