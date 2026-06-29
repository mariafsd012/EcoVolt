"use client";

import { useState } from "react";
import { Receipt, Paperclip, ChevronDown, X } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const CATEGORIAS = [
  { value: "agua", label: "Água" },
  { value: "energia", label: "Energia" },
  { value: "internet", label: "Internet" },
  { value: "gas", label: "Gás" },
  { value: "aluguel", label: "Aluguel" },
  { value: "condominio", label: "Condomínio" },
  { value: "outro", label: "Outro" },
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

const CATEGORIA_COR = {
  agua: "#4e9fcc",
  energia: "#c79b3a",
  internet: "#5a7db5",
  gas: "#c0504d",
  aluguel: "#3a6b35",
  condominio: "#7d8d78",
  outro: "#8a9a85",
};

export default function ContasMoradia({
  moradias = [],
  contas = [],
  isLoading,
  onAnexarConta,
  onRemoverConta,
}) {
  const [form, setForm] = useState({
    moradiaId: "",
    categoria: "",
    mes: "",
    valor: "",
    arquivo: null,
  });
  const [isAnexando, setIsAnexando] = useState(false);

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleAnexar() {
    setIsAnexando(true);
    try {
      await onAnexarConta?.(form);
      setForm({ moradiaId: "", categoria: "", mes: "", valor: "", arquivo: null });
    } finally {
      setIsAnexando(false);
    }
  }

  // agrupa contas por mês
  const contasPorMes = contas.reduce((acc, conta) => {
    const mes = conta.mes ?? "Sem mês";
    if (!acc[mes]) acc[mes] = [];
    acc[mes].push(conta);
    return acc;
  }, {});

  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <Receipt size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Contas e comprovantes
        </h2>
      </div>

      {/* FORMULÁRIO DE ANEXO */}
      <div
        style={{
          backgroundColor: "#f7faf5",
          borderRadius: "14px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <p style={{ fontSize: "13px", color: "#5a6a55", fontWeight: 600, marginBottom: "14px" }}>
          Anexar nova conta
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {/* SELECT MORADIA */}
          <div style={{ position: "relative", flex: "2 1 220px" }}>
            <select
              value={form.moradiaId}
              onChange={(e) => atualizarCampo("moradiaId", e.target.value)}
              style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
            >
              <option value="" disabled hidden>Moradia</option>
              {moradias.map((m) => (
                <option key={m.id} value={m.id}>{m.endereco}</option>
              ))}
            </select>
            <ChevronDown size={14} className="text-[#8a9a85] pointer-events-none"
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
          </div>

          {/* SELECT CATEGORIA */}
          <div style={{ position: "relative", flex: "1 1 160px" }}>
            <select
              value={form.categoria}
              onChange={(e) => atualizarCampo("categoria", e.target.value)}
              style={{ ...campoStyle, paddingRight: "36px", appearance: "none" }}
            >
              <option value="" disabled hidden>Categoria</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="text-[#8a9a85] pointer-events-none"
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
          </div>

          {/* MÊS DE REFERÊNCIA */}
          <input
            type="month"
            value={form.mes}
            onChange={(e) => atualizarCampo("mes", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 160px" }}
          />

          {/* VALOR */}
          <input
            type="number"
            placeholder="Valor (R$)"
            value={form.valor}
            onChange={(e) => atualizarCampo("valor", e.target.value)}
            style={{ ...campoStyle, flex: "1 1 140px", color: form.valor ? "#374f30" : "#8a9a85" }}
          />

          {/* UPLOAD */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              height: "52px",
              padding: "0 18px",
              borderRadius: "10px",
              border: "1px dashed #cfd9c8",
              backgroundColor: "#ffffff",
              cursor: "pointer",
              flex: "1 1 180px",
              whiteSpace: "nowrap",
              fontSize: "13px",
              fontWeight: 500,
              color: "#5a6a55",
            }}
          >
            <Paperclip size={15} />
            {form.arquivo?.name ?? "Anexar comprovante"}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => atualizarCampo("arquivo", e.target.files?.[0] ?? null)}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "14px" }}>
          <button
            type="button"
            onClick={handleAnexar}
            disabled={isAnexando}
            style={{
              backgroundColor: "#3a6b35",
              height: "44px",
              padding: "0 48px",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              opacity: isAnexando ? 0.6 : 1,
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {isAnexando ? "Salvando..." : "Salvar conta"}
          </button>
        </div>
      </div>

      {/* LISTA DE CONTAS AGRUPADAS POR MÊS */}
      {isLoading && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "20px 0" }}>
          Carregando contas...
        </p>
      )}

      {!isLoading && Object.keys(contasPorMes).length === 0 && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "20px 0" }}>
          Nenhuma conta anexada ainda.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {Object.entries(contasPorMes)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([mes, itens]) => (
            <div key={mes}>
              <p style={{ fontSize: "12px", color: "#8a9a85", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "10px" }}>
                {mes}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {itens.map((conta, index) => (
                  <div
                    key={conta.id ?? index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      backgroundColor: "#f7faf5",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: CATEGORIA_COR[conta.categoria] ?? "#8a9a85",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#222" }}>
                          {CATEGORIAS.find((c) => c.value === conta.categoria)?.label ?? conta.categoria}
                        </p>
                        <p style={{ fontSize: "12px", color: "#8a9a85", marginTop: "2px" }}>
                          {conta.moradiaEndereco ?? ""}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {conta.valor && (
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#374f30" }}>
                          R$ {Number(conta.valor).toFixed(2)}
                        </span>
                      )}
                      {conta.arquivoUrl && (
                        <a
                          href={conta.arquivoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "12px", color: "#3a6b35", fontWeight: 600, textDecoration: "underline" }}
                        >
                          Ver comprovante
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => onRemoverConta?.(conta.id)}
                        aria-label="Remover conta"
                        style={{ border: "none", backgroundColor: "transparent", color: "#b05a55" }}
                        className="hover:opacity-70 transition-opacity"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}