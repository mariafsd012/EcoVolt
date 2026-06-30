"use client";

import { Heebo } from "next/font/google";
import { UserX } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ColaboradoresSemEquipe({ colaboradores = [], isLoading, erro }) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <UserX size={20} className="text-[#b05a55]" />
        <h2 className="text-[#374f30] font-semibold" style={{ fontSize: "20px" }}>
          Colaboradores sem equipe
        </h2>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#b05a55",
            backgroundColor: "#f6dedd",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "4px",
          }}
        >
          {colaboradores.length}
        </span>
      </div>

      {isLoading && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "24px 0" }}>
          Carregando colaboradores...
        </p>
      )}

      {!isLoading && erro && (
        <p style={{ fontSize: "13px", color: "#b05a55", textAlign: "center", padding: "24px 0" }}>
          Não foi possível carregar os colaboradores sem equipe.
        </p>
      )}

      {!isLoading && !erro && colaboradores.length === 0 && (
        <p style={{ fontSize: "13px", color: "#8a9a85", textAlign: "center", padding: "24px 0" }}>
          Todos os colaboradores estão alocados em alguma equipe.
        </p>
      )}

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {!isLoading &&
          !erro &&
          colaboradores.map((colaborador) => (
            <span
              key={colaborador.id}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#374f30",
                backgroundColor: "#fbf0d9",
                borderRadius: "999px",
                padding: "8px 16px",
              }}
            >
              {colaborador.nome}
            </span>
          ))}
      </div>
    </section>
  );
}
