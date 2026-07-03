"use client";

import { Heebo } from "next/font/google";
import { Briefcase, SquarePen } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ListaEquipes({ equipes = [], isLoading, erro, onEditar }) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <Briefcase size={20} className="text-[#374f30]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Equipes cadastradas
        </h2>
      </div>

      {isLoading && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "32px 0" }}>
          Carregando equipes...
        </p>
      )}

      {!isLoading && erro && (
        <p style={{ fontSize: "13px", color: "#b05a55", textAlign: "center", padding: "32px 0" }}>
          Não foi possível carregar as equipes.
        </p>
      )}

      {!isLoading && !erro && equipes.length === 0 && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "32px 0" }}>
          Nenhuma equipe cadastrada até o momento.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {!isLoading &&
          !erro &&
          equipes.map((equipe) => (
            <div
              key={equipe.id}
              style={{
                backgroundColor: "#f7faf5",
                borderRadius: "14px",
                padding: "20px 22px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#222" }}>
                    {equipe.nome}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#8a9a85", marginTop: "2px" }}>
                    {equipe.setor ?? "-"} · {equipe.colaboradores?.length ?? 0} colaborador
                    {(equipe.colaboradores?.length ?? 0) === 1 ? "" : "es"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onEditar?.(equipe)}
                  aria-label={`Editar equipe ${equipe.nome}`}
                  style={{ color: "#3a6b35", border: "none", backgroundColor: "transparent" }}
                  className="hover:opacity-70 transition-opacity"
                >
                  <SquarePen size={18} />
                </button>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(equipe.colaboradores ?? []).length === 0 ? (
                  <span style={{ fontSize: "13px", color: "#8a9a85" }}>
                    Nenhum colaborador nesta equipe.
                  </span>
                ) : (
                  equipe.colaboradores.map((colaborador) => (
                    <span
                      key={colaborador.id}
                      style={{
                        fontSize: "13px",
                        color: "#374f30",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8ede4",
                        borderRadius: "999px",
                        padding: "6px 14px",
                      }}
                    >
                      {colaborador.nome}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
