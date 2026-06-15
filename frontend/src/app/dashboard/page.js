"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

import {
  Clock,
  ClockArrowUp,
  ShieldCheck,
  Laptop,
  Leaf,
  Users,
  Home,
  Plus,
} from "lucide-react";

/* ───────── DADOS ───────── */

const TEAM = [
  { initials: "AS", name: "Ana Silva", role: "Gestora de Ponto", status: "online", color: "green" },
  { initials: "RC", name: "Rafael Costa", role: "Analista DHO", status: "online", color: "blue" },
  { initials: "LM", name: "Lucas Mendes", role: "T.I", status: "away", color: "amber" },
  { initials: "JP", name: "Julia Pereira", role: "Logística", status: "online", color: "coral" },
  { initials: "FM", name: "Felipe Moura", role: "EHS", status: "away", color: "green" },
];

const PONTO_SEMANA = [
  { day: "Segunda, 09/06", hours: "8h02", status: "ok", label: "Normal" },
  { day: "Terça, 10/06", hours: "7h48", status: "late", label: "Atraso" },
  { day: "Quarta, 11/06", hours: "8h15", status: "ok", label: "Normal" },
  { day: "Quinta, 12/06", hours: "8h00", status: "ok", label: "Normal" },
  { day: "Sexta, 13/06", hours: "—", status: "absent", label: "Falta" },
  { day: "Hoje, 15/06", hours: "Em andamento", status: "ok", label: "—" },
];

const DESEMPENHO = [
  { label: "Pontualidade", value: 92 },
  { label: "Cumprimento de metas", value: 85 },
  { label: "Colaboração", value: 88 },
  { label: "Treinamentos concluídos", value: 60 },
  { label: "Qualidade de entrega", value: 90 },
];

const TREINAMENTOS = [
  { icon: ShieldCheck, name: "NR-35 — Trabalho em altura", due: "Vence em 20/06/2026", progress: 100 },
  { icon: ShieldCheck, name: "Primeiros socorros", due: "Vence em 30/06/2026", progress: 75 },
  { icon: Leaf, name: "Sustentabilidade e EHS", due: "Vence em 10/07/2026", progress: 40 },
  { icon: Laptop, name: "LGPD e segurança digital", due: "Vence em 15/07/2026", progress: 0 },
  { icon: Users, name: "Integração DHO", due: "Concluído", progress: 100 },
];

const SUPORTE = [
  { icon: Laptop, title: "Notebook sem acesso à VPN", meta: "Aberto em 10/06 · T.I", status: "open", label: "Aberto" },
  { icon: Clock, title: "Correção de ponto — 08/06", meta: "Aberto em 09/06 · DHO", status: "resolved", label: "Resolvido" },
  { icon: Home, title: "Solicitação de moradia", meta: "Aberto em 01/06 · Moradia", status: "open", label: "Em análise" },
];

/* ───────── DATA ───────── */

const DIAS = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
const MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ───────── COMPONENTE ───────── */

export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  const [entrada, setEntrada] = useState(null);
  const [saida, setSaida] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const dateStr =
    `${DIAS[now.getDay()]}, ${now.getDate()} de ${MESES[now.getMonth()]} de ${now.getFullYear()}`;

  const dateShort =
    `${now.getDate()}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;

  const registrarEntrada = () => {
    setEntrada(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
  };

  const registrarSaida = () => {
    setSaida(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
  };

  return (
    <div className={styles.dash}>

      {/* ───────── SAUDAÇÃO ───────── */}
      <div className={styles.greeting}>
        <div>
          <h1 className={styles.greetingTitle}>Olá, Maria 👋</h1>
          <p className={styles.greetingSub}>Aqui está um resumo do seu dia.</p>
        </div>
        <span className={styles.dateBadge}>{dateShort}</span>
      </div>

      {/* ───────── MÉTRICAS ───────── */}
      <div className={styles.grid4}>
        {[
          { label: "Horas no mês", value: "142h", sub: "Meta: 176h" },
          { label: "Faltas", value: "1", sub: "Este mês" },
          { label: "Treinamentos", value: "3/5", sub: "Concluídos" },
          { label: "Desempenho", value: "87%", sub: "Acima da meta" },
        ].map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <div className={styles.metricLabel}>{m.label}</div>
            <div className={styles.metricValue}>{m.value}</div>
            <div className={styles.metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* ───────── GRID PRINCIPAL ───────── */}
      <div className={styles.grid2}>

        {/* PONTO */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Ponto de hoje</h2>

          <div className={styles.clockDisplay}>
            <div className={styles.clockTime}>{timeStr}</div>
            <div className={styles.clockDate}>{dateStr}</div>
          </div>

          <button className={styles.pontoBtn} onClick={registrarEntrada}>
            <ClockArrowUp size={16} />
            Registrar entrada
          </button>

          <button
            className={`${styles.pontoBtn} ${styles.pontoBtnSaida}`}
            onClick={registrarSaida}
          >
            <Clock size={16} />
            Registrar saída
          </button>

          <div className={styles.pontoRegistros}>
            <div className={styles.cardLabel}>Registros de hoje</div>

            <div className={styles.pontoRow}>
              <span className={styles.pontoDay}>Entrada</span>
              <span className={styles.pontoHours}>{entrada ?? "—"}</span>
            </div>

            <div className={styles.pontoRow}>
              <span className={styles.pontoDay}>Saída</span>
              <span className={styles.pontoHours}>{saida ?? "—"}</span>
            </div>
          </div>
        </div>

        {/* SEMANA */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Pontos da semana</h2>

          {PONTO_SEMANA.map((p) => (
            <div key={p.day} className={styles.pontoRow}>
              <span className={styles.pontoDay}>{p.day}</span>
              <span className={styles.pontoHours}>{p.hours}</span>
              <span className={`${styles.pontoStatus} ${styles[`status_${p.status}`]}`}>
                {p.label}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* ───────── OUTRAS SEÇÕES ───────── */}

      <div className={styles.grid2}>

        {/* EQUIPE */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Minha equipe</h2>

          {TEAM.map((m) => (
            <div key={m.name} className={styles.teamMember}>
              <div className={`${styles.avatar} ${styles[`av_${m.color}`]}`}>
                {m.initials}
              </div>
              <div>
                <div className={styles.memberName}>{m.name}</div>
                <div className={styles.memberRole}>{m.role}</div>
              </div>
              <span className={`${styles.memberStatus} ${styles[m.status]}`}>
                {m.status === "online" ? "Online" : "Ausente"}
              </span>
            </div>
          ))}
        </div>

        {/* DESEMPENHO */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Meu desempenho</h2>

          {DESEMPENHO.map((d) => (
            <div key={d.label} className={styles.perfBarWrap}>
              <div className={styles.perfBarLabel}>
                <span>{d.label}</span>
                <span>{d.value}%</span>
              </div>
              <div className={styles.perfBarTrack}>
                <div
                  className={styles.perfBarFill}
                  style={{ width: `${d.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ───────── TREINAMENTOS + SUPORTE ───────── */}
      <div className={styles.grid2}>

        {/* TREINAMENTOS */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Treinamentos</h2>

          {TREINAMENTOS.map((t) => {
            const Icon = t.icon;

            return (
              <div key={t.name} className={styles.trainingItem}>
                <div className={styles.trainingIcon}>
                  <Icon size={16} />
                </div>

                <div>
                  <div className={styles.trainingName}>{t.name}</div>
                  <div className={styles.trainingDue}>{t.due}</div>
                </div>

                <span className={styles.trainingProg}>
                  {t.progress}%
                </span>
              </div>
            );
          })}
        </div>

        {/* SUPORTE */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Suporte</h2>

          {SUPORTE.map((s) => {
            const Icon = s.icon;

            return (
              <div key={s.title} className={styles.supportItem}>
                <div className={styles.supportIcon}>
                  <Icon size={16} />
                </div>

                <div>
                  <div className={styles.supportTitle}>{s.title}</div>
                  <div className={styles.supportMeta}>{s.meta}</div>
                </div>

                <span className={`${styles.supportBadge} ${styles[`badge_${s.status}`]}`}>
                  {s.label}
                </span>
              </div>
            );
          })}

          <button className={styles.newTicketBtn}>
            <Plus size={14} />
            Abrir novo chamado
          </button>
        </div>

      </div>

    </div>
  );
}