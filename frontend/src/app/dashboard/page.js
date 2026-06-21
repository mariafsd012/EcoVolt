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

/* ───────── HELPERS ───────── */

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ───────── COMPONENTE ───────── */

export default function Dashboard() {
  const [now, setNow] = useState(() => new Date());
  const [entrada, setEntrada] = useState(null);
  const [saida, setSaida] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const timeStr = now
    ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    : "--:--:--";

  const dateStr = now
    ? `${now.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}`
    : "";

  const dateShort = now
    ? `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`
    : "";

  const registrarEntrada = () => {
    setEntrada(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
  };

  const registrarSaida = () => {
    setSaida(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
  };

  return (
    <div className={styles.dash}>

      {/* SAUDAÇÃO */}
      <div className={styles.greeting}>
        <div>
          <h1 className={styles.greetingTitle}>Olá, Maria 👋</h1>
          <p className={styles.greetingSub}>Aqui está um resumo do seu dia.</p>
        </div>
        <span className={styles.dateBadge}>{dateShort}</span>
      </div>

      {/* MÉTRICAS */}
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

      {/* GRID PRINCIPAL */}
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

          {[
            { day: "Segunda, 09/06", hours: "8h02", status: "ok", label: "Normal" },
            { day: "Terça, 10/06", hours: "7h48", status: "late", label: "Atraso" },
            { day: "Quarta, 11/06", hours: "8h15", status: "ok", label: "Normal" },
            { day: "Quinta, 12/06", hours: "8h00", status: "ok", label: "Normal" },
            { day: "Sexta, 13/06", hours: "—", status: "absent", label: "Falta" },
            { day: "Hoje, 15/06", hours: "Em andamento", status: "ok", label: "—" },
          ].map((p) => (
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

    </div>
  );
}