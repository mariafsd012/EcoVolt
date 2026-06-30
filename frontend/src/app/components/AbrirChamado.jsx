"use client";

import { Megaphone, ChevronDown, Paperclip } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const campoStyle = {
  padding: "16px 20px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "15px",
  fontWeight: 500,
  color: "#374f30",
  backgroundColor: "#ffffff",
  width: "100%",
};

const TIPOS_COM_ANEXO = ["JUSTIFICATIVA_FALTA", "AJUSTE_PONTO"];

export default function AbrirChamado({
  chamado = { tipo: "", detalhamento: "", arquivo: null },
  tiposChamado = [
    { value: "JUSTIFICATIVA_FALTA", label: "Justificativa de Falta" },
    { value: "SUPORTE_TI", label: "Suporte T.I" },
    { value: "AJUSTE_PONTO", label: "Ajuste de Ponto" },
    { value: "ERRO_BENEFICIO", label: "Erro de Benefício" },
    { value: "ERRO_SALARIO", label: "Erro de Salário" },
  ],
  onChangeCampo,
  onAbrirChamado,
  isSubmitting = false,
}) {
  const mostrarAnexo = TIPOS_COM_ANEXO.includes(chamado.tipo);

  function handleArquivo(e) {
    const arquivo = e.target.files?.[0] || null;
    onChangeCampo("arquivo", arquivo);
  }

  return (
    <section
      style={{ backgroundColor: "#a9c293", borderRadius: "16px", padding: "32px" }}
      className={heebo.className}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
      >
        <Megaphone size={20} className="text-white" />
        <h2 className="text-white font-semibold" style={{ fontSize: "20px" }}>
          Abrir novo chamado
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ position: "relative" }}>
          <select
            value={chamado.tipo}
            onChange={(e) => onChangeCampo("tipo", e.target.value)}
            style={{ ...campoStyle, height: "56px", paddingRight: "36px", appearance: "none" }}
          >
            <option value="" disabled hidden>
              Tipo
            </option>
            {tiposChamado.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="text-[#8a9a85] pointer-events-none"
            style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}
          />
        </div>

        <textarea
          placeholder="Detalhamento"
          value={chamado.detalhamento}
          onChange={(e) => onChangeCampo("detalhamento", e.target.value)}
          rows={5}
          style={{
            ...campoStyle,
            resize: "vertical",
            minHeight: "140px",
            color: chamado.detalhamento ? "#374f30" : "#9aa893",
          }}
        />

        {mostrarAnexo && (
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#ffffff",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Anexar atestado (opcional)
            </label>

            <label
              htmlFor="anexo-chamado"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                borderRadius: "12px",
                border: "1.5px dashed #c5d6bb",
                backgroundColor: "#f4f8f1",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#e9f0e3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Paperclip size={18} className="text-[#3a6b35]" />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#374f30" }}>
                  {chamado.arquivo ? chamado.arquivo.name : "Selecionar arquivo"}
                </div>
                <div style={{ fontSize: "12px", color: "#8a9a85" }}>
                  PDF, JPG ou PNG até 5MB
                </div>
              </div>
            </label>

            <input
              id="anexo-chamado"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleArquivo}
              style={{ display: "none" }}
            />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <button
            type="button"
            onClick={onAbrirChamado}
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
            {isSubmitting ? "Abrindo..." : "Abrir chamado"}
          </button>
        </div>
      </div>
    </section>
  );
}