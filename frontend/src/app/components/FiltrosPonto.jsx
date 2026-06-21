"use client";

import { SlidersHorizontal } from "lucide-react";

export default function FiltrosPonto({
  filtros = { colaboradorId: "", setor: "" },
  setores = [],
  onChangeFiltro,
}) {
  return (
    <section className="w-full bg-white rounded-2xl border border-[#FFFFFF] shadow-[0_2px_10px_rgba(60,90,50,0.04)] p-8 font-heebo">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-7">
        <SlidersHorizontal size={18} className="shrink-0 text-[#374f30]" />
        <h2 className="text-[24px] leading-none font-heebo font-medium text-[#374f30]">
          Aplicar filtros
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">

        {/* INPUT COLABORADOR */}
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            placeholder="Colaborador"
            value={filtros.colaboradorId}
            onChange={(e) => onChangeFiltro("colaboradorId", e.target.value)}
            className="block w-full box-border h-12 leading-[48px] px-5 rounded-full border border-[#ececec] text-[14px] font-heebo text-[#374f30] placeholder:text-[#5a6a55] bg-[#f3f1f6] focus:outline-none focus:ring-2 focus:ring-[#3a6b35]/20"
          />
        </div>

        {/* SELECT SETOR / EQUIPE */}
        <div className="relative flex-1 min-w-0">
          <select
            value={filtros.setor}
            onChange={(e) => onChangeFiltro("setor", e.target.value)}
            className="block w-full box-border h-12 leading-[48px] px-5 rounded-full border border-[#ececec] text-[14px] font-heebo text-[#374f30] bg-[#f3f1f6] appearance-none focus:outline-none focus:ring-2 focus:ring-[#3a6b35]/20"
          >
            <option value="" disabled hidden className="font-heebo">
              Equipe
            </option>

            {setores.map((setor) => (
              <option key={setor.value} value={setor.value} className="font-heebo">
                {setor.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </section>
  );
}