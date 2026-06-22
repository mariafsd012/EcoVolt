"use client";

import { Heebo } from "next/font/google";
import { FileText } from "lucide-react";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function StatusDots({ status, onAprovar, onReprovar }) {
  if (status === "pendente") {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Reprovar justificativa"
          onClick={onReprovar}
          className="w-4 h-4 rounded-full bg-[#c0504d] hover:opacity-80 transition"
        />
        <button
          type="button"
          aria-label="Aprovar justificativa"
          onClick={onAprovar}
          className="w-4 h-4 rounded-full bg-[#3a6b35] hover:opacity-80 transition"
        />
      </div>
    );
  }

  if (status === "reprovado") {
    return (
      <div
        className="w-4 h-4 rounded-full bg-[#c0504d]"
        title="Reprovado"
        aria-label="Reprovado"
      />
    );
  }

  return (
    <div
      className="w-4 h-4 rounded-full bg-[#3a6b35]"
      title="Aprovado"
      aria-label="Aprovado"
    />
  );
}

export default function TabelaJustificativas({
  justificativas = [],
  isLoading,
  erro,
  onAprovar,
  onReprovar,
  onVerDetalhes,
}) {
  return (
    <section
      className={`${heebo.className} bg-white border border-[#e8ede4] overflow-hidden`}
    >
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#f3f6f0] text-[12px] text-[#7d8d78] uppercase tracking-wide">
            <th className="px-6 py-3 font-medium">Nome Completo</th>
            <th className="px-6 py-3 font-medium">Detalhamento</th>
            <th className="px-6 py-3 font-medium w-28" />
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-[13px] text-[#8a9a85]">
                Carregando justificativas...
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

          {!isLoading && !erro && justificativas.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-[13px] text-[#8a9a85]">
                Nenhuma justificativa encontrada para os filtros selecionados.
              </td>
            </tr>
          )}

          {!isLoading &&
            !erro &&
            justificativas.map((justificativa) => (
              <tr
                key={justificativa.id}
                className="text-[13px] text-[#333] bg-[#f7faf5] border-t border-[#eef2ea]"
              >
                <td className="px-6 py-4 align-top">{justificativa.nome}</td>
                <td className="px-6 py-4 align-top text-[#5a6a55]">
                  {justificativa.detalhamento}
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center gap-4 justify-end">
                    <StatusDots
                      status={justificativa.status}
                      onAprovar={() => onAprovar?.(justificativa.id)}
                      onReprovar={() => onReprovar?.(justificativa.id)}
                    />
                    <button
                      type="button"
                      onClick={() => onVerDetalhes?.(justificativa.id)}
                      aria-label={`Ver detalhes da justificativa de ${justificativa.nome}`}
                      className="text-[#3a6b35] hover:opacity-70 transition-opacity"
                    >
                      <FileText size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}