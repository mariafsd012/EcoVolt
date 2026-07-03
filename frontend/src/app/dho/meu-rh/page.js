"use client";

import MeuRHHeader from "./components/MeuRHHeader";
import MeuDesempenho from "./components/MeuDesempenho";
import MeusBeneficios from "./components/MeusBeneficios";
import { useMeuRH } from "./hooks/useMeuRH";

export default function MeuRHPage() {
  const {
    desempenhos,
    beneficios,
    isLoadingDesempenhos,
    isLoadingBeneficios,
    erroDesempenhos,
    erroBeneficios,
  } = useMeuRH();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <MeuRHHeader />

      <MeuDesempenho
        desempenhos={desempenhos}
        isLoading={isLoadingDesempenhos}
        erro={erroDesempenhos}
      />

      <MeusBeneficios
        beneficios={beneficios}
        isLoading={isLoadingBeneficios}
        erro={erroBeneficios}
      />
    </div>
  );
}