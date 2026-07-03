"use client";

import { UserCircle2 } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function MeuRHHeader({ nomeColaborador = "" }) {
  return (
    <div className={heebo.className} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: "#3a6b35",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserCircle2 size={26} className="text-white" />
      </div>
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#374f30" }}>
          Meu RH
        </h1>
        <p style={{ fontSize: "13px", color: "#5a6a55" }}>
          {nomeColaborador
            ? `Olá, ${nomeColaborador}. Aqui está seu desempenho e seus benefícios.`
            : "Acompanhe aqui seu desempenho e seus benefícios."}
        </p>
      </div>
    </div>
  );
}