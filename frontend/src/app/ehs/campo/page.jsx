"use client";

import Sidebar from "@/app/components/Sidebar";
import {
  MapPin,
  CalendarDays,
  Users,
  Wrench,
  CheckCircle2,
  ClockAlert,
  Factory,
} from "lucide-react";
import { useCampo } from "../../hooks/useCampo";

export default function CampoPage() {
  const {
    alocacaoAtual,
    treinamentosRealizados,
    treinamentosPendentes,
    ultimasAlocacoes,
    loading,
    error,
  } = useCampo();

  return (
    <div className="flex h-screen bg-[#f4f6f0]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between h-[60px] px-7 bg-white border-b border-[#dde5d8] flex-shrink-0">
          <div>
            <h1 className="text-[18px] font-medium text-[#2d4a27]">EHS</h1>
            <p className="text-xs text-[#7a9470] mt-0.5">
              Acompanhe sua alocação, histórico e treinamentos.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#3d5c38]">
            <span>Bem vindo, Carlos Eduardo!</span>
            <div className="w-8 h-8 rounded-full bg-[#c8ddb8] flex items-center justify-center text-xs font-medium text-[#3d5c38]">
              CE
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 overflow-y-auto p-7 flex flex-col gap-5">
          {loading && (
            <div className="text-[#6a8a60] text-sm">Carregando...</div>
          )}

          {!loading && error && (
            <div className="text-red-500 text-sm">Erro: {error}</div>
          )}

          {!loading && !error && (
            <>
              {/* Alocação atual */}
              <section className="bg-white rounded-2xl border border-[#dde5d8] p-5">
                <p className="text-[10px] font-medium tracking-widest text-[#7a9470] uppercase mb-4">
                  Alocação atual
                </p>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#eaf2e3] flex items-center justify-center">
                      <Factory size={20} className="text-[#4a7a3a]" />
                    </div>
                    <div>
                      <p className="text-[17px] font-medium text-[#2d4a27]">
                        {alocacaoAtual?.nome || "—"}
                      </p>
                      <p className="text-sm text-[#7a9470] mt-0.5">
                        {alocacaoAtual?.sublocal || "—"}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 bg-[#eaf2e3] text-[#3d6e2d] text-xs font-medium px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9a3a]" />
                    {alocacaoAtual?.status || "Em campo"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InfoBox icon={<MapPin size={13} />} label="Localização" value={alocacaoAtual?.localizacao || "—"} />
                  <InfoBox icon={<CalendarDays size={13} />} label="Período" value={alocacaoAtual?.periodo || "—"} />
                  <InfoBox icon={<Users size={13} />} label="Equipe" value={alocacaoAtual?.equipe || "—"} />
                  <InfoBox icon={<Wrench size={13} />} label="Atividade" value={alocacaoAtual?.atividade || "—"} />
                </div>
              </section>

              {/* Treinamentos */}
              <section className="bg-white rounded-2xl border border-[#dde5d8] p-5">
                <p className="text-[10px] font-medium tracking-widest text-[#7a9470] uppercase mb-4">
                  Treinamentos
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Realizados */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#2d4a27]">Realizados</span>
                      <span className="text-xs font-medium bg-[#eaf2e3] text-[#3d6e2d] px-2 py-0.5 rounded-full">
                        {treinamentosRealizados.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {treinamentosRealizados.map((t) => (
                        <div
                          key={t.id ?? t.nome}
                          className="flex items-center gap-2.5 bg-[#f7faf4] border border-[#dde5d8] rounded-xl px-3.5 py-2.5"
                        >
                          <CheckCircle2 size={16} className="text-[#4a9a3a] flex-shrink-0" />
                          <div>
                            <p className="text-[13px] font-medium text-[#2d4a27]">{t.nome}</p>
                            <p className="text-[11px] text-[#7a9470] mt-0.5">{t.validade}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pendentes */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#2d4a27]">Pendentes</span>
                      <span className="text-xs font-medium bg-[#fff3d4] text-[#8a5e0a] px-2 py-0.5 rounded-full">
                        {treinamentosPendentes.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {treinamentosPendentes.map((t) => (
                        <div
                          key={t.id ?? t.nome}
                          className="flex items-center gap-2.5 bg-[#fffbf2] border border-[#f0d898] rounded-xl px-3.5 py-2.5"
                        >
                          <ClockAlert size={16} className="text-[#c8860a] flex-shrink-0" />
                          <div>
                            <p className="text-[13px] font-medium text-[#6b4a08]">{t.nome}</p>
                            <p className="text-[11px] text-[#c8860a] mt-0.5">{t.prazo}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Últimas alocações */}
              <section className="bg-white rounded-2xl border border-[#dde5d8] p-5">
                <p className="text-[10px] font-medium tracking-widest text-[#7a9470] uppercase mb-4">
                  Últimas alocações
                </p>
                <div className="flex flex-col gap-2">
                  {ultimasAlocacoes.map((a) => (
                    <div
                      key={a.id ?? a.nome}
                      className="flex items-center justify-between bg-[#f7faf4] border border-[#dde5d8] rounded-xl px-4 py-3"
                    >
                      <div>
                        <p className="text-[13px] font-medium text-[#2d4a27]">{a.nome}</p>
                        <p className="flex items-center gap-1 text-xs text-[#7a9470] mt-0.5">
                          <MapPin size={12} />
                          {a.local}
                        </p>
                      </div>
                      <span className="text-xs text-[#7a9470] whitespace-nowrap ml-4">{a.periodo}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── sub-componente ──────────────────────────────────────────────────────────
function InfoBox({ icon, label, value }) {
  return (
    <div className="bg-[#f7faf4] border border-[#dde5d8] rounded-xl px-3.5 py-3">
      <p className="flex items-center gap-1 text-[10px] font-medium tracking-widest text-[#7a9470] uppercase mb-1">
        {icon} {label}
      </p>
      <p className="text-sm font-medium text-[#2d4a27]">{value}</p>
    </div>
  );
}