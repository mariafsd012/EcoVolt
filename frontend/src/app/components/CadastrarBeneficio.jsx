"use client";

import { Gift, ChevronDown } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  backgroundColor: "#ffffff",
  width: "100%",
};

const TIPOS = [
  { value: "saude", label: "Plano de Saúde" },
  { value: "odontologico", label: "Plano Odontológico" },
  { value: "alimentacao", label: "Vale Alimentação" },
  { value: "refeicao", label: "Vale Refeição" },
  { value: "transporte", label: "Vale Transporte" },
  { value: "academia", label: "Gympass / Academia" },
  { value: "outro", label: "Outro" },
];

export default function CadastrarBeneficio({
  beneficio = {
    nome: "",
    tipo: "",
    valor: "",
    dataInicio: "",
    dataFim: "",
    descricao: "",
  },
  onChangeCampo,
  onCadastrar,
  isSubmitting = false,
}) {
  return (
    <section
      style={{
        backgroundColor: "#a9c293",
        borderRadius: "16px",
        padding: "32px",
      }}
      className={heebo.className}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <Gift size={20} className="text-white" />
        <h2
          className="text-white font-semibold"
          style={{ fontSize: "20px" }}
        >
          Cadastrar benefício
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: "2 1 260px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#fff",
                opacity: 0.85,
              }}
            >
              Nome do benefício
            </span>

            <input
              type="text"
              placeholder="Ex: Plano Unimed"
              value={beneficio.nome}
              onChange={(e) =>
                onChangeCampo("nome", e.target.value)
              }
              style={{
                ...campoStyle,
                marginTop: "4px",
              }}
            />
          </div>

          <div style={{ flex: "1 1 220px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#fff",
                opacity: 0.85,
              }}
            >
              Tipo
            </span>

            <div
              style={{
                position: "relative",
                marginTop: "4px",
              }}
            >
              <select
                value={beneficio.tipo}
                onChange={(e) =>
                  onChangeCampo("tipo", e.target.value)
                }
                style={{
                  ...campoStyle,
                  paddingRight: "36px",
                  appearance: "none",
                }}
              >
                <option value="" disabled hidden>
                  Selecionar...
                </option>

                {TIPOS.map((tipo) => (
                  <option
                    key={tipo.value}
                    value={tipo.value}
                  >
                    {tipo.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="text-[#8a9a85] pointer-events-none"
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div>

          <div style={{ flex: "1 1 180px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#fff",
                opacity: 0.85,
              }}
            >
              Valor
            </span>

            <input
              type="number"
              placeholder="0,00"
              value={beneficio.valor}
              onChange={(e) =>
                onChangeCampo("valor", e.target.value)
              }
              style={{
                ...campoStyle,
                marginTop: "4px",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 220px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#fff",
                opacity: 0.85,
              }}
            >
              Data de início
            </span>

            <input
              type="date"
              value={beneficio.dataInicio}
              onChange={(e) =>
                onChangeCampo("dataInicio", e.target.value)
              }
              style={{
                ...campoStyle,
                marginTop: "4px",
              }}
            />
          </div>

          <div style={{ flex: "1 1 220px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#fff",
                opacity: 0.85,
              }}
            >
              Data de término
            </span>

            <input
              type="date"
              value={beneficio.dataFim}
              onChange={(e) =>
                onChangeCampo("dataFim", e.target.value)
              }
              style={{
                ...campoStyle,
                marginTop: "4px",
              }}
            />
          </div>
        </div>

        <div>
          <span
            style={{
              fontSize: "12px",
              color: "#fff",
              opacity: 0.85,
            }}
          >
            Descrição
          </span>

          <textarea
            placeholder="Descreva detalhes do benefício..."
            value={beneficio.descricao}
            onChange={(e) =>
              onChangeCampo("descricao", e.target.value)
            }
            rows={4}
            style={{
              ...campoStyle,
              height: "auto",
              minHeight: "110px",
              padding: "14px 20px",
              resize: "vertical",
              marginTop: "4px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <button
            type="button"
            onClick={onCadastrar}
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
            {isSubmitting ? "Salvando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </section>
  );
}