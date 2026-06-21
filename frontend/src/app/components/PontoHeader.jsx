"use client";

import { useEffect, useState } from "react";
import { usuarioService } from "../ponto/controle/usuarioService";

export default function PontoHeader() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(usuarioService.obterUsuarioLogado());
  }, []);

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-[26px] font-bold text-[#222] leading-tight">
          Ponto
        </h1>
        <p className="text-[13px] text-[#8a9a85] mt-1">
          Gerencie as jornadas de trabalho
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[14px] text-[#4a5a45]">
          {usuario?.nome ? `Bem vindo, ${usuario.nome}!` : "Bem vindo!"}
        </span>

        <div className="w-9 h-9 rounded-full bg-[#dfe6da] overflow-hidden flex items-center justify-center" />
      </div>
    </header>
  );
}