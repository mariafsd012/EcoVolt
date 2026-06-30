"use client";

import { useEffect, useState } from "react";
import { usuarioService } from "../ponto/controle/usuarioService";

export default function EquipesHeader() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(usuarioService.obterUsuarioLogado());
  }, []);

  return (
    <header
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
    >
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#222", lineHeight: 1.2 }}>
          Equipes
        </h1>
        <p style={{ fontSize: "13px", color: "#8a9a85", marginTop: "4px" }}>
          Cadastre e gerencie as equipes e seus colaboradores
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "14px", color: "#4a5a45" }}>
          {usuario?.nome ? `Bem vindo, ${usuario.nome}!` : "Bem vindo!"}
        </span>

        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#dfe6da",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>
    </header>
  );
}