"use client";

import { Heebo } from "next/font/google";
import { SquarePen } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function TabelaColaboradores({
  colaboradores,
  isLoading,
  erro,
  onEditar,
}) {
  return (
    <section className={`${heebo.className} bg-white border border-[#e8ede4] overflow-hidden`}>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#f3f6f0] text-[12px] text-[#7d8d78] uppercase tracking-wide">
            <th className="px-6 py-3 font-medium">Nome Completo</th>
            <th className="px-6 py-3 font-medium">Equipe</th>
            <th className="px-6 py-3 font-medium w-12" />
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-[13px] text-[#8a9a85]">
                Carregando colaboradores...
              </td>
            </tr>
          )}

          {!isLoading && erro && (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-[13px] text-[#b05a55]">
                Não foi possível carregar os dados. Tente novamente em alguns instantes.
              </td>
            </tr>
          )}

          {!isLoading && !erro && colaboradores.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-[13px] text-[#8a9a85]">
                Nenhum colaborador encontrado para os filtros selecionados.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            colaboradores.map((colaborador, index) => (
              <tr
                key={colaborador.id}
                className={`text-[13px] text-[#333] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f7faf5]"
                } border-t border-[#eef2ea]`}
              >
                <td className="px-6 py-3">{colaborador.nome}</td>
                <td className="px-6 py-3">{colaborador.setor ?? "-"}</td>
                <td className="px-6 py-3 text-right">
                  <button
                    onClick={() => onEditar(colaborador.id)}
                    aria-label={`Editar registro de ${colaborador.nome}`}
                    className="text-[#3a6b35] hover:opacity-70 transition-opacity"
                  >
                    <SquarePen size={17} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}