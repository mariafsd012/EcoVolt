"use client";

import { useEffect, useState } from "react";
import { Heebo } from "next/font/google";
import {
  X,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Clock,
  Paperclip,
  ChevronDown,
} from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const motivosAusencia = [
  { value: "consulta_medica", label: "Consulta médica" },
  { value: "a_servico_da_empresa", label: "A serviço da empresa" },
];

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

export default function ModalEditarPonto({
  registro,
  onClose,
  onSalvarApontamentos,
  onLancarJustificativa,
}) {
  const linhasApontamento = [
    { chave: "entrada1", label: "Entrada 1", tipo: "entrada", idChave: "idEntrada1" },
    { chave: "saida1",   label: "Saída 1",   tipo: "saida",   idChave: "idSaida1"   },
    { chave: "entrada2", label: "Entrada 2", tipo: "entrada", idChave: "idEntrada2" },
    { chave: "saida2",   label: "Saída 2",   tipo: "saida",   idChave: "idSaida2"   },
  ];

  const [apontamentos, setApontamentos] = useState({
    entrada1: registro?.entrada1 ?? "",
    saida1:   registro?.saida1   ?? "",
    entrada2: registro?.entrada2 ?? "",
    saida2:   registro?.saida2   ?? "",
  });
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [isSalvandoApontamentos, setIsSalvandoApontamentos] = useState(false);

  const [justificativa, setJustificativa] = useState({
    dataInicial: registro?.data ?? "",
    dataFinal: registro?.data ?? "",
    quantidadeHoras: "",
    motivo: "",
    arquivo: null,
  });
  const [isLancandoJustificativa, setIsLancandoJustificativa] = useState(false);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  function atualizarApontamento(campo, valor) {
    setApontamentos((prev) => ({ ...prev, [campo]: valor }));
  }

  function atualizarJustificativa(campo, valor) {
    setJustificativa((prev) => ({ ...prev, [campo]: valor }));
  }

  // Converte "HH:mm" + data do registro para LocalDateTime no formato ISO
  function montarDataHora(hora) {
    if (!hora || !registro?.data) return null;
    const [dia, mes, ano] = registro.data.split("/");
    return `${ano}-${mes}-${dia}T${hora}:00`;
  }

  async function salvarApontamentos() {
    setIsSalvandoApontamentos(true);
    try {
      // Verifica quais campos foram alterados
      const camposAlterados = [];
      
      for (const linha of linhasApontamento) {
        const horaAtual = apontamentos[linha.chave];
        const horaOriginal = registro?.[linha.chave] ?? "";
        const idRegistro = registro?.[linha.idChave];
        
        if (idRegistro && horaAtual && horaAtual !== horaOriginal) {
          camposAlterados.push({
            id: idRegistro,
            chave: linha.chave,
            valor: horaAtual,
            tipo: linha.tipo === "entrada" ? "ENTRADA" : "SAIDA"
          });
        }
      }

      // Salva cada campo alterado individualmente
      for (const campo of camposAlterados) {
        const dataHoraRegistro = montarDataHora(campo.valor);
        await onSalvarApontamentos?.(
          { id: campo.id }, 
          { dataHoraRegistro, tipo: campo.tipo }
        );
      }
      
      onClose();
    } catch (error) {
      console.error("Erro ao salvar apontamentos:", error);
    } finally {
      setIsSalvandoApontamentos(false);
    }
  }

  async function lancarJustificativa() {
    setIsLancandoJustificativa(true);
    try {
      await onLancarJustificativa?.({ 
        registroId: registro?.id, 
        ...justificativa 
      });
      onClose();
    } catch (error) {
      console.error("Erro ao lançar justificativa:", error);
    } finally {
      setIsLancandoJustificativa(false);
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
          maxWidth: "920px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            border: "none",
            backgroundColor: "transparent",
            color: "#8a9a85",
            zIndex: 1,
          }}
          className="hover:opacity-70 transition-opacity"
        >
          <X size={20} />
        </button>

        {/* PAINEL ESQUERDO: EDITAR APONTAMENTOS */}
        <div style={{ flex: "1 1 360px", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#222", marginBottom: "20px" }}>
            Editar apontamentos
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {linhasApontamento.map((linha) => {
              const emEdicao = editandoCampo === linha.chave;
              const Icone = linha.tipo === "entrada" ? ArrowLeftFromLine : ArrowRightFromLine;
              const corIcone = linha.tipo === "entrada" ? "#3a6b35" : "#c0504d";

              return (
                <div
                  key={linha.chave}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    backgroundColor: "#f7faf5",
                  }}
                >
                  <Icone size={18} style={{ color: corIcone }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "#8a9a85", marginBottom: "2px" }}>
                      {linha.label}
                    </div>
                    {emEdicao ? (
                      <input
                        type="time"
                        autoFocus
                        value={apontamentos[linha.chave]}
                        onChange={(e) => atualizarApontamento(linha.chave, e.target.value)}
                        onBlur={() => setEditandoCampo(null)}
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#222",
                          border: "none",
                          outline: "none",
                          backgroundColor: "transparent",
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#222" }}>
                        {apontamentos[linha.chave] || "--:--"}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditandoCampo(linha.chave)}
                    aria-label={`Editar ${linha.label}`}
                    style={{ border: "none", backgroundColor: "transparent", color: "#8a9a85" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Clock size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={salvarApontamentos}
            disabled={isSalvandoApontamentos}
            style={{
              marginTop: "24px",
              width: "100%",
              height: "48px",
              borderRadius: "10px",
              backgroundColor: "#3a6b35",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              opacity: isSalvandoApontamentos ? 0.6 : 1,
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {isSalvandoApontamentos ? "Salvando..." : "Salvar apontamentos"}
          </button>
        </div>

        {/* PAINEL DIREITO: JUSTIFICATIVA DE AUSÊNCIA */}
        <div
          style={{
            flex: "1 1 360px",
            padding: "32px",
            backgroundColor: "#fafcf9",
            borderLeft: "1px solid #eef2ea",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#222", marginBottom: "20px" }}>
            Justificativa de ausência
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* QUANTIDADE DE HORAS */}
            <div>
              <p style={{ fontSize: "13px", color: "#5a6a55", fontWeight: 600, marginBottom: "8px" }}>
                Quantidade de horas
              </p>
              <input
                type="time"
                value={justificativa.quantidadeHoras}
                onChange={(e) => atualizarJustificativa("quantidadeHoras", e.target.value)}
                style={campoStyle}
              />
            </div>

            {/* MOTIVO */}
            <div>
              <p style={{ fontSize: "13px", color: "#5a6a55", fontWeight: 600, marginBottom: "8px" }}>
                Motivo
              </p>
              <div style={{ position: "relative" }}>
                <select
                  value={justificativa.motivo}
                  onChange={(e) => atualizarJustificativa("motivo", e.target.value)}
                  style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
                >
                  <option value="" disabled hidden>
                    Selecionar motivo...
                  </option>
                  {motivosAusencia.map((motivo) => (
                    <option key={motivo.value} value={motivo.value}>
                      {motivo.label}
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

            {/* ANEXAR ATESTADO */}
            <div>
              <p style={{ fontSize: "13px", color: "#5a6a55", fontWeight: 600, marginBottom: "8px" }}>
                Anexar atestado (opcional)
              </p>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  border: "1px dashed #cfd9c8",
                  backgroundColor: "#f3f6f0",
                  cursor: "pointer",
                }}
              >
                <Paperclip size={18} className="text-[#5a6a55]" />
                <div>
                  <div style={{ fontSize: "14px", color: "#374f30", fontWeight: 500 }}>
                    {justificativa.arquivo?.name ?? "Selecionar arquivo"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#8a9a85" }}>PDF, JPG ou PNG até 5MB</div>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => atualizarJustificativa("arquivo", e.target.files?.[0] ?? null)}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* BOTÃO LANÇAR */}
            <button
              type="button"
              onClick={lancarJustificativa}
              disabled={isLancandoJustificativa}
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "10px",
                backgroundColor: "#3a6b35",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
                border: "none",
                opacity: isLancandoJustificativa ? 0.6 : 1,
                marginTop: "4px",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              {isLancandoJustificativa ? "Lançando..." : "Lançar afastamento"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}