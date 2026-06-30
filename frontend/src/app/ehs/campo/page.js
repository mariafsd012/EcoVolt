"use client";

<<<<<<< HEAD
import CampoHeader from "../../components/CampoHeader";
import AlocacaoAtual from "../../components/AlocacaoAtual";
import TreinamentosCampo from "../../components/TreinamentosCampo";
import UltimasAlocacoes from "../../components/UltimasAlocacoes";
=======
import { MapPin, CalendarDays, Users, Wrench, CheckCircle2, ClockAlert, Factory } from "lucide-react";
>>>>>>> origin/pagina-de-ti
import { useCampo } from "../../hooks/useCampo";

export default function CampoPage() {
  const {
    alocacaoAtual,
    treinamentosRealizados,
    treinamentosPendentes,
    ultimasAlocacoes,
<<<<<<< HEAD
    isLoadingHistorico,
    erroHistorico,
  } = useCampo();

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "2cm", paddingRight: "2cm" }}
    >
      <CampoHeader />

      <AlocacaoAtual alocacao={alocacaoAtual} />

      <TreinamentosCampo
        realizados={treinamentosRealizados}
        pendentes={treinamentosPendentes}
      />

      <UltimasAlocacoes
        alocacoes={ultimasAlocacoes}
        isLoading={isLoadingHistorico}
        erro={erroHistorico}
      />
=======
    loading,
    error,
  } = useCampo();

  if (loading) return <div className="text-[#6a8a60] text-sm">Carregando...</div>;
  if (error) return <div className="text-red-500 text-sm">Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col gap-5">

      {/* Cabeçalho */}
      <div>
        <h1 className="text-[20px] font-semibold text-[#2d3a2a]">EHS</h1>
        <p className="text-sm text-[#6a8a60] mt-0.5">
          Acompanhe sua alocação, histórico e treinamentos.
        </p>
      </div>

      {/* Alocação atual */}
      <section className="bg-white rounded-2xl border border-[#e8ede4] p-5 shadow-[0_1px_8px_rgba(60,90,50,0.04)]">
        <p className="text-[10px] font-semibold tracking-widest text-[#83a678] uppercase mb-4">
          Alocação atual
        </p>

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#eef3ea] flex items-center justify-center">
              <Factory size={20} className="text-[#3a6b35]" />
            </div>
            <div>
              <p className="text-[16px] font-semibold text-[#2d3a2a]">
                {alocacaoAtual?.nome || "—"}
              </p>
              <p className="text-sm text-[#6a8a60] mt-0.5">
                {alocacaoAtual?.sublocal || "—"}
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 bg-[#eef3ea] text-[#3a6b35] text-xs font-semibold px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3a6b35]" />
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
      <section className="bg-white rounded-2xl border border-[#e8ede4] p-5 shadow-[0_1px_8px_rgba(60,90,50,0.04)]">
        <p className="text-[10px] font-semibold tracking-widest text-[#83a678] uppercase mb-4">
          Treinamentos
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Realizados */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#2d3a2a]">Realizados</span>
              <span className="text-xs font-semibold bg-[#eef3ea] text-[#3a6b35] px-2 py-0.5 rounded-full">
                {treinamentosRealizados.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {treinamentosRealizados.map((t) => (
                <div
                  key={t.id ?? t.nome}
                  className="flex items-center gap-2.5 bg-[#f8faf7] border border-[#e8ede4] rounded-xl px-3.5 py-2.5"
                >
                  <CheckCircle2 size={16} className="text-[#3a6b35] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium text-[#2d3a2a]">{t.nome}</p>
                    <p className="text-[11px] text-[#6a8a60] mt-0.5">{t.validade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pendentes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#2d3a2a]">Pendentes</span>
              <span className="text-xs font-semibold bg-[#fff3d4] text-[#8a5e0a] px-2 py-0.5 rounded-full">
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
      <section className="bg-white rounded-2xl border border-[#e8ede4] p-5 shadow-[0_1px_8px_rgba(60,90,50,0.04)]">
        <p className="text-[10px] font-semibold tracking-widest text-[#83a678] uppercase mb-4">
          Últimas alocações
        </p>
        <div className="flex flex-col gap-2">
          {ultimasAlocacoes.map((a) => (
            <div
              key={a.id ?? a.nome}
              className="flex items-center justify-between bg-[#f8faf7] border border-[#e8ede4] rounded-xl px-4 py-3"
            >
              <div>
                <p className="text-[13px] font-medium text-[#2d3a2a]">{a.nome}</p>
                <p className="flex items-center gap-1 text-xs text-[#6a8a60] mt-0.5">
                  <MapPin size={12} />
                  {a.local}
                </p>
              </div>
              <span className="text-xs text-[#6a8a60] whitespace-nowrap ml-4">{a.periodo}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="bg-[#f8faf7] border border-[#e8ede4] rounded-xl px-3.5 py-3">
      <p className="flex items-center gap-1 text-[10px] font-semibold tracking-widest text-[#83a678] uppercase mb-1">
        {icon} {label}
      </p>
      <p className="text-sm font-medium text-[#2d3a2a]">{value}</p>
>>>>>>> origin/pagina-de-ti
    </div>
  );
}