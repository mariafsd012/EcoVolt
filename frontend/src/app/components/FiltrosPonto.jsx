"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function FiltrosPonto({
  filtros = { colaboradorId: "", setor: "" },
  setores = [],
  onChangeFiltro,
}) {
  return (
    <section
      className={`${heebo.className}
      bg-white
      border border-[#e8ede4]
      p-8`}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5">
        <SlidersHorizontal size={16} className="text-[#374f30]" />
        <h2 className="text-[24px] text-[#374f30] font-semibold">
          Aplicar filtros
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {/* INPUT COLABORADOR */}
        <input
          type="text"
          placeholder="Buscar colaborador..."
          value={filtros.colaboradorId}
          onChange={(e) => onChangeFiltro("colaboradorId", e.target.value)}
          className="
            w-full h-10 px-4
            bg-[#f7faf5]
            border border-[#e8ede4]
            rounded-lg
            outline-none
            text-[13px] text-[#374f30] font-medium
            focus:outline-none
          "
        />

        {/* SELECT SETOR */}
        <div className="relative">
          <select
            value={filtros.setor}
            onChange={(e) => onChangeFiltro("setor", e.target.value)}
            className="
              w-full h-10 px-4
              bg-[#f7faf5]
              border border-[#e8ede4]
              rounded-lg
              outline-none appearance-none
              text-[13px] text-[#374f30] font-medium
              focus:outline-none
            "
          >
            <option value="" disabled hidden>
              Selecionar equipe...
            </option>

            {setores.map((setor) => (
              <option key={setor.value} value={setor.value}>
                {setor.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a9a85] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}