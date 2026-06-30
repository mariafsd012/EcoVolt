"use client";

import { Briefcase } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DHOHeader() {
  return (
    <div
      className={heebo.className}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Briefcase size={24} color="#374f30" />

        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#374f30",
              margin: 0,
            }}
          >
            DHO
          </h1>

          <p
            style={{
              margin: 0,
              color: "#7d8d78",
              fontSize: "14px",
            }}
          >
            Gestão de benefícios e desempenho
          </p>
        </div>
      </div>
    </div>
  );
}