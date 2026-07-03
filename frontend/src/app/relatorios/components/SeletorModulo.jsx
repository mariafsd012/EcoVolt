"use client";

import { Clock, Truck, Monitor, ShieldCheck, Users, Home } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const MODULOS = [
  { value: "ponto", label: "Ponto", icon: Clock },
  { value: "frota", label: "Frota", icon: Truck },
  { value: "ti", label: "T.I", icon: Monitor },
  { value: "ehs", label: "EHS", icon: ShieldCheck },
  { value: "dho", label: "DHO", icon: Users },
  { value: "moradia", label: "Moradia", icon: Home },
];

export default function SeletorModulo({ moduloSelecionado, onSelecionarModulo }) {
  return (
    <section
      style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px 24px" }}
      className={heebo.className}
    >
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {MODULOS.map(({ value, label, icon: Icone }) => {
          const ativo = moduloSelecionado === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelecionarModulo(value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "48px",
                padding: "0 22px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: ativo ? "#3a6b35" : "#f7faf5",
                color: ativo ? "#ffffff" : "#374f30",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                flex: "1 1 160px",
                justifyContent: "center",
              }}
              className="transition-colors"
            >
              <Icone size={17} />
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}