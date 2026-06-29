"use client";

import { useState } from "react";
import { X } from "lucide-react";
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

export default function ModalEditarEquipe({
  equipe,
  colaboradoresDisponiveis = [],
  onClose,
  onSalvar,
}) {
  const [form, setForm] = useState({
    nome: equipe?.nome ?? "",
    setor: equipe?.setor ?? "",
    colaboradores: equipe?.colaboradores ?? [],
  });
  const [buscaAdicionar, setBuscaAdicionar] = useState("");
  const [isSalvando, setIsSalvando] = useState(false);

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function removerColaborador(colaboradorId) {
    setForm((prev) => ({
      ...prev,
      colaboradores: prev.colaboradores.filter((c) => c.id !== colaboradorId),
    }));
  }

  function adicionarColaborador(colaborador) {
    if (form.colaboradores.some((c) => c.id === colaborador.id)) return;
    setForm((prev) => ({ ...prev, colaboradores: [...prev.colaboradores, colaborador] }));
    setBuscaAdicionar("");
  }

  async function salvar() {
    setIsSalvando(true);
    try {
      await onSalvar?.(equipe, {
        nome: form.nome,
        setor: form.setor,
        colaboradoresIds: form.colaboradores.map((c) => c.id),
      });
    } finally {
      setIsSalvando(false);
    }
  }

  const sugestoes = buscaAdicionar
    ? colaboradoresDisponiveis.filter(
        (c) =>
          c.nome.toLowerCase().includes(buscaAdicionar.toLowerCase()) &&
          !form.colaboradores.some((sel) => sel.id === c.id)
      )
    : [];

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
          maxWidth: "520px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
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
          Editar equipe
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Nome da equipe</span>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => atualizarCampo("nome", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>

          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Setor / Área</span>
            <input
              type="text"
              value={form.setor}
              onChange={(e) => atualizarCampo("setor", e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />
          </div>

          {/* COLABORADORES ATUAIS, COM OPÇÃO DE REMOVER */}
          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>
              Colaboradores ({form.colaboradores.length})
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {form.colaboradores.length === 0 && (
                <p style={{ fontSize: "13px", color: "#8a9a85" }}>Nenhum colaborador nesta equipe.</p>
              )}

              {form.colaboradores.map((colaborador) => (
                <div
                  key={colaborador.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#f7faf5",
                    borderRadius: "10px",
                    padding: "10px 14px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#374f30" }}>{colaborador.nome}</span>
                  <button
                    type="button"
                    onClick={() => removerColaborador(colaborador.id)}
                    aria-label={`Remover ${colaborador.nome} da equipe`}
                    style={{ color: "#b05a55", border: "none", backgroundColor: "transparent" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ADICIONAR NOVO COLABORADOR */}
          <div>
            <span style={{ fontSize: "12px", color: "#8a9a85" }}>Adicionar colaborador</span>
            <input
              type="text"
              placeholder="Buscar colaborador..."
              value={buscaAdicionar}
              onChange={(e) => setBuscaAdicionar(e.target.value)}
              style={{ ...campoStyle, marginTop: "4px" }}
            />

            {sugestoes.length > 0 && (
              <div
                style={{
                  marginTop: "8px",
                  border: "1px solid #e8ede4",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {sugestoes.slice(0, 5).map((colaborador) => (
                  <button
                    key={colaborador.id}
                    type="button"
                    onClick={() => adicionarColaborador(colaborador)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      fontSize: "14px",
                      color: "#374f30",
                      border: "none",
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                    }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {colaborador.nome}
                  </button>
                ))}
              </div>
            )}
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